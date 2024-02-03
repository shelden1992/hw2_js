const VIDEO_TIME_KEY = 'currentTimeVideo';
const VOLUME_KEY = 'currentVolume';
const initMetadata = (videoPlayer, totalDuration, timeline) => {
    videoPlayer.addEventListener('loadedmetadata', () => {
        const videoDuration = videoPlayer.duration;
        totalDuration.textContent = formatTime(videoDuration);
        timeline.max = Math.floor(videoDuration);
    })

};

function initPlayer() {
    const videoPlayer = document.getElementById("videoPlayer");
    const playPauseButton = document.getElementById("playPauseVideo");
    const stopVideoButton = document.getElementById("stopVideo");
    const rangeInput = document.getElementById("volumeControl");
    const totalDuration = document.getElementById("totalDuration");
    const timeline = document.getElementById("timeline");
    const currentTime = document.getElementById("currentTime");

    initMetadata(videoPlayer, totalDuration, timeline);
    initDefaultParamsFromLocalStorage(videoPlayer, rangeInput, timeline, currentTime);

    playPauseButton.addEventListener('click', () => togglePlay(videoPlayer));
    stopVideoButton.addEventListener('click', () => toggleStop(videoPlayer));
    rangeInput.addEventListener('click', () => changeVolume(videoPlayer, rangeInput));
    timeline.addEventListener('click', () => toggleTimeLine(videoPlayer, currentTime, timeline));
    videoPlayer.addEventListener('timeupdate', () => timeUpdate(videoPlayer, currentTime, timeline));
}

document.addEventListener('DOMContentLoaded', initPlayer)

const timeUpdate = (videoPlayer, currentTime, timeline) => {
    const videoPlayerTime = videoPlayer.currentTime;
    currentTime.textContent = formatTime(videoPlayerTime);
    localStorage.setItem(VIDEO_TIME_KEY, videoPlayerTime);
    timeline.value = videoPlayerTime;
};

const toggleTimeLine = (videoPlayer, currentTime, timeline) => {
    const value = timeline.value;
    currentTime.textContent = formatTime(value);
    videoPlayer.currentTime = value;
};

const changeVolume = (videoPlayer, rangeInput) => {
    const currentVolume = rangeInput.value;
    videoPlayer.volume = currentVolume;
    localStorage.setItem(VOLUME_KEY, currentVolume)
};

const togglePlay = videoPlayer => {

    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
};

const toggleStop = videoPlayer => {
    videoPlayer.currentTime = 0;
    videoPlayer.pause();
};

const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds - minutes * 60);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const initDefaultParamsFromLocalStorage = (videoPlayer, rangeInput, timeline, currentTime) => {
    const videoStoredTime = localStorage.getItem(VIDEO_TIME_KEY);
    const videoStoredVolume = localStorage.getItem(VOLUME_KEY);

    if (videoStoredTime) {
        videoPlayer.currentTime = videoStoredTime;
        timeline.value = videoStoredTime;
        currentTime.textContent = formatTime(videoStoredTime);
    }

    if (videoStoredVolume) {
        videoPlayer.volume = videoStoredVolume;
        rangeInput.value = videoStoredVolume;
    }
};