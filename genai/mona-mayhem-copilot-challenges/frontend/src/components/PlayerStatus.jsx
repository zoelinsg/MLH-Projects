export default function PlayerStatus({ playerStats }) {
  return (
    <section className="status-panel">
      <h2>Player Status</h2>
      <div className="status-grid">
        <div className="status-card">
          <span>Health</span>
          <strong>{playerStats.currentHealth}</strong>
        </div>
        <div className="status-card">
          <span>Speed</span>
          <strong>{playerStats.currentSpeed}</strong>
        </div>
        <div className="status-card">
          <span>Damage</span>
          <strong>{playerStats.currentDamage}</strong>
        </div>
      </div>
    </section>
  )
}
