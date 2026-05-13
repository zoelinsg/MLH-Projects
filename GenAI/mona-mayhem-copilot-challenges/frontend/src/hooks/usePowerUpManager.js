import { useCallback, useEffect, useRef, useState } from 'react'
import { createPowerUpDrop, getRandomInterval } from '../game/powerUps'

const MAX_ACTIVE_DROPS = 3

export function usePowerUpManager(isBattleActive) {
  const [activePowerUps, setActivePowerUps] = useState([])
  const spawnTimer = useRef(null)

  const clearSpawn = useCallback(() => {
    if (spawnTimer.current) {
      clearTimeout(spawnTimer.current)
      spawnTimer.current = null
    }
  }, [])

  const spawnPowerUp = useCallback(() => {
    setActivePowerUps((current) => {
      if (current.length >= MAX_ACTIVE_DROPS) {
        return current
      }
      return [...current, createPowerUpDrop()]
    })
  }, [])

  const removePowerUp = useCallback((id) => {
    setActivePowerUps((current) => current.filter((powerUp) => powerUp.id !== id))
  }, [])

  const resetPowerUps = useCallback(() => {
    clearSpawn()
    setActivePowerUps([])
  }, [clearSpawn])

  useEffect(() => {
    if (!isBattleActive) {
      resetPowerUps()
      return undefined
    }

    const scheduleNext = () => {
      clearSpawn()
      spawnTimer.current = window.setTimeout(() => {
        spawnPowerUp()
        scheduleNext()
      }, getRandomInterval())
    }

    scheduleNext()
    return clearSpawn
  }, [isBattleActive, resetPowerUps, spawnPowerUp, clearSpawn])

  useEffect(() => {
    return () => clearSpawn()
  }, [clearSpawn])

  return { activePowerUps, removePowerUp, resetPowerUps }
}
