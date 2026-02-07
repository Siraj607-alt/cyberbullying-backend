import "./HowItWorksSection.css";
import inputIcon from "../assets/input.svg";
import nlpIcon from "../assets/nlp.svg";
import modelIcon from "../assets/model.svg";
import resultIcon from "../assets/result.svg";

export default function HowItWorksSection() {
  return (
    <section className="howitworks-container">
      <div className="howitworks-content">

        <h2 className="howitworks-title">
          How the Cyberbullying Detection System Works
        </h2>

        <p className="howitworks-subtitle">
          A simple breakdown of how Machine Learning and NLP power real-time
          cyberbullying detection.
        </p>

        <div className="howitworks-steps">

          <div className="step-card">
            <img src={inputIcon} alt="Input text" />
            <h3>Input Text</h3>
            <p>
              A user submits a message, comment, or post for analysis.
            </p>
          </div>

          <div className="step-card">
            <img src={nlpIcon} alt="Text preprocessing" />
            <h3>Text Processing (NLP)</h3>
            <p>
              The text is cleaned, tokenized, and transformed into numerical
              features using NLP techniques.
            </p>
          </div>

          <div className="step-card">
            <img src={modelIcon} alt="ML model" />
            <h3>ML Classification</h3>
            <p>
              A trained Naive Bayes model analyzes the processed text to detect
              abusive patterns.
            </p>
          </div>

          <div className="step-card">
            <img src={resultIcon} alt="Prediction output" />
            <h3>Prediction Output</h3>
            <p>
              The system returns a clear result indicating cyberbullying or safe
              content.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
