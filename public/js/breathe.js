const container_b = document.getElementById('container_b');
const text = document.getElementById('text');
const breatheBtn = document.getElementById('breathe-btn');
const pointerContainer = document.querySelector('.pointer-container');

const totaltime = 7500;
const breatheTime = (totaltime / 5) * 2;
const holdTime = totaltime / 5;

let isBreathing = false;
let breatheInterval = null;
let holdTimeout = null;
let outTimeout = null;

function breatheAnimation() {
  text.innerText = 'Breathe In';
  container_b.classList.remove('grow', 'shrink');
  container_b.classList.add('grow');

   holdTimeout = setTimeout(() => {
    text.innerText = 'Hold';

    outTimeout = setTimeout(() => {
      text.innerText = 'Breathe Out';
      container_b.classList.remove('grow', 'shrink');
      container_b.classList.add('shrink');
    }, holdTime);
  }, breatheTime);
}

function startBreathing() {
  if (isBreathing) return;
  isBreathing = true;
  breatheBtn.innerText = 'Stop';

  pointerContainer.classList.add('spinning');
  breatheAnimation();
  breatheInterval = setInterval(breatheAnimation, totaltime);
}

function stopBreathing() {
  isBreathing = false;
  breatheBtn.innerText = 'Start Breathing';

  clearInterval(breatheInterval);
  breatheInterval = null;

  clearTimeout(holdTimeout);   
  clearTimeout(outTimeout);    
  holdTimeout = null;
  outTimeout = null;

  text.innerText = '';
  container_b.classList.remove('grow', 'shrink');
  pointerContainer.classList.remove('spinning');
}

breatheBtn.addEventListener('click', () => {
  if (isBreathing) {
    stopBreathing();
  } else {
    startBreathing();
  }
}); 