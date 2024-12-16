import SimilWords from "../simil-words.js";

const text1 = 'En un día y   lugar  de LA mancha';
const text2 = 'En un lugar de LA mancha';

console.log('Similitud entre textos:');
console.log(text1);
console.log(text2);
console.log('Similitud mejorada (subconjuntos: false. No penalizar palabras: false):',
    SimilWords.similText(text1, text2, false, false));
console.log('-----------------------------------------------------------------------------------');
console.log('Similitud mejorada (subconjuntos: false. No penalizar palabras: true):',
    SimilWords.similText(text1, text2, false, true));
console.log('-----------------------------------------------------------------------------------');    
console.log('Similitud mejorada (subconjuntos: true. No penalizar palabras: false):',
    SimilWords.similText(text1, text2, true, false));
console.log('-----------------------------------------------------------------------------------');    
console.log('Similitud mejorada (subconjuntos: true. No penalizar palabras: true):',
    SimilWords.similText(text1, text2, true, true));
console.log('-----------------------------------------------------------------------------------');    