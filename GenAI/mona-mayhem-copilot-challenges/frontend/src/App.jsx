import './App.css'

const scoreSummary = [
  { label: 'Damage Dealt', value: '18,420' },
  { label: 'K.O. Count', value: '3' },
  { label: 'Combos', value: '27x' },
  { label: 'Accuracy', value: '84%' },
]

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

function App() {
  return (
    <main className="app-shell">
      <div className="neon-grid">
        <section className="hero-panel">
          <div className="hero-tag">GAME OVER</div>
          <h1 className="hero-headline">Arena Protocol Terminated</h1>
          <p className="hero-subtitle">Mona Mayhem has fallen in the neon arena.</p>
        </section>

        <section className="result-panel">
          <div className="result-card result-card--defeat">
            <span className="result-label">MATCH RESULT</span>
            <h2>DEFEAT</h2>
            <p className="result-detail">Enemy AI dominated the arena this round.</p>
          </div>

          <div className="score-summary">
            <div className="summary-title">Score Summary</div>
            <div className="summary-grid">
              {scoreSummary.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          </div>
        </section>

        <section className="action-panel">
          <div className="action-card">
            <span className="status-chip">RANK: NOVA B‑</span>
            <p className="action-copy">
              Calibrate your loadout, then jump back into the arena to reclaim your neon legacy.
            </p>
            <div className="button-row">
              <button className="btn btn-primary" type="button">
                REPLAY
              </button>
              <button className="btn btn-secondary" type="button">
                RETURN TO ARENA
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
