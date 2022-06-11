const dateInput = document.querySelector("#date");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", () => {
  if (dateInput.value == "") {
    return alert("Utilize uma data válida");
  }

  const date = new Date(dateInput.value);
  const convertedDate = date.getTime();

  window.location.href = `/contador.html?date=${convertedDate}`;
});
