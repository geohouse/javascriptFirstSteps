
//let submittedValue = document.getElementById("converter").value;
//const submitButton = document.querySelector('input[type="button"]');

//submitButton.addEventListener('click', latinRomanConvert);

function convertToLatin(){

}

function convertToRoman(){

}

let inputValue = undefined;
function latinRomanConvert(){
    inputValue = document.getElementById("converter").value;
    console.log("The input value is: " + inputValue);

    // This is TRUE if inputValue doesn't contain a number
    // i.e. this input is a roman numeral
    if(isNaN(inputValue)){
        console.log("Roman numeral entry");
    } else{
        console.log("Latin number entry");
    }

}