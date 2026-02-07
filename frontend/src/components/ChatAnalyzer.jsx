import { useState } from "react";
import "./ChatAnalyzer.css";

export default function ChatAnalyzer() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const messageId = Date.now();
  
    const userMessage = {
      id: messageId,
      type: "user",
      text: input,
      healthy: false, // default
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage.text }),
      });
  
      const data = await response.json();
      console.log("ML Response:", data);
  
      if (data.label === "Bullying") {
        // remove bullying message
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== messageId)
        );
  
        // add system warning
        setMessages((prev) => [
          ...prev,
          {
            type: "system",
            text: "⚠️ Bullying detected. Message removed. Please behave properly.",
          },
        ]);
      } else if (data.label === "Not Bullying") {
        // mark message as healthy
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, healthy: true }
              : msg
          )
        );
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          text: "⚠️ Unable to analyze message. Try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="chat-analyzer" id="test-model">
      <div className="chat-card">
        <div className="chat-header">
          <h3>Test Our ML Model</h3>
          <span className="status-dot">● Online</span>
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
            key={msg.id}
            className={`chat-message-wrapper ${msg.type}`}
          >
            {msg.healthy && (
              <span className="healthy-indicator"></span>
            )}
          
            <div className="chat-message-bubble">
              {msg.text}
            </div>
          </div>
          
          
          ))}

          {loading && (
            <div className="chat-message system">
              Analyzing message...
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
