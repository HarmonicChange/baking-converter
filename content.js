var allHTMLTags = document.getElementsByTagName('*'); // Returns an HTMLCollection of all tags in the document
var htmlTagsAsArray = Array.prototype.slice.call(allHTMLTags); // Converts to array

// Keep HTML that (1) has no children (2) has innerHTML and (3) is not a script tag
var filteredHTML = htmlTagsAsArray.filter(node => node.childElementCount == 0 && node.innerHTML && node.tagName != "SCRIPT");
//console.log(filteredHTML);

// Assemble regular expression from defined vocabulary
var matchingRegex = assembleRegexFromVocab();

// Loop through innerHTML and find phrases that we will convert
for (var i = 0; i < filteredHTML.length; i++) {
  var matchesWithGroups = [...filteredHTML[i].innerHTML.matchAll(new RegExp(matchingRegex))];
  console.log("1: " + matchesWithGroups[1].parseFloat() + " , 2: " matchesWithGroups[2] + " , 3: " + matchesWithGroups[3]);
}

// Uses vocabulary we define to build a regular expression for detecting our desired phrases.
function assembleRegexFromVocab () {
  // Make sure to start with the LONGEST version of the word first!
  var measurements_vocab = ["cups", "cup",
      "teaspoons", "teaspoon", "tspns", "tspn", "tsp",
      "tablespoons", "tablespoon", "tbspn", "tbsp"];
  var ingredients_vocab = ["bread\\ flour", "cake\\ flour", "all\\ purpose\\ flour", "flour",
      "brown\\ sugar", "granulated\\ sugar", "cane\\ sugar", "sugar",
      "butter"];

  // Assemble a regex string that will match "[fraction/digit] [measurement vocab] [ingredient vocab]"
  var myRegexString = "(\\d{1,2}\\/\\d{1,2}|\\d{1,2}) ("; // Start with a fraction or digit, double backslashes needed as escape
  for (var i = 0; i < measurements_vocab.length; i++) {
    if (i == 0) { // On first iteration, we don't add the | symbol for the regex
      myRegexString += measurements_vocab[i];
    } else {
      myRegexString += "|" + measurements_vocab[i];
    }
  }
  myRegexString += ") ("; // Add the first space
  for (var i = 0; i < ingredients_vocab.length; i++) {
    if (i == 0) { // On first iteration, we don't add the | symbol for the regex
      myRegexString += ingredients_vocab[i];
    } else { // Otherwise, we or the rest of the words
      myRegexString += "|" + ingredients_vocab[i];
    }
  }
  myRegexString += ")";

  // Return the string as a regular expression.
  return new RegExp(myRegexString, "ig"); // i = case-insensitive, 'g' = global search (find all matches)
}

function conversionLibrary(quantity, ingredient, convertFrom, convertTo) {
  //All densities in g/mL
  var FLOUR_DENSITY = 0.593
  var WHITE_GRANULATED_SUGAR_DENSITY = 0.85

  //Converting any volume to mL
  var CUPS_TO_ML = 236.588
  var TSP_TO_ML = 4.929
  var TBSP_TO_ML = 14.787

  if(convertFrom == )
}
