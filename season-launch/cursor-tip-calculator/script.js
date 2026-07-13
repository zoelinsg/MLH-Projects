const billInput = document.getElementById("bill-amount");
const customTipInput = document.getElementById("custom-tip");
const tipButtons = document.querySelectorAll(".tip-btn");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");

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

function calculateTip() {
  const billAmount = parseFloat(billInput.value);

  if (isNaN(billAmount) || billAmount <= 0) {
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    return;
  }

  const tipPercent = getTipPercent();
  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;

  tipAmountDisplay.textContent = formatCurrency(tipAmount);
  totalAmountDisplay.textContent = formatCurrency(totalAmount);
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
customTipInput.addEventListener("input", function () {
  if (customTipInput.value.trim() !== "") {
    tipButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
  }
  calculateTip();
});

calculateTip();
