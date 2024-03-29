import { useCallback, useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import useSound from "use-sound";
import { useSoundsStore } from "../store/useSound";
import { isKeyboardCodeAllowed } from "../utils/helpers";

const useTyping = (inputRef) => {
  const {
    actualState,
    words,
    wordIndex,
    letterIndex,
    update,
    markLetterWithState,
    incrementLetterIndex,
    resetLetterIndex,
    incrementWordIndex,
    getLetterState,
  } = useWordsStore();
  const { currentSound, volume, muted } = useSoundsStore();
  const [play] = useSound(currentSound, { volume: volume });

  // Update the caret when we press space
  const updateCaret = useCallback(() => {
    // TODO: Implement the logic to update the caret and the actual letter state

    // Update the last letter before moving to the next word
    let letterState;
    if (letterIndex < words[wordIndex].length) {
      letterState = "incorrect";
    } else {
      if (getLetterState(wordIndex, letterIndex - 1) === "correct active last") {
        letterState = "correct";
      } else {
        letterState = "incorrect";
      }
    }

    const updateIndexes = () => {
      if (wordIndex + 1 < words.length) {
        resetLetterIndex();
        incrementWordIndex();
      }
    };

    // If it's not the last letter
    if (letterIndex < words[wordIndex].length) {
      markLetterWithState(wordIndex, letterIndex, letterState); // This removes the caret
      updateIndexes();

      // Mark the first letter of the next word as active
      if (wordIndex + 1 < words.length) {
        markLetterWithState(wordIndex + 1, 0, "active");
      }
      return;
    }

    // If it's the last letter

    markLetterWithState(wordIndex, letterIndex - 1, letterState); // This removes the caret
    updateIndexes();

    // Mark the first letter of the next word as active
    if (wordIndex + 1 < words.length) {
      markLetterWithState(wordIndex + 1, 0, "active");
    }
  }, [
    markLetterWithState,
    words,
    wordIndex,
    letterIndex,
    resetLetterIndex,
    incrementWordIndex,
    getLetterState,
  ]);

  const keyDownHandler = useCallback(
    (event) => {
      const { key, code } = event;
      if (!isKeyboardCodeAllowed(code)) return;

      const currentWord = words[wordIndex];
      const currentLetter = currentWord[letterIndex];
      const currentLetterValue = currentLetter?.letter;
      inputRef.current.maxLength = currentWord?.length;
      inputRef.current.focus();

      // ---- Tabulation ----
      if (key === "Tab") {
        event.preventDefault();
        //restart();
        return;
      }
      // ---- Spacebar ----
      if (key === " ") {
        event.preventDefault();
        inputRef.current.value = "";
        updateCaret();
        resetLetterIndex();
        return;
      }

      // ---- Backspace ----
      if (key === "Backspace") {
        update((state) => {
          if (state.letterIndex > 0) {
            state.words[state.wordIndex][state.letterIndex - 1].state = null;
            return { letterIndex: state.letterIndex - 1 };
          } else if (state.letterIndex === 0) {
            if (state.wordIndex > 0) {
              update(() => ({ letterIndex: words[state.wordIndex - 1].length }));
              return { wordIndex: state.wordIndex - 1 };
            }
          }

          return state;
        });
        return;
      }

      // ---- Normal typing keys ----
      if (letterIndex === currentWord.length) {
        return;
      }
      // Update the state of the letter and increment the index
      const letterState = currentLetterValue === key ? "correct" : "incorrect";

      //Si es la ultima letra el estado es active last
      if (letterIndex + 1 === currentWord.length) {
        markLetterWithState(wordIndex, letterIndex, `${letterState} active last`);
      } else {
        markLetterWithState(wordIndex, letterIndex, letterState);
        markLetterWithState(wordIndex, letterIndex + 1, "active");
      }

      incrementLetterIndex();

      // ------ OTHERS ------ //
      // Sound
      if (!muted) {
        play();
      }

      if (inputRef.current) {
        inputRef.current.maxLength = currentWord?.length; // Asegúrate de que siempre esté actualizado
        inputRef.current.focus();
      }
    },
    [
      play,
      muted,
      inputRef,
      update,
      words,
      wordIndex,
      letterIndex,
      updateCaret,
      markLetterWithState,
      incrementLetterIndex,
      resetLetterIndex,
    ]
  );

  // Focus the input which is hidden by absolute value in the screen
  useEffect(() => {
    if (actualState === "FINISHED") {
      document.removeEventListener("keydown", keyDownHandler);
    } else {
      document.addEventListener("keydown", keyDownHandler);
    }

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler, actualState, inputRef]);
};

export default useTyping;
