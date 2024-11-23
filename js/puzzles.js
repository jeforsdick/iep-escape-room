// Basic puzzle management
document.addEventListener('DOMContentLoaded', () => {
    // Practice puzzle handler
    const practiceSubmit = document.getElementById('practice-submit');
    const practiceAnswer = document.getElementById('practice-answer');
    const practiceFeedback = document.getElementById('practice-feedback');

    practiceSubmit.addEventListener('click', () => {
        const answer = practiceAnswer.value.toUpperCase();
        if (answer === 'MEASURABLE') {
            practiceFeedback.textContent = 'Correct! Moving to next room...';
            practiceFeedback.style.color = 'green';
            // You can add logic here to move to the next room
        } else {
            practiceFeedback.textContent = 'Try again!';
            practiceFeedback.style.color = 'red';
        }
    });
});
