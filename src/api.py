from fastapi import FastAPI
from pydantic import BaseModel
from src.predict import hybrid_predict

# -----------------------------
# Initialize FastAPI app
# -----------------------------
app = FastAPI(
    title="Cyberbullying Detection API",
    description="Industry-style ML API for cyberbullying detection",
    version="1.0.0"
)

# -----------------------------
# Request schema
# -----------------------------
class TextInput(BaseModel):
    text: str

# -----------------------------
# Response schema
# -----------------------------
class PredictionOutput(BaseModel):
    label: str
    confidence: float

# -----------------------------
# Root endpoint (health check)
# -----------------------------
@app.get("/")
def health_check():
    return {"status": "API is running"}

# -----------------------------
# Prediction endpoint
# -----------------------------
@app.post("/predict", response_model=PredictionOutput)
def predict(input_data: TextInput):
    """
    Receives text and returns bullying prediction.
    Internal rules are hidden.
    """
    result = hybrid_predict(input_data.text)

    # Normalize confidence for frontend (hide rule-based certainty)
    confidence = result["confidence"]
    if confidence == 1.0:
        confidence = 0.70

    return {
        "label": result["label"],
        "confidence": round(confidence, 2)
    }
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
