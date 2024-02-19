const recordButton = document.getElementById("record-button");
const time = document.getElementById("time");

var song;
var mic;
var recording = false;
var startTime;
var endTime;

function preload () {
    song = loadSound('race-start-beeps.mp3');
}

function setup () {
    mic = new p5.AudioIn();
}

function draw () {
    if (recording) {
        var volume = mic.getLevel();
        console.log(volume);

        if (volume > 0.02) {
            stop();
        }

        if (startTime != null && endTime == null) {
            now = new Date().getTime();
            time.innerHTML = (now - startTime) / 1000;
        }
    }
}

function toggleRecording () {
    if (recording) {
        recordButton.innerHTML = "Start Recording";
        mic.stop();
    } else {
        recordButton.innerHTML = "Stop Recording";    
        getAudioContext().resume();
        mic.start();
        song.play();
        setTimeout(() => {
            song.stop();
            start();
        }, 3500);
    }

    recording = !recording;
}

function start () {
    startTime = new Date().getTime();
    time.innerHTML = 0;
}

function stop () {
    endTime = new Date().getTime();
    time.innerHTML = (endTime - startTime) / 1000;
}

function reset () {
    startTime = null;
    endTime = null;
    if (recording) {
        toggleRecording();
    }
}
