const openButton = document.getElementById("openButton");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const music = document.getElementById("music");

const weddingDate = new Date("December 20, 2026 11:00:00").getTime();
const timer = document.getElementById("timer");

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    timer.textContent = "The wedding day has arrived!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  timer.textContent =
    `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}, 1000);

openButton.addEventListener("click", () => {
  cover.style.display = "none";
  invitation.classList.remove("hidden");

  music.play().catch(() => {
    console.log("Music requires user interaction.");
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
