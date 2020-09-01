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

// Create the child divs for inside the parent and include the index value as the text
for(let index = 0;  index < array.length; index++){
    console.log(index)
    childDiv = document.createElement('div');
    childDiv.id = "golCell" + index
    //childDiv.style.backgroundColor = "#00FF00";
    //childDiv.className = "golCell"// + index;
    childDiv.innerHTML = index;
    mainDiv.appendChild(childDiv);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

let targetDiv = undefined;
// Loop through array to update states/colors
for (index2 = 0; index2 < 4; index2 ++){

for(index = 0; index < array.length; index++){
    rowNum = Math.floor(index / numRows) + 1;
    colNum = index % numCols + 1;
    console.log("Row num is: " + rowNum);
    console.log("Col num is: " + colNum);

    
    if (index2 === 0 && index % 2 === 0){
        // set the class and then the class selector in CSS takes care of setting the color.
        document.getElementById("golCell" + index).className= 'alive';
    }
    /*if (index2 === 1){
        targetDiv = document.getElementById("golCell" + index).style.backgroundColor= '#0000FF';
    }
    */
    /* define sleep function to wait for 2 seconds (from here:
    https://www.sitepoint.com/delay-sleep-pause-wait/
    */

    
      console.log("Hello");
      //sleep(2000);

    /*
    for(i=0; i<targetDiv.length; i++) {
        targetDiv[i].style.backgroundColor = '#FF0000';
      }
      */
    //console.log(targetDiv);
}
}


