
// Constant Variables 
const operationButtons = document.querySelectorAll('.operation');
const currentOperandAndTextElement = document.querySelector('.current-operand');
const oldOperandAndTextElement = document.querySelector('.old-operand');
const allClearButtons = document.querySelector('#all-clear');
const deleteButtons = document.querySelector('#delete');
const equalsButtons = document.querySelector('#equals');
const numberButtons = document.querySelectorAll('.number');
const calculator = new Calculator(oldOperandAndTextElement, currentOperandAndTextElement);



class Calculator {
    constructor(oldOperandAndTextElement, currentOperandAndTextElement) {
        this.oldOperandAndTextElement = oldOperandAndTextElement;
        this.currentOperandAndTextElement = currentOperandAndTextElement;
        this.clear();
    };

    // Clear function
    clear() {
        this.currentOperand = '';
        this.oldOperand = '';
        this.operation = undefined;
    };

    // Delete function
    delete() {
        // splice takes all those numbers in the currentOperand string from the 
        // very first to the second to last variable and takes the last one off
        this.currentOperand = this.currentOperand.toString().slice(0, -1); 
       }

    // Adds the next number to current number on screen as a string
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    
    // Identifies operation buttons
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        // if previous operand is not equal to an empty string, we want to compute
        if (this.oldOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.oldOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    // Computes the data we have printed on screen
    compute() {
        // 'let calculation' is just the result of our compute function
        let calculation;
        // turns both of these into a number that allows a decimal
        const old = parseFloat(this.oldOperand);
        const current = parseFloat(this.currentOperand);
        // checks if we dont have an old or current value to compute, just cancels the function through return
        if (isNaN(old) || isNaN(current)) return;
        // if there are numbers, do this with these specific operators
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
    };
    
    // This is a helper function:
    // take our string, make it into a number, if it isn't a number dont do anything,
    // if it is, translate it to EN-US, which will add commas to numbers that require it due to length
    getDisplayNumber(number) {
        // this makes it so that we can see the decimal point, and it assigns
        // what is left of the decimal as an integer and what is right as a decimal
        // number

        // converts string to number
        const stringNumber = number.toString();
        // converts number to array to separate with decimal starting at index 0
        const integerNumber = parseFloat(stringNumber.split('.')[0]);
        // this places the following numbers after the decimal starting at index 1
        const decimalNumber = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerNumber)) {
            integerDisplay = '';
        } else {
            // this makes sure you can only have one decimal per calculation
            // and adds a comma to long enough numbers
            integerDisplay = integerNumber.toLocaleString('en-US', {
                maximumFractionDigits: 0 });
        }
        if (decimalNumber != null) {
            return `${integerDisplay}.${decimalNumber}`;
        } else {
        return integerDisplay;
        };
    };

    // runs each number from operation through getDisplayNumber, formats it to EN
    // and then runs through the next number to see if it has to format it again and then
    // throws it to the display
    updateDisplay() {
    this.currentOperandAndTextElement.innerText = 
    this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
        this.oldOperandAndTextElement.innerText = 
        `${this.getDisplayNumber(this.oldOperand)} ${this.operation}`;
        // below makes it so that when we clear, it clears the old operand as well
    } else {
        this.oldOperandAndTextElement.innerText = '';
        };
    };
};



// EVENTS

numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        calculator.appendNumber(event.target.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        calculator.chooseOperation(event.target.innerText);
        calculator.updateDisplay();
    })
})

equalsButtons.addEventListener('click', (event) => {
        calculator.compute(event.target.innerText);
        calculator.updateDisplay();
    });


allClearButtons.addEventListener('click', (event) => {
        calculator.clear(event.target.innerText);
        calculator.updateDisplay();
    });

deleteButtons.addEventListener('click', (event) => {
        calculator.delete(event.target.innerText);
        calculator.updateDisplay();
    });











