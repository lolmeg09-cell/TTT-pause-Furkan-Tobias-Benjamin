(() => {
  const DEFAULT_TIME = 900;
  const STORAGE_KEY = "pauseTimer";

  const timer = document.getElementById("timer");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");

  if (!timer) return;

  const defaultState = () => ({
    status: "idle",
    remaining: DEFAULT_TIME,
    endTime: null,
    alerted: true
  });

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function readState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && ["idle", "running", "paused", "finished"].includes(saved.status)) {
        return saved;
      }
    } catch {
      // Use the default timer if saved data is invalid.
    }

    return defaultState();
  }

  if (!localStorage.getItem(STORAGE_KEY)) {
    saveState(defaultState());
  }

  function getRemaining(state) {
    if (state.status === "running" && Number.isFinite(state.endTime)) {
      return Math.max(0, Math.ceil((state.endTime - Date.now()) / 1000));
    }

    return Math.max(0, Number(state.remaining) || 0);
  }

  function formatTime(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0")
    );
  }

  let isEditing = false;

  function updateTimer() {
    if (isEditing) return;

    let state = readState();
    const remaining = getRemaining(state);

    if (state.status === "running" && remaining === 0) {
      state = {
        status: "finished",
        remaining: 0,
        endTime: null,
        alerted: false
      };
      saveState(state);
    }

    timer.textContent = formatTime(remaining);

    if (start) {
      if (state.status === "running") start.textContent = "Pause";
      else if (state.status === "paused") start.textContent = "Continue";
      else if (state.status === "finished") start.textContent = "Start again";
      else start.textContent = "Start";
    }

    if (state.status === "finished" && !state.alerted &&
        document.visibilityState === "visible") {
      state.alerted = true;
      saveState(state);
      alert("Time's up!");
    }
  }

  function startTimer() {
    const state = readState();

    if (state.status === "running") {
      saveState({
        status: "paused",
        remaining: getRemaining(state),
        endTime: null,
        alerted: true
      });
      updateTimer();
      return;
    }

    let remaining = getRemaining(state);

    if (state.status === "finished" || remaining === 0) {
      remaining = DEFAULT_TIME;
    }

    saveState({
      status: "running",
      remaining,
      endTime: Date.now() + remaining * 1000,
      alerted: false
    });

    updateTimer();
  }

  function stopTimer() {
    const state = readState();

    if (state.status !== "running") return;

    saveState({
      status: "paused",
      remaining: getRemaining(state),
      endTime: null,
      alerted: true
    });

    updateTimer();
  }

  function resetTimer() {
    saveState(defaultState());
    updateTimer();
  }

  function formatInput(digits) {
    const padded = digits.padStart(3, "0");
    return padded.slice(0, -2) + ":" + padded.slice(-2);
  }

  function editTimer() {
    if (readState().status === "running" || isEditing) return;

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.className = "timer-input";

    let digits = timer.textContent.replace(/\D/g, "").slice(-4) || "0";
    input.value = formatInput(digits);

    isEditing = true;
    timer.replaceWith(input);
    input.focus();
    input.select();

    function cancelEdit() {
      if (!isEditing) return;
      isEditing = false;
      input.replaceWith(timer);
      updateTimer();
    }

    function applyEdit() {
      if (!isEditing) return;

      const [minuteText, secondText] = input.value.split(":");
      const minutes = Number.parseInt(minuteText, 10) || 0;
      const seconds = Math.min(59, Number.parseInt(secondText, 10) || 0);
      const newTime = minutes * 60 + seconds;

      isEditing = false;
      input.replaceWith(timer);

      if (newTime > 0) {
        saveState({
          status: "paused",
          remaining: newTime,
          endTime: null,
          alerted: true
        });
      }

      updateTimer();
    }

    input.addEventListener("input", () => {
      digits = input.value.replace(/\D/g, "").slice(-4) || "0";
      input.value = formatInput(digits);
      input.setSelectionRange(input.value.length, input.value.length);
    });

    input.addEventListener("blur", applyEdit);

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") input.blur();
      if (event.key === "Escape") cancelEdit();
    });
  }

  start?.addEventListener("click", startTimer);
  stop?.addEventListener("click", stopTimer);
  reset?.addEventListener("click", resetTimer);
  timer.addEventListener("click", editTimer);

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) updateTimer();
  });

  document.addEventListener("visibilitychange", updateTimer);
  setInterval(updateTimer, 1000);

  updateTimer();
})();