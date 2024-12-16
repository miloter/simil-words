# Lexical analyzer for texts in memory.
It allows to obtain the similarities of words and texts as well as the normalization of texts to different forms.

## Note:
simil-words is an ESM module so you will need to add to your package.json: "type": "module"

## Installation
```bash/powershell
npm install @miloter/simil-words
```

## Usage
```js
import SimilWords from '@miloter/simil-words';

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
```

## Examples

### Parent char
```js
import SimilWords from '@miloter/simil-words';

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
```

### Words
```js
import SimilWords from '@miloter/simil-words';

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
```

### Similarity Levenshtein
```js
import SimilWords from '@miloter/simil-words';

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
```

### Improved similarity
```js
import SimilWords from '@miloter/simil-words';

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
```
