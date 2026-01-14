import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import "./App.css";

// 🔑 Gemini API
const ai = new GoogleGenAI({
  apiKey: "AIzaSyAiye82i_MZtX7W12adf6-IQNqU7uDZRVU",
});

function App() {
  const [giName, setGiName] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    if (!giName) return;

    setLoading(true);
    setStory("");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
Tell the story of "${giName}" as a GI-tagged product.
Write it like a cultural storyteller.
Include:
- Origin & history
- Cultural importance
- Artisans & generations
- Why GI tag matters
Keep it engaging and emotional.

try to be professional as you are explaining to adults
`,
      });

      setStory(response.text);
    } catch (error) {
      setStory("❌ Error generating story. Check API quota.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>GI Story Teller</h1>
        <p style={styles.headerSub}>
          Government of India · Geographical Indication Awareness
        </p>
      </header>

      {/* MAIN CARD */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Explore a GI Product</h2>
        <p style={styles.cardDesc}>
          Enter the name of an Indian GI-tagged product to uncover its legacy,
          craftsmanship, and cultural soul.
        </p>

        <input
          style={styles.input}
          placeholder="Example: Banarasi Saree, Darjeeling Tea, Mysore Silk"
          value={giName}
          onChange={(e) => setGiName(e.target.value)}
        />

        <button style={styles.button} onClick={generateStory}>
          {loading ? "Crafting the story..." : "Generate Cultural Story"}
        </button>
      </div>

      {/* STORY OUTPUT */}
      {story && (
        <section style={styles.storySection}>
          <h3 style={styles.storyTitle}>📜 Cultural Narrative</h3>
          <div style={styles.storyBox}>
            <pre style={styles.storyText}>{story}</pre>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 Geographical Indication Information System · Academic Use Only
      </footer>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #020617, #000000)",
    color: "#e5e7eb",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  headerTitle: {
    fontSize: "3rem",
    letterSpacing: "1.2px",
    marginBottom: "6px",
  },

  headerSub: {
    color: "#9ca3af",
    fontSize: "0.95rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  card: {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)",
    borderRadius: "22px",
    padding: "40px",
    maxWidth: "600px",
    width: "100%",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 30px 70px rgba(0,0,0,0.75)",
    textAlign: "center",
  },

  cardTitle: {
    fontSize: "1.8rem",
    marginBottom: "10px",
  },

  cardDesc: {
    color: "#9ca3af",
    fontSize: "1rem",
    marginBottom: "28px",
    lineHeight: 1.6,
  },

  input: {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(0,0,0,0.65)",
    color: "#fff",
    outline: "none",
    marginBottom: "22px",
  },

  button: {
    width: "100%",
    padding: "16px",
    fontSize: "1.05rem",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ffb703, #fb8500)",
    color: "#000",
    fontWeight: "800",
    letterSpacing: "0.6px",
    boxShadow: "0 0 30px rgba(251,133,0,0.7)",
  },

  storySection: {
    maxWidth: "900px",
    width: "100%",
    marginTop: "50px",
  },

  storyTitle: {
    marginBottom: "16px",
    fontSize: "1.4rem",
    letterSpacing: "0.5px",
  },

  storyBox: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(18px)",
    borderRadius: "22px",
    padding: "32px",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 35px 80px rgba(0,0,0,0.85)",
  },

  storyText: {
    whiteSpace: "pre-wrap",
    fontFamily: "Georgia, serif",
    fontSize: "17px",
    lineHeight: "1.85",
  },

  footer: {
    marginTop: "60px",
    fontSize: "0.8rem",
    color: "#9ca3af",
    textAlign: "center",
  },
};

export default App;
