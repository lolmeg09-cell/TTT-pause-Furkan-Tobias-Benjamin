const container_b = document.getElementById('container_b');
const text = document.getElementById('text');

const totaltime = 7500;
const breatheTime = (totaltime / 5) * 2;
const holdTime = totaltime / 5;

breatheAnimation();

function breatheAnimation() {
  text.innerText = 'Breathe In';
  container_b.classList.remove('grow', 'shrink');
  container_b.classList.add('grow');

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out';
      container_b.classList.remove('grow', 'shrink');
      container_b.classList.add('shrink');
    }, holdTime);
  }, breatheTime);
}

setInterval(breatheAnimation, totaltime); 