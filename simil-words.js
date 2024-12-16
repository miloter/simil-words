'use strict';
/**
 * Permite obtener las similitudes de palabras y textos así como
 * la normalización de textos a diferentes formas.
 * 
 * @author miloter
 * @version 1.1
 * @since 2020-05-17
 * @version 2024-12-14
 * @license MIT.
 */
export default class SimilWords {
    /**
     * Para buscar cadenas distintas de caracteres de espacio.
     */
    static #reNotSpace = /^[^\s]+$/i;
    /**
     * Para buscar cadenas alfanuméricas completas sin distinguir
     * mayúsculas de minúsculas.
     */
    static #reAlphaNum = /^[_0-9A-ZÁÀÂÃÄÅÆÉÈÊËÍÌÎÏÓÒÔÕÖØÚÙÜÛÇÑŠŽŒŸÐÝÞß]+$/i;        
    /**
     * La búsqueda insensible a mayúsculas y minúsculas y los acentos
     * se implementa en un array asociativo.
     */
    static #alpha;
    static {
        this.#alpha = new Map();     
        // Alfabeto de equivalencias
        SimilWords.#alpha.set('F', 70);
        SimilWords.#alpha.set('f', 70);
        SimilWords.#alpha.set('G', 71);
        SimilWords.#alpha.set('g', 71);
        SimilWords.#alpha.set('H', 72);
        SimilWords.#alpha.set('h', 72);
        SimilWords.#alpha.set('J', 74);
        SimilWords.#alpha.set('j', 74);
        SimilWords.#alpha.set('K', 75);
        SimilWords.#alpha.set('k', 75);
        SimilWords.#alpha.set('L', 76);
        SimilWords.#alpha.set('l', 76);
        SimilWords.#alpha.set('M', 77);
        SimilWords.#alpha.set('m', 77);
        SimilWords.#alpha.set('Q', 81);
        SimilWords.#alpha.set('q', 81);
        SimilWords.#alpha.set('R', 82);
        SimilWords.#alpha.set('r', 82);
        SimilWords.#alpha.set('T', 84);
        SimilWords.#alpha.set('t', 84);
        SimilWords.#alpha.set('V', 86);
        SimilWords.#alpha.set('v', 86);
        SimilWords.#alpha.set('W', 87);
        SimilWords.#alpha.set('w', 87);
        SimilWords.#alpha.set('X', 88);
        SimilWords.#alpha.set('x', 88);
        SimilWords.#alpha.set('A', 65);
        SimilWords.#alpha.set('a', 65);
        SimilWords.#alpha.set('Á', 65);
        SimilWords.#alpha.set('á', 65);
        SimilWords.#alpha.set('À', 65);    
        SimilWords.#alpha.set('à', 65);            
        SimilWords.#alpha.set('Â', 65);
        SimilWords.#alpha.set('â', 65);
        SimilWords.#alpha.set('Ã', 65);
        SimilWords.#alpha.set('ã', 65);
        SimilWords.#alpha.set('Ä', 65);
        SimilWords.#alpha.set('ä', 65);
        SimilWords.#alpha.set('Å', 65);
        SimilWords.#alpha.set('å', 65);
        SimilWords.#alpha.set('Æ', 65);
        SimilWords.#alpha.set('æ', 65);
        SimilWords.#alpha.set('E', 69);
        SimilWords.#alpha.set('e', 69);
        SimilWords.#alpha.set('É', 69);
        SimilWords.#alpha.set('é', 69);
        SimilWords.#alpha.set('È', 69);
        SimilWords.#alpha.set('è', 69);
        SimilWords.#alpha.set('Ê', 69);
        SimilWords.#alpha.set('ê', 69);
        SimilWords.#alpha.set('Ë', 69);
        SimilWords.#alpha.set('ë', 69);
        SimilWords.#alpha.set('I', 73);
        SimilWords.#alpha.set('i', 73);
        SimilWords.#alpha.set('Í', 73);
        SimilWords.#alpha.set('í', 73);
        SimilWords.#alpha.set('Ì', 73);
        SimilWords.#alpha.set('ì', 73);
        SimilWords.#alpha.set('Î', 73);
        SimilWords.#alpha.set('î', 73);
        SimilWords.#alpha.set('Ï', 73);
        SimilWords.#alpha.set('ï', 73);
        SimilWords.#alpha.set('O', 79);
        SimilWords.#alpha.set('o', 79);
        SimilWords.#alpha.set('Ó', 79);
        SimilWords.#alpha.set('ó', 79);
        SimilWords.#alpha.set('Ò', 79);
        SimilWords.#alpha.set('ò', 79);
        SimilWords.#alpha.set('Ô', 79);
        SimilWords.#alpha.set('ô', 79);
        SimilWords.#alpha.set('Õ', 79);
        SimilWords.#alpha.set('õ', 79);
        SimilWords.#alpha.set('Ö', 79);
        SimilWords.#alpha.set('ö', 79);
        SimilWords.#alpha.set('Ø', 79);
        SimilWords.#alpha.set('ø', 79);
        SimilWords.#alpha.set('Œ', 79);
        SimilWords.#alpha.set('œ', 79);
        SimilWords.#alpha.set('U', 85);
        SimilWords.#alpha.set('u', 85);
        SimilWords.#alpha.set('Ú', 85);
        SimilWords.#alpha.set('ú', 85);
        SimilWords.#alpha.set('Ù', 85);
        SimilWords.#alpha.set('ù', 85);
        SimilWords.#alpha.set('Ü', 85);
        SimilWords.#alpha.set('ü', 85);
        SimilWords.#alpha.set('Û', 85);
        SimilWords.#alpha.set('û', 85);
        SimilWords.#alpha.set('C', 67);
        SimilWords.#alpha.set('c', 67);
        SimilWords.#alpha.set('Ç', 67);
        SimilWords.#alpha.set('ç', 67);
        SimilWords.#alpha.set('N', 78);
        SimilWords.#alpha.set('n', 78);
        SimilWords.#alpha.set('Ñ', 78);
        SimilWords.#alpha.set('ñ', 78);
        SimilWords.#alpha.set('S', 83);
        SimilWords.#alpha.set('s', 83);
        SimilWords.#alpha.set('Š', 83);
        SimilWords.#alpha.set('š', 83);
        SimilWords.#alpha.set('Z', 90);
        SimilWords.#alpha.set('z', 90);
        SimilWords.#alpha.set('Ž', 90);
        SimilWords.#alpha.set('ž', 90);
        SimilWords.#alpha.set('Y', 89);
        SimilWords.#alpha.set('y', 89);
        SimilWords.#alpha.set('Ÿ', 89);
        SimilWords.#alpha.set('ÿ', 89);
        SimilWords.#alpha.set('Ý', 89);
        SimilWords.#alpha.set('ý', 89);
        SimilWords.#alpha.set('D', 68);
        SimilWords.#alpha.set('d', 68);
        SimilWords.#alpha.set('Ð', 68);
        SimilWords.#alpha.set('ð', 68);
        SimilWords.#alpha.set('P', 80);
        SimilWords.#alpha.set('p', 80);
        SimilWords.#alpha.set('Þ', 80);
        SimilWords.#alpha.set('þ', 80);
        SimilWords.#alpha.set('B', 66);
        SimilWords.#alpha.set('b', 66);
        SimilWords.#alpha.set('ß', 66);
    }

