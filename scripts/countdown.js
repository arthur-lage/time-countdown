const dayText = document.querySelector(".days span");
const hoursText = document.querySelector(".hours span");
const minutesText = document.querySelector(".minutes span");
const secondsText = document.querySelector(".seconds span");

const state = {
  finalDate: 0,
  remainingTime: 0,
  setToZero: () => {
    dayText.innerHTML = "00";
    hoursText.innerHTML = "00";
    minutesText.innerHTML = "00";
    secondsText.innerHTML = "00";
  },
  update: () => {
    state.remainingTime = state.finalDate - new Date().getTime();

    let days = Math.floor(state.remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (state.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor(
      (state.remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    let seconds = Math.floor((state.remainingTime % (1000 * 60)) / 1000);

    dayText.innerHTML = days < 10 ? `0${days}` : days;
    hoursText.innerHTML = hours < 10 ? `0${hours}` : hours;
    minutesText.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    secondsText.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
  },
  init: () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    const date = params.date;
    const now = new Date().getTime();

    state.finalDate = date;
    state.remainingTime = date - now;

    if (state.remainingTime <= 0) {
      state.setToZero();
      return;
    }

    setInterval(state.update, 1000);
  },
};

window.addEventListener("load", () => {
  state.init();
});
