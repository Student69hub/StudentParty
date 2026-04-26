/* =================================================================================
   * AI CHATBOT LOGIC (Groq Powered)
   * ================================================================================= */

const CHATBOT_NAME = "Student (AI)";
const CHATBOT_API_BASE =
  window.CHATBOT_API_BASE ||
  (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:3001'
    : '');

// --- Bot Knowledge Base ---
const BOT_CONTEXT = `
คุณคือ "พี่พรรค" (Pi-Pak) AI ผู้ช่วยของ "พรรคนักเรียน โรงเรียนโรซารีโอวิทยา"
บุคลิก: เป็นกันเอง, สนุกสนาน, ฉลาดและให้ข้อมูลที่ถูกต้องแม่นยำ, รักโรงเรียน, ชอบช่วยรุ่นน้อง, พูดภาษาไทยสุภาพและเป็นมิตร ลงท้ายด้วย "ครับ" บางครั้ง

[ข้อมูลโรงเรียนโรซารีโอวิทยา]
- ชื่อโรงเรียน: โรงเรียนโรซารีโอวิทยา - "โรซารีโอ" (Rosario) มาจากภาษาละติน หมายถึง "สายประคำ" หรือ "มงกุฎกุหลาบ" ซึ่งเป็นสัญลักษณ์การสวดภาวนาในศาสนาคริสต์นิกายโรมันคาทอลิก
- ที่ตั้ง: 119 หมู่ 1 ตำบลเวียงคุก อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000  โทร: 042-438-104
- เว็บไซต์โรงเรียน: http://www.rosariovitthaya.ac.th/
- อีเมล: rosariovitthaya2023@gmail.com
- เวลาทำการ: จันทร์-ศุกร์ เวลา 07.30-16.30 น.
- ผู้บริหาร: เซอร์ ดร. สแตลลา วัลภา นิลเขต (ผู้อำนวยการ)

[ประวัติโรงเรียน]
- เวียงคุก เป็นหมู่บ้านในเขตอำเภอเมือง จังหวัดหนองคาย ชาวบ้านส่วนใหญ่นับถือพุทธ แต่มีชาวคริสต์เป็นชนกลุ่มน้อย
- ความขัดแย้งทางศาสนาในหมู่บ้านทำให้ บาทหลวงริชาร์ด ธิรี่ แห่งคณะพระมหาไถ่ เสนอขออนุญาตพระสังฆราชดูฮาร์ด จัดตั้งโรงเรียนให้กับเด็กคริสต์ชน
- ก่อตั้งวันที่: 26 กุมภาพันธ์ พ.ศ. 2502 (ค.ศ. 1959)
- เนื้อที่: 9 ไร่ 2 งาน 10 ตารางวา
- บาทหลวงอิน นาริน รักษ์ ลงนามเป็นเจ้าของโรงเรียนคนแรก เปิดสอน ป.1-ป.4 มีนักเรียน 192 คน ครู 5 คน
- ต่อมาได้ขยายถึง ม.3 ในปี 2511 และเปิดระดับก่อนประถมในปี 2523
- ปี 2531 คณะพระมหาไถ่มอบโรงเรียนให้ "คณะภคินีเซนต์ปอล เดอ ชาร์ตร" บริหารแทน ทำให้โรงเรียนพัฒนาก้าวหน้าอย่างต่อเนื่อง

[ปรัชญา / วิสัยทัศน์ / เอกลักษณ์]
- ปรัชญา: "มนุษย์ที่มีคุณภาพ คือ มนุษย์ที่มีคุณธรรมและความรู้"
- คติพจน์: "ศึกษาดี มีวินัย ใจเมตตา ใฝ่หาคุณธรรม เลิศล้ำการงาน"
- เอกลักษณ์: "ภาษาดี มีใจรักษ์สิ่งแวดล้อม"
- อัตลักษณ์: "ความรู้เพื่อส่วนรวม พอเพียงในส่วนตน"
- เพลงโรงเรียน: https://youtu.be/MwniqUdNKxw

[หลักสูตรและการเรียนการสอน]
- เปิดสอนระดับปฐมวัย (อนุบาล 1-3), ประถมศึกษา (ป.1-6), และมัธยมศึกษาตอนต้น (ม.1-3)
- หลักสูตรตามมาตรฐานกระทรวงศึกษาธิการไทย
- กลุ่มสาระการเรียนรู้: ภาษาไทย, คณิตศาสตร์, วิทยาศาสตร์และเทคโนโลยี, สังคมศึกษา, สุขศึกษา, ศิลปะ, การงานอาชีพ, ภาษาต่างประเทศ, ปฐมวัย
- มีการสอบ O-NET สำหรับนักเรียนชั้น ป.6 และสอบกลางภาค/ปลายภาค
- ระบบตรวจสอบผลการเรียนออนไลน์: https://regis-stu.opec.go.th/regis/Login.htm?mode=initStudent

[ครูและบุคลากร]
- แบ่งเป็นกลุ่มสาระต่างๆ รวมถึงบุคลากรสนับสนุนและงานแนะแนว
- มีคู่มือครูและคู่มือนักเรียน
- รับสมัครครูเป็นประจำ

[กิจกรรมนักเรียน]
- ทัศนศึกษาในระดับต่างๆ (ปฐมวัย, ประถม, มัธยม)
- การเรียนรู้อาหารพื้นบ้านแบบไทย
- แนะแนวศึกษาต่อ (อาชีวศึกษา)
- การแข่งขันคณิตคิดเร็ว
- อบรมเชิงปฏิบัติการสำรวจแววความสามารถพิเศษบนฐานพหุปัญญา
- การประชุมผู้ปกครอง
- ชมรมผู้ปกครอง
- มีแผนผังคณะกรรมการสภานักเรียน

[ระบบออนไลน์และบริการ]
- รับสมัครนักเรียนออนไลน์: http://www.register.in.th/index.php?school_id=43111914
- ผลงานอาจารย์: http://www.rosariovitthaya.ac.th/workteacher
- ผลงานนักเรียน: http://www.rosariovitthaya.ac.th/workstudent
- ดาวน์โหลดเอกสาร: http://www.rosariovitthaya.ac.th/documentschool
- ข่าวประชาสัมพันธ์และภาพกิจกรรมบนเว็บไซต์
- ถาม-ตอบ (Q&A) และสมุดเยี่ยม

[ลิงก์ที่เกี่ยวข้อง]
- กระทรวงศึกษาธิการ: http://www.moe.go.th/
- สำนักงานคณะกรรมการส่งเสริมการศึกษาเอกชน (OPEC): http://www.opec.go.th/
- สำนักงานรับรองมาตรฐานและประเมินคุณภาพการศึกษา (ONESQA): http://www.onesqa.or.th/th/index.php
- คุรุสภา: https://www.kurusa.or.th/
- มูลนิธิการศึกษาทางไกลผ่านดาวเทียม: https://www.dltv.ac.th/

[ข้อมูลพรรคนักเรียน]
- สโลแกน: "เสียงของนักเรียน เพื่อโรงเรียนที่ดีกว่า"
- นโยบาย 5 ข้อ:
  1. Zero Smell: ขจัดกลิ่นห้องน้ำร่วมกับฝ่ายอาคาร
  2. Monthly Clean Classroom: ประกวดความสะอาดห้องเรียนรายเดือน
  3. ขยะคนละชิ้นก่อนกลับบ้าน: รณรงค์เก็บขยะก่อนกลับ
  4. เติมเงินการ์ดช่วงพักเบรก: เติมบัตรร้านอาหารได้ในพัก 20 นาที
  5. นักเรียนดีเด่นประจำเทอม: มอบรางวัลผู้ทำดีและมีจิตอาสา

[กิจกรรมและเครื่องมือออนไลน์]
- eFootball Student League (E-Sports): สำหรับสายเกมเมอร์
- กระดานไอเดีย: บอร์ดออนไลน์แชร์ไอเดีย
- ส่งความเห็น: ส่งข้อร้องเรียนถึงแอดมิน

[คำสั่งการตอบคำถาม - สำคัญมาก!!!]
1. คุณคือรุ่นพี่ที่คุยสนุก ไม่ใช่หุ่นยนต์หาเสียง ห้ามตอบวกเข้าการเมืองหรือโยงเข้าเสนอนโยบายพรรค "ยกเว้นน้องจะถามหานโยบายตรงๆ"
2. คุยเล่นให้เป็นธรรมชาติ ตอบกระชับแต่ให้ข้อมูลครบถ้วน ถ้าเขาถามสารทุกข์สุกดิบ ทักทาย หรือคุยเล่น ให้รับมุกหรือตอบกลับแบบสุภาพและเป็นมิตร
3. ห้ามใช้ปุ่มนำทาง [LINK] พร่ำเพรื่อเด็ดขาด ใช้เฉพาะตอนที่จำเป็นจริงๆ หรือน้องถามหาทางไปหน้าอื่นเท่านั้น
4. *(คำถามใดที่ไม่รู้ ให้ตอบเนียนๆ ว่า "พี่พรรคขอแว๊บไปถามแอดมินให้ชัวร์ก่อนน้าา")*

[คำสั่งพิเศษสำหรับการนำทาง (ใช้เฉพาะเมื่อจำเป็นเท่านั้น)]
หากต้องการให้ปุ่มนำทาง ให้ใส่ [LINK: ชื่อไฟล์.html|ข้อความบนปุ่ม] เช่น:
- โหวต/ไอเดีย: [LINK: idea-board.html|ไปที่กระดานไอเดีย]
- แข่งเกม: [LINK: esports.html|ดู E-Sports League]
- ร้องเรียน: [LINK: feedback.html|ฝากความเห็นให้แอดมิน]
- นโยบายทั้งหมด: [LINK: policy.html|อ่านนโยบายทั้งหมด]
`;

