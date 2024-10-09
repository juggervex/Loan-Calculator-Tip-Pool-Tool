window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const amountInput = document.getElementById("loan-amount");
  const yearsInput = document.getElementById("loan-years");
  const rateInput = document.getElementById("loan-rate");
  // Set default values
  const defaultValues = { amount: 10000, years: 10, rate: 4.5 };

  amountInput.value = defaultValues.amount;
  yearsInput.value = defaultValues.years;
  rateInput.value = defaultValues.rate;

  // Calculate and update the initial monthly payment
  const monthlyPayment = calculateMonthlyPayment(defaultValues);
  updateMonthly(monthlyPayment);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValues = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(currentValues);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const principal = values.amount;
  const yearlyInterestRate = values.rate;
  const years = values.years;

  const monthlyInterestRate = (yearlyInterestRate / 100) / 12;
  const numberOfPayments = years * 12;

  const numerator = monthlyInterestRate * principal;
  const denominator = 1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments);

  const monthlyPayment = numerator / denominator;

  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPaymentElement = document.getElementById("monthly-payment");
  monthlyPaymentElement.innerText = "$" + monthly;
}
