let grid = document.querySelector(".grid");
let playAgainButton = document.querySelector(".playAgain");
let currentScore = document.querySelector(".currentScore");
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
const directions = {
  LEFT: -1,
  RIGHT: 1,
  TOP: -10,
  BOTTOM: 10,
};

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keyup", control);
  createBoard();
  startGame();
  playAgainButton.addEventListener("click", replay);
});

function createBoard() {
  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  {
    squares[appleIndex].classList.add("apple");
  }
}
function startGame() {
  let squares = document.querySelectorAll(".grid div");
  randomApple(squares);
  direction = 1;
  score = 0;
  document.querySelector(".currentScore").innerHTML = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutput, intervalTime);
}

function moveOutput() {
  let squares = document.querySelectorAll(".grid div");
  if (checkForHits(squares)) {
    gameOver(squares, interval);
  } else {
    moveSnake(squares);
  }
}

function gameOver(squares, interval) {
  grid.innerHTML = "";
  grid.style.backgroundColor = "#000000";
  grid.innerHTML = "GAME OVER &#128533;";
  grid.style.color = "#FFFFFF";
  grid.style.justifyContent = "center";
  grid.style.alignItems = "center";
  var audio = new Audio("media/sounds/gameover.wav");
  audio.play();
  playAgainButton.style.display = "inline-block";
  clearInterval(interval);
}

function checkForHits(squares) {
  if (
    (currentSnake[0] + width >= squares.length &&
      direction === directions.BOTTOM) ||
    (currentSnake[0] % width === 0 && direction === directions.LEFT) ||
    (currentSnake[0] % width === width - 1 && direction === directions.RIGHT) ||
    (currentSnake[0] - width < 0 && direction === directions.TOP) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return true;
  }
  return false;
}
function moveSnake(squares) {
  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  eatApple(squares, tail);
  squares[currentSnake[0]].classList.add("snake");
}

function replay() {
  grid.innerHTML = "";
  grid.style.backgroundColor = "white";
  createBoard();
  startGame();
  playAgainButton.style.display = "none";
}
