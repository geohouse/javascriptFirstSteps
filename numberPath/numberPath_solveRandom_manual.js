let numRows = 9;
let numCols = 9;

let mainTable = document.createElement('table');
let tableRow = undefined;
let createdCell = undefined;

document.body.appendChild(mainTable);

// Initialize the table by looping through the desired number of rows first, creating those
// then looping through the desired number of columns, adding a cell in each row for 
// each desired column. Set the ID of each table cell to be the <rowNum>-<colNum> (0-based)
function setUpGrid(){
    for(let currRow = 0;  currRow < numRows; currRow++){
        //console.log("Curr row is: " + currRow);
        tableRow = document.createElement('tr');
        mainTable.appendChild(tableRow);
        
        for(let currCol = 0; currCol < numCols; currCol++){
            //console.log("Curr col is: " + currCol);
            createdCell = document.createElement('td');
            createdCell.id = currRow + "-" + currCol;
            createdCell.className = 'empty-cell';
            // Add the path order number to the cell
            //createdCell.innerHTML = rowHolder[currRow][currCol];
            // initialize as non-path (will find the path in a later function)
            //createdCell.className = 'non-path';
            
            tableRow.appendChild(createdCell)
        }
    }
}

setUpGrid();

let direction = undefined;
let distRow = undefined;
let distCol = undefined;
let dist = undefined;

function getDistance(direction, distRow , distCol){
    console.log("In getDistance.");
    console.log("Direction is: " + direction);
    console.log("distRow is: " + distRow);
    console.log("distCol is: " + distCol);

    dist = 0;

    if(direction === "N"){
        while(distRow > 0){
            console.log("In N while");
            if(document.getElementById(distRow - 1 + "-" + distCol).innerHTML === ""){
                console.log("Incrementing N dist");
                dist ++;
                distRow = distRow - 1;

            } else if(document.getElementById(distRow - 1 + "-" + distCol).innerHTML != ""){
                // Return as soon as hit an element that's filled (i.e. don't skip over filled 
                // elements and then keep counting dist with any non-filled elements until running 
                // out of elements to tabulate)
                console.log("Returning early for N.");
                return dist;
            } 
        }
    }

    if(direction === "S"){
        while(distRow < numRows - 1){
            console.log("In S while");
            if(document.getElementById(distRow + 1 + "-" + distCol).innerHTML === ""){
                console.log("Incrementing S dist");
                dist ++;
                distRow = distRow + 1;

            } else if(document.getElementById(distRow + 1 + "-" + distCol).innerHTML != ""){
                // Return as soon as hit an element that's filled (i.e. don't skip over filled 
                // elements and then keep counting dist with any non-filled elements until running 
                // out of elements to tabulate)
                console.log("Returning early for S.");
                return dist;
            } 
        }
    }


    if(direction === "W"){
        while(distCol > 0){
            console.log("In W while");
            if(document.getElementById(distRow + "-" + (distCol - 1)).innerHTML === ""){
                console.log("Incrementing W dist");
                dist ++;
                distCol = distCol - 1;

            } else if(document.getElementById(distRow + "-" + (distCol - 1)).innerHTML != ""){
                // Return as soon as hit an element that's filled (i.e. don't skip over filled 
                // elements and then keep counting dist with any non-filled elements until running 
                // out of elements to tabulate)
                console.log("Returning early for W.");
                return dist;
            } 
        }
    }

    if(direction === "E"){
        while(distCol < numCols - 1){
            console.log("In E while");
            if(document.getElementById(distRow + "-" + (distCol + 1)).innerHTML === ""){
                console.log("Incrementing E dist");
                dist ++;
                distCol = distCol + 1;

            } else if(document.getElementById(distRow + "-" + (distCol + 1)).innerHTML != ""){
                // Return as soon as hit an element that's filled (i.e. don't skip over filled 
                // elements and then keep counting dist with any non-filled elements until running 
                // out of elements to tabulate)
                console.log("Returning early for E.");
                return dist;
            } 
        }
    }

    return dist;
}


let lastRow = 0;
let lastCol = 0;
// Number of the current cell to fill
let currNum = 1;
let dirSelector = [];
let selectedDir = "";

// This will be an array to hold the distances 
let distHolder = {};
//let distLabelHolder = ["N","S","W","E"];

function initializeDistHolder(){
    distHolder = {'N':-1, 'S':-1, 'W':-1, 'E': -1};
    return distHolder;
}

let currDist = 0;

let matchedIndices = [];
let matchedDirections = [];
let directionWeights

// Number of full random solves done
let iterCount = 0;

