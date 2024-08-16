let runningTOtal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}
function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}
function handleMath(value) {


    const intBuffer = parseInt(buffer);
    if (runningTOtal === 0) {
        runningTOtal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTOtal += intBuffer;
    } else if (previousOperator === "-") {
        runningTOtal -= intBuffer;
    } else if (previousOperator === "x") {
        runningTOtal *= intBuffer;
    } else {
        runningTOtal /= intBuffer;
    }
    
}

function handleSymbol(value) {
    switch (value) {
        case "c":
            buffer = "0";
            runningTOtal = 0;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningTOtal;
            runningTOtal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "x":
        case "÷":
            handleMath(value);
            break;
    }
}
function rerender() {
    screen.innerText = buffer;
}

function init() {
    document.querySelector(".calc-buttons") .addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
    });

}

init();