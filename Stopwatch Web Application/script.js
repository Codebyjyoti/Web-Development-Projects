let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;
let timeElapsed = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 10); 
        running = true;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeElapsed = difference;

    let hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((timeElapsed % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    timeElapsed = 0;
    display.innerHTML = "00:00:00:00";
    lapsList.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (running) {
        let hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
        let milliseconds = Math.floor((timeElapsed % 1000) / 10);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        const lapTime = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);

        lapCounter++;
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
