/*
Issues: 
- the operators are not working 
- Need to figure out how to calculate the first pair, when num1 and num2 are nothing 

==========
DOM Setup
==========
*/
const buttonsContainer = document.querySelector(".buttons-container");
const displayScreen = document.querySelector(".screen-container");

//DOM Functions
function createButtons() {
  const buttonNames = [
    "AC",
    "+/-",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];
  const operations = ["+", "-", "x", "÷", "=", "+/-", "%"];
  const clearDeletes = ["AC"];
  for (let i = 0; i < buttonNames.length; i++) {
    let calcButton = document.createElement("BUTTON");
    calcButton.classList.add("calc-button");
    calcButton.textContent = buttonNames[i];
    if (buttonNames[i] === "0") {
      calcButton.classList.add("zeroButton");
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
let total = 0;
let num1 = total;
let num2 = 0;
let operator = "";

let displayValues = []; //this is doing nothing for now
let performOperation = false;

//Calculator Operations
function add(a, b) {
  total += a + b;
}
function subtract(a, b) {
  total += a - b;
}
function multiply(a, b) {
  total += a * b;
}
function divide(a, b) {
  total += a / b;
}

function operate(num1, num2, operator) {
  if (operator === "+") {
    add(num1, num2);
  } else if (operator === "-") {
    subtract(num1, num2);
  } else if (operator === "*") {
    multiply(num1, num2);
  } else if (operator === "/") {
    if (num2 !== 0) {
      divide(num1, num2);
    } else {
      displayScreen.textContent = "Error";
      total = 0;
    }
  }
  displayScreen.textContent = total;
  performOperation = false;
  num1 = total;
  operator = "";
}

//clears calculator
function allClear() {
  displayScreen.textContent = "";
  total = 0;
  num1 = total;
  num2 = 0;
  operator = "";
  performCalculation = false;
}

//initiate calculation
function performCalculation() {
  performOperation === true;
  operate();
}

/*
Make the calculator work! You’ll need to store the first number and second number that 
are input into the calculator, utilize the operator that the user selects, 
and then operate() on the two numbers when the user presses the “=” key.
*/

/*
================
Event Listeners 
================
*/

function populateDisplay() {
  const calcButtons = document.querySelectorAll(".calc-button");
  for (const button of calcButtons) {
    button.addEventListener("click", function () {
      //only allows values to be shown in display screen (excludes decimal, operators, clears)
      if (!isNaN(parseInt(button.textContent))) {
        displayScreen.textContent += parseInt(button.textContent);
      } else if (button.textContent === "AC") {
        allClear();
      } else if (isNaN(parseInt(button.textContent))) {
        num2 = parseInt(displayScreen.textContent);
        operator = button.textContent;
        performCalculation();
      }
    });
  }
}
populateDisplay();
