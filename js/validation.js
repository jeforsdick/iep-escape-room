// Basic answer validation
function validateAnswer(type, answer) {
    switch(type) {
        case 'practice':
            return answer.toUpperCase() === 'MEASURABLE';
        default:
            return false;
    }
}

// Add enter key support for inputs
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const submitBtn = input.nextElementSibling;
                if (submitBtn && submitBtn.tagName === 'BUTTON') {
                    submitBtn.click();
                }
            }
        });
    });
});
