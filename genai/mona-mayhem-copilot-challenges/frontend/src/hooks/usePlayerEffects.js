import { useCallback, useEffect, useMemo, useState } from 'react'

const BASE_PLAYER_STATS = {
  baseHealth: 100,
  baseSpeed: 100,
  baseDamage: 20,
}

export function usePlayerEffects() {
  const [activeEffects, setActiveEffects] = useState([])
  const [currentHealth, setCurrentHealth] = useState(BASE_PLAYER_STATS.baseHealth)

  const applyPowerUp = useCallback((powerUp) => {
    if (powerUp.type.id === 'health') {
      setCurrentHealth((current) => Math.min(BASE_PLAYER_STATS.baseHealth, current + powerUp.type.effect.amount))
      return
    }

    const now = Date.now()
    const newEffect = {
      id: `${powerUp.id}-${now}`,
      type: powerUp.type,
      startTime: now,
      expiresAt: now + powerUp.type.duration,
    }

    setActiveEffects((current) => [
      ...current.filter((item) => item.type.id !== powerUp.type.id),
      newEffect,
    ])
  }, [])

  const clearEffects = useCallback(() => {
    setActiveEffects([])
    setCurrentHealth(BASE_PLAYER_STATS.baseHealth)
  }, [])

  useEffect(() => {
    if (activeEffects.length === 0) {
      return undefined
    }

    const interval = window.setInterval(() => {
      const now = Date.now()
      setActiveEffects((current) => current.filter((effect) => effect.expiresAt > now))
    }, 250)

    return () => window.clearInterval(interval)
  }, [activeEffects.length])

  const currentSpeed = useMemo(() => {
    return activeEffects.reduce((speed, effect) => {
      if (effect.type.effect.stat === 'speed') {
        return Math.round(speed * effect.type.effect.amount)
      }
      return speed
    }, BASE_PLAYER_STATS.baseSpeed)
  }, [activeEffects])

  const currentDamage = useMemo(() => {
    return activeEffects.reduce((damage, effect) => {
      if (effect.type.effect.stat === 'damage') {
        return Math.round(damage * effect.type.effect.amount)
      }
      return damage
    }, BASE_PLAYER_STATS.baseDamage)
  }, [activeEffects])

  return {
    playerStats: {
      baseHealth: BASE_PLAYER_STATS.baseHealth,
      currentHealth,
      currentSpeed,
      currentDamage,
    },
    activeEffects,
    applyPowerUp,
    clearEffects,
  }
}
