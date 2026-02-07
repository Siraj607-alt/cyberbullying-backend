export default function ResultCard({ result }) {
    const { label, confidence } = result;
  
    return (
      <div className="result-card">
        <h3>Analysis Result</h3>
        <p>
          <strong>Status:</strong> {label}
        </p>
        <p>
          <strong>Confidence:</strong> {(confidence * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  