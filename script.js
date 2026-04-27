let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let resultDisplayed = false;

const divide = function(a, b) {
  if (b === 0) return "nice try!";
  return a / b;
};

const subtract = function(a, b) { return a - b; };
const multiply = function(a, b) { return a * b; };
const add = function(a, b) { return a + b; };

function operate(operator, a, b) {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return divide(a, b);
}

const digitButtons = document.querySelectorAll(".btn-digit");
const operatorButtons = document.querySelectorAll(".btn-operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const currentDisplay = document.querySelector("#current");
const expressionDisplay = document.querySelector("#expression");

function updateDisplay(value) {
  currentDisplay.textContent = value;
}

digitButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const digit = button.dataset.digit;

    if (resultDisplayed) {
      firstNumber = "";
      resultDisplayed = false;
    }

    if (currentOperator === "") {
      if (digit === "." && firstNumber.includes(".")) return;
      firstNumber += digit;
      updateDisplay(firstNumber);
    } else {
      if (digit === "." && secondNumber.includes(".")) return;
      secondNumber += digit;
      updateDisplay(secondNumber);
    }
  });
});

operatorButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    if (firstNumber === "") return;

    if (firstNumber !== "" && secondNumber !== "" && currentOperator !== "") {
      const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
      firstNumber = String(Math.round(result * 1e10) / 1e10);
      secondNumber = "";
      updateDisplay(firstNumber);
    }

    currentOperator = button.dataset.operator;
    expressionDisplay.textContent = firstNumber + " " + currentOperator;

    operatorButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

equalsButton.addEventListener("click", function() {
  if (firstNumber === "" || currentOperator === "" || secondNumber === "") return;

  const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
  expressionDisplay.textContent = firstNumber + " " + currentOperator + " " + secondNumber + " =";
  firstNumber = String(Math.round(result * 1e10) / 1e10);
  secondNumber = "";
  currentOperator = "";
  updateDisplay(firstNumber);
  resultDisplayed = true;
  operatorButtons.forEach(btn => btn.classList.remove("active"));
});

clearButton.addEventListener("click", function() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  resultDisplayed = false;
  updateDisplay("0");
  expressionDisplay.textContent = "";
  operatorButtons.forEach(btn => btn.classList.remove("active"));
});