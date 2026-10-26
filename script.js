/* ================= PAGE NAVIGATION ================= */

const pages = [
    document.getElementById("page1"),
    document.getElementById("page2"),
    document.getElementById("page3"),
    document.getElementById("endPage")
];

const audio = document.getElementById("loveSong");

function showPage(pageNumber) {
    pages.forEach(page => {
        page.classList.remove("active");
    });

    pages[pageNumber - 1].classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= PAGE 1 BUTTON ================= */

document.getElementById("startButton").addEventListener("click", () => {
    showPage(2);
});


/* ================= BACK BUTTONS ================= */

document.getElementById("backToPage1").addEventListener("click", () => {
    showPage(1);
});

document.getElementById("backToPage2").addEventListener("click", () => {
    showPage(2);
});


/* ================= YES BUTTON ================= */

document.getElementById("yesButton").addEventListener("click", () => {
    showPage(3);
});


/* ================= NO BUTTON ================= */

/*
    Clicking NO ends the experience.
    It does not continue to the love letter.
*/

document.getElementById("noButton").addEventListener("click", () => {

    audio.pause();

    document.getElementById("playIcon").textContent = "▶";

    showPage(4);

});


/* ================= CLOSE ENDING ================= */

document.getElementById("closeButton").addEventListener("click", () => {

    audio.pause();

    document.getElementById("playIcon").textContent = "▶";

    // Return to the beginning if she chooses to close the surprise.
    showPage(1);

});


/* ================= MUSIC PLAYER ================= */

const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");

const progressBar = document.getElementById("progressBar");

const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

const volumeButton = document.getElementById("volumeButton");
const volumeIcon = document.getElementById("volumeIcon");


/* Format seconds into minutes and seconds */

function formatTime(seconds) {

    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}


/* Play or pause */

playButton.addEventListener("click", async () => {

    if (audio.paused) {

        try {

            await audio.play();

            playIcon.textContent = "Ⅱ";

        } catch (error) {

            playIcon.textContent = "▶";

            alert(
                "The song could not play. Make sure music.mp3 is uploaded to your GitHub repository."
            );

        }

    } else {

        audio.pause();

        playIcon.textContent = "▶";

    }

});


/* Update the duration when the file loads */

audio.addEventListener("loadedmetadata", () => {

    durationDisplay.textContent = formatTime(audio.duration);

});


/* Update the progress bar while playing */

audio.addEventListener("timeupdate", () => {

    currentTimeDisplay.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {

        progressBar.value =
            (audio.currentTime / audio.duration) * 100;

    }

});


/* Allow the user to move through the song */

progressBar.addEventListener("input", () => {

    if (Number.isFinite(audio.duration) && audio.duration > 0) {

        audio.currentTime =
            (Number(progressBar.value) / 100) * audio.duration;

    }

});


/* Change the play button when the song is paused */

audio.addEventListener("pause", () => {

    playIcon.textContent = "▶";

});


/* Change the play button when playback starts */

audio.addEventListener("play", () => {

    playIcon.textContent = "Ⅱ";

});


/* Reset the player when the song ends */

audio.addEventListener("ended", () => {

    playIcon.textContent = "▶";

    progressBar.value = 0;

    currentTimeDisplay.textContent = "0:00";

});


/* Mute or unmute */

volumeButton.addEventListener("click", () => {

    audio.muted = !audio.muted;

    volumeIcon.textContent = audio.muted ? "🔇" : "🔊";

});


/* ================= FLOATING HEARTS ================= */

const heartContainer = document.getElementById("floatingHearts");

const heartCharacters = ["♥", "♡", "❤"];

function createHeart() {

    // Avoid creating too many hearts.
    if (heartContainer.childElementCount > 16) {
        return;
    }

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.textContent =
        heartCharacters[Math.floor(Math.random() * heartCharacters.length)];

    heart.style.left = `${Math.random() * 100}%`;

    heart.style.fontSize = `${12 + Math.random() * 15}px`;

    heart.style.animationDuration = `${5 + Math.random() * 4}s`;

    heartContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });

}


/* Create hearts periodically */

setInterval(createHeart, 700);
