/*
==========
DOM Setup
https://dev.to/chrisblakely01/let-s-build-a-basic-calculator-using-flexbox-and-vanilla-javascript-5f9l 
==========
*/
const buttonsContainer = document.querySelector(".buttons-container");

//DOM Functions
function createGrid(columns, rows) {
  //4 columns, 5 rows = 20 buttons (gridCells).
  for (let i = 0; i < columns; i++) {
    let column = document.createElement("div");
    column.classList.add("grid-column");
    for (let j = 0; j < rows; j++) {
      let gridCell = document.createElement("div");
      gridCell.classList.add("grid-cell");
      column.appendChild(gridCell);
    }
    buttonsContainer.appendChild(column);
  }
}
createGrid(4, 5);

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