    /**
     * Indica si los caracteres padre se toman en minúsculas.
     * Por defecto se toman en mayúsculas.
     */
    #parentLower;    
    /**
     * Devuelve una búsqueda inversa, es decir, a partir del código padre
     * devuelve el carácter padre.
     */
    #parent;    

    /**
     * Construye una nueva instancia con la posibilidad de indicar si los
     * caracteres padre están en mayúsculas o minúsculas.
     * @param {boolean} [parentLower = false} Indica si los caracteres padre
     * se toman en minúsculas. Por defecto se toman en mayúsculas.
     */
    constructor(parentLower = false) {
        this.#parentLower = parentLower;
        this.#parent = new Map();            
        this.#parent.set(70, this.#parentLower ? 'f' : 'F');
        this.#parent.set(71, this.#parentLower ? 'g' : 'G');
        this.#parent.set(72, this.#parentLower ? 'h' : 'H');
        this.#parent.set(74, this.#parentLower ? 'j' : 'J');
        this.#parent.set(75, this.#parentLower ? 'k' : 'K');
        this.#parent.set(76, this.#parentLower ? 'l' : 'L');
        this.#parent.set(77, this.#parentLower ? 'm' : 'M');
        this.#parent.set(81, this.#parentLower ? 'q' : 'Q');
        this.#parent.set(82, this.#parentLower ? 'r' : 'R');
        this.#parent.set(84, this.#parentLower ? 't' : 'T');
        this.#parent.set(86, this.#parentLower ? 'v' : 'V');
        this.#parent.set(87, this.#parentLower ? 'w' : 'W');
        this.#parent.set(88, this.#parentLower ? 'x' : 'X');
        this.#parent.set(65, this.#parentLower ? 'a' : 'A');
        this.#parent.set(69, this.#parentLower ? 'e' : 'E');
        this.#parent.set(73, this.#parentLower ? 'i' : 'I');
        this.#parent.set(79, this.#parentLower ? 'o' : 'O');
        this.#parent.set(85, this.#parentLower ? 'u' : 'U');
        this.#parent.set(67, this.#parentLower ? 'c' : 'C');
        this.#parent.set(78, this.#parentLower ? 'n' : 'N');
        this.#parent.set(83, this.#parentLower ? 's' : 'S');
        this.#parent.set(90, this.#parentLower ? 'z' : 'Z');
        this.#parent.set(89, this.#parentLower ? 'y' : 'Y');
        this.#parent.set(68, this.#parentLower ? 'd' : 'D');
        this.#parent.set(80, this.#parentLower ? 'p' : 'P');
        this.#parent.set(66, this.#parentLower ? 'b' : 'B');
    }    

