export const POWER_UP_TYPES = [
  {
    id: 'health',
    label: 'Health Boost',
    effect: { stat: 'health', amount: 35 },
    duration: 0,
    color: '#22d3ee',
    description: 'Restore health immediately',
  },
  {
    id: 'speed',
    label: 'Speed Boost',
    effect: { stat: 'speed', amount: 1.25 },
    duration: 9000,
    color: '#c084fc',
    description: 'Increase movement for 9 seconds',
  },
  {
    id: 'damage',
    label: 'Damage Boost',
    effect: { stat: 'damage', amount: 1.3 },
    duration: 9000,
    color: '#fb7185',
    description: 'Increase attack power for 9 seconds',
  },
]

export function getRandomPowerUpType() {
  const index = Math.floor(Math.random() * POWER_UP_TYPES.length)
  return POWER_UP_TYPES[index]
}

export function getRandomInterval() {
  return 3000 + Math.random() * 4000
}

export function createPowerUpDrop() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: getRandomPowerUpType(),
    x: Math.floor(12 + Math.random() * 76),
    y: Math.floor(14 + Math.random() * 72),
    spawnedAt: Date.now(),
  }
}
