// timer.js
class Timer {
    constructor(duration, display, onComplete) {
        this.duration = duration;
        this.display = display;
        this.onComplete = onComplete;
        this.running = false;
        this.remainingTime = duration;
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.interval = setInterval(() => this.tick(), 1000);
    }

    pause() {
        this.running = false;
        clearInterval(this.interval);
    }

    reset() {
        this.remainingTime = this.duration;
        this.updateDisplay();
    }

    tick() {
        if (this.remainingTime <= 0) {
            this.stop();
            if (this.onComplete) this.onComplete();
            return;
        }
        
        this.remainingTime--;
        this.updateDisplay();
    }

    stop() {
        this.running = false;
        clearInterval(this.interval);
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.display.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize timer when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const gameTimer = new Timer(45 * 60, timerDisplay, () => {
        alert('Time's up! The IEP meeting is about to start.');
        // Add any additional end-game logic here
    });

    window.gameTimer = gameTimer; // Make timer accessible globally
});
