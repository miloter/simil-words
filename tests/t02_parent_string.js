import SimilWords from "../simil-words.js";

const swUpper = new SimilWords();
const swLower = new SimilWords(true);

// Por defecto los caracteres padre están en mayúsculas
console.log('Padres en mayúsculas:')
console.log(swUpper.parentString('el último día del año'));
// Se cambia a minúsculas
console.log('Padres en minúsculas:')
console.log(swLower.parentString('EL último DÍA del año'));
