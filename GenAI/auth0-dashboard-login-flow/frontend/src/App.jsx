import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="app-shell">
        <div className="dashboard-card loading-card">
          <h2>Loading...</h2>
          <p>Checking your authentication status.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="dashboard-card">
        <header className="hero">
          <h1>Auth0 Dashboard Login Flow</h1>
          <p>
            A simple React application that demonstrates authentication with
            Auth0 Universal Login.
          </p>
        </header>

        {!isAuthenticated ? (
          <section className="auth-section">
            <div className="info-box">
              <h2>Welcome</h2>
              <p>Log in to view your authenticated user profile.</p>
            </div>

            <button
              className="primary-button"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          </section>
        ) : (
          <section className="profile-section">
            <div className="profile-header">
              <img
                src={user?.picture}
                alt={user?.name || 'User avatar'}
                className="avatar"
              />
              <h2>{user?.name}</h2>
              <p className="email">{user?.email}</p>
            </div>

            <div className="status-card">
              <h3>Authentication Status</h3>
              <p>Status: Logged In</p>
              <p>Provider: Auth0 Universal Login</p>
            </div>

            <div className="action-row">
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
          </section>
        )}
      </div>
    </div>
  );
}

export default App;