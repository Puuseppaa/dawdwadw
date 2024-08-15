// musicPlayer.js

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.querySelector('audio');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const stopButton = document.getElementById('stopButton');

    playButton.addEventListener('click', () => {
        audio.play();
    });

    pauseButton.addEventListener('click', () => {
        audio.pause();
    });

    stopButton.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
    });
});