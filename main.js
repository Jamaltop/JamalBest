let currentNumber = '0';
let previousNumber = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
    const display = document.getElementById("result");
    display.textContent = currentNumber;
}

function clearDisplay() {
    currentNumber = '0';
    previousNumber = null;
    operator = null;
    shouldReset = false;
    updateDisplay();
}

function appendNumber(num) {
    if (shouldReset) {
        currentNumber = ''; // Сброс текущего числа после операции
        shouldReset = false;
    }

    if (currentNumber === '0' && num !== '.') {
        currentNumber = num.toString();
    } else {
        if (num === '.' && currentNumber.includes('.')) return; // Запрет на вторую точку
        currentNumber += num.toString();
    }
    updateDisplay();
}

function setOperator(op) {
    if (currentNumber === '') return;

    if (operator && previousNumber !== null && !shouldReset) {
        calculate(); // Вычислить промежуточный результат
    }

    operator = op;
    previousNumber = currentNumber;
    shouldReset = true; // Флаг для сброса currentNumber при вводе нового числа
}

function calculate() {
    if (!operator || previousNumber === null || currentNumber === '') return;

    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    let result = 0;
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                alert('Деление на ноль невозможно');
                clearDisplay();
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }
    currentNumber = result.toString();
    previousNumber = null;
    operator = null;
    shouldReset = true; // Устанавливаем флаг сброса
    updateDisplay();
}

function invert() {
    if (currentNumber === '0') return;
    currentNumber = (parseFloat(currentNumber) * -1).toString();
    updateDisplay();
}

function percent() {
    if (currentNumber === '0') return;
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateDisplay();
}
