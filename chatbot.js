async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  const response = await fetch("chatbot.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "message=" + encodeURIComponent(message)
  });

  const data = await response.text();
  appendMessage("bot", data);
}

function appendMessage(sender, text) {
  const chatbox = document.getElementById("chatbox");
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}
