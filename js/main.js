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

/*----- event listeners -----*/
codeRows.addEventListener("click", function(evt){
    let buttonID = evt.target.id
    if (colorID === "" || colorID === NaN || colorID === undefined) return;
    addColorToArray(buttonID);
});

submitButton.addEventListener("click", function(evt){
    submitColorCheck();
});

colorChoices.addEventListener("click", function(evt){
    colorID = evt.target.id[3];
    if (colorID === "" || colorID === NaN || colorID === undefined) return;
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
        let codeLocale = document.getElementById(`r${j}c${m}`);
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
    gameTurn = 9;
    colorArray = [0, 0, 0, 0];
    colorArrayReset = [0, 0, 0, 0];
    compReset = [0, 0, 0, 0];
    feedbackArray = [];
    winner = null;
    generateCompCode();
    compCopyCode = compCodeArray.map(ele => ele);
    // console.log(compCopyCode);
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
    countdownOutline.style.outline = "2.5px solid rgba(255, 0, 0, 0.9)"
    compCodeReveal.style.visibility = winner ? "visible" : "hidden";
    playAgain.style.visibility = winner ? "visible" : "hidden";
    if (gameTurn === (-1)) gameEnd();
    renderScores();
    renderPlayerBoard();
    renderFeedback();
    renderCompCode();
}


function renderPlayerBoard() {
    colorArray.forEach(function(color, Idx) {
        let codeLocale = document.getElementById(`r${gameTurn}c${Idx}`);
        codeLocale.style.backgroundColor = `${COLORS[color]}`;
    }); 
};

function renderCompCode() {
    compCodeArray.forEach(function(color, idx){
        let compCodeLocale = document.getElementById(`comp${idx}`);
        compCodeLocale.style.backgroundColor = `${COLORS[color]}`;
    });
};


function addColorToArray(buttonID){
    codeColId = parseInt(buttonID[3]);
    colorArray[codeColId] = parseInt(colorID);
    render();
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
    colorArray = colorArrayReset.map(ele => ele);
    compCopyCode = compCodeArray.map(ele => ele);
    feedbackArray = [];
    render();
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
    //innerhtml = "YOU WON!";
    render();
};

function renderScores() {
    playGuess.innerHTML = `guesses: ${guesses}`;
    playWin.innerHTML = `wins: ${currentScore}`;
    playLoses.innerHTML = `loses: ${loses}`;
};

function gameLose() {
    // compCodeReveal.style.visibility = "visible";
    console.log("you lose");
    console.log(gameTurn);
}