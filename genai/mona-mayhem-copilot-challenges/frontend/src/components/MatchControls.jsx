export default function MatchControls({ isBattleActive, onStart, onEnd, onReset, onRecordWin, onRecordLoss }) {
  return (
    <section className="controls-panel">
      <h2>Arena Controls</h2>
      <div className="controls-row">
        <button className="btn btn-primary" type="button" onClick={onStart} disabled={isBattleActive}>
          Start Battle
        </button>
        <button className="btn btn-secondary" type="button" onClick={onEnd} disabled={!isBattleActive}>
          End Battle
        </button>
      </div>
      <div className="controls-row">
        <button className="btn btn-primary" type="button" onClick={onRecordWin}>
          Record Victory
        </button>
        <button className="btn btn-secondary" type="button" onClick={onRecordLoss}>
          Record Defeat
        </button>
      </div>
      <button className="btn btn-tertiary" type="button" onClick={onReset}>
        Reset Match
      </button>
    </section>
  )
}
