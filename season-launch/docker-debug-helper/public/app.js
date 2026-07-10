let bugs = [];
let currentIndex = 0;

const titleElement = document.getElementById("bug-title");
const errorElement = document.getElementById("bug-error");
const causeElement = document.getElementById("bug-cause");
const fixElement = document.getElementById("bug-fix");
const nextButton = document.getElementById("next-button");

function showBug(index) {
  const bug = bugs[index];

  titleElement.textContent = bug.title;
  errorElement.textContent = bug.error;
  causeElement.textContent = bug.cause;
  fixElement.textContent = bug.fix;
}

async function loadBugs() {
  try {
    const response = await fetch("/api/bugs");
    bugs = await response.json();
    showBug(currentIndex);
  } catch (error) {
    titleElement.textContent = "Failed to load bug scenarios";
    errorElement.textContent = error.message;
    causeElement.textContent = "The frontend could not fetch data from the backend API.";
    fixElement.textContent = "Check whether the server is running correctly.";
  }
}

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % bugs.length;
  showBug(currentIndex);
});

loadBugs();