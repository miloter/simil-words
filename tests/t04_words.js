import SimilWords from "../simil-words.js";

const swUpper = new SimilWords();
const swLower = new SimilWords(true);

const text = `
    En un día y  \t lugar \n de LA mancha de
    cuyo NOMBRE
    no quiero
    acordarme...
`;
// Obtenemos las palabras sin caso
console.log('Palabras sin caso:');
console.log(swUpper.getWords(text));
console.log('Palabras padre en mayúsculas:');
console.log(swUpper.getWords(text, true));
console.log('Palabras padre en minúsculas:');
console.log(swLower.getWords(text, true));