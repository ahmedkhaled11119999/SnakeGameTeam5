let grid = document.querySelector(".grid");
let playAgainButton = document.querySelector(".playAgain");
let pauseButton = document.querySelector(".pause");
let currentScore = document.querySelector(".currentScore");
let highScore = document.querySelector(".highestScore");
let userNameHtml = document.querySelectorAll(".userName");
let isPaused = false;
let urlString = window.location.href;
let nickName = "";
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;
let highestScore = 0;
let score = 0;
let speed = 0.95;
let intervalTime = 0;
let interval = 0;
const directions = {
  LEFT: -1,
  RIGHT: 1,
  TOP: -10,
  BOTTOM: 10,
};

document.addEventListener("DOMContentLoaded", function () {
  let url = new URL(urlString);
  nickName = url.searchParams.get("nickname");
  getUserData();
  userNameHtml.forEach((uName) => {
    uName.innerHTML = nickName;
  });
  highScore.innerHTML = highestScore;
  document.addEventListener("keyup", control);
  createBoard();
  startGame();
  playAgainButton.addEventListener("click", replay);
  pauseButton.addEventListener("click", toggleGameStatus);
});

function toggleGameStatus() {
  if (isPaused) {
    isPaused = false;
  } else {
    isPaused = true;
  }
  pauseButton.innerHTML = isPaused ? "Resume" : "Pause";

  return isPaused;
}
function getUserData() {
  if (localStorage.getItem(nickName) !== null) {
    highestScore = localStorage.getItem(nickName);
  } else {
    //set a storage for new users
    localStorage.setItem(nickName, highestScore);
  }
}

function updateUserHighestScore() {
  if (localStorage.getItem(nickName) !== null) {
    localStorage.setItem(nickName, highestScore);
  }
}

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
  squares[appleIndex].classList.add("apple");
}
function startGame() {
  let squares = document.querySelectorAll(".grid div");
  pauseButton.style.display = "inline-block";
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
    if (!isPaused) {
      moveSnake(squares);
    }
  }
}

function gameOver(squares, interval) {
  //saves final highest score to local storage
  updateUserHighestScore();
  pauseButton.style.display = "none";
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

function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple(squares);
    score++;
    //update highest score in html
    if (score >= highestScore) {
      highestScore = score;
      highScore.innerHTML = highestScore;
    }
    currentScore.innerHTML = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutput, intervalTime);
  }
}
function control(e) {
  if (e.keyCode === 39) {
    direction = directions.RIGHT; // right
  } else if (e.keyCode === 38) {
    direction = directions.TOP; //if we press the up arrow, the snake will go ten divs up
  } else if (e.keyCode === 37) {
    direction = directions.LEFT; // left, the snake will go left one div
  } else if (e.keyCode === 40) {
    direction = directions.BOTTOM; // down the snake head will instantly appear 10 divs below from the current div
  }
}
