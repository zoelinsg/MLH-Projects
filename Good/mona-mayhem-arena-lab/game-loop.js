/* ========================================
   MONA MAYHEM ARENA LAB - GAME LOOP
   Main Battle Loop and Update Logic
   ======================================== */

/* ========== GAME LOOP STATE ========== */
let gameLoopRunning = false;
let gameLoopFrameCount = 0;
let lastGameLoopTime = 0;

/* ========== GAME LOOP CONFIGURATION ========== */
const GAME_LOOP_CONFIG = {
  spawnCheckFrequency: 10,      // Check spawn every N frames
  collisionCheckFrequency: 1,   // Check collisions every frame
  expirationCheckFrequency: 5,  // Check expiration every N frames
  displayUpdateFrequency: 5     // Update UI every N frames
};

/**
 * Main game loop - runs every frame (~16ms at 60fps)
 * This is the heart of the battle system
 */
function gameLoop() {
  if (!gameLoopRunning) {
    return;
  }

  gameLoopFrameCount++;
  const now = Date.now();

  // ========== SPAWN CHECK (Every X frames) ==========
  if (gameLoopFrameCount % GAME_LOOP_CONFIG.spawnCheckFrequency === 0) {
    if (shouldSpawn() && canAddPowerup()) {
      spawnRandomPowerup();
    }
  }

  // ========== COLLISION DETECTION (Every frame) ==========
  if (gameLoopFrameCount % GAME_LOOP_CONFIG.collisionCheckFrequency === 0) {
    // TODO: Get player position from game state
    const playerPos = {
      x: 400,              // Placeholder
      y: 300,              // Placeholder
      radius: 20
    };
    
    const collidedPowerups = detectCollisions(playerPos);
    collidedPowerups.forEach(pu => {
      collectPowerup(pu);
    });
  }

  // ========== EXPIRATION CHECK (Every X frames) ==========
  if (gameLoopFrameCount % GAME_LOOP_CONFIG.expirationCheckFrequency === 0) {
    checkExpiredPowerups();
  }

  // ========== RENDER/DISPLAY UPDATE (Every X frames) ==========
  if (gameLoopFrameCount % GAME_LOOP_CONFIG.displayUpdateFrequency === 0) {
    renderArenaPowerups();
    updateActivePowerupsDisplay();
  }

  // Continue loop
  requestAnimationFrame(gameLoop);
}

/**
 * Start the game loop
 * Called when battle begins
 */
function startGameLoop() {
  if (gameLoopRunning) {
    console.warn('Game loop already running!');
    return;
  }

  gameLoopRunning = true;
  gameLoopFrameCount = 0;
  lastGameLoopTime = Date.now();

  console.log('Game loop started');
  requestAnimationFrame(gameLoop);
}

/**
 * Stop the game loop
 * Called when battle ends
 */
function stopGameLoop() {
  gameLoopRunning = false;
  gameLoopFrameCount = 0;
  console.log('Game loop stopped');
}

/**
 * Check if game loop is currently running
 * @returns {boolean}
 */
function isGameLoopRunning() {
  return gameLoopRunning;
}

/**
 * Get current frame count
 * Useful for testing and debugging
 * @returns {number}
 */
function getGameLoopFrameCount() {
  return gameLoopFrameCount;
}

/**
 * Log game loop statistics
 */
function logGameLoopStats() {
  console.log('=== GAME LOOP STATS ===');
  console.log('Running:', gameLoopRunning);
  console.log('Frame count:', gameLoopFrameCount);
  console.log('Last update:', new Date(lastGameLoopTime).toISOString());
  console.log('=======================');
}
