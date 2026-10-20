const openButton = document.getElementById("openButton");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const music = document.getElementById("music");

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
