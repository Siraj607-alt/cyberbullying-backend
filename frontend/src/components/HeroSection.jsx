import "./HeroSection.css";
import heroImage from "../assets/cyberbullying.svg";

export default function HeroSection() {
  return (
    <section className="hero-container">
      <div className="hero-content">

        {/* LEFT: SVG / Illustration */}
        <div className="hero-image">
          <img src={heroImage} alt="Cyberbullying detection illustration" />
        </div>

        {/* RIGHT: TEXT CONTENT */}
        <div className="hero-text">
          <h1>Detect Cyberbullying Before It Causes Harm</h1>

          <p className="hero-description">
            An <strong>AI-powered cyberbullying detection system</strong> that
            uses <strong>Machine Learning</strong> and{" "}
            <strong>Natural Language Processing (NLP)</strong> to identify
            abusive, toxic, and harmful language in online text.
          </p>

          <p className="hero-subtext">
            Built to support safer digital platforms by enabling early content
            moderation and protecting users from online harassment.
          </p>

          <button
         className="hero-btn"
         onClick={() => {
         document
        .getElementById("test-model")
        ?.scrollIntoView({ behavior: "smooth" });
         }}
>
  Explore the System
</button>

        </div>

      </div>
    </section>
  );
}
