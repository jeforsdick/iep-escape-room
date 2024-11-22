// puzzles.js
const puzzleData = {
    practice: {
        scrambledWord: 'BLESUAMEAR',
        answer: 'MEASURABLE',
        hint: 'This is one of the SMART goal components that helps you track progress.',
        feedback: {
            success: 'Excellent! You've shown you understand how to unscramble words. Let's move on to the SMART components challenge.',
            failure: 'Not quite. Remember, we're looking for a term related to tracking progress in IEP goals.'
        }
    },
    smartComponents: {
        terms: [
            {
                term: 'Specific',
                definition: 'Clearly states what the student will do',
                code: 'S'
            },
            {
                term: 'Measurable',
                definition: 'Can be counted or observed',
                code: 'M'
            },
            {
                term: 'Achievable',
                definition: 'Realistic for the student's ability level',
                code: 'A'
            },
            {
                term: 'Relevant',
                definition: 'Important for the student's learning needs',
                code: 'R'
            },
            {
                term: 'Time-bound',
                definition: 'Has a deadline or time frame',
                code: 'T'
            }
        ],
        finalCode: 'SMART',
        hints: [
            'Think about what makes each component unique',
            'Match the most obvious pairs first',
            'Consider how you would explain each term to a parent'
        ]
    },
    finalChallenge: {
        scenario: `Student Profile: Alex is a 3rd-grade student who currently reads 45 words per minute at grade level with 85% accuracy. The grade-level expectation is 90 words per minute with 95% accuracy. Alex shows strong comprehension when text is read aloud.`,
        requirements: [
            'Must include baseline data',
            'Must specify measurement method',
            'Must include time frame',
            'Must be achievable based on current performance'
        ],
        sampleGoal: 'By the end of the school year (36 weeks), Alex will read grade-level text at 85 words per minute with 92% accuracy as measured by curriculum-based measurements administered weekly.',
        rubric: {
            specific: ['grade-level text', 'words per minute', 'accuracy'],
            measurable: ['85 words', '92% accuracy'],
            timebound: ['end of school year', '36 weeks'],
            methodology: ['curriculum-based measurements', 'weekly']
        }
    }
};

class PuzzleManager {
    constructor() {
        this.currentRoom = 'practice';
        this.hints = 3;
        this.progress = 0;
        this.initializeListeners();
    }

    initializeListeners() {
        // Practice Room
        document.getElementById('practice-submit')?.addEventListener('click', () => this.checkPracticeAnswer());
        
        // SMART Room
        document.getElementById('smart-submit')?.addEventListener('click', () => this.checkSmartAnswer());
        
        // Final Room
        document.getElementById('goal-submit')?.addEventListener('click', () => this.checkFinalGoal());
        
        // Hint System
        document.getElementById('hint-btn')?.addEventListener('click', () => this.getHint());
    }

    startGame() {
        document.getElementById('intro-room').classList.add('hidden');
        document.getElementById('practice-room').classList.remove('hidden');
        gameTimer.start();
        this.updateProgress(0);
    }

    checkPracticeAnswer() {
        const answer = document.getElementById('practice-answer').value.toUpperCase();
        const result = this.validateAnswer('practice', answer);
        this.showFeedback('practice', result);
        if (result.success) {
            setTimeout(() => this.advanceToNext('smart-room'), 2000);
        }
    }

    checkSmartAnswer() {
        const answer = document.getElementById('smart-answer').value.toUpperCase();
        const result = this.validateAnswer('smartComponents', answer);
        this.showFeedback('smart', result);
        if (result.success) {
            setTimeout(() => this.advanceToNext('final-room'), 2000);
        }
    }

    checkFinalGoal() {
        const goal = document.getElementById('goal-answer').value;
        const result = this.validateFinalGoal(goal);
        this.showFeedback('final', result);
        if (result.success) {
            this.completeGame();
        }
    }

    getHint() {
        if (this.hints > 0) {
            const hintText = this.getCurrentHint();
            document.getElementById('current-hint').textContent = hintText;
            this.hints--;
            document.getElementById('hint-btn').textContent = `Get Hint (${this.hints} remaining)`;
        }
    }

    getCurrentHint() {
        const currentPuzzle = puzzleData[this.currentRoom];
        if (currentPuzzle.hints) {
            return currentPuzzle.hints[3 - this.hints - 1];
        }
        return currentPuzzle.hint;
    }

    updateProgress(value) {
        this.progress = value;
        document.getElementById('progress').style.width = `${value}%`;
    }

    showFeedback(room, result) {
        const feedback = document.getElementById(`${room}-feedback`);
        feedback.textContent = result.message;
        feedback.className = `feedback ${result.success ? 'success' : 'error'}`;
        feedback.style.display = 'block';
    }

    advanceToNext(nextRoom) {
        document.querySelectorAll('.room').forEach(room => room.classList.add('hidden'));
        document.getElementById(nextRoom).classList.remove('hidden');
        this.currentRoom = nextRoom;
        this.updateProgress(this.progress + 33.33);
    }

    completeGame() {
        gameTimer.stop();
        alert('Congratulations! You've successfully retrieved the IEP files in time for the meeting!');
        this.updateProgress(100);
    }
}

// Initialize puzzle manager when document loads
document.addEventListener('DOMContentLoaded', () => {
    window.puzzleManager = new PuzzleManager();
});
