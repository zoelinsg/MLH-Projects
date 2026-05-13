import { useState } from 'react'
import { useBattleReset } from '../hooks/useBattleReset'
import { usePowerUpManager } from '../hooks/usePowerUpManager'
import { usePlayerEffects } from '../hooks/usePlayerEffects'
import PowerUpDrop from './PowerUpDrop'
import PowerUpHUD from './PowerUpHUD'
import PlayerStatus from './PlayerStatus'
import MatchControls from './MatchControls'

export default function BattleArena() {
  const [isBattleActive, setIsBattleActive] = useState(false)
  const { activePowerUps, removePowerUp, resetPowerUps } = usePowerUpManager(isBattleActive)
  const { playerStats, activeEffects, applyPowerUp, clearEffects } = usePlayerEffects()
  const resetBattle = useBattleReset(resetPowerUps, clearEffects, () => setIsBattleActive(false))

  const handleStart = () => {
    resetPowerUps()
    clearEffects()
    setIsBattleActive(true)
  }

  const handleEnd = () => {
    setIsBattleActive(false)
  }

  const handleCollect = (id) => {
    const pickedPowerUp = activePowerUps.find((item) => item.id === id)
    if (!pickedPowerUp) {
      return
    }

    removePowerUp(id)
    applyPowerUp(pickedPowerUp)
  }

  return (
    <main className="app-shell">
      <section className="battle-container">
        <div className="battle-heading">
          <div>
            <p className="subtext">Mona Mayhem Arena</p>
            <h1>Power-Up Drop Manager</h1>
          </div>
          <div className="battle-tag">{isBattleActive ? 'Battle Active' : 'Standby'}</div>
        </div>

        <div className="arena-grid">
          <section className="arena-panel">
            <div className="panel-header">
              <h2>Battlefield</h2>
              <span>{activePowerUps.length} drops live</span>
            </div>
            <div className="powerup-pool">
              {activePowerUps.length === 0 ? (
                <div className="powerup-empty">Waiting for the next random drop...</div>
              ) : (
                activePowerUps.map((powerUp) => (
                  <PowerUpDrop key={powerUp.id} powerUp={powerUp} onCollect={handleCollect} />
                ))
              )}
            </div>
          </section>

          <aside className="side-panel">
            <PlayerStatus playerStats={playerStats} />
            <PowerUpHUD activeEffects={activeEffects} playerStats={playerStats} />
            <MatchControls
              isBattleActive={isBattleActive}
              onStart={handleStart}
              onEnd={handleEnd}
              onReset={resetBattle}
            />
          </aside>
        </div>
      </section>
    </main>
  )
}
