import init, {wasmCycle, wasmFib, wasmIterate} from "../pkg/hello_wasm.js";

const cycleWasmTextEl = document.getElementById('cycle-wasm-result');
const cycleJsTextEl = document.getElementById('cycle-js-result');
const cycleEnterBtnEl = document.getElementById('cycle-enter-btn');
const cycleInputEl = document.getElementById('cycle-input');
const cycleDescriptionEl = document.getElementById('cycle-description');

const fibWasmTextEl = document.getElementById('fib-wasm-result');
const fibJsTextEl = document.getElementById('fib-js-result');
const fibEnterBtnEl = document.getElementById('fib-enter-btn');
const fibInputEl = document.getElementById('fib-input');
const fibDescriptionEl = document.getElementById('fib-description');


const arrayWasmTextEl = document.getElementById('array-wasm-result');
const arrayJsTextEl = document.getElementById('array-js-result');
const arrayEnterBtnEl = document.getElementById('array-enter-btn');
const arrayInputEl = document.getElementById('array-input');
const arrayDescriptionEl = document.getElementById('array-description');

const maxIterationCount = 100_000_000;
const maxArrayIterationCount = 500_000;
const maxFibValue = 44;

const arrayLength = 10000;
const defaultArrayValue = 0;

//
cycleEnterBtnEl.addEventListener('click', () => {
    const strIterationCount = cycleInputEl.value;
    const iterationCount = +strIterationCount;

    if (!isStart(iterationCount, maxIterationCount)) return;

    cycleInputEl.value = '';

    const jsResult = calcTime(jsDefaultCycle, iterationCount);
    const wasmResult = calcTime(wasmDefaultCycle, iterationCount);

    setInfo(cycleJsTextEl, jsResult, cycleWasmTextEl, wasmResult, cycleDescriptionEl);
});

function wasmDefaultCycle(iterationCount) {
    return wasmCycle(iterationCount);
}

function jsDefaultCycle(iterationCount) {
    let result = 0;

    for (let i = 0; i < iterationCount; i++) {
        result += 2;
    }

    return result;
}
//


//
arrayEnterBtnEl.addEventListener('click', () => {
    const strIterationCount = arrayInputEl.value;
    const iterationCount = +strIterationCount;

    if (!isStart(iterationCount,maxArrayIterationCount)) return;

    arrayInputEl.value = '';
    const jsResult = calcTime(iterateJsArray, iterationCount);
    const wasmResult = calcTime(iterateWasmArray, iterationCount);

    setInfo(arrayJsTextEl, jsResult, arrayWasmTextEl, wasmResult, arrayDescriptionEl);
});


function iterateWasmArray(iterationCount) {
    return wasmIterate(iterationCount);
}

function iterateJsArray(iterationCount) {
    const array = new Array(arrayLength).fill(defaultArrayValue);

    for (let i = 0; i < iterationCount; i++) {
        array.forEach((value, index) => {
            array[index] = array[index] + 2;
        });
    }

    return array;
}
//


// FIBONACCI START
fibEnterBtnEl.addEventListener('click', () => {
    const strN = fibInputEl.value;
    const n = +strN;

    if (!isStart(n, maxFibValue)) return;

    fibInputEl.value = '';

    const jsResult = calcTime(calcJsFib, n);
    const wasmResult = calcTime(calcWasmFib, n);

    setInfo(fibJsTextEl, jsResult, fibWasmTextEl, wasmResult, fibDescriptionEl);
    fibWasmTextEl.innerText = calcTime(calcWasmFib, n);
    fibJsTextEl.innerText = calcTime(calcJsFib, n);
});

function calcWasmFib(n) {
    return wasmFib(n);
}

function calcJsFib(n) {
    return n <= 1 ? n : calcJsFib(n - 1) + calcJsFib(n - 2);
}
// FIBONACCI END

// COMMON START
function calcTime(func, iterationCount) {
    const startTime = Date.now();
    const res = func(iterationCount);
    console.log(res);
    const endTime = Date.now();
    return endTime - startTime;
}

function isStart(iterationCount, maxValue) {
    const isNumber = isFinite(iterationCount);

    return !(!iterationCount || iterationCount > maxValue || !isNumber);
}

function setInfo(resultJsTextEl, jsValue, resultWasmTextEl, wasmValue, descriptionTextEl) {
    resultJsTextEl.innerText = jsValue + 'ms';
    resultWasmTextEl.innerText = wasmValue + 'ms';
    descriptionTextEl.innerText = getDescription(jsValue, wasmValue);
}

function getDescription(jsValue, wasmValue) {
    if(jsValue > wasmValue) {
        const percents = calcPercents(jsValue, wasmValue);
        const differance = jsValue - wasmValue;
        return `WebAssembly ${differance}ms (${percents}%) faster that JavaScript`
    } else if (jsValue < wasmValue) {
        const percents = calcPercents(wasmValue, jsValue);
        const differance = wasmValue - jsValue;
        return `JavaScript ${differance}ms (${percents}%) faster that WebAssembly`
    } else {
        return `The speed is the same`
    }
}

function calcPercents(biggerValue, smallerValue) {
    const result = 100 - (smallerValue / biggerValue) * 100;
    return result.toFixed();
}
//COMMON END

init();