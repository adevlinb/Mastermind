/*----- constants -----*/
let COLORS = {
      0: "none",
    "a": "red",
    "b": "blue",
    "c": "green",
    "d": "yellow",
    "e": "orange",
    "f": "purple"
}



/*----- app's state (variables) -----*/
let gameTurn;
let colorArray;
let colorID;
let codeColId;
// let buttonID;
let currentCodeTarget;
let compCodeArray;


/*----- cached element references -----*/
let codeRows = document.getElementById("codeRows");
let submitButton = document.getElementById("submitButton");
let colorChoices = document.getElementById("colorChoices");


/*----- event listeners -----*/
codeRows.addEventListener("click", function(evt){
    let buttonID = evt.target.id
    addColorToArray(buttonID);
});

submitButton.addEventListener("click", function(evt){
    submitColor();
})

colorChoices.addEventListener("click", function(evt){
    colorID = evt.target.id;
})



/*----- functions -----*/

init();

function init(){
    gameTurn = 9;
    colorArray = [0, 0, 0, 0];
    compCodeArray = [0, 0, 0, 0];
    generaterCompCode();
    renderPlayerBoard();
}

function generaterCompCode() {

    let randomNumber = compCodeArray.map(Math.floor(Math.random() * 3);

}

function renderPlayerBoard() {
    colorArray.forEach(function(color, Idx) {
        let codeLocale = document.getElementById(`r${gameTurn}c${Idx}`);
        codeLocale.style.backgroundColor = `${COLORS[color]}`;
    });
}


function addColorToArray(buttonID){
    codeColId = buttonID[3];
    colorArray[codeColId] = colorID;
    renderPlayerBoard();
}

function submitColor(){
    //check against computer
    // generate results for feedback
    renderFeedback()
}

function setForNextRow(){
    gameTurn = gameTurn - 1;
    colorArray = [0, 0, 0, 0];
}

function renderFeedback(){

    setForNextRow();
}