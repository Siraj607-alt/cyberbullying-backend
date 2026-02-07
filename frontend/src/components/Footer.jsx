import { useEffect, useRef } from "react";
import "./Footer.css";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footerRef.current.classList.add("visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-content">
        <h3>CyberSafe AI</h3>
        <p>
          An AI-powered cyberbullying detection system using Machine Learning
          and NLP to encourage healthy online conversations.
        </p>

        <span className="footer-copy">
          © {new Date().getFullYear()} CyberSafe AI. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
