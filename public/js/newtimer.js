document.addEventListener("DOMContentLoaded", () => {
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");
  const timer = document.getElementById("timer");
  const timerSetup = document.getElementById("timerSetup");
  const minutesInput = document.getElementById("minutesInput");
  const secondsInput = document.getElementById("secondsInput");

  let timeLeft = 0;
  let interval = null;
  let isConfigured = false;

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.textContent =
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");
  }

  function startTimer() {
    if (!isConfigured) {
      const minutes = Number(minutesInput.value) || 0;
      const seconds = Number(secondsInput.value) || 0;

      timeLeft = minutes * 60 + seconds;

      if (timeLeft <= 0) {
        alert("Choose a time greater than zero.");
        return;
      }

      isConfigured = true;
      timerSetup.hidden = true;
      timer.hidden = false;
      updateTimer();
    }

    if (interval !== null) {
      clearInterval(interval);
      interval = null;
      start.textContent = "Continue";
      return;
    }

    start.textContent = "Pause";

    interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval);
        interval = null;
        start.textContent = "Start";
        alert("Time is up!");
        return;
      }

      timeLeft--;
      updateTimer();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
    interval = null;

    if (isConfigured) {
      start.textContent = "Continue";
    }
  }

  function resetTimer() {
    clearInterval(interval);
    interval = null;
    isConfigured = false;

    timerSetup.hidden = false;
    timer.hidden = true;
    start.textContent = "Start";
  }

  start.addEventListener("click", startTimer);
  stop.addEventListener("click", stopTimer);
  reset.addEventListener("click", resetTimer);
});