    /**
     * Devuelve el carácter padre del carácter pasado
     * como argumento. Si no tiene padre devuelve el
     * mismo carácter.
     * @param {string} c 
     * @returns {string}
     */
    parentChar(c) {
        const r = this.#parent.get(SimilWords.iPos(c));
        
        return r !== undefined ? r : c;
    }

    /**
     * Devuelve la cadena en formato padre de la cadena pasada como argumento.
     * @param {string} s 
     * @returns 
     */
    parentString(s) {
        let r = '';

        for (let i = 0; i < s.length; i++) {
            r += this.parentChar(s[i]);            
        }

        return r;
    }
    
    /**
     * Devuelve la posición de una letra en un criterio relativo de comparación
     * que ignora diferencias entre mayúsculas y minúsculas y sus signos.
     * @param {string} c Cadena conteniendo un único carácter.
     * @returns {number}
     */
    static iPos(c) {
        const p = SimilWords.#alpha.get(c);        
        
        return p !== undefined ? p : c.charCodeAt(0);
    }

    /**
     * Devuelve un valor que indica si en una cadena todos sus
     * caracteres son alfanuméricos.
     * @param {string} Cadena a comprobar.
     * @returns {boolean}
     */
    static isAlphaNum(c) {
        return SimilWords.#reAlphaNum.test(c);
    }

    /**
     * Devuelve un valor que indica si en una cadena todos sus
     * caracteres son diferentes de espacios.
     * @param {string} Cadena a comprobar.
     * @returns {boolean}
     */
    static isNotSpace(c) {
        return SimilWords.#reNotSpace.test(c);
    }

