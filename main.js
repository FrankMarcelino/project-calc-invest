import { Input } from 'postcss';
import { generateReturnArrays } from './src/investmentGoals.js';
import { Chart } from 'chart.js/auto';

const finalMoneyChart = document.getElementById('final-money-distribution');
const progressionChart = document.getElementById('progression');

// const calculateButton = document.getElementById('calculate-results');
const form = document.getElementById('investment-form');
const clearFormButton = document.getElementById('clear-form');

let doughnutChartReference = {};
let progressionChartReference = {};

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector('.error')) {
    return;
  }
  resetChart();
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

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];
  console.log(returnsArray)
  doughnutChartReference = new Chart(finalMoneyChart, {
    type: 'doughnut',
    data:  {
      labels: [
        'Total investido',
        'Redimento',
        'Imposto sobre lucro',
      ],
      datasets: [
        {
        data: [
          formatCurrency(finalInvestmentObject.investedAmount), 
          formatCurrency(finalInvestmentObject.totalInterestReturn * (1 - taxRateEl/100)), 
          formatCurrency(finalInvestmentObject.totalInterestReturn * (taxRateEl/100))],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
        },
      ],
    },
  });

  progressionChartReference =  new Chart(progressionChart, {
    type: 'bar',
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: 'Total Investido',
          data: returnsArray.map((investmentObject) => formatCurrency(investmentObject.investedAmount)),
          backgroundColor: 'rgb(255, 99, 132)',
        }, {
          label: 'Redimento',
          data: returnsArray.map((investmentObject) => formatCurrency(investmentObject.totalInterestReturn)),
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  })
}

function isOjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetChart(){
  if (!isOjectEmpty(doughnutChartReference) && !isOjectEmpty(progressionChartReference)) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function clearForm(evt) {
  form['starting-amount'].value = '';
  form['additional-contribution'].value = '';
  form['time-amount'].value = '';
  form['time-amount-period'].value = 'monthly';
  form['envaluation-period'].value = 'monthly';
  form['return-rate'].value = '';
  form['tax-rate'].value = '';

  resetChart();

  const errorInputsContainers = document.querySelectorAll('.error');
  for (const errorInputsContainer of errorInputsContainers) {
    errorInputsContainer.classList.remove('error');
    errorInputsContainer.parentElement.querySelector('p').remove();
  }
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
clearFormButton.addEventListener('click', clearForm);

