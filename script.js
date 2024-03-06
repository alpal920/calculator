/*
to add: 
keyboard event listeners 

bugs: 
- if clicking = before num1 is assigned, should result in original num 
- bug with 0: 
1 + 3 = 4 
4 * 100 = 0 

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
  //this is for creating each button and adding styling/text to each button
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

//Calculator Variables - Global scope
let total = 0;
let num1 = "";
let num2 = "";
let operator = "";
let listOfOperators = ["+", "-", "x", "÷"];
let calculationStatus = "calculating first pair";

let pastCalculations = []; //this is doing nothing for now

//Calculator Operations
function add(a, b) {
  total = a + b;
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

function operate(n1, n2, o) {
  if (o === "+") {
    add(n1, num2);
  } else if (o === "-") {
    subtract(n1, n2);
  } else if (operator === "x") {
    multiply(n1, n2);
  } else if (o === "÷") {
    divide(n1, n2);
  }
  return Number(total.toFixed(2)); //rounds to 2 decimal places
}

//clears calculator
function allClear() {
  displayScreen.textContent = "";
  total = 0;
  num1 = "";
  num2 = "";
  operator = "";
  pastCalculations = [];
  calculationStatus = "calculating first pair";
}

function resetDisplay() {
  //this is where diplay screen is updated with total and num1 is saved
  displayScreen.textContent = total;
  pastCalculations.push(total);
  num1 = total;
  num2 = "";
  operator = "";
  resetNum2Status = false;
  calculationStatus = "first total calculated";
}

let resetNum2Status = false;

function resetDisplayForNum2() {
  displayScreen.textContent = "";
}

/*
================
Event Listeners 
================
*/

function populateDisplay() {
  const calcButtons = document.querySelectorAll(".calc-button");

  for (const button of calcButtons) {
    button.addEventListener("click", function () {
      if (!isNaN(Number(button.textContent)) || button.textContent === ".") {
        //if button selected is a number or decimal
        if (calculationStatus === "calculating first pair") {
          displayScreen.textContent += button.textContent;
        } else if (calculationStatus === "first total calculated") {
          if (num2 === "" && resetNum2Status === false) {
            resetDisplayForNum2();
            resetNum2Status = true;
          }
          displayScreen.textContent += button.textContent;
        }
      } else if (
        button.textContent === "+/-" &&
        displayScreen.textContent !== ""
      ) {
        displayScreen.textContent = Number(displayScreen.textContent) * -1;
        pastCalculations.push("+/-");
      } else if (
        button.textContent === "%" &&
        displayScreen.textContent !== ""
      ) {
        displayScreen.textContent = Number(displayScreen.textContent) / 100;
        pastCalculations.push("%");
      } else {
        //if the button clicked is not a number, assign the numbers

        if (num1 === "") {
          num1 = Number(displayScreen.textContent);
          pastCalculations.push(num1);
        } else if (num1 !== "") {
          if (pastCalculations[pastCalculations.length - 1] === "+/-") {
            num1 = Number(displayScreen.textContent);
          } else {
            num2 = Number(displayScreen.textContent); //this is a BUG
            //need to set num2 back to empty, not save the total in num2
            //allow for 0's to be entered
            pastCalculations.push(num2);
          }
        }
        //assign the operator
        if (listOfOperators.includes(button.textContent)) {
          operator = button.textContent;
          pastCalculations.push(operator);
          displayScreen.textContent = ""; //reset the display screen to empty
        }
        if (button.textContent === "=") {
          console.log(num1, num2); //num2 is auto-setting to 0
          total = operate(num1, num2, operator);
          pastCalculations.push("=");
          resetDisplay();
        }
        if (button.textContent === "AC") {
          allClear();
        }
      }

      console.log(pastCalculations);
    });
  }
}
populateDisplay();
