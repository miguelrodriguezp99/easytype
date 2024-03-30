import { GAME_MODE } from "./constants";

export const isKeyboardCodeAllowed = (code: string) => {
    return (
        code.startsWith("Key") || // Cubre las teclas alfabéticas
        code.startsWith("Digit") || // Cubre los números
        code.startsWith("Arrow") || // Incluye las teclas de flecha
        code === "Backspace" || // La tecla de borrar
        code === "Space" || // La barra espaciadora
        code === "Enter" || // La tecla Enter
        code.startsWith("Numpad") || // Teclas del teclado numérico
        code === "Tab" || // Tecla Tabulador
        //Permitir los puntos y comas
        code === "Period" || // Tecla de punto
        code === "Comma" || // Tecla de coma
        code === "Semicolon" || // Tecla de punto y coma
        code === "Quote" || // Tecla de comillas
        code === "Minus" || // Tecla de guión
        code === "Equal" || // Tecla de igual
        code === "BracketLeft" || // Tecla de corchete izquierdo
        code === "BracketRight" || // Tecla de corchete derecho
        code === "Backslash" || // Tecla de barra invertida
        code === "Backquote" || // Tecla de acento grave
        code === "Slash" || // Tecla de barra
        code === "IntlRo" || // Tecla de barra
        code === "IntlYen" || // Tecla de barra
        code === "IntlBackslash" || // Tecla de barra
        code === "Escape" || // Tecla Escape
        code === "ControlLeft"
    );
};

// Calcular kps y WPM
export const calculatekpsandWPM = (typedLength: number, timeUsed: number, words: string) => {
    const kps = Math.ceil((typedLength / timeUsed) * 60);
    let averageWordLength;
    if (words) {
        const totalLength = words
            .split(" ")
            .reduce((total, word) => total + word.length, 0);
        const wordCount = words.split(" ").length;
        averageWordLength = totalLength / wordCount; // Calcula la longitud promedio de las palabras dinámicamente
    } else {
        averageWordLength = 5; // O usa 5 si no hay datos suficientes
    }
    const wpm = Math.ceil(typedLength / averageWordLength / (timeUsed / 60));
    return { kps, wpm };
};

export const calculateAccuracy = (typed: string, errors: number) => {
    const accuracy = Math.ceil(
        ((typed.length - errors) / typed.length) * 100
    );
    return accuracy;
};


export const calculateErrors = (userWords: string, words: string) => {
    let errors = 0;
    // Split the words into characters if we can
    if (userWords.length <= 0 || words.length <= 0) return;

    let userChars = userWords.split("");
    let wordsChars = words.split("");

    userChars.forEach((char, index) => {
        if (char !== wordsChars[index]) {
            errors++;
        }
    });
    return errors;
};


export const getTestType = (gameMode: string, numberOfWords: string, timeSelected: string) => {
    if (gameMode === GAME_MODE.TIME) {
        return `time ${timeSelected} english`;
    } else {
        return `words ${numberOfWords} english`;
    }
}

export const getRandomPunctuationWord = (word: string, index: number) => {

    if (Math.random() < 0.2) {
        // 20% de probabilidad
        word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Añade signos de puntuación de forma más variada
    if (index % 5 === 0 && index !== 0) {
        // Evita el inicio de la cadena
        const punctuations = [".", ",", ":", ";", "?", "!"];
        const randomPunctuation =
            punctuations[Math.floor(Math.random() * punctuations.length)];
        if (randomPunctuation === "?" || randomPunctuation === "!") {
            word = " " + randomPunctuation + " " + word; // Añade espacio antes si es necesario
        } else {
            word += randomPunctuation;
        }
    }

    // Añade caracteres especiales ocasionalmente
    if (Math.random() < 0.1) {
        // 10% de probabilidad
        const specialChars = ['"', "'", "(", ")", "[", "]", "{", "}"];
        const randomSpecialChar =
            specialChars[Math.floor(Math.random() * specialChars.length)];
        if (randomSpecialChar === '"' || randomSpecialChar === "'") {
            word = randomSpecialChar + word + randomSpecialChar; // Envuelve la palabra
        } else {
            word = randomSpecialChar + word; // Añade al inicio
        }
    }

    return word;
}

export const getRandomNumberWord = (word: string) => {
    const action = Math.random();

    if (action < 0.2) { // 20% de probabilidad de reemplazar la palabra por un número
        return Math.floor(Math.random() * 1000).toString();
    } else if (action < 0.5) {
        const number = Math.floor(Math.random() * 100);

        if (Math.random() < 0.5) {
            return number + word; // Número al inicio
        } else {
            return word + number; // Número al final
        }
    }
    return word;
}