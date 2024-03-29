import { create } from "zustand";
import { APP_STATE, PUNCTUATION_MODE, GAME_MODE } from "../utils/constants";
import { generate } from "random-words";

export const useWordsStore = create((set, get) => ({
  selectedWords: 60,
  words: [],
  gameMode: GAME_MODE.TIME,
  actualState: APP_STATE.STOPPED,
  wordIndex: 0,
  letterIndex: 0,

  setWords: () => {
    if (get().gameMode === GAME_MODE.TIME) {
      const generatedWords = generate({ exactly: get().selectedWords, maxLength: 10 });

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

  update: (fn) => set(fn),

  markLetterWithState: (wordIndex, letterIndex, newState) => {
    set((state) => {
      const newWords = [...state.words];
      const newWord = [...newWords[wordIndex]];
      const newLetter = { ...newWord[letterIndex], state: newState };

      newWord[letterIndex] = newLetter;
      newWords[wordIndex] = newWord;
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
}));
