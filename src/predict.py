import joblib
import re
import pandas as pd

# -----------------------------
# Text cleaning utility
# -----------------------------
def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# -----------------------------
# Load ML model
# -----------------------------
model = joblib.load("models/bullying_model.pkl")


# -----------------------------
# Load rule datasets
# -----------------------------
abuse_df = pd.read_csv("data/rules/abuse_phrases.csv")
safe_df = pd.read_csv("data/rules/safe_phrases.csv")

ABUSE_PHRASES = abuse_df["phrase"].str.lower().tolist()
SAFE_PHRASES = safe_df["phrase"].str.lower().tolist()


# -----------------------------
# Thresholds
# -----------------------------
HIGH_CONFIDENCE = 0.75   # ML confidence needed to auto-decide bullying


# -----------------------------
# Hybrid prediction logic
# -----------------------------
def hybrid_predict(text: str) -> dict:
    cleaned = clean_text(text)
    lower_text = cleaned.lower()

    # ---------------------------------
    # STRONG ABUSE – RULE BASED (highest priority)
    # ---------------------------------
    for phrase in ABUSE_PHRASES:
        if phrase in lower_text:
            return {
                "label": "Bullying",
                "source": "rule-based",
                "confidence": 1.00
            }

    # ---------------------------------
    # POSITIVE / SAFE CONTENT – RULE BASED
    # ---------------------------------
    for phrase in SAFE_PHRASES:
        if phrase in lower_text:
            return {
                "label": "Not Bullying",
                "source": "rule-based",
                "confidence": 1.00
            }

    # ---------------------------------
    # VERY SHORT NEUTRAL TEXT
    # ---------------------------------
    if len(cleaned.split()) <= 2:
        return {
            "label": "Not Bullying",
            "source": "rule-based",
            "confidence": 1.00
        }

    # ---------------------------------
    # ML MODEL DECISION
    # ---------------------------------
    probs = model.predict_proba([cleaned])[0]
    prediction = int(probs.argmax())
    confidence = float(probs[prediction])

    # ---------------------------------
    # Needs review ONLY if ML leans toward bullying
    # ---------------------------------
    if prediction == 1 and confidence < HIGH_CONFIDENCE:
        return {
            "label": "Needs Review",
            "source": "ml",
            "confidence": confidence
        }

    # ---------------------------------
    # Final ML Decision
    # ---------------------------------
    return {
        "label": "Bullying" if prediction == 1 else "Not Bullying",
        "source": "ml",
        "confidence": confidence
    }