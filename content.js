var allHTMLTags = document.getElementsByTagName('*'); // Returns an HTMLCollection of all tags in the document
var htmlTagsAsArray = Array.prototype.slice.call(allHTMLTags); // Converts to array

// Keep HTML that (1) has no children (2) has innerHTML and (3) is not a script tag
var filteredHTML = htmlTagsAsArray.filter(node => node.childElementCount == 0 && node.innerHTML && node.tagName != "SCRIPT");

// Assemble regular expression from defined vocabulary
var matchingRegex = assembleRegexFromVocab();

// Loop through innerHTML and find phrases that we will convert
for (var i = 0; i < filteredHTML.length; i++) {
  var matchesWithGroups = [...filteredHTML[i].innerHTML.matchAll(new RegExp(matchingRegex))];

  if(matchesWithGroups.length > 0) { // If we found a match
    var gramsEquivalent = conversionLibrary(parseFloat(matchesWithGroups[0][1]), matchesWithGroups[0][3], matchesWithGroups[0][2], 'g');
    var replacementText = matchesWithGroups[0][1] + " " + matchesWithGroups[0][2] + " (" + gramsEquivalent.toString() + " g) " + matchesWithGroups[0][3];
    filteredHTML[i].innerHTML = filteredHTML[i].innerHTML.replace(matchesWithGroups[0][0], replacementText);
  }
}

// Uses vocabulary we define to build a regular expression for detecting our desired phrases.
function assembleRegexFromVocab () {
  // Make sure to start with the LONGEST version of the word first!
  var measurements_vocab = ["cups", "cup",
      "teaspoons", "teaspoon", "tspns", "tspn", "tsp",
      "tablespoons", "tablespoon", "tbspn", "tbsp"];
  var ingredients_vocab = ["bread\\ flour", "cake\\ flour", "all\\ purpose\\ flour", "all-purpose\\ flour", "flour",
      "brown\\ sugar", "granulated\\ sugar", "cane\\ sugar", "white \\ sugar", "sugar",
      "unsalted\\ butter", "salted\\ butter", "butter",
      "whole\\ milk", "milk"];

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
  // All densities in g/mL
  const FLOUR_DENSITY = 0.593;
  const WHITE_GRANULATED_SUGAR_DENSITY = 0.85;
  const BROWN_SUGAR_DENSITY = 0.93;
  const BUTTER_DENSITY = 0.911;
  const MILK_DENSITY = 1.026;

  // Converting any volume to mL
  const CUPS_TO_ML = 236.588;
  const TSP_TO_ML = 4.929;
  const TBSP_TO_ML = 14.787;

  // Converting grams to any weight

  // Convert to mL
  var multiplier = 1;
  if (convertFrom.includes("cup")) {
    multiplier *= CUPS_TO_ML;
  } else if (convertFrom.includes("tsp") || convertFrom.includes("teaspoon")) {
    multiplier *= TSP_TO_ML;
  } else if (convertFrom.includes("tbsp") || convertFrom.includes("tablespoon")) {
    multiplier *= TBSP_TO_ML;
  }

  // Convert to grams
  if (ingredient.includes("flour")) {
    multiplier *= FLOUR_DENSITY;
  } else if (ingredient.includes("brown sugar")) {
    multiplier *= BROWN_SUGAR_DENSITY;
  } else if (ingredient.includes("sugar")) {
    multiplier *= WHITE_GRANULATED_SUGAR_DENSITY;
  } else if (ingredient.includes("butter")) {
    multiplier *= BUTTER_DENSITY;
  } else if (ingredient.includes("milk")) {
    multiplier *= MILK_DENSITY;
  }

  return Math.round(quantity * multiplier);
}
