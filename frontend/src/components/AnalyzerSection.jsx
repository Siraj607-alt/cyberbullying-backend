import { useState } from "react";
import ResultCard from "./ResultCard";
//import "./AnalyzerSection.css";

export default function AnalyzerSection() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const MAX_CHARS = 500;

  const analyzeText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: "Unable to analyze text. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="analyzer" id="analyzer">
      <div className="analyzer-card">
        <h2>Try Our ML Model</h2>
        <p className="analyzer-subtitle">
          Paste or type text to detect potential cyberbullying using
          Machine Learning & NLP.
        </p>

        <textarea
          placeholder="Type or paste text here..."
          value={text}
          maxLength={MAX_CHARS}
          disabled={loading}
          onChange={(e) => {
            setText(e.target.value);
            setResult(null);
          }}
        />

        <div className="analyzer-footer">
          <span className="char-count">
            {text.length} / {MAX_CHARS}
          </span>

          <button
            onClick={analyzeText}
            disabled={loading || !text.trim()}
          >
            {loading ? "Analyzing..." : "Analyze Text"}
          </button>
        </div>

        {result && <ResultCard result={result} />}
      </div>
    </section>
  );
}
