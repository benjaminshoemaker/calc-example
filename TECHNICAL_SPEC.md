# Technical Specification: Calculator App

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Markup | HTML5 | Semantic, accessible, no build step |
| Styling | Plain CSS | Single component, no preprocessor needed |
| Logic | Vanilla JavaScript (ES6+) | Simple state machine, no framework overhead |
| Build | None | Static files served directly |
| Hosting | Any static host | GitHub Pages, Netlify, or simple file server |

**Why no framework?** This is a single-component application with minimal state. React/Vue/Svelte would add bundle size, build complexity, and learning curve with no tangible benefit. Vanilla JS is faster to load, easier to debug, and sufficient for this scope.

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│                  index.html                 │
│  ┌───────────────────────────────────────┐  │
│  │            Calculator UI              │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │         Display Area            │  │  │
│  │  └─────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │         Button Grid             │  │  │
│  │  │   7  8  9  ÷                    │  │  │
│  │  │   4  5  6  ×                    │  │  │
│  │  │   1  2  3  −                    │  │  │
│  │  │   0  .  =  +                    │  │  │
│  │  │   C  AC    %                    │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│  styles.css          │    calculator.js     │
│  - Layout/grid       │    - State machine   │
│  - Button styles     │    - Event handlers  │
│  - Responsive rules  │    - Calculations    │
└─────────────────────────────────────────────┘
```

**Component interaction:**
1. User clicks button or presses key → Event captured
2. Event handler determines action type (digit, operator, clear, equals)
3. State machine updates internal state
4. Display re-renders with new value

## File Structure

```
calc-example/
├── index.html      # Single HTML file with calculator markup
├── styles.css      # All styling
├── calculator.js   # Calculator logic and event handling
└── README.md       # Basic usage instructions
```

## Data Model

### Calculator State

```javascript
{
  displayValue: string,      // Current value shown on display (e.g., "123.45")
  firstOperand: number|null, // Stored first operand for pending operation
  operator: string|null,     // Pending operator (+, -, *, /, %)
  waitingForSecondOperand: boolean // True after operator pressed
}
```

### Initial State

```javascript
{
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false
}
```

## Calculator Logic Interface

### Core Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `inputDigit` | `(digit: string) → void` | Append digit to display, handle leading zeros |
| `inputDecimal` | `() → void` | Add decimal point if not present |
| `inputOperator` | `(operator: string) → void` | Store operator, calculate if chaining |
| `calculate` | `() → void` | Execute pending operation, update display |
| `clear` | `() → void` | Reset display to "0", keep operand/operator |
| `allClear` | `() → void` | Reset entire calculator to initial state |
| `handlePercent` | `() → void` | Convert display value to percentage |
| `backspace` | `() → void` | Remove last digit from display |

### Operator Mapping

| Display | Internal | Operation |
|---------|----------|-----------|
| + | `+` | Addition |
| − | `-` | Subtraction |
| × | `*` | Multiplication |
| ÷ | `/` | Division |
| % | `%` | Percentage |

## Keyboard Mapping

| Key(s) | Action |
|--------|--------|
| `0-9` | Input digit |
| `.` | Input decimal |
| `+` | Addition operator |
| `-` | Subtraction operator |
| `*` or `x` | Multiplication operator |
| `/` | Division operator |
| `%` | Percentage |
| `Enter` or `=` | Calculate result |
| `Escape` | All clear |
| `Backspace` | Remove last digit |
| `c` or `C` | Clear (current entry) |

## Edge Cases & Boundary Conditions

| Scenario | Behavior |
|----------|----------|
| Division by zero | Display "Error", require AC to continue |
| Multiple decimal points | Ignore subsequent decimal inputs |
| Leading zeros | Replace "0" with digit (except for "0.") |
| Operator without first operand | Use display value as first operand |
| Consecutive operators | Replace previous operator |
| Equals without operator | No-op, display unchanged |
| Very large numbers | Use JavaScript default (exponential notation) |
| Very small decimals | Use JavaScript default precision |
| Empty display + backspace | Display "0" |
| Chained operations | `2 + 3 + ` calculates `5`, stores for next operation |

## State Management Approach

**Pattern:** Simple state object with pure update functions

```javascript
// State object (module-scoped)
let state = { ...initialState };

// Update display whenever state changes
function updateDisplay() {
  displayElement.textContent = state.displayValue;
}

// All state mutations go through update functions
function inputDigit(digit) {
  if (state.waitingForSecondOperand) {
    state.displayValue = digit;
    state.waitingForSecondOperand = false;
  } else {
    state.displayValue = state.displayValue === "0"
      ? digit
      : state.displayValue + digit;
  }
  updateDisplay();
}
```

No external state management library needed. State is a single object, mutations are explicit, and the display updates synchronously after each change.

## Responsive Design Breakpoints

| Breakpoint | Layout Adjustment |
|------------|-------------------|
| Default (mobile-first) | Full-width calculator, large touch targets (min 44px) |
| `min-width: 480px` | Centered calculator, max-width container |
| `min-width: 768px` | Slightly larger buttons, more padding |

**Touch target requirement:** All buttons minimum 44×44px for accessibility (WCAG 2.1 guideline).

## Implementation Sequence

### Phase 1: Static Structure
1. Create `index.html` with calculator markup (display + button grid)
2. Create `styles.css` with basic layout and button styling
3. Verify visual appearance matches standard calculator layout

### Phase 2: Core Logic
4. Create `calculator.js` with state object and initial state
5. Implement `inputDigit()` and `updateDisplay()`
6. Implement `inputDecimal()` with duplicate prevention
7. Implement `clear()` and `allClear()`

### Phase 3: Operations
8. Implement `inputOperator()` with operand storage
9. Implement `calculate()` with all four arithmetic operations
10. Implement operator chaining (e.g., `2 + 3 + 4 =`)
11. Implement `handlePercent()`

### Phase 4: Input Handling
12. Add click event listeners to all buttons
13. Add keyboard event listener with key mapping
14. Implement `backspace()` for keyboard delete

### Phase 5: Polish
15. Add error handling for division by zero
16. Add responsive CSS for different screen sizes
17. Test all edge cases from the edge cases table
18. Add basic README.md

## Dependencies

**None.** This project has zero external dependencies. No npm packages, no CDN links, no build tools.

## Browser Support

Target: All modern browsers (last 2 versions)
- Chrome/Edge (Chromium)
- Firefox
- Safari

No polyfills needed — using only standard ES6+ features widely supported since 2018.
