import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAiye82i_MZtX7W12adf6-IQNqU7uDZRVU", // demo key
});

function App() {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newChat = [...chat, { role: "user", text: userInput }];
    setChat(newChat);
    setUserInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are a GI (Geographical Indication) expert chatbot.
Explain GI products in storytelling style with history, culture, artisans, and importance.

User question: ${userInput}
        `,
      });

      setChat([...newChat, { role: "bot", text: response.text }]);
    } catch (error) {
      setChat([
        ...newChat,
        { role: "bot", text: "⚠️ Error: API quota exceeded or invalid key." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>🌍 GI Storytelling Chatbot</h1>
        <p style={styles.subtitle}>
          Ask about India’s GI-tagged products, heritage & craftsmanship
        </p>
      </header>

      <div style={styles.chatWrapper}>
        <div style={styles.chatBox}>
          {chat.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                    : "rgba(255,255,255,0.12)",
                color: msg.role === "user" ? "#fff" : "#e5e7eb",
              }}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div style={styles.thinking}>🤖 Thinking...</div>
          )}
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            placeholder="Ask about Banarasi Saree, Darjeeling Tea, etc..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button style={styles.button} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>

      <footer style={styles.footer}>
        © 2026 Geographical Indication Information System · Academic Project
      </footer>
    </div>
  );
}

/* =========================
   PROFESSIONAL DARK UI
========================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #020617, #000000)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 15px",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    color: "#e5e7eb",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  title: {
    fontSize: "2.6rem",
    letterSpacing: "1px",
  },

  subtitle: {
    fontSize: "0.95rem",
    color: "#9ca3af",
    marginTop: "6px",
  },

  chatWrapper: {
    width: "100%",
    maxWidth: "820px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(18px)",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.85)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },

  chatBox: {
    display: "flex",
    flexDirection: "column",
    height: "420px",
    overflowY: "auto",
    padding: "10px",
  },

  message: {
    padding: "14px 16px",
    borderRadius: "16px",
    marginBottom: "12px",
    maxWidth: "75%",
    lineHeight: 1.6,
    fontSize: "15px",
    whiteSpace: "pre-wrap",
  },

  thinking: {
    fontSize: "0.9rem",
    color: "#9ca3af",
    marginTop: "10px",
  },

  inputArea: {
    display: "flex",
    marginTop: "15px",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
  },

  button: {
    padding: "14px 22px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#000",
    fontWeight: "700",
    letterSpacing: "0.5px",
    boxShadow: "0 0 25px rgba(34,197,94,0.6)",
  },

  footer: {
    marginTop: "30px",
    fontSize: "0.75rem",
    color: "#9ca3af",
    textAlign: "center",
  },
};

export default App;
