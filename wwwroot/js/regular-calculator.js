/* VARIABLES */
let pendingOperator = null;
let firstOperand;
let expressionValue;
let secondOperand = null;
let previousOperand = null;
let previousOperator = null;
let memory = 0;
let base = 10;
let currentValue = '';
let repeatOperation = false;
let isOneArgument = false;
let isTempValDisplayed = false;
let isCascade = false;

/* Adding event listeners to the buttons */
const chooseBaseRadios = document.querySelectorAll('.base');
for(let i = 0; i < chooseBaseRadios.length; i++) {
	chooseBaseRadios[i].addEventListener('change', changeBase);
}
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#sqrt').addEventListener('click', sqrt);
document.querySelector('#pr').addEventListener('click', percent);
document.querySelector('#mr').addEventListener('click',mR);
document.querySelector('#mc').addEventListener('click',mC);
document.querySelector('#mm').addEventListener('click',mMinus);
document.querySelector('#mp').addEventListener('click',mPlus);
const inputButtons = document.querySelectorAll('.input');
for(let i = 0; i < inputButtons.length; i++) {
	inputButtons[i].addEventListener('click', enter_character);
}
document.querySelector('#equal').addEventListener('click', calc);
document.querySelector('#log').addEventListener('click', log);
document.querySelector('#factorial').addEventListener('click', factorial);

/* FUNCTIONS  */

function isDigit(x) {
	return (x >=0 && x<=9) || ('abcdef'.indexOf(x) != -1);
}

function isOneArgumentMinus(char) {
	const display = document.querySelector('#display');
	return char == '-' && display.value == '';
}

function isOperator(character) {
	return '+-×÷^'.indexOf(character) != -1;
}

function clear() {
	const display = document.querySelector('#display');
	display.value = '';
}

function convertBase(number, base) {

	
	if(number.indexOf('.') != -1)
	{
		let parts = number.split('.');
		let integralPart = parseInt(parts[0], base);
		let mantissa = 0;
		for(i = 0; i < parts[1].length; i++) {
			mantissa += Math.pow(base,-(i + 1)) * parseInt(parts[1].charAt(i), base);
		}
		return mantissa + integralPart;

	}
	return parseInt(number,base);
}

function mMinus() {
	const display = document.querySelector('#display');
	memory -= convertBase(display.value, base);
}

function mPlus() {
	const display = document.querySelector('#display');
	memory += convertBase(display.value, base);
}
function mC() {
	memory = 0;	
}
function mR() {
	displayNum(memory);
}

// Funkcja dokonująca obliczeń z użyciem operatorów dwuargumentowych np. + - / * ^ itd.
function calc() {
	if(isOneArgument)
	{
		return;
	}
	const display = document.querySelector('#display');
	if(display.value == '')
		return;
	if(repeatOperation)
	{
		secondOperand = previousOperand;
		pendingOperator = previousOperator;
	}
	else
	{
		secondOperand = convertBase(display.value, base);
		previousOperand = secondOperand;
		previousOperator = pendingOperator;
	}
	switch(pendingOperator) {
		case '+':
			expressionValue = firstOperand + secondOperand;
			break;
		case '-':
			expressionValue = firstOperand - secondOperand;
			break;
		case '×':
			expressionValue = firstOperand * secondOperand;
			break;
		case '÷':
			if(secondOperand == 0)
			{
				displayError('Nie wolno dzielić przez 0!');
				return;
			}
			expressionValue = firstOperand / secondOperand;
			break;
		case '^':
			expressionValue = Math.pow(firstOperand, secondOperand);
			break;
	}
	displayNum(expressionValue);
	firstOperand = expressionValue;
	currentValue = expressionValue;
	secondOperand = null;
	pendingOperator = null;
	repeatOperation = true;
	isTempValDisplayed = true;
}
function log() {
	isOneArgument = true;
	const display = document.querySelector('#display');
	operand = convertBase(display.value, base);
	displayNum(liczba = Math.log10(operand));
	firstOperand = liczba;
	pendingOperator = null;
	isTempValDisplayed = true;
}
function sqrt() {
	isOneArgument = true;
	const display = document.querySelector('#display');
	if(display.value == '')
		return;
	let n = display.value;
	if(n < 0)
	{
		displayError('Liczba pod pierwiastkiem kwadratowym nie może być ujemna!');
		return;
	}
	displayNum(n = Math.sqrt(n));
	firstOperand = n;
	pendingOperator = null;
	isTempValDisplayed = true;
}
function percent() {
	const display = document.querySelector('#display');
	if(display.value == '')
		return;
	let percent = convertBase(display.value, base);
	if(pendingOperator == null)
	{
		displayNum(0);
		return;
	}

	secondOperand = percent;
	if(pendingOperator == '÷')
	{
		percent = firstOperand / secondOperand * 100;
		displayNum(percent);
		previousOperator = '÷';
		previousOperand = secondOperand;
		isTempValDisplayed = true;
		repeatOperation = true;
		return;
	}
	percent /= 100;
	percent *= firstOperand;
	secondOperand = percent;
	displayNum(percent);
	tmp1 = pendingOperator;
	tmp2 = firstOperand;
	calc();
	previousOperator = tmp1;
	previousOperand = tmp2;
	repeatOperation = true;
	
}

