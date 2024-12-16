import SimilWords from "../simil-words.js";

const swUpper = new SimilWords();
const swLower = new SimilWords(true);

const unNormalized = `
    En un día y  \t lugar \n de LA mancha de
    cuyo NOMBRE
    no quiero
    acordarme...
`;
console.log('Sin normalizar:')
console.log(unNormalized);
console.log('Forma normalizada a mayúsculas: ==>')
console.log(swUpper.normalize(unNormalized, true));
console.log('Forma normalizada sin caso de caracteres: ==>')
console.log(swUpper.normalize(unNormalized));
console.log('Forma normalizada a minúsculas: ==>')
console.log(swLower.normalize(unNormalized, true));
console.log('Forma normalizada a minúsculas con guiones separadores: ==>')
console.log(swLower.normalize(unNormalized, true, '-'));