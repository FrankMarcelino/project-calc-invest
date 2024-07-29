import { Input } from 'postcss';
import { generateReturnArrays } from './src/investmentGoals.js';

const calculateButton = document.getElementById('calculate-results');
const form = document.getElementById('investment-form');

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector('.error')) {
    return;
  }
  const startingAmountEl = Number(
    document.getElementById('starting-amount').value.replace(',', '.'),
  );
  const additionalContributionEl = Number(
    document.getElementById('additional-contribution').value.replace(',', '.'),
  );
  const timeAmountEl = Number(document.getElementById('time-amount').value);
  const timeAmountPeriodEl =
    document.getElementById('time-amount-period').value;
  const returnRatePeriodEl =
    document.getElementById('envaluation-period').value;
  const returnRateEl = Number(
    document.getElementById('return-rate').value.replace(',', '.'),
  );
  const taxRateEl = Number(
    document.getElementById('tax-rate').value.replace(',', '.'),
  );

  const returnsArray = generateReturnArrays(
    startingAmountEl,
    timeAmountEl,
    timeAmountPeriodEl,
    additionalContributionEl,
    returnRateEl,
    returnRatePeriodEl,
    taxRateEl,
  );

  console.log(returnsArray);
}

function validateInput(evt) {
  if (evt.target.value === '') {
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(',', '.');

  if (!parentElement.classList.contains('error') && isNaN(inputValue) || Number(inputValue) < 0) {
    const errorTextElement = document.createElement('p');
    errorTextElement.classList.add('text-red-500');
    errorTextElement.textContent = 'Insira um valor numerico e maior que zero';
    parentElement.classList.add('error');
    grandParentElement.appendChild(errorTextElement);
  }else if (parentElement.classList.contains('error') && !isNaN(inputValue) || Number(inputValue) > 0) {
    parentElement.classList.remove('error');
    grandParentElement.removeChild(grandParentElement.lastChild);
  }
}

for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}

form.addEventListener('submit', renderProgression);

