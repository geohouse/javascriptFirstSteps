let mainTable = document.createElement('table');
let tableRow = undefined;
let tableCell = undefined;

document.body.appendChild(mainTable);

function setUpGrid(){
    for(let currRow = 0; currRow < 4; currRow ++){
        tableRow = document.createElement('tr');
        mainTable.appendChild(tableRow);

        for(let currCol = 0; currCol < 4; currCol ++){
            tableCell = document.createElement('td');
            tableCell.id = currRow + "-" + currCol;
            tableRow.appendChild(tableCell);
        }

    }

}

let diceHolder = [];

// dice 1
let dice1 = ['m','u','o','c','i','t'];
let dice2 = ['a','g','a','e','n','e'];
let dice3 = ['n','h','n','l','r','z'];
let dice4 = ['b','o','o','j','a','b'];
let dice5 = ['p','s','h','a','c','o'];
let dice6 = ['o','t','w','a','t','o'];
let dice7 = ['d','r','y','v','l','e'];
let dice8 = ['e','u','s','e','i','n'];
let dice9 = ['t','t','r','e','y','l'];
let dice10 = ['v','e','h','w','r','t'];
let dice11 = ['h','g','e','w','n','e'];
let dice12 = ['a','k','p','f','f','s'];
let dice13 = ['qu','i','m','n','h','u'];
let dice14 = ['e','i','t','s','o','s'];
let dice15 = ['d','t','y','t','i','s'];
let dice16 = ['x','r','d','i','l','e'];

diceHolder[0] = dice1;
diceHolder[1] = dice2;
diceHolder[2] = dice3;
diceHolder[3] = dice4;
diceHolder[4] = dice5;
diceHolder[5] = dice6;
diceHolder[6] = dice7;
diceHolder[7] = dice8;
diceHolder[8] = dice9;
diceHolder[9] = dice10;
diceHolder[10] = dice11;
diceHolder[11] = dice12;
diceHolder[12] = dice13;
diceHolder[13] = dice14;
diceHolder[14] = dice15;
diceHolder[15] = dice16;

/*
let letterHolder = {'a':0, 'b':0, 'c':0, 'd':0, 'e':0, 'f':0, 'g':0,
                    'h':0, 'i':0, 'j':0, 'k':0, 'l':0, 'm':0, 'n':0,
                    'o':0, 'p':0, 'qu':0, 'r':0, 's':0, 't':0, 'u':0,
                    'v':0, 'w':0, 'x':0, 'y':0, 'z':0};
*/

//Math.floor(Math.random() * diceHolder.length)

let dieFace = 0;
let dieLetter = '';
let selectedLetters = [];


function rollDice(){
    // For each of the die, randomly select a face and the corresponding letter to add to the board
    for(let j = 0; j < diceHolder.length; j++){
        
        dieFace = Math.floor(Math.random() * 6);
        dieLetter = diceHolder[j][dieFace];
        console.log("For dice: " + j + " the die face is: " + dieFace + " and the die letter is: " + dieLetter);
        selectedLetters.push(dieLetter);  

    }
}

// Fisher-Yates shuffling algorithm from here:
// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
function shuffleArray(){
    for(let i = selectedLetters.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const tempEntry = selectedLetters[i];
        selectedLetters[i] = selectedLetters[j]
        selectedLetters[j] = tempEntry;
    }
    return selectedLetters;
}


let currRow = 0;
let currCol = 0;

function displayBoard(){
    for(let i = 0; i < 16; i++){
        currRow = Math.floor(i / 4);
        currCol = i - (4 * currRow);

        console.log("i is: " + i + " currRow is: " + currRow + " currCol is: " + currCol);

        // Assign in the letter to the correct grid position
        document.getElementById(currRow + "-" + currCol).innerHTML = shuffledArray[i];

    }
}

setUpGrid();
rollDice();

console.log("The selected letters are: " + selectedLetters);

let shuffledArray = shuffleArray();

console.log("The shuffled letters are: " + shuffledArray);

displayBoard();












