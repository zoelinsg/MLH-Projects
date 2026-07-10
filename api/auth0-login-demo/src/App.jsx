import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

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
        {!isAuthenticated ? (
          <>
            <p className="badge">Auth0 + React Demo</p>
            <h1>Auth0 Login Flow</h1>
            <p className="subtitle">
              A simple demo for signup, login, and logout using Auth0.
            </p>

            {error && <p className="error">Error: {error.message}</p>}

            <div className="actions">
              <button className="primary-btn" onClick={signup}>
                Sign Up
              </button>
              <button className="secondary-btn" onClick={login}>
                Log In
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="badge">Logged In</p>
            <h1>Welcome back</h1>
            <p className="subtitle">You have successfully authenticated with Auth0.</p>

            <div className="profile-card">
              {user?.picture && (
                <img className="avatar" src={user.picture} alt={user.name} />
              )}
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>

            <button className="primary-btn" onClick={logout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;