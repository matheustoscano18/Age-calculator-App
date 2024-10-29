document.querySelector("button").addEventListener("click", ageCalculator);

function ageCalculator() {
  const birthYear = parseInt(document.getElementById("year").value, 10);
  const birthMonth = parseInt(document.getElementById("month").value, 10);
  const birthDay = parseInt(document.getElementById("day").value, 10);
  const today = new Date();

  if (!birthDay || !birthMonth || !birthYear) {
    alert("Please enter a valid date");
    return;
  }

  if (birthDay < 1 || birthDay > 31) {
    alert("Please enter a valid day");
    return;
  }

  if (birthMonth < 1 || birthMonth > 12) {
    alert("Please enter a valid month");
    return;
  }

  const chosenDate = new Date(birthYear, birthMonth - 1, birthDay);

  if (
    isNaN(chosenDate) ||
    chosenDate.getDate() != birthDay ||
    chosenDate > today
  ) {
    alert("Invalid date. Verify your date and try again.");
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
