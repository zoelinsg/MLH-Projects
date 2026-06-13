/* ========================================
   MONA MAYHEM ARENA LAB - PLAYER STATE
   Player Stats and Active Power-Ups Management
   ======================================== */

/* ========== PLAYER STATS ========== */
/* Object to store all player statistics */
const playerStats = {
  // Health
  maxHealth: 100,
  currentHealth: 100,

  // Combat Stats (multipliers: 1.0 = normal, 2.0 = 2x)
  speed: 1.0,            // Movement speed multiplier
  damage: 1.0,           // Attack damage multiplier

  // Shield State
  shieldActive: false,
  shieldDurability: 0,   // How many hits shield can absorb

  // Power-Up Tracking
  lastPowerupCollected: null,
  totalPowerupsCollected: 0
};

/* ========== PLAYER ACTIVE POWER-UPS ========== */
/* Array to store power-ups currently affecting the player */
const playerActivePowerups = [];
/*
  Example structure of items in this array:
  {
    id: 'active_12345',
    definitionId: 'speedBoost',
    collectedTime: 1234567890,
    duration: 8000,
    expiresAt: 1234567890 + 8000,
    active: true,
    originalStats: { speed: 1.0, damage: 1.0 }
  }
*/

/* ========== UTILITY FUNCTIONS ========== */

/**
 * Check if player has an active power-up of specific type
 * @param {string} definitionId - The power-up type to check (e.g., 'speedBoost')
 * @returns {boolean} - True if player has this type active
 */
function playerHasActivePowerup(definitionId) {
  return playerActivePowerups.some(
    pu => pu.definitionId === definitionId && pu.active
  );
}

/**
 * Add a new active power-up to the player
 * @param {object} powerupInstance - The power-up to add
 */
function addActivePowerup(powerupInstance) {
  playerActivePowerups.push(powerupInstance);
  console.log(`Added active power-up: ${powerupInstance.definitionId}`);
}

/**
 * Remove a power-up from active list by ID
 * @param {string} powerupId - The ID of the power-up to remove
 */
function removeActivePowerup(powerupId) {
  const index = playerActivePowerups.findIndex(pu => pu.id === powerupId);
  if (index > -1) {
    const removed = playerActivePowerups.splice(index, 1)[0];
    console.log(`Removed active power-up: ${removed.definitionId}`);
  }
}

/**
 * Get the original stat value before power-ups were applied
 * @param {string} stat - Stat name ('speed' or 'damage')
 * @returns {number} - The original value
 */
function getOriginalStatValue(stat) {
  // For now, return current value
  // TODO: Implement proper tracking if multiple powerups modify same stat
  return playerStats[stat] || 1.0;
}

/**
 * Reset player stats to initial state
 * Called at battle start or game over
 */
function resetPlayerStats() {
  playerStats.currentHealth = playerStats.maxHealth;
  playerStats.speed = 1.0;
  playerStats.damage = 1.0;
  playerStats.shieldActive = false;
  playerStats.shieldDurability = 0;
  playerActivePowerups.length = 0;  // Clear array
  
  console.log('Player stats reset to initial state');
}

/**
 * Log current player state (useful for debugging)
 */
function logPlayerState() {
  console.log('=== PLAYER STATE ===');
  console.log('Health:', playerStats.currentHealth, '/', playerStats.maxHealth);
  console.log('Speed:', playerStats.speed);
  console.log('Damage:', playerStats.damage);
  console.log('Shield Active:', playerStats.shieldActive);
  console.log('Active Power-Ups:', playerActivePowerups.length);
  playerActivePowerups.forEach(pu => {
    const remaining = pu.expiresAt - Date.now();
    console.log(`  - ${pu.definitionId}: ${Math.max(0, remaining)}ms remaining`);
  });
  console.log('====================');
}
