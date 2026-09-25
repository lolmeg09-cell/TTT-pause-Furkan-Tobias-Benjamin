const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset")
const timer = document.getElementById("timer")

const DEFAULT_TIME = 900;

let timeLeft = 900;  
let interval;
let endTime = null; // timestamp (ms) when the timer should hit 0

const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  timer.innerHTML = `${minutes.toString().padStart(2,"0")}
  :
  ${seconds.toString().padStart(2,"0")}`;
}

const tick = () => {
  const remainingMs = endTime - Date.now();
  timeLeft = Math.max(0, Math.round(remainingMs / 1000));
  updateTimer();

  if (timeLeft <= 0) {
    clearInterval(interval);
    interval = null;
    endTime = null;
    alert("Time's up!");
    timeLeft = DEFAULT_TIME;
    updateTimer();
  }
};

const startTimer = () => {
  if (interval) return;
  endTime = Date.now() + timeLeft * 1000;
  interval = setInterval(tick, 250); // frequent enough to stay accurate, cheap when active
};

const editTimer = () => {
  if (interval) return;

  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "numeric";
  input.className = "timer-input";

  const formatDisplay = (d) => {
    const padded = d.padStart(3, "0");
    const secs = padded.slice(-2);
    const mins = padded.slice(0, -2);
    return `${mins}:${secs}`;
  };

  let digits = timer.textContent.replace(":", "").replace(/^0+(?=\d)/, "");
  if (!digits) digits = "0";
  digits = digits.slice(-4);

  input.value = formatDisplay(digits);
  timer.replaceWith(input);
  input.focus();
  input.select();

  input.addEventListener("input", () => {
    const typed = input.value.replace(/\D/g, "");
    digits = (typed.slice(-4)) || "0";
    input.value = formatDisplay(digits);
    input.setSelectionRange(input.value.length, input.value.length);
  });

  const applyEdit = () => {
    const [minPart, secPart] = input.value.split(":").map(p => parseInt(p, 10));
    const minutes = Number.isNaN(minPart) ? 0 : Math.max(0, minPart);
    const seconds = Number.isNaN(secPart) ? 0 : Math.min(59, Math.max(0, secPart));

    timeLeft = minutes * 60 + seconds;
    input.replaceWith(timer);
    updateTimer();
  };

  input.addEventListener("blur", applyEdit);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
    if (e.key === "Escape") { input.value = timer.textContent; input.blur(); }
  });
};  

const stopTimer = () => {
  clearInterval(interval);
  interval = null;
  endTime = null;
};

const resetTimer = () => {
  clearInterval(interval);
  interval = null;
  endTime = null;
  timeLeft = DEFAULT_TIME;
  updateTimer();
};

// Re-sync immediately when the tab becomes visible again,
// instead of waiting for the next throttled tick
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && interval && endTime) {
    tick();
  }
});

timer.addEventListener("click", editTimer);
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);