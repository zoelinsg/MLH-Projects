import { useEffect, useState } from 'react'

const STORAGE_KEY = 'mona-mayhem-match-history'

const sampleHistory = () => [
  {
    id: 'seed-1',
    result: 'win',
    timestamp: new Date(Date.now() - 36_000_000).toISOString(),
  },
  {
    id: 'seed-2',
    result: 'loss',
    timestamp: new Date(Date.now() - 27_000_000).toISOString(),
  },
  {
    id: 'seed-3',
    result: 'win',
    timestamp: new Date(Date.now() - 16_000_000).toISOString(),
  },
]

export function useMatchHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : sampleHistory()
    } catch (error) {
      return sampleHistory()
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const addResult = (result) => {
    const nextMatch = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      result,
      timestamp: new Date().toISOString(),
    }

    setHistory((current) => [nextMatch, ...current])
  }

  const clearHistory = () => {
    setHistory([])
  }

  return { history, addResult, clearHistory }
}
