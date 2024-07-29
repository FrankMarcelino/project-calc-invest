import { generateReturnArrays } from './src/investmentGoals.js';

const calculateButton = document.getElementById('calculate-results');

function renderProgression() {
  const startingAmountEl = Number(document.getElementById('starting-amount').value);
  const additionalContributionEl = Number(document.getElementById('additional-contribution').value);
  const timeAmountEl = Number(document.getElementById('time-amount').value);
  const timeAmountPeriodEl = document.getElementById('time-amount-period').value;
  const returnRatePeriodEl = document.getElementById('envaluation-period').value;
  const returnRateEl = Number(document.getElementById('return-rate').value);
  const taxRateEl = Number(document.getElementById('tax-rate').value);

  const returnsArray = generateReturnArrays(
    startingAmountEl, 
    timeAmountEl, 
    timeAmountPeriodEl, 
    additionalContributionEl, 
    returnRateEl, 
    returnRatePeriodEl, 
    taxRateEl
  );

  console.log(returnsArray);
}

function validateImput() {
  for (const formElement of form){
    
  }
}

calculateButton.addEventListener('click', renderProgression);