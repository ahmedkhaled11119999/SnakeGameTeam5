let nickname = document.getElementById("txt-input");
let errorMsg = document.getElementById("errorMsg");
let playButton = document.getElementById("play");
document.addEventListener("DOMContentLoaded", function () {
  playButton.addEventListener("click", function (e) {
    if (nickname.value === "") {
      console.log(e);
      e.preventDefault();
      errorMsg.style.display = "block";
    }
  });
});
