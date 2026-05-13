import { useCallback } from 'react'

export function useBattleReset(resetPowerUps, clearEffects, stopBattle) {
  return useCallback(() => {
    resetPowerUps()
    clearEffects()
    if (typeof stopBattle === 'function') {
      stopBattle()
    }
  }, [resetPowerUps, clearEffects, stopBattle])
}
