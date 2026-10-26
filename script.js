
/* ================= PAGE NAVIGATION ================= */

const pages = document.querySelectorAll(".page");

function showPage(id) {
    pages.forEach(page => page.classList.remove("active"));

    const selectedPage = document.getElementById(id);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= PAGE BUTTONS ================= */

document.getElementById("startButton").addEventListener("click", () => {
    showPage("page2");
});

document.getElementById("backToPage1").addEventListener("click", () => {
    showPage("page1");
});

document.getElementById("yesButton").addEventListener("click", () => {
    showPage("page3");
});

document.getElementById("backToPage2").addEventListener("click", () => {
    showPage("page2");
});

document.getElementById("noButton").addEventListener("click", () => {
    song.pause();
    playIcon.textContent = "▶";
    showPage("endPage");
});

document.getElementById("closeButton").addEventListener("click", () => {
    song.pause();
    playIcon.textContent = "▶";
    showPage("page1");
});


/* ================= MUSIC PLAYER ================= */

const song = document.getElementById("loveSong");
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volumeButton = document.getElementById("volumeButton");
const volumeIcon = document.getElementById("volumeIcon");

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${String(secs).padStart(2, "0")}`;
}


/* Play and pause */

playButton.addEventListener("click", async () => {
    if (song.paused) {
        try {
            await song.play();
            playIcon.textContent = "❚❚";
        } catch (error) {
            console.error("Music playback failed:", error);

            alert(
                "The song could not play. Check that music.mp3 is a valid audio file and is uploaded correctly."
            );
        }
    } else {
        song.pause();
        playIcon.textContent = "▶";
    }
});


/* Load song duration */

song.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(song.duration);
});


/* Update playback progress */

song.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(song.currentTime);

    if (Number.isFinite(song.duration) && song.duration > 0) {
        progressBar.value = (song.currentTime / song.duration) * 100;
    }
});


/* Seek through the song */

progressBar.addEventListener("input", () => {
    if (Number.isFinite(song.duration) && song.duration > 0) {
        song.currentTime = (Number(progressBar.value) / 100) * song.duration;
    }
});


/* Keep play icon synchronized */

song.addEventListener("pause", () => {
    playIcon.textContent = "▶";
});

song.addEventListener("play", () => {
    playIcon.textContent = "❚❚";
});


/* Reset player when song ends */

song.addEventListener("ended", () => {
    playIcon.textContent = "▶";
    progressBar.value = 0;
    currentTime.textContent = "0:00";
});


/* Mute and unmute */

volumeButton.addEventListener("click", () => {
    song.muted = !song.muted;
    volumeIcon.textContent = song.muted ? "🔇" : "🔊";
});


/* ================= FLOATING HEART EFFECT ================= */

const heartsContainer = document.getElementById("floatingHearts");

const heartCharacters = ["♥", "♡", "❤"];

function createHeart() {
    if (!heartsContainer) return;

    // Keep the number of hearts under control.
    if (heartsContainer.childElementCount >= 18) return;

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.textContent =
        heartCharacters[Math.floor(Math.random() * heartCharacters.length)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 15}px`;
    heart.style.animationDuration = `${5 + Math.random() * 4}s`;

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}


/* Create hearts continuously */

if (heartsContainer) {
    // Add some hearts immediately.
    for (let i = 0; i < 12; i++) {
        createHeart();
    }

    // Add more hearts over time.
    setInterval(createHeart, 700);
}
