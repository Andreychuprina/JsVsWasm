import init, {wasmLoop, wasmFib, wasmArrayLoop} from "../pkg/hello_wasm.js";

const loopWasmTextEl = document.getElementById('loop-wasm-result');
const loopJsTextEl = document.getElementById('loop-js-result');
const loopEnterBtnEl = document.getElementById('loop-enter-btn');
const loopInputEl = document.getElementById('loop-input');
const loopDescriptionEl = document.getElementById('loop-description');

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

//DEFAULT LOOP START
loopEnterBtnEl.addEventListener('click', () => {
    const strIterationCount = loopInputEl.value;
    const iterationCount = +strIterationCount;

    if (!isStart(iterationCount, maxIterationCount)) return;

    loopInputEl.value = '';

    const jsResult = calcTime(jsDefaultLoop, iterationCount);
    const wasmResult = calcTime(wasmDefaultLoop, iterationCount);

    setInfo(loopJsTextEl, jsResult, loopWasmTextEl, wasmResult, loopDescriptionEl);
});

function wasmDefaultLoop(iterationCount) {
    return wasmLoop(iterationCount);
}

function jsDefaultLoop(iterationCount) {
    let result = 0;

    for (let i = 0; i < iterationCount; i++) {
        result += 2;
    }

    return result;
}
//DEFAULT LOOP END


//ARRAY LOOP START
arrayEnterBtnEl.addEventListener('click', () => {
    const strIterationCount = arrayInputEl.value;
    const iterationCount = +strIterationCount;

    if (!isStart(iterationCount,maxArrayIterationCount)) return;

    arrayInputEl.value = '';
    const jsResult = calcTime(loopJsArray, iterationCount);
    const wasmResult = calcTime(loopWasmArray, iterationCount);

    setInfo(arrayJsTextEl, jsResult, arrayWasmTextEl, wasmResult, arrayDescriptionEl);
});


function loopWasmArray(iterationCount) {
    return wasmArrayLoop(iterationCount);
}

function loopJsArray(iterationCount) {
    const array = new Array(arrayLength).fill(defaultArrayValue);

    for (let i = 0; i < iterationCount; i++) {
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i] + 1;
        }
    }

    return array;
}
//ARRAY LOOP END


// FIBONACCI START
fibEnterBtnEl.addEventListener('click', () => {
    const strN = fibInputEl.value;
    const n = +strN;

    if (!isStart(n, maxFibValue)) return;

    fibInputEl.value = '';

    const jsResult = calcTime(calcJsFib, n);
    const wasmResult = calcTime(calcWasmFib, n);

    setInfo(fibJsTextEl, jsResult, fibWasmTextEl, wasmResult, fibDescriptionEl);
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