// --- UI Creation ---
function initChatbotUI() {
  const container = document.createElement('div');
  container.innerHTML = `
    <!-- FAB -->
    <div class="chatbot-fab" id="chat-fab">
      <div class="chatbot-tooltip" id="chat-tooltip">สงสัยอะไร ถาม AI พี่พรรคได้เลย! 👋</div>
      <span class="ai-icon">🤖</span>
      <div class="chatbot-badge">1</div>
    </div>

    <!-- Chat Window -->
    <div class="chat-window" id="chat-window">
      <div class="chat-header">
        <img src="assets/favicon.png" alt="Pi-Pak">
        <div class="chat-header-info">
          <h4>${CHATBOT_NAME}</h4>
          <span>ผู้ช่วยพรรคนักเรียน (Online)</span>
        </div>
        <div style="margin-left: auto; cursor: pointer;" id="close-chat">✕</div>
      </div>
      <div class="chat-body" id="chat-messages">
        <div class="message ai">สวัสดีครับ! พี่พรรคยินดีรับใช้น้องๆ ทุกคนครับ มีอะไรอยากสอบถามเรื่องนโยบาย หรืออยากแชร์ไอเดียคุยกับพี่พรรคได้เลยครับ! ✨</div>
      </div>
      <div class="typing-indicator" id="typing-indicator">พี่พรรคกำลังพิมพ์...</div>
      <div class="chat-footer">
        <input type="text" class="chat-input" id="chat-input" placeholder="ถามพี่พรรคได้ที่นี่..." autocomplete="off">
        <button class="chat-send-btn" id="chat-send">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Events
  const fab = document.getElementById('chat-fab');
  const chatWin = document.getElementById('chat-window');
  const close = document.getElementById('close-chat');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const msgs = document.getElementById('chat-messages');
  const typing = document.getElementById('typing-indicator');

  const openChatHandler = () => {
    chatWin.classList.toggle('is-open');
    const badge = document.querySelector('.chatbot-badge');
    const badgeMobile = document.querySelector('.chatbot-badge-mobile');
    if (badge) badge.style.display = 'none';
    if (badgeMobile) badgeMobile.style.display = 'none';

    if (window.innerWidth <= 600) {
      document.body.style.overflow = chatWin.classList.contains('is-open') ? 'hidden' : '';
    }
  };

  fab.onclick = openChatHandler;

  // Append mobile AI button to navbar
  const toggleBtn = document.getElementById('nav-toggle');
  if (toggleBtn && toggleBtn.parentNode) {
    const mobileAiBtn = document.createElement('button');
    mobileAiBtn.className = 'nav-mobile-ai-btn';
    mobileAiBtn.innerHTML = `
      <span style="font-size: 1.25rem; line-height: 1;">🤖</span>
      <div class="chatbot-badge-mobile">1</div>
    `;
    mobileAiBtn.onclick = openChatHandler;
    toggleBtn.parentNode.insertBefore(mobileAiBtn, toggleBtn);
  }

  close.onclick = () => {
    chatWin.classList.remove('is-open');
    if (window.innerWidth <= 600) {
      document.body.style.overflow = '';
    }
  };

  let isWaiting = false;
  input.onkeypress = (e) => { if (e.key === 'Enter' && !isWaiting) handleUserMessage(); };
  send.onclick = () => { if (!isWaiting) handleUserMessage(); };

  let chatHistory = []; // Conversational Memory
  const defaultInputPlaceholder = input.placeholder;

  // Load chat history from sessionStorage if exists
  const savedHistory = sessionStorage.getItem('piPakChatHistory');
  if (savedHistory) {
    try {
      chatHistory = JSON.parse(savedHistory);
      if (chatHistory.length > 0) {
        msgs.innerHTML = ''; // Clear default greeting
        chatHistory.forEach(msg => {
          const text = msg.parts[0].text;
          const side = msg.role === 'user' ? 'user' : 'ai';
          addMessage(text, side);
        });
      }
    } catch (e) {
      console.error("Failed to parse chat history");
    }
  }

  function startCooldown(seconds, bubbleSpan) {
    isWaiting = true;
    send.disabled = true;
    input.disabled = true;
    input.placeholder = `รอคูลดาวน์ ${seconds} วินาที...`;
    let remaining = seconds;
    send.textContent = `${remaining}s`;
    if (bubbleSpan) bubbleSpan.textContent = remaining;
    const timer = setInterval(() => {
      remaining--;
      send.textContent = `${remaining}s`;
      input.placeholder = `รอคูลดาวน์ ${Math.max(0, remaining)} วินาที...`;
      if (bubbleSpan) bubbleSpan.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(timer);
        isWaiting = false;
        send.disabled = false;
        input.disabled = false;
        input.placeholder = defaultInputPlaceholder;
        send.innerHTML = '➤';
        if (bubbleSpan) bubbleSpan.closest('.message').innerHTML = '✅ ส่งได้แล้วครับ! พิมพ์คำถามได้เลย 🎉';
      }
    }, 1000);
  }

  async function handleUserMessage() {
    const text = input.value.trim();
    if (!text || isWaiting) return;

    isWaiting = true;
    send.disabled = true;

    // Add User Message
    addMessage(text, 'user');
    input.value = '';

    chatHistory.push({ role: "user", parts: [{ text }] });

    // AI Response
    try {
      typing.style.display = 'block';
      msgs.scrollTop = msgs.scrollHeight;

      const apiResult = await callGroqAPI(chatHistory);

      // เข้า cooldown เฉพาะกรณีโควตาจริงเท่านั้น
      if (!apiResult.ok && apiResult.errorType === 'quota') {
        // บวกเพิ่ม 2 วินาทีเพื่อให้ชัวร์ว่า Google รีเซ็ตโควตาแล้วจริงๆ
        const waitSecs = Math.max(1, Math.ceil(apiResult.retrySeconds || 15) + 2);
        const retryAt = new Date(Date.now() + (waitSecs * 1000));
        const retryAtText = retryAt.toLocaleTimeString('th-TH', { hour12: false });
        const quotaLabel = apiResult.quotaScope || 'rate limit';

        typing.style.display = 'none';

        // ลบข้อความที่ส่งไม่สำเร็จออกจากประวัติ (ถูกต้องแล้ว)
        chatHistory.pop();
        sessionStorage.setItem('piPakChatHistory', JSON.stringify(chatHistory));

        // สร้างฟองสบู่แจ้งเตือน
        const bubble = document.createElement('div');
        bubble.className = 'message ai';
        // ถ้ารอนานเกิน 3 นาที ให้แจ้งเป็นปัญหาโควต้ายาว ไม่ล็อกแชต
        if (waitSecs > 180) {
          bubble.innerHTML = `⚠️ โควต้า Groq เต็มระดับยาว (${quotaLabel})<br>ระบบแจ้งให้รอประมาณ ${waitSecs} วินาที<br>แนะนำลองใหม่อีกครั้งในอีกไม่กี่วินาที`;
          msgs.appendChild(bubble);
          msgs.scrollTop = msgs.scrollHeight;
          isWaiting = false;
          send.disabled = false;
          input.disabled = false;
          input.placeholder = defaultInputPlaceholder;
          send.innerHTML = '➤';
          return;
        }

        // แจ้งเหตุผลและเวลาที่ส่งได้อีกครั้งให้ชัดเจน
        bubble.innerHTML = `⏳ โควต้า AI เต็มชั่วคราว (${quotaLabel})<br>รออีก <span id="cd-timer">${waitSecs}</span> วินาที<br>ลองส่งใหม่ได้ประมาณ ${retryAtText} น.`;
        msgs.appendChild(bubble);
        msgs.scrollTop = msgs.scrollHeight;

        // เริ่มนับถอยหลัง
        startCooldown(waitSecs, bubble.querySelector('#cd-timer'));

        // สำคัญ: ต้องเคลียร์ค่า input เผื่อไว้ด้วย (ถ้ายังไม่เคลียร์)
        // input.value = ''; 

        return;
      }

      if (!apiResult.ok) {
        if (apiResult.errorType === 'model') {
          const retryResult = await callGroqAPI(chatHistory);
          if (retryResult.ok) {
            const retryText = retryResult.text || '';
            chatHistory.push({ role: "model", parts: [{ text: retryText }] });
            if (chatHistory.length > 10) chatHistory = chatHistory.slice(chatHistory.length - 10);
            sessionStorage.setItem('piPakChatHistory', JSON.stringify(chatHistory));
            typing.style.display = 'none';
            addMessage(retryText, 'ai');
            return;
          }
        }

        typing.style.display = 'none';
        addMessage(
          formatApiErrorForUser(apiResult.errorType, apiResult.message, apiResult.statusCode),
          'ai'
        );
        chatHistory.pop();
        sessionStorage.setItem('piPakChatHistory', JSON.stringify(chatHistory));
        return;
      }

      const aiResponse = apiResult.text || '';
      chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });
      if (chatHistory.length > 10) chatHistory = chatHistory.slice(chatHistory.length - 10);
      sessionStorage.setItem('piPakChatHistory', JSON.stringify(chatHistory));

      typing.style.display = 'none';
      addMessage(aiResponse, 'ai');
    } catch (err) {
      typing.style.display = 'none';
      addMessage("ขออภัยครับน้องๆ ระบบขัดข้องนิดหน่อย พี่พรรครบกวนถามใหม่อีกครั้งนะ", 'ai');
      chatHistory.pop();
      sessionStorage.setItem('piPakChatHistory', JSON.stringify(chatHistory));
    } finally {
      if (!send.textContent.includes('s')) {
        isWaiting = false;
        send.disabled = false;
      }
    }
  }

  function addMessage(text, side) {
    const el = document.createElement('div');
    el.className = `message ${side}`;

    // Sanitization against XSS
    let safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

    if (side === 'ai') {
      // Smart Navigation parser
      safeText = safeText.replace(/\[LINK:\s*([^\|<]+)\|([^\]<]+)\]/g, '<br><a href="$1" style="display:inline-block; background: var(--chatbot-primary); color: white; border-radius: 999px; padding: 0.5rem 1rem; margin-top: 0.5rem; text-decoration: none; font-weight: bold; font-size: 0.85rem; box-shadow: 0 4px 10px rgba(255,115,0,0.2);">➤ $2</a>');
      // Basic markdown bold support
      safeText = safeText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    }

    safeText = safeText.replace(/\n/g, '<br>');
    el.innerHTML = safeText;

    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }
}

// --- API Integration (Google AI SDK) ---
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

function formatApiErrorForUser(errorType, message, statusCode) {
  const raw = message || 'Unknown error';
  if (errorType === 'auth' || statusCode === 401 || statusCode === 403) {
    return "คีย์ Groq ใช้งานไม่ได้หรือยังไม่ได้ตั้งค่าครับ ลองเช็ก API key อีกครั้ง";
  }
  if (errorType === 'model') {
    return "ระบบกำลังสลับโมเดลให้อัตโนมัติแต่ยังไม่สำเร็จครับ ลองส่งอีกครั้งในอีกไม่กี่วินาที";
  }
  if (errorType === 'quota') {
    return `โควต้า Groq เต็มชั่วคราวครับ (${raw})`;
  }
  if (errorType === 'network') {
    return "ติดต่อเซิร์ฟเวอร์ Groq ไม่สำเร็จครับ ลองเช็กเน็ตหรือไฟร์วอลล์แล้วส่งใหม่อีกครั้ง";
  }
  return `ระบบยังตอบไม่ได้ครับ (${raw})`;
}

async function callGroqAPI(historyArray) {
  try {
    const response = await fetch(`${CHATBOT_API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history: historyArray, systemPrompt: BOT_CONTEXT })
    });

    let data = null;
    try {
      data = await response.json();
    } catch (_) {
      data = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        errorType: data?.errorType || (response.status === 429 ? 'quota' : 'api'),
        retrySeconds: data?.retrySeconds || null,
        quotaScope: data?.quotaScope || null,
        statusCode: response.status,
        message: data?.message || `Backend error (${response.status})`
      };
    }

    if (data?.ok) return data;
    return {
      ok: false,
      errorType: data?.errorType || 'api',
      statusCode: response.status,
      message: data?.message || 'ระบบ backend ตอบกลับไม่ครบ'
    };
  } catch (err) {
    console.error("Backend fetch error:", err);
    return {
      ok: false,
      errorType: 'network',
      message: "เชื่อมต่อ backend ไม่ได้ครับ กรุณารันเซิร์ฟเวอร์ด้วยคำสั่ง npm start ก่อน"
    };
  }
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbotUI);
} else {
  initChatbotUI();
}

