import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  const [city, setCity] = useState('');
  const [preferences, setPreferences] = useState(null);
  const [travelAdvice, setTravelAdvice] = useState(null);
  const [error, setError] = useState('');
  const [adviceError, setAdviceError] = useState('');

  const loadPreferences = async () => {
    try {
      setError('');
      const response = await fetch('http://localhost:8080/api/preferences');
      if (!response.ok) {
        throw new Error('Failed to load preferences');
      }
      const data = await response.json();
      setPreferences(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getTravelAdvice = async () => {
    try {
      setAdviceError('');
      setTravelAdvice(null);

      if (!city.trim()) {
        throw new Error('Please enter a destination city');
      }

      const response = await fetch(
        `http://localhost:8080/api/travel-advice?city=${encodeURIComponent(city)}`
      );

      if (!response.ok) {
        throw new Error('Failed to get travel advice');
      }

      const data = await response.json();
      setTravelAdvice(data);
    } catch (err) {
      setAdviceError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="app-shell">
        <div className="assistant-card">
          <h1>Travel Context Assistant</h1>
          <p>Loading authentication state...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="assistant-card">
        <h1>Travel Context Assistant</h1>
        <p className="subtitle">
          A full-stack assistant that uses authenticated user context and travel preferences.
        </p>

        {!isAuthenticated ? (
          <div className="auth-section">
            <div className="panel">
              <h2>Welcome</h2>
              <p>Log in to access your travel preferences and personalized suggestions.</p>
            </div>

            <button className="primary-button" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          </div>
        ) : (
          <div className="content-section">
            <div className="user-card">
              <img src={user?.picture} alt={user?.name || 'User avatar'} className="avatar" />
              <div className="user-info">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="form-card">
              <label htmlFor="city">Destination City</label>
              <input
                id="city"
                type="text"
                placeholder="Enter a city, e.g. Tokyo"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <div className="button-row">
                <button className="primary-button" onClick={loadPreferences}>
                  Load Preferences
                </button>

                <button className="primary-button" onClick={getTravelAdvice}>
                  Get Travel Suggestion
                </button>

                <button
                  className="secondary-button"
                  onClick={() =>
                    logout({
                      logoutParams: {
                        returnTo: window.location.origin,
                      },
                    })
                  }
                >
                  Log Out
                </button>
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}

            {preferences && (
              <div className="panel">
                <h3>User Travel Preferences</h3>
                <p><strong>Preferred Destination Type:</strong> {preferences.preferredDestinationType}</p>
                <p><strong>Temperature Unit:</strong> {preferences.temperatureUnit}</p>
                <p><strong>Home City:</strong> {preferences.homeCity}</p>
                <p><strong>Travel Style:</strong> {preferences.travelStyle}</p>
              </div>
            )}

            {adviceError && <p className="error-text">{adviceError}</p>}

            {travelAdvice && (
              <div className="panel">
                <h3>Travel Suggestion</h3>
                <p><strong>City:</strong> {travelAdvice.city}</p>
                <p><strong>Weather:</strong> {travelAdvice.weatherSummary}</p>
                <p><strong>Advice:</strong> {travelAdvice.message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;