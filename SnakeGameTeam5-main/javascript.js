let grid = document.querySelector(".grid");
let appleInex=0;
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
