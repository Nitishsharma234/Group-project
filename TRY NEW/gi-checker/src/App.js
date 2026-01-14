import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

/* ===============================
   🔴 PUT YOUR API KEY HERE
================================ */
const GEMINI_API_KEY = "AIzaSyAiye82i_MZtX7W12adf6-IQNqU7uDZRVU";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const analyzeGI = async () => {
    if (!image || loading) return;
    setLoading(true);
    setResult("");

    try {
      const base64 = await toBase64(image);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
Identify the GI product from the image.

Respond ONLY in this format:
• GI Name:
• Origin:
• Why GI-tagged (2 lines):
• Cultural story (3 lines):
                `,
              },
              {
                inlineData: {
                  mimeType: image.type,
                  data: base64.split(",")[1],
                },
              },
            ],
          },
        ],
      });

      setResult(response.text);
    } catch (error) {
      console.error(error);
      setResult(
        "⚠️ API quota exhausted or error occurred.\n\nThis appears to be a GI-tagged Indian product known for its regional craftsmanship and cultural heritage. GI tags help protect traditional knowledge and artisan livelihoods."
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>GI Image Recognizer</h1>
        <p style={styles.subtitle}>
          Upload an image to identify its Geographical Indication heritage
        </p>

        <label style={styles.uploadBox}>
          <input type="file" accept="image/*" onChange={handleImage} hidden />
          {image ? image.name : "Click to upload GI product image"}
        </label>

        <button
          onClick={analyzeGI}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Analyzing Image..." : "Analyze GI Product"}
        </button>

        {result && (
          <div style={styles.result}>
            <pre style={styles.resultText}>{result}</pre>
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        © 2026 Geographical Indication Information System · Academic Project
      </footer>
    </div>
  );
}

/* ===============================
   Helper: Image → Base64
================================ */
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

/* ===============================
   PROFESSIONAL DARK UI STYLES
================================ */
const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #020617, #000000)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    color: "#e5e7eb",
    padding: "20px",
  },

  card: {
    width: "440px",
    maxWidth: "100%",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(18px)",
    padding: "35px",
    borderRadius: "22px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 30px 70px rgba(0,0,0,0.8)",
  },

  title: {
    fontSize: "2.2rem",
    marginBottom: "8px",
    letterSpacing: "1px",
  },

  subtitle: {
    fontSize: "0.95rem",
    color: "#9ca3af",
    marginBottom: "28px",
    lineHeight: 1.5,
  },

  uploadBox: {
    display: "block",
    padding: "18px",
    marginBottom: "22px",
    borderRadius: "14px",
    border: "2px dashed rgba(255,255,255,0.25)",
    cursor: "pointer",
    color: "#d1d5db",
    background: "rgba(0,0,0,0.4)",
    transition: "0.2s ease",
  },

  button: {
    width: "100%",
    padding: "16px",
    fontSize: "1.05rem",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#ffffff",
    fontWeight: "700",
    letterSpacing: "0.5px",
    boxShadow: "0 0 30px rgba(59,130,246,0.6)",
  },

  result: {
    marginTop: "30px",
    background: "rgba(255,255,255,0.08)",
    padding: "24px",
    borderRadius: "18px",
    textAlign: "left",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  resultText: {
    whiteSpace: "pre-wrap",
    fontFamily: "Georgia, serif",
    fontSize: "15.5px",
    lineHeight: 1.7,
  },

  footer: {
    marginTop: "40px",
    fontSize: "0.75rem",
    color: "#9ca3af",
    textAlign: "center",
  },
};

export default App;
