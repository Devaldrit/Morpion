/*******Name choosed by players *******/
window.onload = function() {

let playername1 = document.querySelector('#playername1');
const nameplayer = prompt('What is your name, player 1?');

if (nameplayer !== null) {
    playername1.innerText = nameplayer;
} else {
    playername1.innerText = "Default Name";
}

let playername2 = document.querySelector('#playername2');
const nameplayer2 = prompt('what is your name, player 2?')
if (nameplayer2 !== null) {
    playername2.innerText = nameplayer2;
} else {
    playername2.innerText = "Default Name";
}


/********** tic tac toe game ********/
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');


//Conditions winning
const winConditions = [
    [0 , 1, 2],
    [3 , 4, 5],
    [6 , 7, 8],
    [0 , 3, 6],
    [1 , 4, 7],
    [2 , 5, 8],
    [0 , 4, 8],
    [2 , 4, 6],
]

//Options of plcaes X and O
let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)) // Sélection de chacune des céllules et ajout d'évenement cliquer
    restartBtn.addEventListener("click", restartGame); //ajout de l'évenement licker et recommencer le jeu
    statusText.textContent = `${currentPlayer}'s turn`; //prend la valeur de la variable et la combine avec le texte
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex"); //Stocke les attribut html de chaque cellule dans cette variable pour les réutiliser
    if (options[cellIndex] != "" || !running){ // La condition suivante assure que les mouvements ne sont acceptés que pendant le jeu en cours.
        return; //Si une des conditions est vraie le jeu s'arrête immédiatement, éviter de traiter un clic invalide
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer; //on vérifie l'emplacement des céllules
    cell.textContent = currentPlayer;


    if(currentPlayer === "X") {
        cell.classList.add("cross");
    } else if (currentPlayer === "O") {
        cell.classList.add("circle");
    }
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
       const condition = winConditions[i]; 
       const cellA = options[condition[0]];
       const cellB = options[condition[1]];
       const cellC = options[condition[2]];

       if(cellA == "" || cellB == "" || cellC == ""){
        continue
       }
       if (cellA == cellB && cellB == cellC){
        roundWon = true;
        break;
       }
    }

    if(roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if (!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }    
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("cross", "circle");
    });
    running = true;
}
};