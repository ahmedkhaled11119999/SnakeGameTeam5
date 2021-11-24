let grid = document.querySelector(".grid");
let appleInex=0;
let currentIndex = 0;
let currentSnake =[2,1,0];
let direction =1; 
let score = 0;
let intervalTime = 0;
let interval = 0;

function createBoard(){
    for(let i=0 ; i<100 ; i++){
        let div = document.createElement("div");
        grid.appendChild(div);
        
    }
  //  console.log("done");
    
}
//createBoard();

function randomApple(squares){
    do {
        appleInex = Math.floor(Math.random()*squares.length );

    }while (squares[appleInex].classList.contain("snake")){
              squares[appleInex].classList.add("apple");
    }
   // console.log("done");
}
function startGame(){
    let squares = document.querySelectorAll(".grid div");
  //  randomApple(squares);
    direction=1;
  document.querySelector ( ".currentScore").innerHTML = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcome, intervalTime);
}
    //startGame();

function replay(){
    grid.innerHTML="";
    createBoard();
    startGame();
}    

