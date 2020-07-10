var allHTMLTags = document.getElementsByTagName('*'); // Returns an HTMLCollection of all tags in the document
var htmlTagsAsArray = Array.prototype.slice.call(allHTMLTags); // Converts to array

// Keep HTML that (1) has no children (2) has innerHTML and (3) is not a script tag
var filteredHTML = htmlTagsAsArray.filter(node => node.childElementCount == 0 && node.innerHTML && node.tagName != "SCRIPT");
console.log(filteredHTML);

// Loop through inneHTML and find phrases that we will convert
//for (var i = 0; i < filteredHTML.length; i++) {

//}

// Uses vocabulary we define to build a regular expression for detecting our desired phrases.
function assembleRegexFromVocab () {
  // Make sure to start with the LONGEST version of the word first!
  var measurements_vocab = ["cups", "cup",
      "ounces", "ounce", "oz",
      "teaspoons", "teaspoon", "tspn",
      "tablespoons", "tablespoon", "tbspn", "tbsp"];
  var ingredients_vocab = ["bread flour", "cake flour", "all purpose flour", "flour",
      "brown sugar", "granulated sugar", "cane sugar", "sugar"];

  // Assemble a regex string that will match "[fraction/digit] [measurement vocab] [ingredient vocab]"
  var myRegexString = "/(\d{1,2}\/\d{1,2}|\d{1,2}) ("; // Start with a fraction or digit
  for (var i = 0; i < measurements_vocab.length; i++) {
    if (i == 0) { // On first iteration, we don't add the | symbol for the regex
      myRegexString += measurements_vocab[i];
    } else {
      myRegexString += "|" + measurements_vocab[i];
    }
  }
  myRegexString += ") (";
  for (var i = 0; i < ingredients_vocab.length; i++) {
    if (i == 0) { // On first iteration, we don't add the | symbol for the regex
      myRegexString += ingredients_vocab[i];
    } else { // Otherwise, we or the rest of the words
      myRegexString += "|\b" + ingredients_vocab[i];
    }
  }
  myRegexString += ")/i";

  // Return the string as a regular expression
  console.log(myRegexString);
  return new RegExp(myRegexString);
}
