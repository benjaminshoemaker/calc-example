# Execution Plan: Calculator App

## Overview

| Metric | Value |
|--------|-------|
| Phases | 2 |
| Steps  | 5 |
| Tasks  | 8 |

## Phase Flow

```
Phase 1: Core Calculator
    ↓
Phase 2: Input & Polish
```

---

## Phase 1: Core Calculator

**Goal:** Build a functional calculator with basic arithmetic operations and visual display.

### Pre-Phase Setup

Human must complete before agents begin:

- [ ] Create project directory structure
- [ ] Initialize git repository (`git init`)

---

### Step 1.1: HTML Structure & Styling

#### Task 1.1.A: Create Calculator HTML Structure

**What:** Create the HTML skeleton with display area and button grid layout.

**Acceptance Criteria:**
- [x] `index.html` contains a display element with id `display`
- [x] Button grid contains digits 0-9
- [x] Button grid contains operators: +, −, ×, ÷, %, =
- [x] Button grid contains C (clear) and AC (all clear) buttons
- [x] Button grid contains decimal point button
- [x] All buttons have `data-*` attributes for JavaScript targeting

**Files:**
- Create: `index.html` — Main HTML file with calculator markup

**Depends On:** None

**Spec Reference:** Architecture Overview, File Structure

---

#### Task 1.1.B: Create Calculator Styles

**What:** Style the calculator with responsive CSS for desktop and mobile.

**Acceptance Criteria:**
- [x] Calculator is centered on the page
- [x] Display area shows current value with right-aligned text
- [x] Button grid uses CSS Grid with 4 columns
- [x] All buttons have minimum 44×44px touch targets
- [x] Layout adapts to mobile (full-width) and desktop (max-width container)
- [x] Buttons have visible hover/active states

**Files:**
- Create: `styles.css` — All calculator styling

**Depends On:** Task 1.1.A

**Spec Reference:** Responsive Design Breakpoints

---

### Step 1.2: Calculator State & Display

#### Task 1.2.A: Implement Calculator State Management

**What:** Create the state object and display update function.

**Acceptance Criteria:**
- [x] State object contains: `displayValue`, `firstOperand`, `operator`, `waitingForSecondOperand`
- [x] Initial state sets `displayValue` to "0", others to null/false
- [x] `updateDisplay()` function updates the display element with current `displayValue`
- [x] `allClear()` resets state to initial values
- [x] Tests verify initial state values and allClear behavior

**Files:**
- Create: `calculator.js` — Calculator logic module
- Modify: `index.html` — Add script tag

**Depends On:** Task 1.1.A

**Spec Reference:** Data Model, Calculator State

---

### Step 1.3: Core Operations

#### Task 1.3.A: Implement Digit Input

**What:** Handle digit button clicks and update display.

**Acceptance Criteria:**
- [x] `inputDigit(digit)` appends digit to displayValue
- [x] Leading zero is replaced (except for "0.")
- [x] After operator pressed, new digit replaces display (waitingForSecondOperand)
- [x] Tests verify: "0" + "5" = "5", "12" + "3" = "123", operator + "7" starts fresh

**Files:**
- Modify: `calculator.js` — Add inputDigit function

**Depends On:** Task 1.2.A

**Spec Reference:** Core Functions, inputDigit

---

#### Task 1.3.B: Implement Decimal Input

**What:** Handle decimal point with duplicate prevention.

**Acceptance Criteria:**
- [x] `inputDecimal()` adds "." to displayValue
- [x] Multiple decimal presses are ignored (only one "." allowed)
- [x] After operator, decimal starts new number as "0."
- [x] Tests verify: "5" + "." = "5.", "5.2" + "." = "5.2" (ignored)

**Files:**
- Modify: `calculator.js` — Add inputDecimal function

**Depends On:** Task 1.3.A

**Spec Reference:** Core Functions, inputDecimal

---

#### Task 1.3.C: Implement Clear Functions

**What:** Implement C (clear entry) and AC (all clear) functionality.

**Acceptance Criteria:**
- [x] `clear()` resets displayValue to "0" but preserves operator and firstOperand
- [x] `allClear()` resets entire calculator state (already done in 1.2.A, wire to button)
- [x] Tests verify clear preserves pending operation, allClear resets everything

**Files:**
- Modify: `calculator.js` — Add clear function, wire AC/C buttons

**Depends On:** Task 1.3.A

**Spec Reference:** Core Functions, clear, allClear

---

#### Task 1.3.D: Implement Arithmetic Operations

**What:** Implement operator handling and calculation.

**Acceptance Criteria:**
- [x] `inputOperator(op)` stores firstOperand and operator, sets waitingForSecondOperand
- [x] `calculate()` performs arithmetic: add, subtract, multiply, divide
- [x] Chained operations work: "2 + 3 +" calculates intermediate result (5)
- [x] Division by zero displays "Error"
- [x] Percentage converts displayValue to decimal (e.g., 50 → 0.5)
- [x] Tests verify all four operations, chaining, division by zero, percentage

**Files:**
- Modify: `calculator.js` — Add inputOperator, calculate, handlePercent functions

**Depends On:** Task 1.3.B

**Spec Reference:** Core Functions, Operator Mapping, Edge Cases

---

### Phase 1 Checkpoint

**Automated:**
- [ ] All tests pass
- [ ] No JavaScript errors in browser console

**Manual Verification:**
- [ ] Calculator displays in browser
- [ ] Click 2 + 3 = shows 5
- [ ] Click 10 ÷ 0 = shows Error
- [ ] AC clears everything, C clears current entry only
- [ ] Chained operation: 2 + 3 + 4 = shows 9

---

## Phase 2: Input & Polish

**Goal:** Add keyboard support, backspace, and final polish.

### Pre-Phase Setup

Human must complete before agents begin:

- [ ] Phase 1 checkpoint approved

---

### Step 2.1: Keyboard Support

#### Task 2.1.A: Implement Keyboard Input

**What:** Add keyboard event listener with full key mapping.

**Acceptance Criteria:**
- [ ] Number keys 0-9 input digits
- [ ] Operator keys (+, -, *, /) trigger operations (× for *, ÷ for /)
- [ ] Enter and = trigger calculate
- [ ] Escape triggers allClear
- [ ] Backspace removes last digit from displayValue
- [ ] Tests verify all key mappings

**Files:**
- Modify: `calculator.js` — Add keyboard event listener and backspace function

**Depends On:** Task 1.3.D

**Spec Reference:** Keyboard Mapping

---

### Step 2.2: Final Polish

#### Task 2.2.A: Add README and Final Cleanup

**What:** Create README with usage instructions, verify all edge cases.

**Acceptance Criteria:**
- [ ] README.md explains what the calculator does
- [ ] README.md lists keyboard shortcuts
- [ ] README.md has instructions to run locally (open index.html)
- [ ] All edge cases from spec are handled (empty backspace → "0", etc.)

**Files:**
- Create: `README.md` — Project documentation

**Depends On:** Task 2.1.A

**Spec Reference:** Edge Cases & Boundary Conditions

---

### Phase 2 Checkpoint

**Automated:**
- [ ] All tests pass
- [ ] No JavaScript errors in browser console

**Manual Verification:**
- [ ] Keyboard input works for all mapped keys
- [ ] Backspace removes last digit
- [ ] Calculator works on mobile viewport
- [ ] All features match PRODUCT_SPEC.md MVP requirements
