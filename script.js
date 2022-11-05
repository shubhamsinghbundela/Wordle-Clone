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
// document.addEventListener("keyup",(event)=>{
//     console.log(event);
//     if(guessesRemaining===0){
//         return;
//     }
//     let pressedKey = String(event.key);
//     // hit backspace and if row is not empty
//     if(pressedKey==="Backspace" && nextLetter!==0){
//         deleteLetter();
//     }
//     if(pressedKey==="Enter"){
//         checkGuess();
//         return;
//     }

//     let found=pressedKey.match(/a-z/gi);
//     if(!found || found.length>1){
//         return;
//     }else{
//         insertLetter(pressedKey);
//     }
// })
document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})


// inserLetter ( insertLetter(pressedKey);)
// function insertLetter(pressedKey){
//     if(nextLetter===5){
//         return;
//     }
//     pressedKey=pressedKey.toLowerCase();
    
//     // identofy correct row
//     let row = document.getElementsByClassName("letter-row")[6-guessesRemaining];
//     let box = row.children[nextLetter];
//     box.textContent=pressedKey;
//     box.classList.add("filled-box");
//     //adding current pressed key to the end of current guess
//     currentGuess.push(pressedKey);
//     //track where we are in the row...i.e. why we increment by 1
//     nextLetter+=1;
    
// }
function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

//deleteLetter (what happen when its hits backspace)
function deleteLetter(){
    let row = document.getElementsByClassName("letter-row")[6-guessesRemaining];
    //want to delete filled box
    let box = row.children[nextLetter-1];
    box.textContent="";
    box.classList.remove("filled-box");
    //remove the last letter form currentguess array
    currentGuess.pop();
    nextLetter-=1;
}


// function checkGuess(){
//     let row = document.getElementsByClassName("letter-row")[6-guessesRemaining];
//     let guessString='';
//     let rightGuess=Array.from(rightGuessString);

//     for(const val of currentGuess){
//         guessString+=val;
//     }
//     if(guessString.length!=5){
//         alert("Not enough letters!");
//         return;
//     }
//     if(!WORDS.includes(guessString)){
//         alert("word not in list");
//         return;
//     }
// wordle game:- If a letter is yellow its a right letter i.e. it exist in the word but it is in the wrong position and If a letter is green its a right letter i.e. it is in the right position
//     for(let i=0;i<5;i++){
//         let letterColor = '';
//         let box = row.children[i];
//         let letter = currentGuess[i];
        
//         let letterPosition = rightGuess.indexOf(currentGuess[i]);
//         //if we don't get valid words then indexOf return -1;
//         if(letterPosition===-1){
//             letterColor='grey';
//         }else{
//             if(currentGuess[i]===rightGuess[i]){
//                 letterColor='green';
//             }else{
//                 letterColor='yellow';
//             }

//             //DOUBT 
//             rightGuess[letterPosition]="#";
//         }
//         //when we hit enter there is some delay
//         let delay=250*i;
//         setTimeout(()=>{
//             box.style.backgroundColor = letterColor;
//             shadeKeyBoard(letter, letterColor);
//         },delay)
//     }
//     if(guessString===rightGuessString){
//         alert("You guessed right! Game over");
//         guessesRemaining=0;
//         return;
//     }else{
//         guessesRemaining-=1;
//         currentGuess=[];
//         nextLetter=0;

//         if(guessesRemaining===0){
//             alert("You've run out of guesses! Game over!");
//             alert(`The right word was: "${rightGuessString}"`);
//         }
//     }

// }
function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        alert("Word not in list!")
        return
    }

    
    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }
    }
}

//ShadeKeyboard-it shade greed now we shade keyboard
// function shadeKeyBoard(letter, color){
//     //loop through that whole keyboard 
//     for(const elem of document.getElementsByClassName("kyboard-button")){
//         //Does the content of that keyboard match that letter
//         if(elem.textContent===letter){
//                 let oldColor = elem.style.backgroundColor;
//                 if(oldColor==='green'){
//                     //not change green color exit from function
//                     return;
//                 }
//                 if(oldColor==='yellow' && color!='green'){
//                     return;
//                 }
//                 elem.style.backgroundColor=color;
//                 break;
            
//         }
//     }
// }
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

//To Make the On-screen Keyboard Generate Input(When we click keyboard button the letter get inserted in the grid)

//add eventListener on keyboard button and we are doing function inside the eventListener
// document.getElementById("Keyboard-cont").addEventListener("click",(e)=>{
//     const target = e.target;
//     //if we cannot click keyboard button
//     if(!target.classList.contains("keyboard-button")){
//         return;
//     }

//     let key = target.textContent;
//     if(key==='Del'){
//         key="Backspace"
//     }

//     //we are mimicing the real keyboard with virtual keyboard
//     document.dispatchEvent(new KeyboardEvent("Keyup",{'key':key}))
// })
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})