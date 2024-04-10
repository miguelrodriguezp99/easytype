import { create } from "zustand";
import { APP_STATE, PUNCTUATION_MODE, GAME_MODE } from "../utils/constants";
import { generate } from "random-words";
import { quotes } from "../utils/quotes";
import {
  getRandomPunctuationWord,
  getRandomNumberWord,
} from "../utils/helpers";
import { insertScore, incrementStartedTests } from "../utils/serverFunctions";

export const useWordsStore = create((set, get) => ({
  selectedWords: 25,
  previousSelectedWords: 15, // Used to switch between time and words mode
  timeSelected: 30,
  timeRemaining: 30,
  timeUsed: 0,
  words: [],
  wordsAsString: "",
  gameMode: GAME_MODE.WORDS,
  appState: APP_STATE.FINISHED,
  punctuationMode: PUNCTUATION_MODE.DISABLED,
  wordIndex: 0,
  letterIndex: 0,
  isFocused: true,
  correctLetters: 0,
  incorrectLetters: 0,
  wpm: 0,
  accuracy: 0,
  wordsStatPoints: [],

  setSelectedWords: (words) => {
    set({ selectedWords: words });
  },

  setSelectedPreviousWords: (words) => {
    set({ previousSelectedWords: words });
  },

  setPunctuationMode: (mode) => {
    set({ punctuationMode: mode });
  },

  // Function used in zen mode to add a letter into the words array
  addLetter: (letter) => {
    const wordIndex = get().wordIndex;
    const letterIndex = get().letterIndex;
    // copia profunda de las palabras actuales para modificar
    // let newWords = JSON.parse(JSON.stringify(get().words));
    let newWords = get().words;

    // Check if the array of words exists and create it if it doesn't
    if (!newWords[wordIndex]) {
      newWords[wordIndex] = [];
    }
    const newLetter = {
      letter,
      index: letterIndex,
      state: "correct active last",
    };

    newWords[wordIndex][letterIndex] = newLetter;

    set({
      words: newWords,
    });
  },

  removeLastLetter: () => {
    const wordIndex = get().wordIndex;
    const letterIndex = get().letterIndex;
    let newWords = get().words;
    const word = newWords[wordIndex];

    if (!word) return;
    const newWord = word.slice(0, letterIndex);
    newWords[wordIndex] = newWord;

    set({
      words: newWords,
    });
  },

  setWords: () => {
    // Function to set the words with letters as objects (we make an array of objects with the letter
    // and the state of the letter) so words is an array of arrays of objects
    const setWordsWithLettersAsObjects = (generatedWords) => {
      const wordsWithLettersAsObjects = generatedWords.map((word) =>
        word.split("").map((letter, index) => ({
          letter,
          index,
          state: null, // Initial state
        }))
      );

      //Set the first letter of the first word as active
      wordsWithLettersAsObjects[0][0].state = "active";

      // Update the store
      set({
        words: wordsWithLettersAsObjects,
        wordIndex: 0,
        letterIndex: 0,
      });
    };

    // if game mode is zen set the words to an empty array
    if (get().gameMode === GAME_MODE.ZEN) {
      // Set words with the first letter empty but active
      set({
        words: [[{ letter: " ", index: 0, state: "active" }]],
        wordIndex: 0,
        letterIndex: 0,
      });

      return;
    }

    if (get().gameMode === GAME_MODE.QUOTE) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const generatedWords = randomQuote.split(" ");

      setWordsWithLettersAsObjects(generatedWords);
      return;
    }

    if (get().gameMode === GAME_MODE.TIME) {
      const generatedWords = generate({
        exactly: get().selectedWords,
        maxLength: 10,
      });

      setWordsWithLettersAsObjects(generatedWords);
      return;
    }

    // If the game mode is WORDS
    if (get().gameMode === GAME_MODE.WORDS) {
      let generatedWords;

      if (get().punctuationMode === PUNCTUATION_MODE.DISABLED) {
        generatedWords = generate({
          exactly: get().selectedWords,
          maxLength: 10,
        });
      }

      if (get().punctuationMode === PUNCTUATION_MODE.PUNCTUATION) {
        generatedWords = generate({
          exactly: get().selectedWords,
          maxLength: 10,
          formatter: (word, index) => {
            // Function to get a random punctuation word or a character
            return getRandomPunctuationWord(word, index);
          },
        });
      }

      if (get().punctuationMode === PUNCTUATION_MODE.NUMBERS) {
        generatedWords = generate({
          exactly: get().selectedWords,
          maxLength: 10,
          formatter: (word, index) => {
            // Function to get a random number word or a character
            return getRandomNumberWord(word, index);
          },
        });
      }

      set({ wordsAsString: generatedWords.join("") });
      setWordsWithLettersAsObjects(generatedWords);
      return;
    }
  },

  // Get letter state
  getLetterState: (wordIndex, letterIndex) => {
    const words = get().words;
    if (words[wordIndex] && words[wordIndex][letterIndex]) {
      return words[wordIndex][letterIndex].state;
    }

    // Retorna un valor predeterminado o null si la palabra o letra no existe
    return null;
  },

  setGameMode: (mode) => {
    set({ gameMode: mode });
  },

  setLetterIndex: (index) => {
    set({ letterIndex: index });
  },

  // Increment the letter index
  incrementLetterIndex: () => {
    set({ letterIndex: get().letterIndex + 1 });
  },

  resetLetterIndex: () => {
    set({ letterIndex: 0 });
  },

  incrementWordIndex: () => {
    set({ wordIndex: get().wordIndex + 1 });
  },

  decrementWordIndex: () => {
    set({ wordIndex: get().wordIndex - 1 });
  },
  // Reset the word index
  resetWordIndex: () => {
    set({ wordIndex: 0 });
  },

  //Inmutable way
  markLetterWithState: (wordIndex, letterIndex, newState) => {
    set((state) => {
      const newWords = [...state.words];
      const newWord = [...newWords[wordIndex]];
      const newLetter = { ...newWord[letterIndex], state: newState };

      newWord[letterIndex] = newLetter;
      newWords[wordIndex] = newWord;

      // Return a new object with the new state
      return { ...state, words: newWords };
    });
  },

  setFocusedTrue: () => {
    set({ isFocused: true });
  },

  setFocusedFalse: () => {
    set({ isFocused: false });
  },

  setTimeSelected: (time) => {
    set({ timeSelected: time });
  },

  setTimeRemaining: (time) => {
    set({ timeRemaining: time });
  },

  setAppStateRunning: () => {
    incrementStartedTests();
    set({ appState: APP_STATE.RUNNING });
  },

  setAppStateFinished: () => {
    set({ appState: APP_STATE.FINISHED });
  },

  setTimeUsed: (time) => {
    set({ timeUsed: time });
  },

  restart: () => {
    get().setWords();
    set({ wordsStatPoints: [] });
    set({ timeUsed: 0 });
    set({ timeRemaining: get().timeSelected });
    set({ appState: APP_STATE.STOPPED });
    set({ wordIndex: 0 });
    set({ letterIndex: 0 });
    set({ correctLetters: 0 });
    set({ incorrectLetters: 0 });
  },

  calculateResults: () => {
    // WORDS || QUOTE
    if (
      get().gameMode === GAME_MODE.WORDS ||
      get().gameMode === GAME_MODE.QUOTE
    ) {
      let correctLetters = 0;
      get().words.forEach((word) => {
        word.forEach((letter) => {
          if (
            letter.state === "correct" ||
            letter.state === "correct active last"
          ) {
            correctLetters += 1;
          }
        });
      });

      const totalLetters = get().wordsAsString.length;
      const incorrectLetters = totalLetters - correctLetters;
      const minutes = get().timeUsed / 60;
      const averageWordLength =
        get().wordsAsString.length / get().selectedWords;
      const wpm = Math.floor(correctLetters / averageWordLength / minutes);
      const accuracy = Math.floor((correctLetters / totalLetters) * 100);

      set((state) => ({
        ...state,
        correctLetters,
        incorrectLetters,
        wpm,
        accuracy,
      }));
    }

    // ZEN
    if (get().gameMode === GAME_MODE.ZEN) {
      const wordsWritten = get().words.length;
      const wpm = Math.floor(wordsWritten / (get().timeUsed / 60));

      // Calculate the correct letters (all the letters are correct)
      let totalLetters = 0;
      get().words.forEach((word) => {
        word.forEach(() => {
          totalLetters += 1;
        });
      });

      set({ wpm });
      set({ accuracy: 100 });
      set({ correctLetters: totalLetters });
      set({ incorrectLetters: 0 });
    }

    // TIME
    if (get().gameMode === GAME_MODE.TIME) {
      let correctLetters = 0;
      let incorrectLetters = 0;
      let totalLetters = 0;
      let totalWords = 0;

      // Check correct letters until the letterIndex
      for (let i = 0; i <= get().wordIndex; i++) {
        for (let j = 0; j < get().words[i].length; j++) {
          if (
            get().words[i][j].state === "correct" ||
            get().words[i][j].state === "correct active last"
          ) {
            correctLetters += 1;
            totalLetters += 1;
          } else if (get().words[i][j].state === "incorrect") {
            incorrectLetters += 1;
            totalLetters += 1;
          }
        }
        if (
          i < get().wordIndex ||
          (i === get().wordIndex &&
            get().letterIndex === get().words[i].length - 1)
        ) {
          totalWords++;
        }
      }
      set({ correctLetters });
      set({ incorrectLetters });

      // Calculate the wpm
      const averageWordLength = totalWords > 0 ? totalLetters / totalWords : 5; // Usa 5 como fallback si totalWords es 0
      const wpm = Math.floor(
        correctLetters / averageWordLength / (get().timeSelected / 60)
      );

      set({ wpm });

      const accuracy = Math.floor(
        (correctLetters / (incorrectLetters + correctLetters)) * 100
      );
      set({ accuracy });
    }

    insertScore({
      gameMode: get().gameMode,
      timeUsed: get().timeUsed,
      timeSelected: get().timeSelected,
      timeRemaining: get().timeRemaining,
      selectedWords: get().selectedWords,
      wpm: get().wpm,
      accuracy: get().accuracy,
    });
  },

  // We append the actual word (wordIndex) to the end of the words array
  appendCurrentWordAtTheEnd: () => {
    set((state) => {
      const newWords = [...state.words];
      // Realiza una copia profunda de la palabra actual.
      const currentWord = JSON.parse(JSON.stringify(newWords[state.wordIndex]));

      // Restablece los estados de las letras
      currentWord.forEach((letter) => {
        letter.state = null;
      });

      newWords.push(currentWord);

      return { ...state, words: newWords };
    });
  },

  incrementCurrentStatIndex: () => {
    set({ currentStatIndex: get().currentStatIndex + 1 });
  },

  setWordsStats: () => {
    // Calculamos cuantas letras correctas lleva el usuario ahora mismo
    let correctWords = 0;

    if (get().timeUsed === 0) return;

    // Compruebo hasta el wordIndex que toda la palabra esté correcta y sumo uno
    for (let i = 0; i <= get().wordIndex; i++) {
      let wordCorrect = true;
      for (let j = 0; j < get().words[i].length; j++) {
        if (
          get().words[i][j].state !== "correct" &&
          get().words[i][j].state !== "correct active last"
        ) {
          wordCorrect = false;
        }
      }
      if (wordCorrect) {
        correctWords += 1;
      }
    }

    const newWordsStatPoints = get().wordsStatPoints;
    // Calculamos las palabras por minuto
    const actualWpm = Math.floor((correctWords / get().timeUsed) * 60);
    newWordsStatPoints[get().timeUsed] = {
      wpm: actualWpm,
      time: get().timeUsed,
    };

    set({ wordsStatPoints: newWordsStatPoints });
  },
}));

