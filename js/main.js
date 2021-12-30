/*----- constants -----*/
let COLORS = {
    0: "none",
    1: "red",
    2: "blue",
    3: "green",
    4: "yellow",
    5: "orange",
    6: "purple",
    Feed1: "black",
    Feed2: "grey"
}



/*----- app's state (variables) -----*/
let gameTurn;
let colorArray;
let colorID;
let codeColId;
let currentCodeTarget;
let compCodeArray;
let feedbackArray;
let testArray;


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
    submitColorCheck();
})

colorChoices.addEventListener("click", function(evt){
    colorID = evt.target.id[3];
})



/*----- functions -----*/

init();

function init(){
    gameTurn = 9;
    colorArray = [0, 0, 0, 0];
    feedbackArray = [];
    generaterCompCode();
    console.log(compCodeArray)
    renderPlayerBoard();
}

function generaterCompCode() {
        compCodeArray = colorArray.map(function(ele){
        ele += (Math.floor(Math.random() * 6) + 1);
        return ele;
    });
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

function submitColorCheck(){
    if (colorArray.includes(0)) return;
    for (let i = 0; i < colorArray.length; i++){

            if (colorArray[i] == compCodeArray[i]) {
                console.log("hello3");
                colorArray.splice(i, 1, 7);
                feedbackArray.push("Feed1");
            }
    }
    renderFeedback()
}

function renderFeedback() {

    setForNextRow();
}

function setForNextRow(){
    gameTurn = gameTurn - 1;
    colorArray = [0, 0, 0, 0];
    feedbackArray = [];
}

