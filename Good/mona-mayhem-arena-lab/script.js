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
    
    /* Open the Start Match modal to show game has started */
    openModal('startModal');
    
    /* Optional: Log to console for debugging */
    console.log('Match started! Battle status updated.');
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
    
    /* Reset battle status for new match */
    document.getElementById('matchStatus').textContent = 'WAITING';
    document.getElementById('roundNumber').textContent = '0';
    document.getElementById('timeRemaining').textContent = '--:--';
    
    /* Optional: Log to console for debugging */
    console.log('Play Again clicked! Resetting for new match...');
});

/* ========== BACK TO ARENA BUTTON ========== */
/* Get the Back to Arena button and add a click event listener */
document.getElementById('backArenaBtn').addEventListener('click', function() {
    /* Hide the Game Over screen */
    hideGameOverScreen();
    
    /* Reset all battle stats to initial state */
    document.getElementById('matchStatus').textContent = 'WAITING';
    document.getElementById('roundNumber').textContent = '0';
    document.getElementById('timeRemaining').textContent = '--:--';
    
    /* Optional: Log to console for debugging */
    console.log('Back to Arena clicked! Returning to main screen...');
});

/* ========== MATCH HISTORY BUTTON ========== */
/* Get the Match History button and add a click event listener */
document.getElementById('historyBtn').addEventListener('click', function() {
    /* Open the Match History modal to show past matches */
    openModal('historyModal');
    
    /* Optional: Log to console for debugging */
    console.log('Match History displayed!');
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
