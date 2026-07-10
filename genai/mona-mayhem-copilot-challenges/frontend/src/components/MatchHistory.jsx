export default function MatchHistory({ history, onClear }) {
  const winCount = history.filter((item) => item.result === 'win').length
  const lossCount = history.filter((item) => item.result === 'loss').length

  return (
    <section className="history-panel">
      <div className="history-header">
        <div>
          <p className="subtext">Match History</p>
          <h2>Recent Battles</h2>
        </div>
        <button className="btn btn-tertiary" type="button" onClick={onClear}>
          Clear History
        </button>
      </div>

      <div className="history-summary">
        <div className="history-summary-card history-summary-card--win">
          <span>Wins</span>
          <strong>{winCount}</strong>
        </div>
        <div className="history-summary-card history-summary-card--loss">
          <span>Losses</span>
          <strong>{lossCount}</strong>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="history-empty">No matches recorded yet.</div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div
              key={item.id}
              className={`history-row ${item.result === 'win' ? 'history-row--win' : 'history-row--loss'}`}
            >
              <span>{item.result === 'win' ? 'Victory' : 'Defeat'}</span>
              <span>{new Date(item.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
