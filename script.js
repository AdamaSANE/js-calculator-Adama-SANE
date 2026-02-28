const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentValue = "";
let previousValue = "";
let operator = null;

// Update display
function updateDisplay(value) {
  display.textContent = value || "0";
}

// Handle number input
function handleNumber(value) {
  if (value === "." && currentValue.includes(".")) return;
  currentValue += value;
  updateDisplay(currentValue);
}

// Handle operator input
function handleOperator(op) {
  if (!currentValue) return;
  if (previousValue) calculate();
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

// Perform calculation
function calculate() {
  let result;
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operator = null;
  previousValue = "";
  updateDisplay(currentValue);
}

// Clear calculator
function clearCalculator() {
  currentValue = "";
  previousValue = "";
  operator = null;
  updateDisplay("0");
}

// Delete last digit
function deleteLast() {
  currentValue = currentValue.slice(0, -1);
  updateDisplay(currentValue);
}

// Event listeners
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    const action = button.dataset.action;
    const op = button.dataset.operator;

    if (button.classList.contains("number")) {
      handleNumber(value);
    }

    if (op) {
      handleOperator(op);
    }

    if (action === "equals") {
      calculate();
    }

    if (action === "clear") {
      clearCalculator();
    }

    if (action === "delete") {
      deleteLast();
    }
  });
});