function resetuj() {
	clear();
	pendingOperator = null;
	firstOperand = null;
	firstOperand = null;
	secondOperand = null;
	expressionValue = null;
	previousOperand = null;
	previousOperator = null;
	repeatOperation = false;
	isOneArgument = false;
}
function resetButtons() {
	for(i = 0; i < 10; i++) {
		document.querySelector('#b' + i.toString()).disabled = false;
	}
	const toBeRemoved = document.querySelectorAll('.hex');
	for(let btn of toBeRemoved) {
		btn.remove();
	}
}
function factorial() {
	const display = document.querySelector('#display');
	if(display.value == '')
		return;
	isOneArgument = true;
	let n = convertBase(display.value, base);
	if(n < 0) {
		displayError('Silnia dla liczby ujemnej nie jest zdefiniowana!');
		return;
	}
	let exprVal = 1;
	if(n != 0 && n != 1) {
		for(i = 1; i <= n; i++) {
			exprVal *= i;
		}
	}
	displayNum(exprVal);
	firstOperand = convertBase(display.value);
	pendingOperator = null;
	secondOperand = null;
}

function enter_character(event) {
	const display = document.querySelector('#display');
	const char = event.currentTarget.innerHTML;
	if(display.value == '' && char == '0')
		isTempValDisplayed = true;
	if((display.value != '' && secondOperand != null && currentValue != '') || (isTempValDisplayed && isDigit(char)))
		clear();
	if(display.value == '' && char == '.')
	{
		display.value = '0.';
		return;
	}
	if(display.value.charAt(0) == '0' && display.value.length == 1 && char == '0')
		return;
	if(isOperator(char) && !isOneArgumentMinus(char))
	{
		isCascade = false;
		if(pendingOperator && display.value != '')
		{
			calc();
			currentValue = convertBase(display.value,base);
			isTempValDisplayed = true;
			isCascade = true;
		}
		isOneArgument = false;
		if(pendingOperator == null)
			firstOperand = convertBase(display.value, base);
		pendingOperator = char;
		repeatOperation = false;
		isTempValDisplayed = true;
		if(isCascade)
			 displayNum(currentValue);
		return;
	}
	isTempValDisplayed = false;
	display.value += char;
}
function displayError(mesg) {
	const display = document.querySelector('#display');
	display.value = mesg;
	setTimeout(clear, 2000);
	firstOperand = null;
	pendingOperator = null;
	previousOperator = null;
	secondOperand = null;
}
function displayNum(n) {
	const display = document.querySelector('#display');
	const bases = document.querySelectorAll('input[type=\"radio\"]')
	for(let i = 0; i < bases.length; i++) {
		if(bases[i].checked == true) {
			if(!isNaN(n))
				display.value = n.toString(Number(bases[i].value));
			base = bases[i].value;
		}
	}
}
function changeBase() {
	const display = document.querySelector('#display');
	
	displayNum(convertBase(display.value, base));
	if(display.value.search(/e[+-]/) != -1 && base != 10) {
		displayError('Niestety, nie obsługuję notacji wykładniczej w systemach niedziesiętnych ;(');
	}
	switch(base) {
		case '2':
			resetButtons();
			for(i = 2; i < 10; i++) {
				document.querySelector('#b' + i).disabled = true;
			}
		break;
		case '8':
			resetButtons();
			for(i = 8; i < 10; i++) {
				document.querySelector('#b' + i).disabled = true;
			}
		break;
		case '16':
			resetButtons();
			for(i = 0; i < 6; i++)
			{
				const buttonsToAdd = document.createElement('button');
				const logButton = document.querySelector('#log');
			        buttonsToAdd.classList.add('hex','col-sm', 'btn', 'btn-outline-info');
				buttonsToAdd.innerHTML = String.fromCharCode(97 + i);
				buttonsToAdd.addEventListener('click',enter_character);
			       document.querySelector('.last-row').insertBefore(buttonsToAdd, logButton);
			}
		break;
		default:
			resetButtons();
	}
	isTempValDisplayed = true;
}



