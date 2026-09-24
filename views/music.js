const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const slider = document.getElementById('slider');
const currentTimeEl = document.getElementById('currenttime');
const durationEl = document.getElementById('duration');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
  

//songs
const songs = [
    {name: 'Ambient1', artist: 'Blix', src: 'Ambient_Sundown.mp3'},
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
    const isPlaying = !audio.Paused;
    isPlaying ? pauseSong() : playSong();
}
function prevSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

