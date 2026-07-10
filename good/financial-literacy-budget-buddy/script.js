function getValue(id) {
  return Number(document.getElementById(id).value) || 0;
}

function formatCurrency(value) {
  return `$${value.toLocaleString()}`;
}

function calculateBudget() {
  const income = getValue("income");
  const housing = getValue("housing");
  const food = getValue("food");
  const transportation = getValue("transportation");
  const entertainment = getValue("entertainment");

  const totalExpenses = housing + food + transportation + entertainment;
  const remainingBalance = income - totalExpenses;
  const savingsRate = income > 0 ? ((remainingBalance / income) * 100).toFixed(1) : 0;

  document.getElementById("totalExpenses").textContent = formatCurrency(totalExpenses);
  document.getElementById("remainingBalance").textContent = formatCurrency(remainingBalance);
  document.getElementById("savingsRate").textContent = `${savingsRate}%`;

  const tip = generateTip(income, totalExpenses, remainingBalance, {
    housing,
    food,
    transportation,
    entertainment
  });

  document.getElementById("financialTip").textContent = tip;
}

function generateTip(income, totalExpenses, remainingBalance, expenses) {
  if (income <= 0) {
    return "Please enter your monthly income first so the tool can calculate your budget more accurately.";
  }

  if (totalExpenses === 0) {
    return "Start by adding your monthly expenses to understand where your money goes each month.";
  }

  const biggestCategory = Object.entries(expenses).sort((a, b) => b[1] - a[1])[0][0];

  if (remainingBalance < 0) {
    return `You are spending more than your monthly income. Review your ${biggestCategory} costs first and look for areas to reduce spending.`;
  }

  if (Number(remainingBalance) === 0) {
    return "You are breaking even this month. Try reducing one category slightly so you can start building savings.";
  }

  if (remainingBalance / income >= 0.2) {
    return `Great job! You are saving more than 20% of your income. Keep tracking your ${biggestCategory} category and consider setting a savings goal.`;
  }

  return `You still have some money left after expenses. Your biggest spending area is ${biggestCategory}. Small changes there could improve your savings rate.`;
}

document.getElementById("calculateBtn").addEventListener("click", calculateBudget);