/*
Issues: 
- display screen should limit amount of numbers on the screen 
- after making first calculation, storing the total as num1 does not work 
- how to do multiple calculations at once 

Low Priority: 
- make . , +/-, % work 

To Add: 
- add a function to add onto the running total (if pastcalculations.length-2 === "=") 

==========
DOM Setup
==========
*/
const buttonsContainer = document.querySelector(".buttons-container");
const displayScreen = document.querySelector(".screen-container");

//DOM Functions

function createButtons() {
  const operations = ["+", "-", "x", "÷", "=", "+/-", "%"];
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
let num1 = "";
let num2 = "";

let operator = "";

let pastCalculations = []; //this is doing nothing for now

//Calculator Operations
function add(a, b) {
  total = a + b;
  console.log(total);
}
function subtract(a, b) {
  total = a - b;
}
function multiply(a, b) {
  total = a * b;
}
function divide(a, b) {
  total = a / b;
}

function operate(num1, num2, operator) {
  if (operator === "+") {
    add(num1, num2);
  } else if (operator === "-") {
    subtract(num1, num2);
  } else if (operator === "x") {
    multiply(num1, num2);
  } else if (operator === "÷") {
    if (num2 !== 0) {
      divide(num1, num2);
    } else {
      displayScreen.textContent = "Error"; //this isn't working
      total = 0;
    }
  }
  //this is where diplay screen is updated with total and num1 is saved
  displayScreen.textContent = total;
  pastCalculations.push(total);
  console.log(pastCalculations);
  num1 = total;
  console.log("num1:", num1);
  num2 = "";
  console.log("num2:", num2);
  operator = "";
}

//clears calculator
function allClear() {
  displayScreen.textContent = "";
  total = 0;
  num1 = "";
  num2 = "";
  operator = "";
  pastCalculations = [];
}

//initiate calculation
function performCalculation() {
  operate(num1, num2, operator);
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
let operators = ["+", "-", "x", "÷"];

function populateDisplay() {
  const calcButtons = document.querySelectorAll(".calc-button");
  for (const button of calcButtons) {
    button.addEventListener("click", function () {
      //only allows values to be shown in display screen (excludes decimal, operators, clears)
      if (!isNaN(parseInt(button.textContent))) {
        pastCalculations.push(parseInt(button.textContent));
        displayScreen.textContent += parseInt(button.textContent);
        console.log(displayScreen.textContent);
      } else {
        pastCalculations.push(button.textContent);
        //if the button clicked is not a number
        //assign the numbers
        if (num1 === "") {
          num1 = parseInt(displayScreen.textContent);
          displayScreen.textContent = "";
        } else if (num1 !== "") {
          num2 = parseInt(displayScreen.textContent);
        }
        //assign the operator
        if (operators.includes(button.textContent)) {
          operator = button.textContent;
          console.log(button.textContent);
        }
        if (button.textContent === "=") {
          operate(num1, num2, operator); // after calculating total, if press another number, bug
        }
        if (button.textContent === "AC") {
          allClear();
        }
      }
    });
  }
}
populateDisplay();
