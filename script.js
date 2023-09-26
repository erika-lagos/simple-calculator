const clearButton = document.querySelector('#clear');
const displayScreen = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number-button');
const functionButtons = document.querySelectorAll('.function-button');
const submitButton = document.querySelector('#submit');
const periodButton = document.querySelector('.period');
let num1;
let num2;
let operand;
let expectingFreshNumber = false;

function operate() {
   if (operand === '+') return add(num1, num2);
   if (operand === '-') return subtract(num1, num2);
   if (operand === 'X') return multiply(num1, num2);
   if (operand === '/') return divide(num1, num2);
}

function add(num1, num2) {
    return round(num1 + num2);
}

function subtract(num1, num2) {
    return round(num1 - num2);
}

function multiply(num1, num2) {
    return round(num1 * num2);
}

function divide(num1, num2) {
    if (num2 === 0) {
        return 'Infinity';
    }
    return round(num1 / num2);
}

function round(num) {
    return Math.round(num * 100) / 100;
}

for (button of numberButtons) {
    button.addEventListener('click', e => {
        if (expectingFreshNumber) {
            displayScreen.value = +e.target.innerHTML;
            expectingFreshNumber = false;
        }
        else {
            displayScreen.value += e.target.innerHTML;
        }
    });
}

for (button of functionButtons) {
    button.addEventListener('click', e => {
        expectingFreshNumber = true;
        periodButton.disabled = false;
        if (num1) {
            num2 = +displayScreen.value;
            displayScreen.value = num1 = operate();
        } else {
            num1 = +displayScreen.value;
        }
        operand = e.target.innerHTML;
    });
}

periodButton.addEventListener('click', e => {
    periodButton.disabled = true;
});

clearButton.addEventListener('click', e => {
    displayScreen.value = '';
    num1 = num2 = operand = '';
    periodButton.disabled = false;
});

submitButton.addEventListener('click', e => {
    num2 = +displayScreen.value;
    if(operand === '' || num2 === '') {
        return; 
    } else {
        expectingFreshNumber = true;
        periodButton.disabled = false;
        displayScreen.value = operate();
        num1 = num2 = operand = '';
    }
});