// Using tables instead of divs

console.log("Gussy!")

let numRows = 20;
let numCols = 20;

let mainTable = document.createElement('table');
let tableRow = undefined;
let createdCell = undefined;

document.body.appendChild(mainTable);

// Initialize the table by looping through the desired number of rows first, creating those
// then looping through the desired number of columns, adding a cell in each row for 
// each desired column. Set the ID of each table cell to be the <rowNum>-<colNum> (0-based)
for(let currRow = 0;  currRow < numRows; currRow++){
    console.log("Curr row is: " + currRow);
    tableRow = document.createElement('tr');
    mainTable.appendChild(tableRow);
    
    for(let currCol = 0; currCol < numCols; currCol++){
        console.log("Curr col is: " + currCol);
        createdCell = document.createElement('td');
        createdCell.id = "golCell" + currRow + "-" + currCol;
        // Randomly initialize 20% of the cells to be alive at the start.
        if(Math.random() <0.2){
            createdCell.className = 'alive';
        } else{
            createdCell.className = 'dead';
        }
        
        tableRow.appendChild(createdCell)
    }
}


function nextGeneration() {

let northRow = undefined;
let southRow = undefined;
let westCol = undefined;
let eastCol = undefined;
let neighborCounter = undefined;

let northWestCell = undefined;
let northCell = undefined;
let northEastCell = undefined;
let WestCell = undefined;
let EastCell = undefined;
let southWestCell = undefined;
let southCell = undefined;
let southEastCell = undefined;

// Apply the game of life rules to the initialized table
for(let currRow = 0;  currRow < numRows; currRow++){
    console.log("Curr row is: " + currRow);
    
    // Torus boundaries to loop around the rows
    if(currRow === 0){
        northRow = numRows - 1;
        southRow = currRow + 1;
    } else if(currRow === numRows - 1){
        southRow = 0;
        northRow = currRow - 1;
    } else{
        southRow = currRow + 1;
        northRow = currRow - 1;
    }
    
    for(let currCol = 0; currCol < numCols; currCol++){
        console.log("Curr col is: " + currCol);
        // Reset to 0 for each cell
        neighborCounter = 0;

        // Torus boundaries to loop around the columns
        if(currCol === 0){
            westCol = numCols - 1;
            eastCol = currCol + 1;
        } else if(currCol === numCols - 1){
            eastCol = 0;
            westCol = currCol - 1;
        } else{
            westCol = currCol - 1;
            eastCol = currCol + 1;
        }

        console.log("north row is: " + northRow);
        console.log("south row is: " + southRow);

        console.log("west col is: " + westCol);
        console.log("east col is: " + eastCol);

        if(document.getElementById("golCell" + northRow + "-" + westCol).className === "alive"){
            neighborCounter++;
        }

        if(document.getElementById("golCell" + northRow + "-" + currCol).className === "alive"){
            neighborCounter++;
        }

        if(document.getElementById("golCell" + northRow + "-" + eastCol).className === "alive"){
            neighborCounter++;
        }

        if(document.getElementById("golCell" + currRow + "-" + westCol).className === "alive"){
            neighborCounter++;
        }

        if(document.getElementById("golCell" + currRow + "-" + eastCol).className === "alive"){
            neighborCounter++;
        }

        if(document.getElementById("golCell" + southRow + "-" + westCol).className === "alive"){
            neighborCounter++;
        }

        if(document.getElementById("golCell" + southRow + "-" + currCol).className === "alive"){
            neighborCounter++;
        }

        if(document.getElementById("golCell" + southRow + "-" + eastCol).className === "alive"){
            neighborCounter++;
        }

        if(document.getElementById("golCell" + currRow + "-" + currCol).className === "alive" && neighborCounter === 2){
            document.getElementById("golCell" + currRow + "-" + currCol).className = "alive";
            console.log("Kept alive.")
        } else if(document.getElementById("golCell" + currRow + "-" + currCol).className === "dead" && neighborCounter === 3){
            document.getElementById("golCell" + currRow + "-" + currCol).className = "alive";
            console.log("Made alive!")
        } else{
            document.getElementById("golCell" + currRow + "-" + currCol).className = "dead";
        }
        
    }
}
}


