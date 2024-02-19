const recordButton = document.getElementById("record-button");
const time = document.getElementById("time");

var mic;
var recording = false;
var startTime;
var endTime;

function setup () {
    mic = new p5.AudioIn();
}

function draw () {
    if (recording) {
        var volume = mic.getLevel();
        console.log(volume);

        if (volume > 0.2) {
            startOrStop();
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
    }

    recording = !recording;
}

function startOrStop () {
    if (startTime == null) {
        startTime = new Date().getTime();
    } else {
        endTime = new Date().getTime();
        time.innerHTML = (endTime - startTime) / 1000;
    }
}

function reset () {
    startTime = null;
    endTime = null;
    if (recording) {
        toggleRecording();
    }
}
