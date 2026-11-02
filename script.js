// Tip Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const billAmountInput = document.getElementById('bill-amount');
    const tipPercentSelect = document.getElementById('tip-percent');
    const numPeopleInput = document.getElementById('num-people');
    const calculateBtn = document.getElementById('calculate-btn');
    const errorMessage = document.getElementById('error-message');
    const resultArea = document.getElementById('result-area');
    const tipAmountSpan = document.getElementById('tip-amount');
    const totalAmountSpan = document.getElementById('total-amount');
    const perPersonSpan = document.getElementById('per-person');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        resultArea.style.display = 'none';
    }

    function hideError() {
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';
    }

    function formatCurrency(value) {
        return value.toFixed(2);
    }

    function calculateTip() {
        // Get input values
        const billAmount = parseFloat(billAmountInput.value);
        const tipPercent = parseFloat(tipPercentSelect.value);
        const numPeople = parseInt(numPeopleInput.value);

        // Validate bill amount
        if (isNaN(billAmountInput.value) || billAmountInput.value.trim() === '') {
            showError('Please enter a bill amount.');
            return;
        }

        if (isNaN(billAmount) || billAmount < 0) {
            showError('Bill amount must be a positive number.');
            return;
        }

        // Validate number of people
        if (numPeopleInput.value.trim() === '') {
            showError('Please enter the number of people.');
            return;
        }

        if (isNaN(numPeople) || numPeople <= 0) {
            showError('Number of people must be at least 1.');
            return;
        }

        // Hide previous errors
        hideError();

        // Calculate values
        const tipAmount = billAmount * (tipPercent / 100);
        const totalAmount = billAmount + tipAmount;
        const perPerson = totalAmount / numPeople;

        // Display results
        tipAmountSpan.textContent = formatCurrency(tipAmount);
        totalAmountSpan.textContent = formatCurrency(totalAmount);
        perPersonSpan.textContent = formatCurrency(perPerson);
        resultArea.style.display = 'block';
    }

    // Event listener for calculate button
    calculateBtn.addEventListener('click', calculateTip);

    // Allow Enter key to trigger calculation
    [billAmountInput, numPeopleInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateTip();
            }
        });
    });
});
