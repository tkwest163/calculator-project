"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Constant Variables 
var operationButtons = document.querySelectorAll('.operation');
var currentOperandAndTextElement = document.querySelector('.current-operand');
var oldOperandAndTextElement = document.querySelector('.old-operand');
var allClearButtons = document.querySelector('#all-clear');
var deleteButtons = document.querySelector('#delete');
var equalsButtons = document.querySelector('#equals');
var numberButtons = document.querySelectorAll('.number');

var Calculator =
/*#__PURE__*/
function () {
  function Calculator(oldOperandAndTextElement, currentOperandAndTextElement) {
    _classCallCheck(this, Calculator);

    this.oldOperandAndTextElement = oldOperandAndTextElement;
    this.currentOperandAndTextElement = currentOperandAndTextElement;
    this.clear();
  }

  _createClass(Calculator, [{
    key: "clear",
    // Clear function
    value: function clear() {
      this.currentOperand = '';
      this.oldOperand = '';
      this.operation = undefined;
    }
  }, {
    key: "delete",
    // Delete function
    value: function _delete() {
      // splice takes all those numbers in the currentOperand string from the 
      // very first to the second to last variable and takes the last one off
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    } // Adds the next number to current number on screen as a string

  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    } // Identifies operation buttons

  }, {
    key: "chooseOperation",
    value: function chooseOperation(operation) {
      if (this.currentOperand === '') return; // if previous operand is not equal to an empty string, we want to compute

      if (this.oldOperand !== '') {
        this.compute();
      }

      this.operation = operation;
      this.oldOperand = this.currentOperand;
      this.currentOperand = '';
    } // Computes the data we have printed on screen

  }, {
    key: "compute",
    value: function compute() {
      // 'let calculation' is just the result of our compute function
      var calculation; // turns both of these into a number that allows a decimal

      var old = parseFloat(this.oldOperand);
      var current = parseFloat(this.currentOperand); // checks if we dont have an old or current value to compute, just cancels the function through return

      if (isNaN(old) || isNaN(current)) return; // if there are numbers, do this with these specific operators
      // switch allows a bunch of if statements on this.operation
      // keyword case takes place of if

      switch (this.operation) {
        case '+':
          calculation = old + current;
          break;

        case '-':
          calculation = old - current;
          break;

        case '*':
          calculation = old * current;
          break;

        case '÷':
          calculation = old / current;
          break;
        // when none of these items match our operation, we dont want it to do
        // any calculations

        default:
          return;
      }

      this.currentOperand = calculation;
      this.operation = undefined;
      this.oldOperand = '';
    }
  }, {
    key: "getDisplayNumber",
    // This is a helper function:
    // take our string, make it into a number, if it isn't a number dont do anything,
    // if it is, translate it to EN-US, which will add commas to numbers that require it due to length
    value: function getDisplayNumber(number) {
      // this makes it so that we can see the decimal point, and it assigns
      // what is left of the decimal as an integer and what is right as a decimal
      // number
      // converts string to number
      var stringNumber = number.toString(); // converts number to array to separate with decimal starting at index 0

      var integerNumber = parseFloat(stringNumber.split('.')[0]); // this places the following numbers after the decimal starting at index 1

      var decimalNumber = stringNumber.split('.')[1];
      var integerDisplay;

      if (isNaN(integerNumber)) {
        integerDisplay = '';
      } else {
        // this makes sure you can only have one decimal per calculation
        // and adds a comma to long enough numbers
        integerDisplay = integerNumber.toLocaleString('en-US', {
          maximumFractionDigits: 0
        });
      }

      if (decimalNumber != null) {
        return "".concat(integerDisplay, ".").concat(decimalNumber);
      } else {
        return integerDisplay;
      }

      ;
    }
  }, {
    key: "updateDisplay",
    // runs each number from operation through getDisplayNumber, formats it to EN
    // and then runs through the next number to see if it has to format it again and then
    // throws it to the display
    value: function updateDisplay() {
      this.currentOperandAndTextElement.innerText = this.getDisplayNumber(this.currentOperand);

      if (this.operation != null) {
        this.oldOperandAndTextElement.innerText = "".concat(this.getDisplayNumber(this.oldOperand), " ").concat(this.operation); // below makes it so that when we clear, it clears the old operand as well
      } else {
        this.oldOperandAndTextElement.innerText = '';
      }

      ;
    }
  }]);

  return Calculator;
}();

; // EVENTS

numberButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    calculator.appendNumber(event.target.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    calculator.chooseOperation(event.target.innerText);
    calculator.updateDisplay();
  });
});
equalsButtons.addEventListener('click', function (event) {
  calculator.compute(event.target.innerText);
  calculator.updateDisplay();
});
allClearButtons.addEventListener('click', function (event) {
  calculator.clear(event.target.innerText);
  calculator.updateDisplay();
});
deleteButtons.addEventListener('click', function (event) {
  calculator["delete"](event.target.innerText);
  calculator.updateDisplay();
});