document.querySelector("button").addEventListener("click", ageCalculator);

function ageCalculator() {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const birthYear = parseInt(yearInput.value, 10);
  const birthMonth = parseInt(monthInput.value, 10) - 1;
  const birthDay = parseInt(dayInput.value, 10);
  
  const dayError = document.getElementById("day-error");
  const monthError = document.getElementById("month-error");
  const yearError = document.getElementById("year-error");
  const today = new Date();

  const labels = document.querySelectorAll(".age-input p");

  [dayInput, monthInput, yearInput].forEach(input => input.style.border = "1px solid var(--primaryPurple)");
  [dayError, monthError, yearError].forEach(error => error.style.display = "none");
  labels.forEach(label => label.style.color = "inherit");

  const requiredFields = [
    { input: dayInput, error: dayError },
    { input: monthInput, error: monthError },
    { input: yearInput, error: yearError },
  ];
  let hasError = false;

  requiredFields.forEach(({ input, error }) => {
    if (!input.value) {
      input.style.border = "1px solid var(--primaryRed)";
      error.textContent = "This field is required";
      error.style.display = "block";
      hasError = true;
    }
  });

  if (hasError) {
    labels.forEach(label => label.style.color = "var(--primaryRed)");
    return;
  }

  if (birthDay < 1 || birthDay > 31) {
    dayInput.style.border = "1px solid var(--primaryRed)";
    dayError.textContent = "Must be a valid day";
    dayError.style.display = "block";
    if (birthMonth < 1 || birthMonth > 12) {
      monthInput.style.border = "1px solid var(--primaryRed)";
      monthError.textContent = "Must be a valid month";
      monthError.style.display = "block";
      if (birthYear > today.getFullYear()) {
      yearInput.style.border = "1px solid var(--primaryRed)";
      yearError.textContent = "Must be a valid year";
      yearError.style.display = "block";
      hasError = true;
      }
    } 
  }

  const chosenDate = new Date(birthYear, birthMonth, birthDay);

  if (
    chosenDate.getDate() !== birthDay ||
    chosenDate.getMonth() !== birthMonth ||
    chosenDate > today
    ) {
      [dayError, monthError, yearError].forEach(error => {
        error.textContent = "Must be a valid date";
        dayInput.style.border = "1px solid var(--primaryRed)";
        monthInput.style.border = "1px solid var(--primaryRed)";
        yearInput.style.border = "1px solid var(--primaryRed)";
        error.style.display = "block";
      })
      labels.forEach(label => label.style.color = "var(--primaryRed)");
      return;
    }

  let years = today.getFullYear() - birthYear;
  let months = today.getMonth() - birthMonth;
  let days = today.getDate() - birthDay;

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += lastDayOfMonth;
  }

  document.getElementById("yrs-output").textContent = years;
  document.getElementById("mth-output").textContent = months;
  document.getElementById("days-output").textContent = days;
}
