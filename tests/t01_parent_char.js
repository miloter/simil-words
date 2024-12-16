import SimilWords from "../simil-words.js";

const swUpper = new SimilWords();
const swLower = new SimilWords(true);
// Por defecto los caracteres padre están en mayúsculas
console.log('Padres en mayúsculas:')
console.log(swUpper.parentChar('á'));
console.log(swUpper.parentChar('ö'));
console.log(swUpper.parentChar('ñ'));
// Se cambia a minúsculas
console.log('Padres en minúsculas:')
console.log(swLower.parentChar('Á'));
console.log(swLower.parentChar('Ö'));
console.log(swLower.parentChar('Ñ'));