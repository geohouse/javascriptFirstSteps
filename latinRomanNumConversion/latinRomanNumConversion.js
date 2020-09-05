
//let submittedValue = document.getElementById("converter").value;
//const submitButton = document.querySelector('input[type="button"]');

//submitButton.addEventListener('click', latinRomanConvert);

// This sets up a lookup object for each conversion between roman and latin.
// Lookup example for 'X': 'romanToLatinConvert.X' or 'romanToLatinConvert["X"] gives 10.
let romanToLatinConvert = {"I": 1, "V": 5, "X": 10, "L":50, "C":100, "D": 500, "M": 1000};
let latinToRomanConvert_latin = [1, 5, 10, 50, 100, 500, 1000];
let latinToRomanConvert_roman = ["I", "V", "X", "L", "C", "D", "M"];


https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Rome_Colosseum_inscription_2.jpg/400px-Rome_Colosseum_inscription_2.jpg

function convertToLatin(romanInput){
    let latinConvert = 0;
    let currRomanValue = 0;
    let currLatinValue = 0;
    let nextRomanValue = 0;
    let nextLatinValue = 0;

    for(let index = 0; index < romanInput.length; index++){
        
        currRomanValue = romanInput[index];
        currLatinValue = romanToLatinConvert[currRomanValue];

        // As long as the current entry is at least the second to the last
        // check the next entry to determine whether it's larger or smaller
        // i.e. whether it needs to be added to the running tally or subtracted.
        if(index < romanInput.length - 1){
            
            nextRomanValue = romanInput[index + 1];
            nextLatinValue = romanToLatinConvert[nextRomanValue];
            
            if(currLatinValue < nextLatinValue){
                latinConvert = latinConvert - currLatinValue;
            } else {
                latinConvert = latinConvert + currLatinValue;
            }
            
            //console.log("Curr " + romanToLatinConvert[currRomanValue]);
            //console.log("Next " + romanToLatinConvert[nextRomanValue]);
        } else{ // add the last numeral
            latinConvert = latinConvert + currLatinValue;
        }
        console.log(romanInput[index]);
    }
    return(latinConvert);
}

function findLargestRomanNumeral(latinInput){
    // Will hold the largest Roman numeral value that can fit inside the current value 
    let largestRomanHolder = "";
    let currRomanNum = "";
    let currLatinNum = 0;
    // Loop through Roman numerals (ordered in the list in increasing order)
    for(let numIndex = 0; numIndex < latinToRomanConvert_latin.length; numIndex ++){
        console.log("Num index is: " + numIndex + " corres. entry is: " + latinToRomanConvert_roman[numIndex]);
        currRomanNum = latinToRomanConvert_roman[numIndex];
        currLatinNum = latinToRomanConvert_latin[numIndex];
        // Find the largest roman numeral that can represent the number
        if((latinInput % currLatinNum) < latinInput){
            largestRomanHolder = currRomanNum;
        }
    }
    return largestRomanHolder;
}

function convertToRoman(latinInput){
    // Will hold the growing string
    let romanConvert = "";
    let largestRomanHolder = "";
    while(latinInput > 0){
        // Find the largest Roman numeral that fits within the number
        largestRomanHolder = findLargestRomanNumeral(latinInput);
        // Add it to the growing string of the Roman numeral
        romanConvert = romanConvert + largestRomanHolder;
        // Look up the Latin value for the Roman numeral, and subtract it from the numeric value left to convert
        latinInput = latinInput - romanToLatinConvert[largestRomanHolder];
        console.log("The largest Roman numeral is: " + largestRomanHolder);
    }

    //console.log("The final Roman numeral conversion is:" + romanConvert);
    //if(entry % romanNum) < entry
    return romanConvert;

}

let inputValue = undefined;
let convertedToLatin = 0;
function latinRomanConvert(){
    inputValue = document.getElementById("converter").value;
    console.log("The input value is: " + inputValue);

    // This is TRUE if inputValue doesn't contain a number
    // i.e. this input is a roman numeral
    if(isNaN(inputValue)){
        console.log("Roman numeral entry");
        convertedToLatin = convertToLatin(inputValue);
        // Set the output text
        document.getElementById("outcomePara").innerHTML = "Conversion from Roman to Latin is: " + convertedToLatin;
        // Change the class of the output div (parent of the outputPara)
        // so CSS assigns right background color.
        document.getElementById("outcomeDiv").className = "r2l";
        console.log("Converted is: " + convertedToLatin);
    } else{
        console.log("Latin number entry");
        convertedToRoman = convertToRoman(inputValue);
        // Set the output text
        document.getElementById("outcomePara").innerHTML = "Conversion from Latin to Roman is: " + convertedToRoman;
        // Change the class of the output div (parent of the outputPara)
        // so CSS assigns right background color.
        document.getElementById("outcomeDiv").className = "l2r";
        console.log("Converted is: " + convertedToRoman);

    }

}