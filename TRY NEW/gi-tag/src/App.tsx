import React from "react";

const App: React.FC = () => {
  return (
    <>
      <style>
        {`
          html, body, #root {
            height: 100%;
            width: 100%;
            margin: 0;
          }

          :root {
            --orange: #fb923c;
            --green: #22c55e;
            --blue: #3b82f6;
            --dark: #0f172a;
            --card: rgba(255, 255, 255, 0.08);
            --border: rgba(255, 255, 255, 0.15);
            --text-light: #e5e7eb;
            --text-muted: #9ca3af;
          }

          * {
            box-sizing: border-box;
          }

          body {
            font-family: "Segoe UI", Roboto, Arial, sans-serif;
            background: radial-gradient(circle at top, #020617, #000000);
            color: var(--text-light);
          }

          /* FULL SCREEN CENTER */
          .screen {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .wrapper {
            text-align: center;
            width: 100%;
            max-width: 820px;
            padding: 24px;
          }

          h1 {
            font-size: 3rem;
            margin-bottom: 12px;
            letter-spacing: 1px;
          }

          p {
            color: var(--text-muted);
            font-size: 1.15rem;
            margin-bottom: 36px;
            line-height: 1.6;
          }

          .card {
            background: var(--card);
            padding: 40px;
            border-radius: 24px;
            backdrop-filter: blur(18px);
            border: 1px solid var(--border);
            box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          }

          .card h2 {
            margin-bottom: 32px;
            font-size: 1.6rem;
          }

          .buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 26px;
          }

          .btn {
            padding: 22px 18px;
            font-size: 1.15rem;
            border-radius: 18px;
            border: none;
            color: #fff;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            letter-spacing: 0.5px;
          }

          .btn:hover {
            transform: translateY(-6px) scale(1.02);
          }

          .orange {
            background: linear-gradient(135deg, #fb923c, #f97316);
            box-shadow: 0 0 0 transparent;
          }
          .orange:hover {
            box-shadow: 0 0 30px rgba(251, 146, 60, 0.7);
          }

          .green {
            background: linear-gradient(135deg, #22c55e, #16a34a);
          }
          .green:hover {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.7);
          }

          .blue {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
          }
          .blue:hover {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.7);
          }

          .dark {
            background: linear-gradient(135deg, #1e293b, #020617);
            border: 1px solid var(--border);
          }
          .dark:hover {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.15);
          }

          footer {
            margin-top: 36px;
            font-size: 0.85rem;
            color: var(--text-muted);
          }

          @media (max-width: 600px) {
            h1 {
              font-size: 2.3rem;
            }
          }
        `}
      </style>

      <div className="screen">
        <div className="wrapper">
          <h1>Geographical Indication (GI) Tag</h1>
          <p>
            Protecting India’s unique products by linking them to their
            geographical origin and cultural heritage.
          </p>

          <div className="card">
            <h2>What would you like to do?</h2>

            <div className="buttons">
              <button
                className="btn orange"
                onClick={() => {
                  window.location.href = "http://localhost:5002";
                }}
              >
                Story Teller
              </button>

              <button
                className="btn green"
                onClick={() => {
                  window.location.href = "http://localhost:5003";
                }}
              >
                Image Recognizer
              </button>

              <button
                className="btn blue"
                onClick={() => {
                  window.location.href = "http://localhost:5004";
                }}
              >
                GI Chatbot
              </button>

              <button className="btn dark">Link to Apply</button>
            </div>
          </div>

          <footer>
            © 2026 GI Tag Information System | Academic Project
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