    /**
     * Compara dos cadenas sin tener en cuenta la diferencia entre
     * mayúsculas y minúsculas ni los signos.
     * Devuelve 0 si so iguales.
     * -1 si la primera es menor que la segunda.
     * 1 si la primera es mayor que la segunda.     
     * @param {string} s1 Primera cadena que se comparará.
     * @param {string} s2 Segunda cadena que se comparará.
     * @returns {number}
     */
    static iCmp(s1, s2) {
        const limit = (s1.length <= s2.length) ? s1.length : s2.length;        

        for (let i = 0; i < limit; i++) {
            const j = SimilWords.iPos(s1[i]); // Buscamos la posición de la letra de la primera cadena
            const k = SimilWords.iPos(s2[i]); // Buscamos la posición de la letra de la segunda cadena
            if (j > k) {
                return 1;
            } else if (j < k) {
                return -1;
            }
        }

        if (s1.length === s2.length) {
            return 0;
        } else if (s1.length > s2.length) {
            return 1;
        } else {
            return -1;
        }
    }    
    
    /**
     * Devuelve el porcentaje de similitud entre dos cadenas en una escala de 0 a 100.
     * El algoritmo es una implementacón del algoritmo de la distancia de Levenshtein.
     * El algoritmo de comparación no tiene en cuenta la diferencia entre mayúsculas
     * y minúsculas e ignora los signos, como los acentos, tildes, etc.
     * @param {string} s Primera cadena a comparar con la segunda.
     * @param {string} t Segunda cadena a comparar con la primera.
     * @returns {number} El porcentaje de similitud en una escala de 0 a 100.
     */
    static similitud = (s, t) => {        
        const m = s.length;
        const n = t.length;        

        // Verifica que exista algo que comparar
        if (m === 0 && n === 0) {
            return 100;
        } else if (m === 0 || n === 0) {
            return 0;            
        }

        // Creamos una tabla con m+1 renglones y n+1 columnas
        const d = new Array(m + 1);
        for (let i = 0; i < d.length; i++) {
            d[i] = new Array(n + 1);
        }        

        // Llena la primera columna y la primera fila.
        for (let i = 0; i <= m; d[i][0] = i++) ;
        for (let j = 0; j <= n; d[0][j] = j++) ;

        // Recorre la matriz llenando cada unos de los pesos.
        // i columnas, j renglones
        for (let i = 1; i <= m; i++) {
            // recorre para j
            for (let j = 1; j <= n; j++) {
                // Si son iguales en posiciones equidistantes el peso es 0
                // de lo contrario el peso suma a uno.
                const weight = SimilWords.iPos(s[i - 1]) === SimilWords.iPos(t[j - 1]) ? 0 : 1;
                d[i][j] = Math.min(Math.min(d[i - 1][j] + 1,  // Eliminacion
                                d[i][j - 1] + 1),             // Inserccion 
                                d[i - 1][j - 1] + weight);     // Sustitucion
            }
        }

        // Calculamos el porcentaje de cambios en la palabra.
        if (s.length > t.length)
            return Math.round(100 * (1 - d[m][n] / s.length));            
        else
            return Math.round(100 * (1 - d[m][n] / t.length));        
    }    

    /**
     * Devuelve un array con las palabras en una cadena.
     * @param {string} s Cadena de donde se extraerán las palabras.          
     * @returns {string[]}
     */
    static getWordsRaw(s) {        
        const list = [];
        let start = 0, length = 0;        

        for (let i = 0; i < s.length; i++) {            
            if (SimilWords.isAlphaNum(s[i])) {
                if (length === 0) {
                    start = i;
                }
                length++;
            } else if (length > 0) {
                list.push(s.substring(start, start + length));
                length = 0;
            }
        }

        if (length > 0) {
            list.push(s.substring(start, start + length));
        }

        return list;
    }    

    /**
     * Devuelve un array con las palabras en una cadena.
     * @param {string} s Cadena de donde se extraerán las palabras.     
     * @param {boolean} parent Si es verdadero devuelve las palabras en
     * formato cadena padre.
     * @returns {string[]}
     */
    getWords = (s, parent) => {        
        if (parent) {
            s = this.parentString(s);
        }

        return SimilWords.getWordsRaw(s);
    }    

    /**
     * Devuelve una cadena normalizada.
     * @param {string} s Cadena que se normalizará.     
     * @param {string} [sep = ' '] Separador de las palabras normalizadas.
     * Si no se suministra se usa un espacio en blanco.
     * @returns {string}
     */
    static normalizeRaw = (s, sep = ' ') => {
        return SimilWords.getWordsRaw(s).join(sep);
    }           

