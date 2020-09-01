# Baking Converter - Chrome Extension

A Chrome Extension that will automatically detect ingredients on websites and convert them to grams.

Ex: "1 cup flour" --> "1 cup (120 g) flour"

## Matching Algorithm

This script uses regular expressions to match ingredients on websites. Currently, the following assumptions are made.
* An ingredient is always formatted as "[fraction or digit] [measurement word] [ingredient word]"
* Fractions only have up to 2 digits in the numerator and denominator. Non-fractional numbers only have up to 2 digits.
* The first regex group doesn't account for mixed fractions yet.
* The entire phrase is contained within the innerHTML of a childless HTML tag.

Some possible expansions to functionality:
* Other formats for writing ingredients, for example, "Flour, 1 cup"?
* Temperature conversions?
* Let users specify which units they'd like to convert to?
