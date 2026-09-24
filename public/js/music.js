const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const slider = document.getElementById('slider');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
  

//songs
const songs = [
    {name: 'Ambient1', artist: 'Blix', src: './music/Ambient.mp3'},
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.name;
    artist.innerText = song.artist;
    audio.src = song.src;
}

function playSong() {
   playBtn.innerText = '⏸ pause'
   audio.play()
}

function pauseSong() {
  playBtn.innerText = '► Play';
  audio.pause();
}

function togglePlay() {
    const isPlaying = !audio.paused;
    isPlaying ? pauseSong() : playSong();
}
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function formatTime (seconds) {
   if (isNaN(seconds)) return '0:00'
   const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateProgress () {
    const { currentTime, duration } = audio;
    slider.value = (currentTime / duration) * 100 || 0;
        currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = formatTime(duration);
}

function setProgress() {
    const duration = audio.duration
     audio.currentTime = (slider.value / 100) * duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
slider.addEventListener('input', setProgress);
audio.addEventListener('loadedmetadata', updateProgress);
audio.addEventListener('ended', nextSong);


loadSong(songs[songIndex]);