    /**
     * Devuelve una cadena normalizada.
     * @param {string} s Cadena que se normalizará.
     * @param {boolean} [parent = false] Si es verdadero devuelve las palabras en
     * formato cadena padre. Si no se suministra o es false utiliza las palabras
     * sin transformación alguna.
     * @param {string} [sep = ' '] Separador de las palabras normalizadas.
     * Si no se suministra se usa un espacio en blanco.
     * @returns {string}
     */
    normalize = (s, parent = false, sep = ' ') => {
        return this.getWords(s, parent).join(sep);
    }                

    /**
     * Compara dos textos y devuelve un porcentaje de similitud.
     * La comparación es insensible a mayúsculas, minúsculas y letras con signo.
     * @param {string} s1 Primera cadena que se comparará.
     * @param {string} s2 Segunda cadena que se comparará.     
     * @subset {boolean} subset Si es verdadero la similitud se hace en relación a la cadena
     * @notPenalizeNumWords {boolean} notPenalizeNumWords Si es verdadero no se aplica la
     * penalización cuando el número de palabras en ambos textos es diferente.
     * más corta, si no, se compara com la cadena más larga.
     * @returns {number} Un porcentaje de similitud de 0 a 100.
     */
    static similText = (s1, s2, subset = false, notPenalizeNumWords = false) => {
        const APROX_PERCENT = 50;
        const REDUCTOR = 0.89;            

        let ws1 = SimilWords.getWordsRaw(s1);
        let ws2 = SimilWords.getWordsRaw(s2);

        if (ws1.length === 0 && ws2.length === 0) {
            return 100;
        } else if (ws1.length === 0 || ws2.length === 0) {
            return 0;
        }

        if (ws1.length > ws2.length) {
            const aux = ws1;
            ws1 = ws2;
            ws2 = aux;
        }

        // Buscamos inicialmente coincidencias del 100%
        let total = 0, count = 0;                
        for (let i = 0; i < ws1.length; i++) {        
            for (let j = 0; j < ws2.length; j++) {
                if (ws2[j] !== '') {
                    if (SimilWords.iCmp(ws1[i], ws2[j]) === 0) {
                        total += 100 * ((i !== j && !subset) ? REDUCTOR : 1);
                        count++;
                        ws1[i] = '';
                        ws2[j] = '';                   
                        break; 
                    }            
                }
            }            
        }
        
        let iMax, jMax;
        do {
            let max = 0;
            for (let i = 0; i < ws1.length; i++) {
                if (ws1[i] !== '') {                    
                    for (let j = 0; j < ws2.length; j++) {
                        if (ws2[j] !== '') {
                            let p = SimilWords.similitud(ws1[i], ws2[j]);
                            
                            // Se penaliza si la coincidencia es menor de 50
                            if (p < APROX_PERCENT) {
                                p *= REDUCTOR;                                                                
                            }                                                        

                            /* Se aplica el coeficiente reductor si están en distinta
                            posición y no se busca coincidencia de subconjunto */
                            if (i !== j && !subset) {
                                p *= REDUCTOR;
                            }

                            if (p > max) {
                                max = p;
                                iMax = i;
                                jMax = j;

                                // Si coincide totalmente, no se sigue comprobando
                                if (max === 100) {
                                    break;
                                }
                            }                     
                        }                        
                    }
                    
                    // Si coincide totalmente, no se sigue comprobando
                    if (max === 100) {
                        break;
                    }                    
                }
            }

            if (max > 0) {
                total += max;
                ws1[iMax] = '';
                ws2[jMax] = '';
                count++;
            } else {
                break;
            }
        } while(count < ws1.length);        

        // Si se compara como subconjunto, entonces se usa la cadena más corta
        let p = total / (subset ? ws1.length : ws2.length);
        
        if (!notPenalizeNumWords) {
            // Corregimos con un factor basado en la diferencia de palabras
            p *= Math.pow(0.99, Math.abs(ws1.length - ws2.length));
        }

        return p;
    }        
}
