const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calculator-buttons button");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}


function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

function calculate(first, second, operator) {
    switch (operator) {
        case "+":
            return first + second;

        case "−":
            return first - second;

        case "×":
            return first * second;

        case "÷":
            if (second === 0) {
                return "Error";
            }
            return first / second;

        default:
            return second;
    }
}

function chooseOperator(selectedOperator) {
    if (operator !== null && !shouldResetDisplay) {
        const result = calculate(
            Number(previousInput),
            Number(currentInput),
            operator
        );

        if (result === "Error") {
            currentInput = "Error";
            previousInput = "";
            operator = null;
            shouldResetDisplay = true;
            updateDisplay();
            return;
        }

        currentInput = String(result);
        updateDisplay();
    }

    previousInput = currentInput;
    operator = selectedOperator;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (operator === null || shouldResetDisplay) {
        return;
    }

    const result = calculate(
        Number(previousInput),
        Number(currentInput),
        operator
    );

    currentInput = String(result);
    previousInput = "";
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}

function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}

function handleBackspace() {
    if (currentInput === "Error" || shouldResetDisplay) {
        currentInput = "0";
        shouldResetDisplay = false;
    } else if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === "-") {
            currentInput = "0";
        }
    } else {
        currentInput = "0";
    }

    updateDisplay();
}

function handleDecimal() {
    if (shouldResetDisplay || currentInput === "Error") {
        currentInput = "0.";
        shouldResetDisplay = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (!action && value !== undefined) {
            appendNumber(value);
        } else if (action === "operator") {
            chooseOperator(value);
        } else if (action === "equals") {
            handleEquals();
        } else if (action === "clear") {
            clearCalculator();
        } else if (action === "backspace") {
            handleBackspace();
        } else if (action === "decimal") {
            handleDecimal();
        }
    });
});



