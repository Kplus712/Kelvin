// proxy.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  const msg = req.body.message || "Hello";

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Kplus712 Business Assistant. Offer helpful, clear business answers." },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("✅ Proxy running on http://localhost:3000"));
