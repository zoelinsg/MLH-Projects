import { useState } from "react";

export default function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateJoke = async () => {
    try {
      setLoading(true);
      setError("");
      setJoke("");
      setHasGenerated(true);

      const response = await fetch(
        "https://v2.jokeapi.dev/joke/Any?safe-mode&type=single"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || "API error");
      }

      setJoke(data.joke);
    } catch {
      setError("Could not load a bad joke right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="hero-card">
        <h1>Bad Joke Machine</h1>

        <button
          className="primary-btn"
          onClick={generateJoke}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Bad Joke"}
        </button>

        {hasGenerated && (
          <div className="joke-panel">
            {loading && <p className="placeholder">Loading your bad joke...</p>}

            {!loading && error && <p className="error-text">{error}</p>}

            {!loading && !error && joke && (
              <>
                <p className="panel-label">Today’s joke</p>
                <p className="joke-text">{joke}</p>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}