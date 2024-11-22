// validation.js
class Validator {
    constructor() {
        this.initializeValidators();
    }

    initializeValidators() {
        this.validators = {
            practice: this.validatePracticeAnswer.bind(this),
            smartComponents: this.validateSmartAnswer.bind(this),
            finalChallenge: this.validateFinalGoal.bind(this)
        };
    }

    validateAnswer(puzzleType, answer) {
        return this.validators[puzzleType](answer);
    }

    validatePracticeAnswer(answer) {
        const correctAnswer = puzzleData.practice.answer;
        return {
            success: answer === correctAnswer,
            message: answer === correctAnswer 
                ? puzzleData.practice.feedback.success 
                : puzzleData.practice.feedback.failure
        };
    }

    validateSmartAnswer(answer) {
        const correctCode = puzzleData.smartComponents.finalCode;
        return {
            success: answer === correctCode,
            message: answer === correctCode
                ? 'Excellent! You've unlocked the SMART components. Moving on to the final challenge!'
                : 'That's not quite right. Check your matching and try again.'
        };
    }

    validateFinalGoal(goal) {
        const rubric = puzzleData.finalChallenge.rubric;
        let score = 0;
        let missingElements = [];

        // Check each rubric category
        for (const [category, requirements] of Object.entries(rubric)) {
            const categoryScore = requirements.filter(req => 
                goal.toLowerCase().includes(req.toLowerCase())
            ).length;
            
            if (categoryScore === 0) {
                missingElements.push(category);
            }
            score += categoryScore;
        }

        const totalPossiblePoints = Object.values(rubric)
            .reduce((sum, arr) => sum + arr.length, 0);
        const percentageScore = (score / totalPossiblePoints) * 100;

        return {
            success: percentageScore >= 80,
            message: this.generateFeedback(percentageScore, missingElements)
        };
    }

    generateFeedback(score, missingElements) {
        if (score >= 80) {
            return 'Excellent work! Your IEP goal meets the SMART criteria and effectively addresses the student's needs.';
        }

        let feedback = 'Your goal needs revision. Consider including: ';
        feedback += missingElements.map(element => {
            switch(element) {
                case 'specific':
                    return 'more specific details about what the student will do';
                case 'measurable':
                    return 'quantifiable measurements';
                case 'timebound':
                    return 'a clear timeframe';
                case 'methodology':
                    return 'how progress will be measured';
                default:
                    return element;
            }
        }).join(', ');

        return feedback;
    }

    // Helper function to check if text contains key phrases
    containsKeyPhrases(text, phrases) {
        return phrases.some(phrase => 
            text.toLowerCase().includes(phrase.toLowerCase())
        );
    }
}

// Initialize validator when document loads
document.addEventListener('DOMContentLoaded', () => {
    window.validator = new Validator();
});

// Event handlers for dynamic content
document.addEventListener('DOMContentLoaded', () => {
    // Initialize drag and drop for SMART components
    initializeDragAndDrop();
    
    // Initialize automatic validation for final goal
    const goalTextarea = document.getElementById('goal-answer');
    if (goalTextarea) {
        goalTextarea.addEventListener('input', debounce(() => {
            const result = window.validator.validateFinalGoal(goalTextarea.value);
            document.getElementById('goal-feedback').textContent = result.message;
        }, 500));
    }
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize drag and drop functionality
function initializeDragAndDrop() {
    const terms = document.querySelectorAll('.term');
    const definitions = document.querySelectorAll('.definition');
    
    terms.forEach(term => {
        term.addEventListener('dragstart', handleDragStart);
        term.addEventListener('dragend', handleDragEnd);
    });

    definitions.forEach(definition => {
        definition.addEventListener('dragover', handleDragOver);
        definition.addEventListener('drop', handleDrop);
    });
}

// Drag and drop event handlers
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const termId = e.dataTransfer.getData('text/plain');
    const term = document.getElementById(termId);
    const definition = e.target.closest('.definition');
    
    if (term && definition) {
        checkMatch(term, definition);
    }
}

// Check if term and definition match
function checkMatch(term, definition) {
    const matches = puzzleData.smartComponents.terms.find(item => 
        item.term === term.textContent && 
        item.definition === definition.textContent
    );
    
    if (matches) {
        term.classList.add('matched');
        definition.classList.add('matched');
        checkAllMatches();
    } else {
        term.classList.add('error');
        definition.classList.add('error');
        setTimeout(() => {
            term.classList.remove('error');
            definition.classList.remove('error');
        }, 1000);
    }
}

// Check if all terms are matched correctly
function checkAllMatches() {
    const allTerms = document.querySelectorAll('.term');
    const matchedTerms = document.querySelectorAll('.term.matched');
    
    if (allTerms.length === matchedTerms.length) {
        document.getElementById('smart-answer').removeAttribute('disabled');
    }
}
