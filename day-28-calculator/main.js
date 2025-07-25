const calculatorBtns = {
    firstRow: ['AC', "DE", ".", "/"],
    secondRow: ["7", "8", "9", "*"],
    thirdRow: ["4", "5", "6", "-"],
    fourthRow: ["1", "2", "3", "+"],
    fifthRow: ["00", "0", "="],
}
const container = document.querySelector('.container');

// the claculator
const calculator = document.createElement('div');
calculator.classList.add('calculator');

// the calculator body
const calculatorForm = document.createElement('form');
calculatorForm.innerHTML = `
    <div class="result">
        <input type="text" name="result" placeholder='000'>
    </div>
`;

for (let row in calculatorBtns) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    calculatorBtns[row].forEach(btnText => {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.textContent = btnText;
        button.classList.add('calc-btn');
        rowDiv.appendChild(button);
    })
    calculatorForm.appendChild(rowDiv);
}

calculator.appendChild(calculatorForm);
container.appendChild(calculator);

// calculator logic:
const calcBtns = document.querySelectorAll('.calc-btn');
const calcResult = document.querySelector('.result input');
const restrictedKeys = ['/', '.', '*'];

function checkCalc(btn) {
        if (restrictedKeys.includes(btn.textContent) &&
            calcResult.value == "") {
            return; 
        }

        if (btn.textContent != "AC" && 
            btn.textContent != "DE" &&
            btn.textContent != "=") {
            calcResult.value += btn.textContent;
        } else if (btn.textContent == "AC") {
            calcResult.value = "";
        } else if (btn.textContent == "DE") {
            calcResult.value = calcResult.value.toString()
            .slice(0, -1);
        } else if (btn.textContent == "=") {
            if(calcResult.value == "") return; 
            calcResult.value = eval(calcResult.value).toFixed(2);
        }
        }

calcBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('clicked');
        setTimeout(() => {
            btn.classList.remove('clicked');
        }, 400);
        checkCalc(btn);
    })
})
const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '+', '-', '*', '/', '.', 'Backspace', 'Delete',
        'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', '(', ')'];

function keyboardBtns(e) {

    if (calcResult.value == "" && restrictedKeys.includes(e.key)) {
        e.preventDefault();
    }
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
    } else if (e.key == "Enter") {
        e.preventDefault();
            if(calcResult.value == "") return; 
            calcResult.value = eval(calcResult.value);
    }
}


calcResult.addEventListener('keydown', keyboardBtns)



