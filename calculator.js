// Calculator State
const initialState = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false
};

let state = { ...initialState };

// DOM Elements
const display = document.getElementById('display');

// Update display with current state
function updateDisplay() {
  display.textContent = state.displayValue;
}

// Reset calculator to initial state
function allClear() {
  state = { ...initialState };
  updateDisplay();
}

// Clear current entry (preserves operator and firstOperand)
function clear() {
  state.displayValue = '0';
  updateDisplay();
}

// Input a digit
function inputDigit(digit) {
  if (state.waitingForSecondOperand) {
    state.displayValue = digit;
    state.waitingForSecondOperand = false;
  } else {
    // Replace leading zero, unless it's "0."
    state.displayValue = state.displayValue === '0' ? digit : state.displayValue + digit;
  }
  updateDisplay();
}

// Input decimal point
function inputDecimal() {
  // After operator, start new number with "0."
  if (state.waitingForSecondOperand) {
    state.displayValue = '0.';
    state.waitingForSecondOperand = false;
    updateDisplay();
    return;
  }

  // Ignore if already has decimal
  if (state.displayValue.includes('.')) return;

  state.displayValue += '.';
  updateDisplay();
}

// Handle operator input
function inputOperator(operator) {
  const inputValue = parseFloat(state.displayValue);

  // If we already have an operator and are not waiting, calculate first (chaining)
  if (state.operator && !state.waitingForSecondOperand) {
    calculate();
  }

  state.firstOperand = parseFloat(state.displayValue);
  state.operator = operator;
  state.waitingForSecondOperand = true;
}

// Perform calculation
function calculate() {
  if (state.operator === null || state.waitingForSecondOperand) return;

  const first = state.firstOperand;
  const second = parseFloat(state.displayValue);
  let result;

  switch (state.operator) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case '*':
      result = first * second;
      break;
    case '/':
      if (second === 0) {
        state.displayValue = 'Error';
        state.firstOperand = null;
        state.operator = null;
        state.waitingForSecondOperand = false;
        updateDisplay();
        return;
      }
      result = first / second;
      break;
    default:
      return;
  }

  state.displayValue = String(result);
  state.firstOperand = result;
  state.operator = null;
  state.waitingForSecondOperand = false;
  updateDisplay();
}

// Handle percentage
function handlePercent() {
  const value = parseFloat(state.displayValue);
  state.displayValue = String(value / 100);
  updateDisplay();
}

// Event delegation for button clicks
document.querySelector('.button-grid').addEventListener('click', (e) => {
  const button = e.target;
  if (!button.matches('button')) return;

  const action = button.dataset.action;

  switch (action) {
    case 'digit':
      inputDigit(button.dataset.digit);
      break;
    case 'decimal':
      inputDecimal();
      break;
    case 'all-clear':
      allClear();
      break;
    case 'clear':
      clear();
      break;
    case 'operator':
      inputOperator(button.dataset.operator);
      break;
    case 'percent':
      handlePercent();
      break;
    case 'equals':
      calculate();
      break;
  }
});

// Initialize display on load
updateDisplay();