function makeMove(){

    dirSelector = [];
    selectedDir = "";
    distHolder = initializeDistHolder();
    currDist = 0;

    console.log(currNum);

    if(currNum === 1){
        let pickRow = Math.floor(Math.random() * numRows);
        let pickCol = Math.floor(Math.random() * numCols);
        console.log("The picked cell is: " + pickRow + "," + pickCol);
        document.getElementById(pickRow + "-" + pickCol).innerHTML = currNum;
        lastRow = pickRow;
        lastCol = pickCol;
        currNum++;
        return;
    } else{

        console.log(lastRow);
        console.log(lastCol);

        //North check
        if(lastRow > 0 && document.getElementById(lastRow - 1 + "-" + lastCol).innerHTML === ""){
            dirSelector.push("N");
            console.log("North OK.");
            currDist = getDistance("N", lastRow, lastCol);
            console.log("currDist N is: " + currDist);
            distHolder['N'] = currDist;
            
        } 

        //South check
        if(lastRow < numRows - 1 && document.getElementById(lastRow + 1 + "-" + lastCol).innerHTML === ""){
            dirSelector.push("S");
            console.log("South OK.");
            currDist = getDistance("S", lastRow, lastCol);
            console.log("currDist S is: " + currDist);
            distHolder['S'] = currDist;
        }

        //West check
        // Need parenths around the lastCol addition/subtraction for it to evaluate correctly.
        if(lastCol > 0 && document.getElementById(lastRow + "-" + (lastCol - 1)).innerHTML === ""){
            dirSelector.push("W");
            console.log("West OK.");
            currDist = getDistance("W", lastRow, lastCol);
            console.log("currDist W is: " + currDist);
            distHolder['W'] = currDist;
        } 


        //East check
        if(lastCol < numCols - 1 && document.getElementById(lastRow + "-" + (lastCol + 1)).innerHTML === ""){
            dirSelector.push("E");
            console.log("East OK.");
            currDist = getDistance("E", lastRow, lastCol);
            console.log("currDist E is: " + currDist); 
            distHolder['E'] = currDist;
        } 

        // The dist holder is an array with the 4 current distances:
        // N, S, W, E if all 4 are present as possibilities,
        // otherwise will only be the entries that have moves possible
        // (matches the entries in the dirSelector array)

        function removeBlankDists(){
            for(let i = 0; i < Object.keys(distHolder).length; i++){
                // If there's still the default -1 value in the object for the 
                // currently looped index (direction), then remove  that
                // direction from the distHolder
                if(Object.values(distHolder)[i] === -1) {
                    delete distHolder[Object.keys(distHolder)[i]];
                }
            }
            return distHolder;
        }

        distHolder = removeBlankDists();

        console.log("The distHolder keys are: " + Object.keys(distHolder));
        console.log("The distHolder values are: " + Object.values(distHolder));
        let valueToMatch = undefined;

        // Returns the indexes of the distHolder that meet the valueToMatch criteria.
        function which(valueToMatch){
            let indices = [];
            for(let i = 0; i < Object.keys(distHolder).length; i++){
                if(Object.values(distHolder)[i] === valueToMatch){
                    indices.push(i);
                }
            }
            return(indices);
        }

        // Use the matchedIndices as a lookup in the distLabelHolder
        // to get the move directions that match the search criteria
        function getMatchedDirections(){
            let matchedDirs = [];
            let indexVal = undefined;
            for(let i = 0; i < matchedIndices.length; i++){
                indexVal = matchedIndices[i];
                matchedDirs.push(dirSelector[indexVal]);
            }
            return matchedDirs;
        }


        // Create a weighted decision vector to decide where to go next.
        // First, identify any '1' distances. If present,
        // Find any distances that are 1, and go in that direction. If more than one direction === 1,
        // then pick randomly between them.

        matchedIndices = which(1);
        if(matchedIndices.length > 0){
            console.log("Matched indices 1 is: " + matchedIndices);
        } else{
            matchedIndices = which(2);
            if(matchedIndices.length > 0){
                console.log("Matched indices 2 is: " + matchedIndices);
            }
        }
        
        

        matchedDirections = getMatchedDirections();
        console.log("Matched directions are: " + matchedDirections);


        // Randomly select one of the directions represented in the dirSelector.
        // This makes sure each possible direction gets the same probability 
        // of selection regardless of the length of the dirSelector array.
        console.log("The dir selector is: " + dirSelector);
        selectedDir = dirSelector[Math.floor(Math.random() * dirSelector.length)];
        console.log("Selected dir is: " + selectedDir);

        if(selectedDir === "N"){
            document.getElementById(lastRow - 1 + "-" + lastCol).innerHTML = currNum;
            currNum++;
            lastRow = lastRow - 1;
            return;
        }

        if(selectedDir === "S"){
            document.getElementById(lastRow + 1 + "-" + lastCol).innerHTML = currNum;
            currNum++;
            lastRow = lastRow + 1;
            return;
        }

        if(selectedDir === "W"){
            document.getElementById(lastRow + "-" + (lastCol - 1)).innerHTML = currNum;
            currNum++;
            lastCol = lastCol - 1;
            return;
        }

        if(selectedDir === "E"){
            document.getElementById(lastRow + "-" + (lastCol + 1)).innerHTML = currNum;
            currNum++;
            lastCol = lastCol + 1;
            return;
        }

        


    }

}


let nextButton = document.getElementById("forward-button");
nextButton.addEventListener("click", makeMove); 

/*
for(currNum = 1; currNum <= (numRows * numCols); currNum++){

    makeMove();
    console.log(currNum);
}
*/
 

/*
//function highlightPath(){
let lastMarkedValue = 0;
let lastVisitedCoords = [0][0];
let currVisitedCoords = [0][0];
let currEntry = 0;
let pathNum = 1;

    //for(let pathNum = 1; pathNum <= (numRows * numCols); pathNum ++){
    //for(let pathNum = 1; pathNum <= 15; pathNum ++){    
        // If needing to find the start point for the first number in the array
    //let animateInterval = setInterval(highlightNextCell, 10);
        //highlightNextCell(pathNum);
// The function highlightPath CAN see/set all global vars defined above.
// This IS NOT the case if these vars are defined in a function that calls another function (with the animation call) instead.

let isToggled = undefined;

function queryCheckStatus(){
    isToggled = toggle.checked;
    console.log("isToggled is: " + isToggled);
    // Turn on the auto-animation if toggled, otherwise move manually when the 
    // button is pushed
    if(isToggled){
        window.requestAnimationFrame(highlightPath);
    } 
}

let toggle = document.getElementById("toggle");
toggle.addEventListener("click", queryCheckStatus);

let nextButton = document.getElementById("forward-button");
nextButton.addEventListener("click", highlightPath); 
*/


