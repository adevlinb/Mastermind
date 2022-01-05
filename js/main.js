/*----- constants -----*/
let COLORS = {
    0: "white",
    1: "red",
    2: "blue",
    3: "green",
    4: "yellow",
    5: "orange",
    6: "purple",
    "Feed1": "black",
    "Feed2": "grey"
}

let MESSAGES = {
    10: "Do you want to play a game?",
    9: "How quickly can you guess the code?",
    8: "It's getting hot in here, take off all your codes!",
    7: "We're running out of time!.. not really",
    6: "almost half-way there! Better get it together!",
    5: "Are we going to be here all night?",
    4: "I thought you were better than this",
    3: "OMG... get with the PROGRAM",
    2: "Maybe we should play a different game?",
    1: "We're DOOMED!"
}


/*----- app's state (variables) -----*/
let gameTurn;
let colorArray;
let colorArrayReset;
let colorID;
let codeColId;
let currentCodeTarget;
let compCodeArray;
let compCopyCode;
let feedbackArray;
let testArray;
let winner;
let countdownOutline;
let currentScore = 0;
let guesses = 0;
let loses = 0;

/*----- cached element references -----*/
let codeRows = document.getElementById("codeRows");
let submitButton = document.getElementById("submitCode");
let colorChoices = document.getElementById("colorChoices");
let compCodeReveal = document.getElementById("compCode");
let playAgain = document.getElementById("playAgain");
let resetScores = document.getElementById("resetScore");
let playGuess = document.getElementById("guess");
let playWin = document.getElementById("wins");
let playLoses = document.getElementById("loses");
let inner = document.getElementById("inner");

/*----- event listeners -----*/
colorChoices.addEventListener("click", function(evt){
    colorID = evt.target.id[3];
    if (colorID === "" || colorID === NaN || colorID === undefined) return;
});

codeRows.addEventListener("click", function(evt){
    let buttonID = evt.target.id
    if (colorID === "" || colorID === NaN || colorID === undefined) return;
    codeColId = parseInt(buttonID[1]);
    colorArray[codeColId] = parseInt(colorID);
    render();
});

submitButton.addEventListener("click", function(evt){
    submitColorCheck();
});


resetScores.addEventListener("click", function() {
    currentScore = 0;
    guesses = 0;
    loses = 0;
    render();
});

playAgain.addEventListener("click", function(){
    buttonID = 0;
    for (let j = 0; j < 10; j++) {
        for (let m = 0; m < 4; m++) {
            //iterate through board to reset playerCodeColors to "white / empty"
        let codeLocale = document.getElementById(`c${m}r${j}`);
        codeLocale.style.backgroundColor = `${COLORS[0]}`;
            //iterate through feedbackColorBoards to reset colors to "white / empty"
        let feedbackLocale = document.getElementById(`Fr${j}c${m}`)
        feedbackLocale.style.backgroundColor = `${COLORS[0]}`;
            // iterate through left side color countdown (red circle following game play) back to start (10)
        countdownOutline = document.getElementById(`defcon${j}`);
        countdownOutline.style.outline = "none"
        }
    };
    init();
})

/*----- functions -----*/

init();

function init(){
    gameTurn = 10;
    colorArray = [0, 0, 0, 0];
    colorArrayReset = [0, 0, 0, 0];
    compReset = [0, 0, 0, 0];
    feedbackArray = [];
    winner = null;
    generateCompCode();
    compCopyCode = compCodeArray.slice();
    render();
}

function generateCompCode() {
        compCodeArray = colorArray.map(function(ele){
        ele += (Math.floor(Math.random() * 6) + 1);
        return ele;
    });
}


function render () {
    countdownOutline = document.getElementById(`defcon${gameTurn}`);
    countdownOutline.style.outline = gameTurn ? "2.5px solid rgba(255, 0, 0, 0.9)" : "none";
    compCodeReveal.style.visibility = winner ? "visible" : "hidden";
    playAgain.style.visibility = winner ? "visible" : "hidden";
    inner.innerHTML = winner ?  "YOU SAVED US!!" : `${MESSAGES[gameTurn]}`
    renderScores();
    renderPlayerBoard();
    renderFeedback();
    renderCompCode();
}


function renderPlayerBoard() {
    colorArray.forEach(function(color, Idx) {
        let codeLocale = document.getElementById(`c${Idx}r${gameTurn}`);
        codeLocale.style.backgroundColor = `${COLORS[color]}`;
    }); 
};

function renderCompCode() {
    compCodeArray.forEach(function(color, idx){
        let compCodeLocale = document.getElementById(`comp${idx}`);
        compCodeLocale.style.backgroundColor = `${COLORS[color]}`;
    });
};


function submitColorCheck(){
    if (colorArray.includes(0)) return;

    // check for exact position / number
    for (let i = 0; i < colorArray.length; i++){
        if (colorArray[i] == compCopyCode[i]) {
            colorArray.splice(i, 1, 8);
            compCopyCode.splice(i, 1, 7);
            feedbackArray.push("Feed1");
        }
    };

    // eliminate duplicate colors
    let colorElimDupes = [];
    colorArray.forEach(function(color) {
        if (!colorElimDupes.includes(color)) {
            colorElimDupes.push(color);
        }
    });
    
    // eliminate duplicate comp codes
    let compElimDupes = [];
    compCopyCode.forEach(function(code){
        if (!compElimDupes.includes(code)){
            compElimDupes.push(code);
        }
    });

    // check for inexact position, but correct color (counts one per color)
    for (let x = 0; x < colorElimDupes.length; x++) {
        if (colorElimDupes.includes(compElimDupes[x])) {
            feedbackArray.push("Feed2");
        }
    };

    winner = checkWin();
    render();
    winner ? gameWin() : setForNextRow();
};

function renderFeedback() {
    feedbackArray.forEach(function(feedback, idx){
    let feedbackLocale = document.getElementById(`Fr${gameTurn}c${idx}`)
    feedbackLocale.style.backgroundColor = `${COLORS[feedback]}`;
    })

}

function setForNextRow(){
    guesses = guesses + 1;
    countdownOutline.style.outline = "none"
    gameTurn = gameTurn - 1;
    colorArray = colorArrayReset.slice();
    compCopyCode = compCodeArray.slice();
    feedbackArray = [];
    gameTurn === 0 ? gameLose() : render();
}

function checkWin(){
    let count = 0;

    feedbackArray.forEach(function(feedback){
       if (feedback === "Feed1") count++;
    });
    return count === 4 ? true : null;
};

function gameWin () {
    currentScore = currentScore + 1;
    render();
};

function renderScores() {
    playGuess.innerHTML = `guesses: ${guesses}`;
    playWin.innerHTML = `wins: ${currentScore}`;
    playLoses.innerHTML = `loses: ${loses}`;
};

function gameLose() {
    compCodeReveal.style.visibility = "visible";

    inner.innerHTML = "YOU LOSER!!";
    return;
}