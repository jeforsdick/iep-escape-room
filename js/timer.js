// timer.js
class Timer {
    constructor() {
        this.timeLeft = 45 * 60; // 45 minutes in seconds
        this.timerId = null;
        this.display = document.getElementById('timer');
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.timerId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    tick() {
        if (this.timeLeft <= 0) {
            this.stop();
            alert('Time's up! The IEP meeting is starting.');
            return;
        }

        this.timeLeft--;
        this.updateDisplay();
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        // Format numbers to always show two digits
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');
        
        // Update the display
        this.display.textContent = `${displayMinutes}:${displaySeconds}`;
    }

    reset() {
        this.stop();
        this.timeLeft = 45 * 60;
        this.updateDisplay();
    }
}

// Create and initialize the timer when the page loads
let gameTimer;

document.addEventListener('DOMContentLoaded', () => {
    gameTimer = new Timer();
    window.gameTimer = gameTimer; // Make timer globally accessible
    
    // Initialize display
    gameTimer.updateDisplay();
    
    // Add start button listener
    const startButton = document.getElementById('start-btn');
    if (startButton) {
        startButton.addEventListener('click', () => {
            gameTimer.start();
        });
    }
});
