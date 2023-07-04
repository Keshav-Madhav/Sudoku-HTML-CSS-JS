
var numSelected=null;
var tileSelected=null;
var errors=0;
var hasWon = false;
let boardElement = document.getElementById("board");
// var board=[
//     "53--7----",
//     "6--195---",
//     "-98----6-",
//     "8---6---3",
//     "4--8-3--1",
//     "7---2---6",
//     "-6----28-",
//     "---419--5",
//     "----8--79"
// ]

// var solution=[
//     "534678912",
//     "672195348",
//     "198342567",
//     "859761423",
//     "426853791",
//     "713924856",
//     "961537284",
//     "287419635",
//     "345286179"
// ]

var board = [
    "534678912",
    "672195348",
    "198342567",
    "859761423",
    "426853791",
    "713924856",
    "961537284",
    "287419635",
    "34528617-"
];

var solution = [
    "534678912",
    "672195348",
    "198342567",
    "859761423",
    "426853791",
    "713924856",
    "961537284",
    "287419635",
    "345286179"
];


window.onload=function(){
    setGame();
}

function setGame(){
    for (let i=1;i<=9;i++){
        let number=document.createElement("div");
        number.id=i;
        number.innerText=i;
        number.addEventListener("click",selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
        boardElement.addEventListener("mouseover", showOriginalRow4);
        boardElement.addEventListener("mouseout", hideOriginalRow4);
    }

    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){
            let tile=document.createElement("div");
            tile.id=r.toString()+'-'+c.toString();
            if(board[r][c]!="-"){
                tile.innerText=board[r][c];
                tile.classList.add('tile-start');
            }

            if(r==2||r==5){
                tile.classList.add("horizontal-line");
            }
            if(c==2||c==5){
                tile.classList.add("vertical-line");
            }
            
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if(numSelected!=null){
        numSelected.classList.remove("number-selected");
    }
    let num=numSelected;
    numSelected=this;
    if(numSelected==num){
        numSelected.classList.remove("number-selected");
        numSelected=null;
        return;
    }
    numSelected.classList.add("number-selected");
}

function selectTile(){
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (board[r][c] !== "-") {
        return;
    }
    if(numSelected){
        this.innerText=numSelected.id;
        if (numSelected.id !== solution[r][c]) {
            errors++;
            document.getElementById("errors").innerText="Errors: "+errors;
        }
        checkWin();
    }
    else{
        this.innerText="";
    }
}

function checkWin() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            if (tile.innerText !== solution[r][c]) {
                hasWon = false;
                return false;
            }
        }
    }
    console.log("won");
    hasWon = true;
    return true;
}


function showOriginalRow4() {
    if (hasWon) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById('3-' + c.toString());
            tile.innerText = solution[3][c];
        }
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById('4-' + c.toString());
            tile.innerText = solution[4][c];
        }
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById('5-' + c.toString());
            tile.innerText = solution[5][c];
        }
    }
}

function hideOriginalRow4() {
    if (hasWon) {
        let tile = document.getElementById('4-0');
        tile.innerText = "";
        tile = document.getElementById('4-1');
        tile.innerText = "Y";
        tile = document.getElementById('4-2');
        tile.innerText = "O";
        tile = document.getElementById('4-3');
        tile.innerText = "U";
        tile = document.getElementById('4-4');
        tile.innerText = "";
        tile = document.getElementById('4-5');
        tile.innerText = "W";
        tile = document.getElementById('4-6');
        tile.innerText = "O";
        tile = document.getElementById('4-7');
        tile.innerText = "N";
        tile = document.getElementById('4-8');
        tile.innerText = "";
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById('3-' + c.toString());
            tile.innerText = "";
        }
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById('5-' + c.toString());
            tile.innerText = "";
        }
    }
}