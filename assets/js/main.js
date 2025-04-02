let musicPlayer = document.querySelector(".music-player-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = document.createElement("audio");
document.body.appendChild(currentTrack); // Attach audio element to the document

let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function () {
    isHidden = !isHidden;

    if (isHidden) {
        musicPlayer.classList.remove("hide");
        togglePlayer.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';
        trackInfo.style.transitionDelay = "0.4s";
        trackNav.style.transitionDelay = "0.4s";
    } else {
        musicPlayer.classList.add("hide");
        togglePlayer.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
        trackInfo.style.transitionDelay = "0s";
        trackNav.style.transitionDelay = "0s";
    }
});

let soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'https://lottie.host/6af96953-c497-4513-9128-210fc6bab62c/mgF9l9sS8S.json',
});

let trackList = [
    {
        name: "Play it",
        artist: "Коля Кузьмак",
        path: "./assets/musics/1.mp3"
    },
    {
        name: "Real time",
        artist: "Остра Тирнина",
        path: "./assets/musics/2.mp3"
    },
    {
        name: "Best music",
        artist: "Настя Балог",
        path: "./assets/musics/3.mp3"
    },
    {
        name: "Want more",
        artist: "LeriOne",
        path: "./assets/musics/4.mp3"
    }
];

function loadTrack(trackIndex) {
    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.autoplay = false;
    currentTrack.addEventListener("ended", nextTrack);
}

loadTrack(trackIndex);

function playPauseTrack() {
    if (!isPlaying) {
        playTrack();
    } else {
        pauseTrack();
    }
}

function playTrack() {
    currentTrack.play()
        .then(() => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
            soundBarsLottie.playSegments([3, 36], true);
        })
        .catch(error => console.error("Playback failed:", error));
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
    soundBarsLottie.stop();
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    trackIndex = trackIndex > 0 ? trackIndex - 1 : trackList.length - 1;
    loadTrack(trackIndex);
    playTrack();
}

// Add event listeners
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

