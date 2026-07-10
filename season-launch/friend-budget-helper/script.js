const totalAmountInput = document.getElementById("totalAmount");
const peopleCountInput = document.getElementById("peopleCount");
const serviceFeeInput = document.getElementById("serviceFee");
const discountInput = document.getElementById("discount");
const calculateButton = document.getElementById("calculateButton");
const resultElement = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");

function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0
  }).format(amount);
}

function calculateSplitBill() {
  const totalAmount = Number(totalAmountInput.value);
  const peopleCount = Number(peopleCountInput.value);
  const serviceFeePercent = Number(serviceFeeInput.value || 0);
  const discount = Number(discountInput.value || 0);

  resultElement.classList.add("hidden");
  errorMessage.textContent = "";

  if (!totalAmount || totalAmount <= 0) {
    errorMessage.textContent = "Please enter a valid total amount.";
    return;
  }

  if (!peopleCount || peopleCount <= 0) {
    errorMessage.textContent = "Please enter a valid number of people.";
    return;
  }

  if (discount < 0 || serviceFeePercent < 0) {
    errorMessage.textContent = "Service fee and discount cannot be negative.";
    return;
  }

  const serviceFee = totalAmount * (serviceFeePercent / 100);
  const finalTotal = Math.max(totalAmount + serviceFee - discount, 0);
  const eachPersonPays = finalTotal / peopleCount;

  resultElement.innerHTML = `
    <h3>Split Result</h3>
    <p class="amount">${formatMoney(eachPersonPays)}</p>
    <p>Each person should pay approximately this amount.</p>
    <p><strong>Original total:</strong> ${formatMoney(totalAmount)}</p>
    <p><strong>Service fee:</strong> ${formatMoney(serviceFee)}</p>
    <p><strong>Discount:</strong> ${formatMoney(discount)}</p>
    <p><strong>Final total:</strong> ${formatMoney(finalTotal)}</p>
    <p><strong>People:</strong> ${peopleCount}</p>
  `;

  resultElement.classList.remove("hidden");
}

calculateButton.addEventListener("click", calculateSplitBill);