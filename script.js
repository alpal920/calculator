/*
==========
DOM Setup
https://dev.to/chrisblakely01/let-s-build-a-basic-calculator-using-flexbox-and-vanilla-javascript-5f9l 
==========
*/
const buttonsContainer = document.querySelector(".buttons-container");

//DOM Functions
function createButtons() {
  const buttonNames = [
    "7",
    "8",
    "9",
    "clear",
    "delete",
    "4",
    "5",
    "6",
    "x",
    "÷",
    "1",
    "2",
    "3",
    "+",
    "-",
    ".",
    "0",
    "=",
  ];
  const operations = ["+", "-", "x", "÷"];
  const clearDeletes = ["clear", "delete"];
  for (let i = 0; i < buttonNames.length; i++) {
    let calcButton = document.createElement("BUTTON");
    calcButton.classList.add("calc-button");
    calcButton.textContent = buttonNames[i];
    if (buttonNames[i] === "=") {
      // For example, if you want the third button to take double space
      calcButton.classList.add("equalSign"); // Add a class to the button
    } else if (operations.includes(buttonNames[i])) {
      calcButton.classList.add("operations");
    } else if (clearDeletes.includes(buttonNames[i])) {
      calcButton.classList.add("clearDelete");
    }
    buttonsContainer.appendChild(calcButton);
  }
}
createButtons();

/*
==========
CALCULATOR
==========
*/

//Calculator Variables
let num1 = 0;
let num2 = 0;
let operator = "";
let total = 0;
//Calculator Operations
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(num1, num2, operator) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    if (num2 !== 0) {
      return divide(num1, num2);
    } else {
      return "Error";
    }
  }
}

/*
================
Event Listeners 
================
*/