//

// Mutable way
//Change the state of a letter
// markLetterWithState: (wordIndex, letterIndex, newState) => {
//   // Calcular el nuevo array con los cambios
//   const newWords = get().words;
//   newWords[wordIndex][letterIndex].state = newState;

//   // Actualizar el estado
//   set({ words: newWords });
// },

// updateCaret: () => {
//   set((state) => {
//     const nextState = { ...state }; // Clonamos el estado actual para modificarlo

//     // Si no es la ultima letra
//     if (nextState.letterIndex < nextState.words[nextState.wordIndex].length) {
//       nextState.words[nextState.wordIndex][nextState.letterIndex].state = "incorrect";
//       nextState.wordIndex += 1;
//       nextState.letterIndex = 0;
//       if (nextState.wordIndex + 1 < nextState.words.length) {
//         nextState.words[nextState.wordIndex][0].state = "active";
//       }
//       return nextState;
//     }

//     // Si es la ultima letra
//     nextState.words[nextState.wordIndex][nextState.letterIndex - 1].state = "correct";
//     // Marcamos la priemra letra del siguiente word como active
//     if (nextState.wordIndex + 1 < nextState.words.length) {
//       nextState.words[nextState.wordIndex + 1][0].state = "active";
//     }

//     if (nextState.wordIndex + 1 < nextState.words.length) {
//       nextState.wordIndex += 1;
//       nextState.letterIndex = 0;
//     }

//     return nextState; // Actualizamos el estado con nuestras modificaciones
//   });
// },
