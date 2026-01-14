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

// Initialize display on load
updateDisplay();
