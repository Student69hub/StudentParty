require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODELS = (process.env.GROQ_MODELS || 'llama-3.3-70b-versatile,llama-3.1-8b-instant,gemma2-9b-it')
  .split(',')
  .map((v) => v.trim())
  .filter(Boolean);
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
const MAX_REQ_PER_WINDOW = Number(process.env.RATE_LIMIT_MAX || 30);
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((v) => v.trim())
  .filter(Boolean);

const hitsByIp = new Map();
const MODEL_CACHE_MS = Number(process.env.MODEL_CACHE_MS || 10 * 60 * 1000);
let modelCache = {
  fetchedAt: 0,
  available: [],
  configured: MODELS
};

function normalizeModelName(name) {
  if (!name) return '';
  return String(name).replace(/^models\//, '').trim();
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.connection?.remoteAddress || 'unknown';
}

function passRateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const bucket = hitsByIp.get(ip) || [];
  const recent = bucket.filter((ts) => now - ts < WINDOW_MS);

  if (recent.length >= MAX_REQ_PER_WINDOW) {
    hitsByIp.set(ip, recent);
    return false;
  }

  recent.push(now);
  hitsByIp.set(ip, recent);
  return true;
}

function parseRetrySeconds(data) {
  const details = data?.error?.details;
  if (Array.isArray(details)) {
    for (const d of details) {
      const retryDelay = d?.retryDelay;
      if (typeof retryDelay === 'string') {
        const match = retryDelay.match(/([\d.]+)s/);
        if (match) return Math.ceil(parseFloat(match[1]));
      }
    }
  }
  const message = data?.error?.message || '';
  const retryMatch = message.match(/retry in ([\d.]+)s/i);
  if (retryMatch) return Math.ceil(parseFloat(retryMatch[1]));
  return null;
}

function detectQuotaScope(message) {
  if (!message) return 'rate limit';
  if (/ipm/i.test(message)) return 'IPM';
  if (/per minute|rpm/i.test(message)) return 'RPM';
  if (/per day|rpd/i.test(message)) return 'RPD';
  if (/per second|rps/i.test(message)) return 'RPS';
  if (/token|tpm/i.test(message)) return 'TPM';
  return 'rate limit';
}

function classifyError(response, error) {
  const message = error?.message || '';
  const isHighDemand = /high demand|try again later|temporarily unavailable/i.test(message);
  const isQuota =
    response.status === 429 ||
    response.status === 503 ||
    error?.status === 'RESOURCE_EXHAUSTED' ||
    error?.code === 429 ||
    isHighDemand;
  if (isQuota) {
    return {
      ok: false,
      errorType: 'quota',
      retrySeconds: parseRetrySeconds({ error }) || 20,
      quotaScope: detectQuotaScope(message),
      statusCode: response.status,
      message
    };
  }

  const isAuth =
    response.status === 401 ||
    response.status === 403 ||
    error?.status === 'PERMISSION_DENIED' ||
    error?.code === 401 ||
    error?.code === 403;
  if (isAuth) {
    return { ok: false, errorType: 'auth', statusCode: response.status, message };
  }

  const isModel =
    response.status === 404 ||
    error?.status === 'NOT_FOUND' ||
    (/model|unsupported/i.test(message) && !isHighDemand);
  if (isModel) {
    return { ok: false, errorType: 'model', statusCode: response.status, message };
  }

  return { ok: false, errorType: 'api', statusCode: response.status, message: `API Error: ${message}` };
}

async function requestWithModel({ model, history, systemPrompt }) {
  const endpoint = 'https://api.groq.com/openai/v1/chat/completions';
  console.log(`🚀 Calling Groq API with model: ${model}`);
  
  // Convert Gemini format to OpenAI format
  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push(...history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.parts?.[0]?.text || msg.content || ''
  })));

  console.log(`📤 Sending ${messages.length} messages to Groq API`);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.5,
      max_tokens: 800
    })
  });

  console.log(`📥 Groq API Response Status: ${response.status}`);
  const data = await response.json();
  if (!data?.error && data?.choices?.[0]?.message?.content) {
    console.log(`✅ Got response from Groq`);
    return { ok: true, text: data.choices[0].message.content, modelUsed: model };
  }
  if (data?.error) {
    console.error(`❌ Groq API error:`, data.error);
    return classifyError(response, data.error);
  }
  console.error(`❌ Invalid Groq response format`);
  return { ok: false, errorType: 'response', statusCode: response.status, message: 'Invalid model response' };
}

