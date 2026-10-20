const weddingDate = new Date("2026-12-27T09:00:00+05:30").getTime();
const countdownFields = ["days", "hours", "minutes", "seconds"].map((id) => document.getElementById(id));

function updateCountdown() {
  const distance = Math.max(0, weddingDate - Date.now());
  const values = [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000)
  ];
  countdownFields.forEach((field, index) => {
    field.textContent = String(values[index]).padStart(2, "0");
  });
  if (distance === 0) {
    document.getElementById("countdownMessage").textContent = "Our wedding day has arrived!";
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

refreshIcons();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");

function updateMusicButton() {
  const playing = !music.paused;
  const label = playing ? "Pause music" : "Play music";
  musicButton.setAttribute("aria-label", label);
  musicButton.setAttribute("title", label);
  musicButton.setAttribute("aria-pressed", String(playing));
  musicButton.innerHTML = `<i data-lucide="${playing ? "volume-2" : "volume-x"}" aria-hidden="true"></i>`;
  refreshIcons();
}

function stopMusicAutostart() {
  document.removeEventListener("click", startMusicOnInteraction);
  document.removeEventListener("keydown", startMusicOnInteraction);
}

async function startMusic(automatic = false) {
  try {
    await music.play();
    stopMusicAutostart();
    musicStatus.textContent = "Music is playing.";
  } catch (error) {
    musicStatus.textContent = automatic && error.name === "NotAllowedError"
      ? "Music will start when you interact with the invitation."
      : "Music could not be played. Please try again.";
    updateMusicButton();
  }
}

function startMusicOnInteraction(event) {
  if (musicButton.contains(event.target)) return;
  if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
  stopMusicAutostart();
  startMusic();
}

music.addEventListener("play", () => {
  stopMusicAutostart();
  updateMusicButton();
});
music.addEventListener("pause", updateMusicButton);
musicButton.addEventListener("click", async () => {
  stopMusicAutostart();
  if (!music.paused) {
    music.pause();
    return;
  }
  musicButton.disabled = true;
  try {
    await startMusic();
  } finally {
    musicButton.disabled = false;
  }
});

document.addEventListener("click", startMusicOnInteraction);
document.addEventListener("keydown", startMusicOnInteraction);
startMusic(true);

const celebrations = [
  { name: "Haldi", start: "20261226T103000Z" },
  { name: "Sangeet", start: "20261226T133000Z" },
  { name: "Wedding Ceremony", start: "20261227T033000Z" },
  { name: "Reception", start: "20261227T123000Z" }
];

document.getElementById("calendarButton").addEventListener("click", () => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const events = celebrations.flatMap((event) => [
    "BEGIN:VEVENT",
    `UID:pratik-sakshi-${event.start}@wedding-invitation`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${event.start}`,
    `SUMMARY:Pratik & Sakshi - ${event.name}`,
    "LOCATION:Adarsh Lawns\\, Sambhaji Nagar\\, Barshi\\, Maharashtra 413401",
    "END:VEVENT"
  ]);
  const calendar = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Pratik and Sakshi//Wedding//EN", "CALSCALE:GREGORIAN", ...events, "END:VCALENDAR", ""].join("\r\n");
  const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "pratik-sakshi-wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("guestName");
  const guestName = nameInput.value.trim();
  if (!guestName) {
    nameInput.setCustomValidity("Please enter your name.");
    nameInput.reportValidity();
    return;
  }
  const attendance = new FormData(event.currentTarget).get("attendance");
  const response = attendance === "yes" ? "We would love to join your wedding celebrations on 26 & 27 December 2026!" : "Sadly, we cannot make it to your wedding. Sending you both our love and best wishes!";
  const message = `Hi Pratik & Sakshi! This is ${guestName}. ${response}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  document.getElementById("rsvpStatus").textContent = "Your RSVP is ready in WhatsApp, but has not been sent yet.";
});

document.getElementById("guestName").addEventListener("input", (event) => event.target.setCustomValidity(""));
