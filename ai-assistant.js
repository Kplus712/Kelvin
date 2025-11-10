// ai-assistant.js
// Kplus712 AI Business Assistant

// ===== CONFIGURATION =====
const OPENAI_API_KEY = "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"; // 🔒 weka key yako hapa
const MODEL = "gpt-4o-mini"; // unaweza kutumia "gpt-4o" au nyingine

// ===== CHAT ELEMENTS =====
const chat = document.getElementById('chat');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat');

// ===== HELPER FUNCTIONS =====
function addMessage(text, who = 'bot') {
  const el = document.createElement('div');
  el.className = 'msg ' + (who === 'user' ? 'user' : '');
  const b = document.createElement('div');
  b.className = 'bubble ' + (who === 'user' ? 'user' : '');
  b.innerText = text;
  el.appendChild(b);
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
}

// ===== OPENAI REQUEST =====
async function askAI(message) {
  try {
    addMessage("...", 'bot');
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are Kplus712 Business Assistant — a helpful and smart AI that provides business education, tips, and ecommerce guidance in multiple languages." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn’t generate a reply right now.";
    // remove "..." bubble and add actual answer
    chat.lastChild.remove();
    addMessage(reply, 'bot');
  } catch (err) {
    chat.lastChild.remove();
    addMessage("⚠️ Connection error. Please check your internet and try again.", 'bot');
    console.error(err);
  }
}

// ===== EVENTS =====
sendChatBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  chatInput.value = '';
  askAI(message);
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendChatBtn.click();
  }
});
