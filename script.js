import {WORDS} from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter =0;
let rightGuessString= WORDS[Math.floor(Math.random()*WORDS.length)];
console.log(rightGuessString);

//creating the game board
function initBoard(){
    let board=document.getElementById("game-board");

    for(let i=0;i<NUMBER_OF_GUESSES;i++){
        let row=document.createElement("div");
        row.className="letter-row";

        for(let j=0;j<5;j++){
            let box=document.createElement("div");
            box.className="letter-box";
            row.appendChild(box);
        }
        board.appendChild(row);
    }
}
// run function automatically
initBoard();

//  Accept User Input(checking valid input or not)
document.addEventListener("keyup",(event)=>{
    // console.log(event);
    if(guessesRemaining===0){
        return;
    }
    let pressedKey = String(e.key);
    // hit backspace and if row is not empty
    if(pressedKey==="Backspace" && nextLetter!==0){
        deleteLetter();
    }
    if(pressedKey==="Enter"){
        checkGuess();
        return;
    }

    let found=pressedKey.match(/a-z/gi);
    if(!found || found.length>1){
        return;
    }else{
        insertLetter(pressedKey);
    }
})


// inserLetter ( insertLetter(pressedKey);)
function insertLetter(pressedKey){
    if(nextLetter===5){
        return;
    }
    pressedKey=pressedKey.toLowerCase();
    
    // identofy correct row
    let row = document.getElementsByClassName('letter-row')[6-guessesRemaining];
    
}