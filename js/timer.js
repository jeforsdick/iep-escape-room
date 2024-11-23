// Simple timer functionality
class Timer {
    constructor() {
        this.timeLeft = 45 * 60; // 45 minutes in seconds
        this.timerDisplay = document.getElementById('timer');
        this.timerId = null;
    }

    start() {
        if (this.timerId) return; // Don't start if already running
        
        this.timerId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    tick() {
        if (this.timeLeft <= 0) {
            this.stop();
            alert('Time's up!');
            return;
        }

        this.timeLeft--;
        this.updateDisplay();
    }

    stop() {
        clearInterval(this.timerId);
        this.timerId = null;
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize timer and add start button listener
document.addEventListener('DOMContentLoaded', () => {
    const timer = new Timer();
    window.gameTimer = timer;

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        // Hide intro room and show practice room
        document.getElementById('intro-room').classList.add('hidden');
        document.getElementById('practice-room').classList.remove('hidden');
        // Start timer
        timer.start();
    });
});
