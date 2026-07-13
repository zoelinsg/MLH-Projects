const billInput = document.getElementById("bill-amount");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("num-people");
const tipButtons = document.querySelectorAll(".tip-btn");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const perPersonDisplay = document.getElementById("per-person-amount");

let selectedTipPercent = 15;

function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

function getTipPercent() {
  const customValue = parseFloat(customTipInput.value);
  if (!isNaN(customValue) && customTipInput.value.trim() !== "") {
    return customValue;
  }
  return selectedTipPercent;
}

function updateSplitBill(totalAmount) {
  const peopleValue = peopleInput.value.trim();

  if (peopleValue === "") {
    perPersonDisplay.textContent = "Enter the number of people to split the bill";
    perPersonDisplay.classList.add("hint");
    return;
  }

  const people = parseInt(peopleValue, 10);

  if (isNaN(people) || people < 1) {
    perPersonDisplay.textContent = "Enter at least 1 person";
    perPersonDisplay.classList.add("hint");
    return;
  }

  perPersonDisplay.classList.remove("hint");
  perPersonDisplay.textContent = formatCurrency(totalAmount / people);
}

function calculateTip() {
  const billAmount = parseFloat(billInput.value);

  if (isNaN(billAmount) || billAmount <= 0) {
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    updateSplitBill(0);
    return;
  }

  const tipPercent = getTipPercent();
  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;

  tipAmountDisplay.textContent = formatCurrency(tipAmount);
  totalAmountDisplay.textContent = formatCurrency(totalAmount);
  updateSplitBill(totalAmount);
}

tipButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    tipButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    selectedTipPercent = parseFloat(button.dataset.tip);
    customTipInput.value = "";
    calculateTip();
  });
});

billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);
customTipInput.addEventListener("input", function () {
  if (customTipInput.value.trim() !== "") {
    tipButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
  }
  calculateTip();
});

calculateTip();
