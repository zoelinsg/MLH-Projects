/* ========================================
   MONA MAYHEM ARENA LAB - SCRIPT FILE
   Button Interactions and Modal Management
   ======================================== */

/* ========== MODAL FUNCTIONS ========== */
/* Open a modal window by finding it with the given ID and adding the 'active' class */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

/* Close a modal window by removing the 'active' class */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

/* Close modal when clicking outside the content area */
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

/* ========== START MATCH BUTTON ========== */
/* Get the Start Match button and add a click event listener */
document.getElementById('startBtn').addEventListener('click', function() {
    /* Update the battle status panel to show match is in progress */
    document.getElementById('matchStatus').textContent = 'IN PROGRESS';
    document.getElementById('roundNumber').textContent = '1';
    document.getElementById('timeRemaining').textContent = '03:00';
    
    /* Show the arena and active power-ups panels */
    document.getElementById('arenaSection').style.display = 'block';
    document.getElementById('activePowerupsPanel').style.display = 'block';
    
    /* Initialize and start the power-up system */
    resetPlayerStats();
    initializePowerupSystem();
    startGameLoop();
    
    /* Open the Start Match modal to show game has started */
    openModal('startModal');
    
    /* Optional: Log to console for debugging */
    console.log('Match started! Power-up system initialized.');
});

/* ========== GAME OVER SCREEN FUNCTION ========== */
/* Show the Game Over screen with animation */
function showGameOverScreen() {
    const gameOverScreen = document.getElementById('gameoverScreen');
    if (gameOverScreen) {
        gameOverScreen.classList.add('active');
    }
}

/* Hide the Game Over screen */
function hideGameOverScreen() {
    const gameOverScreen = document.getElementById('gameoverScreen');
    if (gameOverScreen) {
        gameOverScreen.classList.remove('active');
    }
}

/* ========== GAME OVER BUTTON ========== */
/* Get the Game Over button and add a click event listener */
document.getElementById('gameoverBtn').addEventListener('click', function() {
    /* Update the battle status panel to show match is finished */
    document.getElementById('matchStatus').textContent = 'FINISHED';
    document.getElementById('roundNumber').textContent = '2';
    
    /* Open the Game Over screen to show results */
    showGameOverScreen();
    
    /* Optional: Log to console for debugging */
    console.log('Game Over screen displayed!');
});

/* ========== PLAY AGAIN BUTTON ========== */
/* Get the Play Again button and add a click event listener */
document.getElementById('playAgainBtn').addEventListener('click', function() {
    /* Hide the Game Over screen */
    hideGameOverScreen();
    
    /* Stop the game loop and clean up power-up system */
    stopGameLoop();
    cleanupPowerupSystem();
    
    /* Reset player stats and battle status for new match */
    resetPlayerStats();
    document.getElementById('matchStatus').textContent = 'WAITING';
    document.getElementById('roundNumber').textContent = '0';
    document.getElementById('timeRemaining').textContent = '--:--';
    
    /* Optional: Log to console for debugging */
    console.log('Play Again clicked! Power-up system cleaned up. Ready for new match...');
});

/* ========== BACK TO ARENA BUTTON ========== */
/* Get the Back to Arena button and add a click event listener */
document.getElementById('backArenaBtn').addEventListener('click', function() {
    /* Hide the Game Over screen */
    hideGameOverScreen();
    
    /* Stop the game loop and clean up power-up system */
    stopGameLoop();
    cleanupPowerupSystem();
    
    /* Hide the arena and active power-ups panels */
    document.getElementById('arenaSection').style.display = 'none';
    document.getElementById('activePowerupsPanel').style.display = 'none';
    
    /* Reset all battle stats to initial state */
    document.getElementById('matchStatus').textContent = 'WAITING';
    document.getElementById('roundNumber').textContent = '0';
    document.getElementById('timeRemaining').textContent = '--:--';
    
    /* Optional: Log to console for debugging */
    console.log('Back to Arena clicked! Power-up system cleaned up.');
});

/* ========== MATCH HISTORY BUTTON ========== */
/* Get the Match History button and add a click event listener */
document.getElementById('historyBtn').addEventListener('click', function() {
    /* Open the Match History modal to show past matches */
    renderMatchHistory();
    openModal('historyModal');
    
    /* Optional: Log to console for debugging */
    console.log('Match History displayed!');
});

