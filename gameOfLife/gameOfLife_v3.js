// Using tables instead of divs

console.log("Gussy!")

let numRows = 70;
let numCols = 70;

let arrayHolder = [];
let mainTable = document.createElement('table');
let tableRow = undefined;
let createdCell = undefined;

document.body.appendChild(mainTable);


function createArray(){

    // Create an array matching the number of rows where each element (will represent the columns)
    // is also an array
    let initialArray = Array(numRows).fill([]);
    for(col = 0; col < numCols; col++){
        // Initialize all values to 0
        initialArray[col] = Array(numCols).fill(0);
    }
    // Can now use dual indexing to get/set values.
    //initialArray[0][0] = 1;

    return initialArray;

}

// Initialize the table by looping through the desired number of rows first, creating those
// then looping through the desired number of columns, adding a cell in each row for 
// each desired column. Set the ID of each table cell to be the <rowNum>-<colNum> (0-based)
function setUpGrid(arrayHolder){
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
                arrayHolder[currRow][currCol] = 1;
            } else{
                createdCell.className = 'dead';
                arrayHolder[currRow][currCol] = 0;
            }
            
            tableRow.appendChild(createdCell)
        }
    }
    return arrayHolder;
    //console.log(arrayHolder);
    //console.log(arrayHolder.length);

}


function nextGeneration(currArray) {

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

    // Create a new blank array that will hold the tabulated 1/0 values for the next generation.
    nextArray = createArray();

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

            if(currArray[northRow][westCol] === 1){
                neighborCounter++;
            }

            if(currArray[northRow][currCol] === 1){
                neighborCounter++;
            }

            if(currArray[northRow][eastCol] === 1){
                neighborCounter++;
            }

            if(currArray[currRow][westCol] === 1){
                neighborCounter++;
            }

            if(currArray[currRow][eastCol] === 1){
                neighborCounter++;
            }

            if(currArray[southRow][westCol] === 1){
                neighborCounter++;
            }

            if(currArray[southRow][currCol] === 1){
                neighborCounter++;
            }

            if(currArray[southRow][eastCol] === 1){
                neighborCounter++;
            }

            if(currArray[currRow][currCol] === 1 && neighborCounter === 2){
                nextArray[currRow][currCol] = 1;
                console.log("Kept alive.");
            } else if(neighborCounter === 3){
                nextArray[currRow][currCol] = 1;
                console.log("Alive because of 3 neighbors");
            } else{
                // The nextArray is initialized to have 0s in all cells, but this makes the 
                // logic/setting explicit.
                nextArray[currRow][currCol] = 0;
            }
            
        }
    }

    return nextArray;

}

// This only works because the currentGenArray is in the global environment,
// so don't need to explicitly pass it into the function or return it from the function.
function makeNextGenCurrentGen(nextGenArray){
    for(let currRow = 0;  currRow < numRows; currRow++){
        for(let currCol = 0; currCol < numCols; currCol++){
            currentGenArray[currRow][currCol] = nextGenArray[currRow][currCol];
        }
    }
}

function renderNewGen(){
    for(let currRow = 0;  currRow < numRows; currRow++){
        for(let currCol = 0; currCol < numCols; currCol++){
            if(currentGenArray[currRow][currCol] === 1){
                document.getElementById("golCell" + currRow + "-" + currCol).className = 'alive';
            } else{
                document.getElementById("golCell" + currRow + "-" + currCol).className = 'dead';
            }

        }
    }

}


function calcPercAlive(inputArray){
    let numAlive = 0;
    for(let currRow = 0;  currRow < numRows; currRow++){
        for(let currCol = 0; currCol < numCols; currCol++){
            if(inputArray[currRow][currCol] === 1){
                numAlive++;
            } 
        }
    }
    // return as a fraction of the total number of cells
    return numAlive / (numRows * numCols);
}

// create data
//var data = [{x: 0, y: 20}, {x: 150, y: 150}, {x: 300, y: 100}, {x: 450, y: 20}, {x: 600, y: 130}]

// Initialize the array of array holder to mimic a matrix. Values start as 0 for all cells.
blankArray = createArray();

// Set up the array with initial 1/0 entries for live/dead that match the shown table state.
currentGenArray = setUpGrid(blankArray);

let numGenerations = 0;
let percAlive = 0.0;
let percAliveTracker = [];
let curveFunc = undefined;

// The number of miliseconds between animation frames
let animateInterval = setInterval(nextIteration, 10);

let margin = {top: 20, right: 20, bottom: 40, left: 50};
let width = 50 - margin.left - margin.right;
let height = 50 - margin.top - margin.bottom;

// This is the code for each additional iteration that's triggered by pressing the button.
function nextIteration(){

    if(numGenerations === 100 ){
        clearInterval(animateInterval);
    } else{

        nextGenArray = nextGeneration(currentGenArray);
        makeNextGenCurrentGen(nextGenArray);
        renderNewGen();
        percAlive = calcPercAlive(currentGenArray)
        numGenerations++;
        console.log(numGenerations);
        console.log(percAlive);
        percAliveTracker.push({x: numGenerations, y: percAlive});
        console.log(percAliveTracker);
        // prepare a helper function
        curveFunc = d3.area()
        .x(function(d) { return d.x })      // Position of both line breaks on the X axis
        .y1(function(d) { return d.y })     // Y position of top line breaks
        .y0(10)                            // Y position of bottom line breaks (200 = bottom of svg area)

        // Add the path using this helper function
        var svg_v2 = d3.select("svg#areaChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg_v2.append('path')
        .attr('d', curveFunc(percAliveTracker))
        .attr('stroke', 'black')
        .attr('fill', 'orange');

        // add the Y Axis
        svg.append("g")
        .call(d3.axisLeft(yScale));
    }
}

/*
// Set up the 'evolution' button
let progressButton = document.createElement('button');
progressButton.innerHTML = "Click to progress 1 generation."
document.body.appendChild(progressButton);
progressButton.addEventListener("click", nextIteration);

var margin = {top: 20, right: 20, bottom: 40, left: 50},
    width = 575 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// create svg element:
let svg = d3.select("#areaChart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
let yScale = d3.scaleLinear().range([1, 0]);


var data = [
    { x: 0, y: 10, },
    { x: 1, y: 15, },
    { x: 2, y: 35, },
    { x: 3, y: 20, },
];

var x = d3.scaleLinear()
.domain([0, d3.max(data, function(d) { return d.x; })])
.range([0, width]);

var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);

var area = d3.area()
.x(function(d) { return x(d.x); })
.y0(height)
.y1(function(d) { return y(d.y); });

var svg_v2 = d3.select("svg#area")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg_v2.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

svg_v2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg_v2.append("g")
    .attr("class", "y axis")
    .call(yAxis);

//console.log(currentGenArray);
//console.log(currentGenArray.length);

*/

