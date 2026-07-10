import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("alice");
  const [command, setCommand] = useState("list_repos");
  const [repoName, setRepoName] = useState("mlh-projects");
  const [issueNumber, setIssueNumber] = useState(12);
  const [result, setResult] = useState(null);
  const [actionId, setActionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/command", {
        user_id: userId,
        command,
        repo_name: repoName,
        issue_number: Number(issueNumber),
      });

      setResult(response.data);

      if (response.data.action_id) {
        setActionId(response.data.action_id);
      }
    } catch (error) {
      console.error(error);
      setResult({
        status: "error",
        message: "Failed to execute command.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!actionId) return;

    const response = await axios.post("http://127.0.0.1:8000/approve", {
      action_id: actionId,
    });

    setResult(response.data);
  };

  const handleDeny = async () => {
    if (!actionId) return;

    const response = await axios.post("http://127.0.0.1:8000/deny", {
      action_id: actionId,
    });

    setResult(response.data);
  };

  return (
    <div className="page">
      <div className="card">
        <p className="badge">Token Vault & Async Authorization Demo</p>
        <h1>The Veto Agent</h1>
        <p className="subtitle">
          A simple AI-agent style interface with approval gating for sensitive actions.
        </p>

        <label className="label">User</label>
        <select
          className="input"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="alice">alice</option>
          <option value="bob">bob</option>
        </select>

        <label className="label">Command</label>
        <select
          className="input"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        >
          <option value="list_repos">List Repositories</option>
          <option value="list_issues">List Issues</option>
          <option value="close_issue">Close Issue (Sensitive)</option>
        </select>

        <label className="label">Repository</label>
        <input
          className="input"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />

        <label className="label">Issue Number</label>
        <input
          className="input"
          type="number"
          value={issueNumber}
          onChange={(e) => setIssueNumber(e.target.value)}
        />

        <button className="primary-btn" onClick={handleRun} disabled={loading}>
          {loading ? "Running..." : "Run Command"}
        </button>

        {result && (
          <div className="result">
            <h2>Status</h2>
            <p className="status">{result.status}</p>

            <h2>Message</h2>
            <p className="answer">{result.message}</p>

            {result.data && (
              <>
                <h2>Data</h2>
                <ul className="panel-list">
                  {result.data.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {result.status === "approval_required" && (
              <div className="actions">
                <button className="primary-btn" onClick={handleApprove}>
                  Approve
                </button>
                <button className="secondary-btn" onClick={handleDeny}>
                  Deny
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;