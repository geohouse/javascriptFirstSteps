
// No idea exactly how this works, just that it does! Gets the word list in an array called data.
// from here:
// https://forum.freecodecamp.org/t/javascript-version-of-jquery-getjson/20365


var request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/words/an-array-of-english-words/master/index.json', true);

var data = undefined;
request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    data = JSON.parse(this.response);
    console.log(data);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

