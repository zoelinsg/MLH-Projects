import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
    error,
    getAccessTokenSilently,
  } = useAuth0();

  const [preferences, setPreferences] = useState(null);
  const [assistantReply, setAssistantReply] = useState(null);
  const [apiError, setApiError] = useState("");
  const [loadingPreferences, setLoadingPreferences] = useState(false);
  const [loadingAssistant, setLoadingAssistant] = useState(false);

  const fetchPreferences = async () => {
    try {
      setLoadingPreferences(true);
      setApiError("");

      const token = await getAccessTokenSilently();

      const response = await axios.get(
        "http://127.0.0.1:8000/api/preferences/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPreferences(response.data);
    } catch (err) {
      console.error("API error:", err);
      console.error("API response:", err?.response?.data);
      setApiError(
        err?.response?.data?.detail ||
          "Failed to fetch user preferences from the API."
      );
    } finally {
      setLoadingPreferences(false);
    }
  };

  const askAssistant = async () => {
    try {
      setLoadingAssistant(true);
      setApiError("");
      setAssistantReply(null);

      const token = await getAccessTokenSilently();

      const response = await axios.post(
        "http://127.0.0.1:8000/api/assistant/chat",
        {
          message: "What's the weather today?",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssistantReply(response.data);

      // 一起同步更新 preferences，確保畫面上永遠保留偏好設定
      if (response.data?.preferences) {
        setPreferences({
          user: response.data.user,
          preferences: response.data.preferences,
        });
      }
    } catch (err) {
      console.error("Assistant API error:", err);
      console.error("Assistant API response:", err?.response?.data);
      setApiError(
        err?.response?.data?.detail ||
          "Failed to fetch assistant response from the API."
      );
    } finally {
      setLoadingAssistant(false);
    }
  };

  if (isLoading) {
    return (
      <div className="page">
        <div className="card">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <p className="badge">Context-Preserving Assistant</p>
        <h1>Context-Preserving Assistant</h1>
        <p className="subtitle">
          Sign in to preserve user identity across first-party and third-party
          API calls.
        </p>

        {error && <p className="error">Error: {error.message}</p>}
        {apiError && <p className="error">{apiError}</p>}

        {!isAuthenticated ? (
          <div className="actions">
            <button className="primary-btn" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          </div>
        ) : (
          <>
            <div className="profile-card">
              {user?.picture && (
                <img className="avatar" src={user.picture} alt={user.name} />
              )}
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            <div className="actions">
              <button className="primary-btn" onClick={fetchPreferences}>
                {loadingPreferences ? "Loading..." : "Load My Preferences"}
              </button>
              <button className="primary-btn" onClick={askAssistant}>
                {loadingAssistant ? "Loading..." : "Ask Assistant"}
              </button>
              <button
                className="secondary-btn"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            </div>

            {preferences && (
              <div className="profile-card" style={{ marginTop: "20px" }}>
                <p>
                  <strong>Saved Preferences</strong>
                </p>
                <p>
                  <strong>Preferred City:</strong>{" "}
                  {preferences.preferences.preferred_city}
                </p>
                <p>
                  <strong>Temperature Unit:</strong>{" "}
                  {preferences.preferences.temperature_unit}
                </p>
              </div>
            )}

            {assistantReply && (
              <div className="profile-card" style={{ marginTop: "20px" }}>
                <p>
                  <strong>Assistant Reply</strong>
                </p>
                <p>{assistantReply.answer}</p>
                <p>
                  <strong>Weather City:</strong> {assistantReply.weather.city}
                </p>
                <p>
                  <strong>Temperature:</strong>{" "}
                  {assistantReply.weather.temperature}°C
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;