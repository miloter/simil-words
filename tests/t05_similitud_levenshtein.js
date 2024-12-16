import SimilWords from "../simil-words.js";

const text1 = 'En un día y   lugar  de LA mancha';
const text2 = 'En un lugar de LA mancha';
const text3 = 'En un lugar de la mancha';

console.log('Similitud entre textos:');
console.log(text1);
console.log(text2);
console.log('Similitud de Levenshtein:', SimilWords.similitud(text1, text2));
console.log('--------------------------');
console.log(text2);
console.log(text3);
console.log('Similitud de Levenshtein:', SimilWords.similitud(text2, text3));
console.log('--------------------------');