import { create } from "zustand";
import { APP_STATE, PUNCTUATION_MODE, GAME_MODE } from "../utils/constants";
import { generate } from "random-words";

export const useWordsStore = create((set, get) => ({
  selectedWords: 60,
  timeSelected: 30,
  timeRemaining: 30,
  timeUsed: 0,
  words: [],
  gameMode: GAME_MODE.WORDS,
  appState: APP_STATE.STOPPED,
  punctuationMode: PUNCTUATION_MODE.DISABLED,
  wordIndex: 0,
  letterIndex: 0,
  isFocused: true,

  setSelectedWords: (words) => {
    set({ selectedWords: words });
  },

  setWords: () => {
    if (get().gameMode === GAME_MODE.TIME) {
      const generatedWords = generate({
        exactly: get().selectedWords,
        maxLength: 10,
      });

      // Transform every word into an array of objects (letter, index, state)
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
    }

    // If the game mode is WORDS
    if (get().gameMode === GAME_MODE.WORDS) {
      const generatedWords = generate({
        exactly: get().selectedWords,
        maxLength: 10,
      });

      // Transform every word into an array of objects (letter, index, state)
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

  // Update function
  update: (fn) => set(fn),

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

  // Mutable way
  //Change the state of a letter
  // markLetterWithState: (wordIndex, letterIndex, newState) => {
  //   // Calcular el nuevo array con los cambios
  //   const newWords = get().words;
  //   newWords[wordIndex][letterIndex].state = newState;

  //   // Actualizar el estado
  //   set({ words: newWords });
  // },

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

  setFocusedTrue: () => {
    set({ isFocused: true });
  },

  setFocusedFalse: () => {
    set({ isFocused: false });
  },

  setTimeRemaining: (time) => {
    set({ timeRemaining: time });
  },

  setAppStateRunning: () => {
    set({ appState: APP_STATE.RUNNING });
  },

  setAppStateFinished: () => {
    set({ appState: APP_STATE.FINISHED });
  },

  setTimeUsed: (time) => {
    set({ timeUsed: time });
  },
}));
