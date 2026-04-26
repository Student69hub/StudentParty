require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = 'llama-3.3-70b-versatile';

console.log('🔍 Testing Groq API...');
console.log(`API Key: ${GROQ_API_KEY ? '✅ Found' : '❌ Missing'}`);
console.log(`Model: ${MODEL}`);

async function testGroqAPI() {
  try {
    const endpoint = 'https://api.groq.com/openai/v1/chat/completions';
    
    const payload = {
      model: MODEL,
      messages: [
        { role: 'user', content: 'Hello! Can you respond with a simple greeting?' }
      ],
      temperature: 0.5,
      max_tokens: 100
    };

    console.log('\n📤 Sending request to Groq API...');
    console.log('URL:', endpoint);
    console.log('Model:', MODEL);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    console.log(`\n📥 Response Status: ${response.status} ${response.statusText}`);

    const data = await response.json();

    if (data.error) {
      console.error('❌ API Error:', JSON.stringify(data.error, null, 2));
      return false;
    }

    if (data.choices?.[0]?.message?.content) {
      console.log('✅ Success! Response:');
      console.log(data.choices[0].message.content);
      return true;
    }

    console.error('❌ Unexpected response format:', JSON.stringify(data, null, 2));
    return false;
  } catch (err) {
    console.error('❌ Network Error:', err.message);
    return false;
  }
}

testGroqAPI().then(success => {
  process.exit(success ? 0 : 1);
});
