console.log("Gussy!")

let numRows = 2;
let numCols = 2;

let arraySize = numRows*numCols;
let array = new Array(arraySize);

// Create the main div and assign to class 'golContain'
let mainDiv = document.createElement('div');
mainDiv.className = "golContain";
document.body.appendChild(mainDiv);
let childDiv = undefined;
let rowNum = 0;
let colNum = 0;

for(let index = 0;  index < array.length; index++){
    console.log(index)
    // Create the child divs for inside the parent and include the index value as the text
    childDiv = document.createElement('div');
    childDiv.className = "golCell";
    childDiv.innerHTML = index;
    mainDiv.appendChild(childDiv);
    rowNum

}
