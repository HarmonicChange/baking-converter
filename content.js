var allHTMLTags = document.getElementsByTagName('*'); // Returns an HTMLCollection of all tags in the document
var htmlTagsAsArray = Array.prototype.slice.call(allHTMLTags); // Converts to array

// Keep HTML that (1) has no children (2) has innerHTML and (3) is not a script tag
var filteredHTML = htmlTagsAsArray.filter(node => node.childElementCount == 0 && node.innerHTML && node.tagName != "SCRIPT");
console.log(filteredHTML);

// Contains words that we will "know" how to convert. Includes measurements and ingredients
var vocabulary = ["cup", "cups",
    "ounce", "ounces", "oz",
    "teaspoon", "teaspoons", "tspn",
    "flour", "bread flour", "cake flour", "all purpose flour"];

// Loop through filtered elements and find any occurrences of vocabulary
//for (var i = 0; i < filteredHTML.length; i++) {

//}
