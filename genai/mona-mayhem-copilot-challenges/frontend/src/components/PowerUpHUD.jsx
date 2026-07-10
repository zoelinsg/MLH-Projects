export default function PowerUpHUD({ activeEffects, playerStats }) {
  return (
    <section className="hud-panel">
      <h2>Active Power-Ups</h2>
      <div className="hud-list">
        {activeEffects.length === 0 ? (
          <div className="hud-empty">No active buffs</div>
        ) : (
          activeEffects.map((effect) => {
            const remaining = Math.max(0, Math.round((effect.expiresAt - Date.now()) / 1000))
            return (
              <div className="hud-item" key={effect.id}>
                <span>{effect.type.label}</span>
                <span>{remaining}s</span>
              </div>
            )
          })
        )}
      </div>
      <div className="hud-status">
        <div>Health: {playerStats.currentHealth}/{playerStats.baseHealth}</div>
        <div>Speed: {playerStats.currentSpeed}</div>
        <div>Damage: {playerStats.currentDamage}</div>
      </div>
    </section>
  )
}
