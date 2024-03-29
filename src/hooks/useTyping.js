import { useCallback, useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import useSound from "use-sound";
import { useSoundsStore } from "../store/useSound";
import { isKeyboardCodeAllowed } from "../utils/helpers";

const useTyping = (inputRef) => {
  const { actualState, words, wordIndex, letterIndex, update, markLetterWithState } =
    useWordsStore();
  const { currentSound, volume, muted } = useSoundsStore();
  const [play] = useSound(currentSound, { volume: volume });

  const updateCaret = useCallback(() => {
    // If it's not the last letter
    if (letterIndex < words[wordIndex].length) {
      markLetterWithState(wordIndex, letterIndex, "incorrect");
      // Update wordindex and letterindex
      update(() => ({ letterIndex: 0 }));
      update(() => ({ wordIndex: wordIndex + 1 }));

      // Mark the first letter of the next word as active
      if (wordIndex + 1 < words.length) {
        markLetterWithState(wordIndex + 1, 0, "active");
      }

      return;
    }

    // If it's the last letter
    markLetterWithState(wordIndex, letterIndex - 1, "correct");
    // Mark the first letter of the next word as active
    if (wordIndex + 1 < words.length) {
      markLetterWithState(wordIndex + 1, 0, "active");
    }

    // Update wordindex and letterindex
    if (wordIndex + 1 < words.length) {
      update(() => ({ wordIndex: wordIndex + 1 }));
      update(() => ({ letterIndex: 0 }));
    }
  }, [update, markLetterWithState, words, wordIndex, letterIndex]);

  const keyDownHandler = useCallback(
    (event) => {
      const { key, code } = event;
      if (!isKeyboardCodeAllowed(code)) return;

      const currentWord = words[wordIndex];
      const currentLetter = currentWord[letterIndex];
      const currentLetterValue = currentLetter?.letter;
      inputRef.current.maxLength = currentWord?.length;
      inputRef.current.focus();

      // Tab
      if (key === "Tab") {
        event.preventDefault();
        //restart();
        return;
      }
      // Spacebar
      if (key === " ") {
        event.preventDefault();
        inputRef.current.value = "";

        updateCaret();

        update(() => ({ letterIndex: 0 }));

        // Update input max length
        return;
      }

      // Backspace
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

      // Normal keys
      if (letterIndex === currentWord.length) {
        return;
      }

      // Actualizamos la letra (correcta o incorrecta y avanzamos al siguiente index)
      if (key === currentLetterValue) {
        // Si estamos al final de la palabra return

        update((state) => {
          markLetterWithState(wordIndex, letterIndex, "correct");

          //Si es la ultima letra el estado es active last
          if (state.letterIndex + 1 === currentWord.length) {
            markLetterWithState(wordIndex, letterIndex, "correct active last");
          }

          //Actualizamos la siguiente letra al estado active
          if (
            state.letterIndex + 1 < currentWord.length &&
            state.letterIndex + 1 !== currentWord.length
          ) {
            markLetterWithState(wordIndex, letterIndex + 1, "active");
          }

          return { letterIndex: state.letterIndex + 1 };
        });
      } else {
        update((state) => {
          markLetterWithState(wordIndex, letterIndex, "incorrect");
          // Si es la ultima letra del estado es active last incorrect
          if (state.letterIndex + 1 === currentWord.length) {
            markLetterWithState(wordIndex, letterIndex, "incorrect active last");
          }

          // Actualizamos la siguiente letra al estado active
          if (
            state.letterIndex + 1 < currentWord.length &&
            state.letterIndex + 1 !== currentWord.length
          ) {
            markLetterWithState(wordIndex, letterIndex + 1, "active");
          }

          return { letterIndex: state.letterIndex + 1 };
        });
      }

      // Sound
      if (!muted) {
        play();
      }

      if (inputRef.current) {
        console.log(currentWord?.length);
        inputRef.current.maxLength = currentWord?.length; // Asegúrate de que siempre esté actualizado
        inputRef.current.focus();
      }
    },
    [play, muted, inputRef, update, words, wordIndex, letterIndex, updateCaret, markLetterWithState]
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
