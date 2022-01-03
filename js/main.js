/*----- constants -----*/
let COLORS = {
    0: "none",
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

/*----- cached element references -----*/
let codeRows = document.getElementById("codeRows");
let submitButton = document.getElementById("submitButton");
let colorChoices = document.getElementById("colorChoices");
let compCodeReveal = document.getElementById("compCode");

/*----- event listeners -----*/
codeRows.addEventListener("click", function(evt){
    let buttonID = evt.target.id
    if (colorID === "" || colorID === NaN || colorID === undefined) return;
    addColorToArray(buttonID);
});

submitButton.addEventListener("click", function(evt){
    console.log("submit click");
    submitColorCheck();
});

colorChoices.addEventListener("click", function(evt){
    console.log("color click");
    colorID = evt.target.id[3];
    if (colorID === "" || colorID === NaN || colorID === undefined) return;
});

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
    countdownOutline.style.outline = "1px dashed rgba(255, 0, 0, 0.9)"
    compCodeReveal.style.visibility = winner ? "visible" : "hidden";
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
    winner ? gameEnd() : setForNextRow();
};

function renderFeedback() {
    console.log(feedbackArray);
    console.log(compCodeArray);
    feedbackArray.forEach(function(feedback, idx){
    let feedbackLocale = document.getElementById(`Fr${gameTurn}c${idx}`)
    feedbackLocale.style.backgroundColor = `${COLORS[feedback]}`;
    })

}

function setForNextRow(){
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

function gameEnd () {


console.log("you won!");
};