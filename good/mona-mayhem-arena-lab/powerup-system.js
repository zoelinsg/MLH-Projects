/* ========================================
   MONA MAYHEM ARENA LAB - POWER-UP SYSTEM
   Power-Up Definitions and Management
   ======================================== */

/* ========== POWER-UP DEFINITIONS ========== */
/* Static configuration for all power-up types */
const POWERUP_DEFINITIONS = {
  healthBoost: {
    id: 'healthBoost',
    name: 'Health Boost',
    icon: '❤️',
    description: 'Restore 30 HP',
    rarity: 'common',
    category: 'instant',
    duration: 0,
    effect: {
      type: 'heal',
      amount: 30
    }
  },

  speedBoost: {
    id: 'speedBoost',
    name: 'Speed Boost',
    icon: '⚡',
    description: 'Move 2x faster',
    rarity: 'rare',
    category: 'timed',
    duration: 8000,
    effect: {
      type: 'statMultiplier',
      stat: 'speed',
      multiplier: 2.0
    }
  },

  shield: {
    id: 'shield',
    name: 'Temporary Shield',
    icon: '🛡️',
    description: 'Absorb next hit',
    rarity: 'rare',
    category: 'timed',
    duration: 10000,
    effect: {
      type: 'shield',
      durability: 1
    }
  },

  doubleDamage: {
    id: 'doubleDamage',
    name: 'Double Damage',
    icon: '💥',
    description: 'Deal 2x damage',
    rarity: 'epic',
    category: 'timed',
    duration: 6000,
    effect: {
      type: 'statMultiplier',
      stat: 'damage',
      multiplier: 2.0
    }
  }
};

/* ========== ARENA POWER-UPS ========== */
/* Array to store all power-ups currently in the arena */
const arenaPowerups = [];
/*
  Example structure of items in this array:
  {
    id: 'pu_12345',
    type: 'speedBoost',
    x: 345,
    y: 210,
    radius: 25,
    spawnTime: 1234567890,
    collected: false,
    timeToLive: 15000
  }
*/

/* ========== CONFIGURATION ========== */
const POWERUP_CONFIG = {
  maxPowerupsInArena: 3,           // Maximum concurrent power-ups
  spawnIntervalMin: 5000,          // Minimum time between spawns (ms)
  spawnIntervalMax: 10000,         // Maximum time between spawns (ms)
  powerupTimeToLive: 15000,        // How long before power-up disappears (ms)
  arenaWidth: 800,                 // Arena size for random spawning
  arenaHeight: 600,
  powerupRadius: 25                // Collision radius
};

/* ========== SPAWN MANAGEMENT ========== */
let lastSpawnTime = 0;
let nextSpawnInterval = 0;

/**
 * Initialize spawn timer with random interval
 */
function initializeSpawnTimer() {
  lastSpawnTime = Date.now();
  nextSpawnInterval = Math.random() *
    (POWERUP_CONFIG.spawnIntervalMax - POWERUP_CONFIG.spawnIntervalMin) +
    POWERUP_CONFIG.spawnIntervalMin;
  console.log(`Next spawn in ${nextSpawnInterval.toFixed(0)}ms`);
}

/* ========== POWER-UP FUNCTIONS ========== */

/**
 * Create a new power-up instance with random position
 * @param {string} type - Type of power-up ('speedBoost', 'healthBoost', etc)
 * @returns {object} - New power-up instance
 */
function createPowerup(type) {
  // TODO: Implement
  console.log(`TODO: Create ${type} power-up`);
  return null;
}

/**
 * Spawn a random power-up in the arena
 * Checks if we can spawn (haven't exceeded max) and it's time to spawn
 */
function spawnRandomPowerup() {
  // TODO: Implement
  console.log('TODO: Spawn random power-up');
}

/**
 * Check if we should spawn a new power-up
 * @returns {boolean} - True if enough time has passed since last spawn
 */
function shouldSpawn() {
  const now = Date.now();
  const timeSinceLastSpawn = now - lastSpawnTime;
  return timeSinceLastSpawn > nextSpawnInterval;
}

/**
 * Can we add more power-ups to the arena?
 * @returns {boolean} - True if under max limit
 */
function canAddPowerup() {
  return arenaPowerups.length < POWERUP_CONFIG.maxPowerupsInArena;
}

/**
 * Detect collision between player and power-ups
 * @param {object} playerPos - Player position {x, y, radius}
 * @returns {array} - Array of collided power-ups
 */
function detectCollisions(playerPos) {
  // TODO: Implement
  console.log('TODO: Detect collisions');
  return [];
}

/**
 * Collect a power-up and apply its effect
 * @param {object} powerup - The power-up instance to collect
 */
function collectPowerup(powerup) {
  // TODO: Implement
  console.log(`TODO: Collect ${powerup.type}`);
}

/**
 * Apply instant effect (like healing)
 * @param {object} definition - The power-up definition
 */
function applyInstantEffect(definition) {
  // TODO: Implement
  console.log(`TODO: Apply instant effect: ${definition.id}`);
}

/**
 * Apply timed effect (like speed boost)
 * @param {object} definition - The power-up definition
 * @param {object} powerup - The power-up instance
 */
function applyTimedEffect(definition, powerup) {
  // TODO: Implement
  console.log(`TODO: Apply timed effect: ${definition.id}`);
}

/**
 * Check for expired power-ups and remove them
 */
function checkExpiredPowerups() {
  // TODO: Implement
  console.log('TODO: Check for expired power-ups');
}

/**
 * Safely expire a power-up and restore original stats
 * @param {object} powerup - The active power-up to expire
 */
function expirePowerup(powerup) {
  // TODO: Implement
  console.log(`TODO: Expire ${powerup.definitionId}`);
}

/**
 * Render power-ups in the arena (visual representation)
 */
function renderArenaPowerups() {
  // TODO: Implement
  console.log('TODO: Render arena power-ups');
}

/**
 * Update the UI display of active power-ups
 */
function updateActivePowerupsDisplay() {
  // TODO: Implement
  console.log('TODO: Update active power-ups display');
}

/**
 * Log current arena state (useful for debugging)
 */
function logArenaState() {
  console.log('=== ARENA STATE ===');
  console.log(`Power-ups in arena: ${arenaPowerups.length}/${POWERUP_CONFIG.maxPowerupsInArena}`);
  arenaPowerups.forEach(pu => {
    console.log(`  - ${pu.type} at (${pu.x}, ${pu.y})`);
  });
  console.log('===================');
}

/**
 * Initialize the power-up system
 * Called at battle start
 */
function initializePowerupSystem() {
  arenaPowerups.length = 0;  // Clear arena
  playerActivePowerups.length = 0;  // Clear active effects
  initializeSpawnTimer();
  console.log('Power-up system initialized');
}

/**
 * Clean up power-up system
 * Called at battle end
 */
function cleanupPowerupSystem() {
  arenaPowerups.length = 0;
  playerActivePowerups.length = 0;
  console.log('Power-up system cleaned up');
}
