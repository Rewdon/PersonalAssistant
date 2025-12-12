// src/App.jsx
import { useState } from 'react';

function App() {
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAi = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: "Opowiedz krótki żart programistyczny." })
      });
      
      const data = await response.json();
      setAiResponse(data.answer || data.error);
    } catch (err) {
      setAiResponse("Błąd połączenia: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Personal Assistant - System Test</h1>
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={askAi} disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? "Myślę..." : "Testuj Gemini AI"}
        </button>
      </div>

      {aiResponse && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '5px' }}>
          <strong>Odpowiedź AI:</strong>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;