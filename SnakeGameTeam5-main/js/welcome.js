let nickname = document.getElementById("txt-input");
let errorMsg = document.getElementById("errorMsg");
let playButton = document.getElementById("play");
document.addEventListener("DOMContentLoaded", function () {
  if (playButton) {
    playButton.addEventListener("click", function (e) {
      if (nickname.value === "") {
        e.preventDefault();
        errorMsg.style.display = "block";
      }
    });
  }
});