/* Default match history records shown when there is no saved history */
const defaultMatchHistory = [
    { date: '2026-06-13 21:00', opponent: 'Neon Phantom', result: 'Victory', duration: '04:12', score: '14,200' },
    { date: '2026-06-13 19:45', opponent: 'Cyber Samurai', result: 'Defeat', duration: '03:55', score: '9,800' },
    { date: '2026-06-13 18:20', opponent: 'Vapor Wraith', result: 'Victory', duration: '05:05', score: '12,450' }
];

/* Load match history from localStorage or use defaults */
function loadMatchHistory() {
    const saved = localStorage.getItem('monaMatchHistory');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch (error) {
            console.warn('Match history could not be parsed:', error);
        }
    }
    return defaultMatchHistory.slice();
}

/* Save match history to localStorage */
function saveMatchHistory(history) {
    localStorage.setItem('monaMatchHistory', JSON.stringify(history));
}

/* Render the history list and empty state */
function renderMatchHistory() {
    const historyList = document.getElementById('historyList');
    const historyEmpty = document.getElementById('historyEmpty');
    const history = loadMatchHistory();

    historyList.innerHTML = '';
    if (history.length === 0) {
        historyEmpty.style.display = 'block';
        historyList.style.display = 'none';
        return;
    }

    historyEmpty.style.display = 'none';
    historyList.style.display = 'block';

    history.forEach((record, index) => {
        const item = document.createElement('li');
        const statusClass = record.result.toLowerCase().includes('victory') ? 'win' : 'loss';
        item.className = `history-item ${statusClass}`;
        item.innerHTML = `
            <div class="history-title">
                <strong>Match ${index + 1}</strong> — ${record.result} vs ${record.opponent}
            </div>
            <div class="history-meta">
                <span>Date: ${record.date}</span>
                <span>Duration: ${record.duration}</span>
                <span>Score: ${record.score}</span>
            </div>
        `;
        historyList.appendChild(item);
    });
}

/* Clear all saved match history with confirmation */
function clearMatchHistory() {
    const history = loadMatchHistory();
    if (history.length === 0) {
        return;
    }

    const confirmed = window.confirm('Clear all match history? This cannot be undone.');
    if (!confirmed) {
        return;
    }

    localStorage.removeItem('monaMatchHistory');
    renderMatchHistory();
}

document.getElementById('clearHistoryBtn').addEventListener('click', function() {
    clearMatchHistory();
    console.log('Match history cleared.');
});

/* ========== KEYBOARD ACCESSIBILITY ========== */
/* Allow users to close modals by pressing the Escape key */
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        /* Find all open modals and close them */
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        
        /* Close Game Over screen if open */
        hideGameOverScreen();
        
        /* Optional: Log to console for debugging */
        console.log('Modals and Game Over screen closed with Escape key');
    }
});

/* ========== DEBUG HELPERS ========== */
/* These functions are available in the browser console for testing */
/* Use them to debug the power-up system during development */

/**
 * Log all system states at once
 * Usage in console: debugFullState()
 */
function debugFullState() {
    console.log('\n========== FULL SYSTEM STATE ==========');
    logPlayerState();
    logArenaState();
    logGameLoopStats();
    console.log('======================================\n');
}

/**
 * Manually test spawning a power-up
 * Usage in console: debugSpawnPowerup('speedBoost')
 */
function debugSpawnPowerup(type) {
    console.log(`[DEBUG] Manually spawning ${type}...`);
    spawnRandomPowerup();
}

/**
 * Manually test collecting the first power-up in arena
 * Usage in console: debugCollectFirstPowerup()
 */
function debugCollectFirstPowerup() {
    if (arenaPowerups.length > 0) {
        const pu = arenaPowerups[0];
        console.log(`[DEBUG] Collecting first power-up: ${pu.type}`);
        // collectPowerup(pu);  // TODO: Uncomment when implemented
    } else {
        console.log('[DEBUG] No power-ups in arena to collect');
    }
}

console.log('=== MONA MAYHEM ARENA LAB - POWER-UP SYSTEM LOADED ===');
console.log('Debug commands available:');
console.log('  debugFullState() - Show all system states');
console.log('  debugSpawnPowerup(type) - Spawn a power-up');
console.log('  debugCollectFirstPowerup() - Collect first power-up');
console.log('  logPlayerState() - Show player stats');
console.log('  logArenaState() - Show arena power-ups');
console.log('========================================================');