async function getResolvedModelList(forceRefresh = false) {
  // Groq models are static, no need to fetch dynamically
  const configured = MODELS.map(normalizeModelName).filter(Boolean);
  return configured.length > 0 ? configured : ['mixtral-8x7b-32768'];
}

async function runChatWithModelList({ modelList, history, systemPrompt }) {
  let lastError = null;
  for (let i = 0; i < modelList.length; i++) {
    const model = modelList[i];
    const result = await requestWithModel({ model, history, systemPrompt });
    if (result.ok) {
      return {
        ok: true,
        text: result.text,
        modelUsed: model,
        fallbackUsed: i > 0,
        primaryModel: modelList[0]
      };
    }

    if ((result.errorType === 'model' || result.errorType === 'quota') && i < modelList.length - 1) {
      lastError = result;
      continue;
    }
    return result;
  }
  return lastError || { ok: false, errorType: 'api', message: 'No models available' };
}

app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser clients and same-origin server calls.
    if (!origin) return callback(null, true);

    // If not configured, keep permissive for local development.
    if (ALLOWED_ORIGINS.length === 0) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error('CORS blocked for this origin'));
  }
}));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    models: MODELS,
    hasApiKey: Boolean(GROQ_API_KEY)
  });
});

app.post('/api/chat', async (req, res) => {
  console.log('📨 Received /api/chat request');
  console.log('📝 Request body:', JSON.stringify(req.body).substring(0, 200));
  
  if (!passRateLimit(req)) {
    return res.status(429).json({
      ok: false,
      errorType: 'quota',
      quotaScope: 'IPM',
      retrySeconds: Math.ceil(WINDOW_MS / 1000),
      message: 'Backend rate limit reached. Please retry shortly.'
    });
  }

  if (!GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY is missing in .env');
    return res.status(500).json({
      ok: false,
      errorType: 'config',
      message: 'Server missing GROQ_API_KEY in .env'
    });
  }

  const history = Array.isArray(req.body?.history) ? req.body.history : [];
  const systemPrompt = typeof req.body?.systemPrompt === 'string' ? req.body.systemPrompt : '';
  console.log(`📊 History length: ${history.length}, SystemPrompt length: ${systemPrompt.length}`);
  
  if (history.length === 0) {
    console.error('❌ No history provided');
    return res.status(400).json({ ok: false, errorType: 'request', message: 'history is required' });
  }

  try {
    const modelList = await getResolvedModelList(false);
    console.log(`🤖 Using models: ${modelList.join(', ')}`);
    
    if (modelList.length === 0) {
      return res.status(500).json({
        ok: false,
        errorType: 'model',
        message: 'No usable Groq model found for this API key'
      });
    }

    let result = await runChatWithModelList({ modelList, history, systemPrompt });
    console.log(`✅ Result:`, result.ok ? 'Success' : `Error - ${result.errorType}`);

    if (result.ok) return res.json(result);
    return res.status(result.statusCode || 502).json(result);
  } catch (error) {
    console.error('Backend catch error:', error);
    return res.status(500).json({ ok: false, errorType: 'network', message: `Backend failure: ${error.message}` });
  }
});

app.use((err, _req, res, _next) => {
  if (err?.message?.includes('CORS')) {
    return res.status(403).json({ ok: false, errorType: 'cors', message: 'Origin is not allowed' });
  }
  return res.status(500).json({ ok: false, errorType: 'server', message: 'Unexpected server error' });
});

app.listen(PORT, () => {
  console.log(`Groq backend listening at http://127.0.0.1:${PORT}`);
});
