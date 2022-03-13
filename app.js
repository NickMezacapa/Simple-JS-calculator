const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');
const tempResult = document.querySelector('.tempResult');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.clearAll');
const clearLastEntityEl = document.querySelector('.clearLastEntity');

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersEl.forEach(number => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot){
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot){
            return;
        }
        dis2Num += e.target.innerText;
        display2.innerText = dis2Num;
    });
});

operationEl.forEach(operation => {
    operation.addEventListener('click', (e) => {
        if (!dis2Num) result;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation){
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    });
});

function clearVar(name = ''){
    dis1Num += dis2Num + ' ' + name + ' ';
    display1.innerText = dis1Num;
    display2.innerText = '';
    dis2Num = '';
    tempResult.innerText = result;
}

function mathOperation(){
    if (lastOperation === 'x'){
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equalEl.addEventListener('click', (e) => {
    if ( !dis2Num || !dis1Num ) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2.innerText = result;
    tempResult.innerText = '';
    dis2Num = result;
    dis1Num = '';
});

clearAllEl.addEventListener('click', (e) => {
    display1.innerText = '0';
    display2.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    result = '';
    tempResult.innerText = '0';
});

clearLastEntityEl.addEventListener('click', (e) => {
    display2.innerText = '';
    dis2Num = '';
});

// Add keyboard functionality

window.addEventListener('keydown', (e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
    ){
        clickButtonEl(e.key);
    } else if (
        e.key === '+' ||
        e.key === '/' ||
        e.key === '-' ||
        e.key === '%' 
    ){
        clickOperation(e.key);
    } else if (e.key === '*'){
        clickOperation('x');
    } else if (e.key == 'Enter' || e.key === '='){
        clickEqual();
    } else if (e.key == 'c'){
        clickClear();
    } else if (e.key == 'Backspace'){
        clickClearLast();
    }
});

function clickButtonEl(key){
    numbersEl.forEach(button => {
        if (button.innerText === key){
            button.click();
        }
    })
}

function clickOperation(key){
    operationEl.forEach(button => {
        if (button.innerText === key){
            button.click();
        }
    })
}

function clickClear() {
    clearAllEl.click();
}

function clickClearLast() {
    clearLastEntityEl.click();
}

function clickEqual(){
    equalEl.click();
}