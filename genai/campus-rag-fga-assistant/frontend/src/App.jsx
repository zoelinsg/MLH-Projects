import { useState } from 'react';
import './App.css';

function App() {
  const [role, setRole] = useState('student');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      setError('');
      setSearched(false);

      if (!query.trim()) {
        throw new Error('Please enter a search query');
      }

      const response = await fetch(
        `http://127.0.0.1:8000/search?q=${encodeURIComponent(query)}&role=${encodeURIComponent(role)}`
      );

      if (!response.ok) {
        throw new Error('Failed to search documents');
      }

      const data = await response.json();
      setResults(data.results);
      setTotalResults(data.total_results);
      setSearched(true);
    } catch (err) {
      setError(err.message);
      setResults([]);
      setTotalResults(0);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <h1>Campus RAG FGA Assistant</h1>
        <p className="subtitle">
          A role-aware document search demo that filters results before retrieval.
        </p>

        <div className="panel">
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">student</option>
            <option value="professor">professor</option>
            <option value="admin">admin</option>
          </select>

          <label htmlFor="query">Search Query</label>
          <input
            id="query"
            type="text"
            placeholder="Try budget, payroll, policy..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="panel">
          <h2>Search Context</h2>
          <p><strong>Current Role:</strong> {role}</p>
          <p><strong>Total Results:</strong> {totalResults}</p>
        </div>

        {error && <p className="error-text">{error}</p>}

        {searched && (
          <div className="panel">
            <h2>Results</h2>

            {results.length === 0 ? (
              <p>No accessible documents found for this role and query.</p>
            ) : (
              <div className="results-list">
                {results.map((doc) => (
                  <div key={doc.id} className="result-card">
                    <h3>{doc.title}</h3>
                    <p>{doc.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;