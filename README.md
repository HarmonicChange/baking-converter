# Baking Converter - Chrome Extension (WIP)

A Chrome Extension that will automatically detect ingredients on websites and convert them to the desired units.

Ex: "1 cup flour" --> "1 cup (120 grams) flour"

## Matching Algorithm

This script uses regular expressions to match ingredients on websites. Currently, the following assumptions are made.
* An ingredient is always formatted as "[fraction or digit] [measurement word] [ingredient word]"
* Fractions only have up to 2 digits in the numerator and denominator. Non-fractional numbers only have up to 2 digits.
* The first regex group doesn't account for mixed fractions (like "1 1/2").
* The entire phrase is contained within the innerHTML of a childless HTML tag.

Some possible expansions to our regular expression:
* Other formats for writing ingredients, for example, "Flour, 1 cup".
