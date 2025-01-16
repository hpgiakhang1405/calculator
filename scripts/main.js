const input = document.querySelector('.input');
const output = document.querySelector('.output');
input.textContent = '0';

function handleCurrentInput(currentInput) {
    const currentOutput = currentInput
        .replaceAll('×', '*')
        .replaceAll('÷', '/')
        .replaceAll('%', '/100')
        .replaceAll('=', '');
    const ans = eval(currentOutput);
    if (!isFinite(ans)) return 'Error';
    return '=' + ans;
}

const operators = ['+', '-', '×', '÷'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const outline = ['AC', 'delete', 'theme', '='];

function handleBtnClick(inputData) {
    if (inputData === 'theme') {
        switchTheme();
        return;
    }

    if (inputData === 'AC') input.textContent = '';

    if (input.textContent === 'Error') input.textContent = '';

    let currentInput = input.textContent;

    if (inputData === 'delete') currentInput = currentInput.slice(0, -1);
    if (inputData === '=') {
        if (operators.includes(currentInput.at(-1))) currentInput = currentInput.slice(0, -1);
        input.textContent = handleCurrentInput(currentInput);
        output.textContent = '';
        return;
    }

    if (currentInput.at(0) === '=') {
        if (numbers.includes(inputData)) currentInput = '';
        else if (currentInput.length >= 2) currentInput = currentInput.slice(1);
        else currentInput = '';
    }
    if (currentInput === '') currentInput = '0';

    if (currentInput === '0' && numbers.includes(inputData)) currentInput = '';
    if (inputData === '%' && operators.includes(currentInput.at(-1))) return;
    if (operators.includes(inputData) && operators.includes(currentInput.at(-1)))
        currentInput = currentInput.slice(0, -1);
    if (currentInput.length >= 2) {
        const prev2 = currentInput.at(-2);
        const prev1 = currentInput.at(-1);
        if (!numbers.includes(prev2) && prev2 != '.' && prev1 === '0' && numbers.includes(inputData)) return;
    }

    if (!outline.includes(inputData)) currentInput += inputData;
    input.textContent = currentInput;

    if (currentInput.at(-1) === '%' || !operators.includes(currentInput.at(-1)))
        output.textContent = handleCurrentInput(currentInput);
    if (inputData === 'AC') output.textContent = '';
    if (inputData === 'delete' && output.textContent === '=0') output.textContent = '';
}

const html = document.documentElement;
let theme = localStorage.getItem('theme');
if (!theme) theme = 'light';
html.classList.add(theme);
localStorage.setItem('theme', theme);

function switchTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
}

const btnList = document.querySelectorAll('.btn');
btnList.forEach((btn) => btn.addEventListener('click', () => handleBtnClick(btn.getAttribute('data-input'))));
