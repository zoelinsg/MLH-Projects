import { useState } from 'react';
import './App.css';

function App() {
  const [issues, setIssues] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  const [error, setError] = useState('');

  const loadIssues = async () => {
    try {
      setError('');

      const response = await fetch('http://127.0.0.1:8000/issues');
      if (!response.ok) {
        throw new Error('Failed to load issues');
      }

      const data = await response.json();
      setIssues(data.issues);
    } catch (err) {
      setError(err.message);
    }
  };

  const requestCloseIssue = async (issueId) => {
    try {
      setError('');
      setResultMessage('');

      const response = await fetch('http://127.0.0.1:8000/request-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'close_issue',
          target: issueId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to request action');
      }

      const data = await response.json();
      setPendingRequest(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApproval = async (approved) => {
    try {
      if (!pendingRequest) return;

      setError('');

      const response = await fetch('http://127.0.0.1:8000/approve-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: pendingRequest.request_id,
          approved,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit approval');
      }

      const data = await response.json();
      setResultMessage(data.message);
      setPendingRequest(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <h1>GitHub Veto Agent</h1>
        <p className="subtitle">
          A demo agent that requires approval before executing sensitive GitHub actions.
        </p>

        {error && <p className="error-text">{error}</p>}

        <div className="panel">
          <div className="panel-header">
            <h2>Open Issues</h2>
            <button onClick={loadIssues}>Refresh</button>
          </div>

          {issues.length === 0 ? (
            <p>No issues found. Click Refresh to load issues.</p>
          ) : (
            <div className="issue-list">
              {issues.map((issue) => (
                <div key={issue.id} className="issue-card">
                  <div>
                    <h3>{issue.title}</h3>
                    <p>
                      {issue.id} · {issue.status}
                    </p>
                  </div>
                  <button onClick={() => requestCloseIssue(issue.id)}>
                    Request Close
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {pendingRequest && (
          <div className="panel">
            <h2>Approval Required</h2>
            <p>{pendingRequest.message}</p>
            <div className="button-row">
              <button onClick={() => handleApproval(true)}>Approve</button>
              <button className="secondary-button" onClick={() => handleApproval(false)}>
                Reject
              </button>
            </div>
          </div>
        )}

        {resultMessage && (
          <div className="panel">
            <h2>Result</h2>
            <p>{resultMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;