import { useState } from "react";
import axios from "axios";
import "./App.css";

const USERS = {
  alice: {
    user_id: "alice",
    user_role: "manager",
    user_department: "hr",
    label: "Alice (Manager, HR)",
  },
  bob: {
    user_id: "bob",
    user_role: "employee",
    user_department: "engineering",
    label: "Bob (Employee, Engineering)",
  },
};

function App() {
  const [selectedUser, setSelectedUser] = useState("alice");
  const [question, setQuestion] = useState("What is the salary policy?");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const user = USERS[selectedUser];

      const response = await axios.post("http://127.0.0.1:8000/chat", {
        question,
        user_id: user.user_id,
        user_role: user.user_role,
        user_department: user.user_department,
      });

      setResult(response.data);
    } catch (err) {
      setError("Failed to fetch response from backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <p className="badge">Privacy-Aware RAG Bot</p>
        <h1>Auth0 FGA RAG Demo</h1>
        <p className="subtitle">
          Demo document-level authorization for RAG retrieval.
        </p>

        <label className="label">Test User</label>
        <select
          className="input"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="alice">{USERS.alice.label}</option>
          <option value="bob">{USERS.bob.label}</option>
        </select>

        <label className="label">Question</label>
        <textarea
          className="textarea"
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button className="primary-btn" onClick={handleAsk} disabled={loading}>
          {loading ? "Checking access..." : "Ask"}
        </button>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h2>Answer</h2>
            <p className="answer">{result.answer}</p>

            <div className="grid">
              <div className="panel">
                <h3>Retrieved</h3>
                <ul>
                  {result.retrieved_documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div className="panel">
                <h3>Authorized</h3>
                <ul>
                  {result.authorized_documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div className="panel">
                <h3>Denied</h3>
                <ul>
                  {result.denied_documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;