import { useCallback, useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import useSound from "use-sound";
import { useSoundsStore } from "../store/useSound";
import { isKeyboardCodeAllowed } from "../utils/helpers";
import { APP_STATE } from "../utils/constants";

const useTyping = (inputRef) => {
  const {
    actualState,
    words,
    wordIndex,
    letterIndex,
    markLetterWithState,
    incrementLetterIndex,
    resetLetterIndex,
    incrementWordIndex,
    getLetterState,
    setLetterIndex,
    decrementWordIndex,
    setFocusedTrue,
    isFocused,
    appState,
    selectedWords,
    punctuationMode,
    gameMode,
    restart,
  } = useWordsStore();
  const { currentSound, volume, muted } = useSoundsStore();
  const [play] = useSound(currentSound, { volume: volume });

  // Update the caret when we press space
  const updateCaret = useCallback(() => {
    // TODO: Implement the logic to update the caret and the actual letter state

    //If it's the last word, we don't need to update the caret
    if (wordIndex === words.length - 1) {
      return;
    }

    // Update the last letter before moving to the next word
    let letterState;
    if (letterIndex < words[wordIndex].length) {
      letterState = "incorrect";
    } else {
      if (
        getLetterState(wordIndex, letterIndex - 1) === "correct active last"
      ) {
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
      if (!isFocused) setFocusedTrue();

      // ---- Tabulation ----
      if (key === "Tab") {
        event.preventDefault();
        restart();
        return;
      }

      if (appState === APP_STATE.FINISHED) return;

      // ---- Control DEBUGGER ----
      if (key === "Control") {
        console.log("LetterIndex: ", letterIndex);
        console.log("WordIndex: ", wordIndex);
        console.log("CurrentWord: ", currentWord);
        console.log("CurrentLetter: ", currentLetter);
        console.log("Words.length - 1", words.length - 1);
        console.log("words[wordIndex].length - 1", words[wordIndex].length);
        console.log("appState", appState);
        console.log("selectedWords", selectedWords);
        console.log("punctuationMode", punctuationMode);
        console.log("gameMode", gameMode);
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
        // Begining of the text
        if (letterIndex === 0 && wordIndex === 0) {
          return;
        }

        // If the letter is the last of the word
        if (letterIndex === words[wordIndex].length) {
          markLetterWithState(wordIndex, letterIndex - 1, "active");
          setLetterIndex(letterIndex - 1);
          return;
        }

        // If the letter is in the middle of the word
        if (letterIndex > 0) {
          markLetterWithState(wordIndex, letterIndex, null);
          markLetterWithState(wordIndex, letterIndex - 1, "active");
          setLetterIndex(letterIndex - 1);
        }

        // If the letter is the first one in the word and it's not the first word
        if (letterIndex === 0 && wordIndex > 0) {
          //Logic to check if the previous word is correct
          const previousWord = words[wordIndex - 1];
          let canBackspace = false;
          previousWord.forEach((letter) => {
            if (letter.state === "incorrect") {
              canBackspace = true;
              return;
            }
          });

          // If the previous word is correct entirely, we can't go back
          if (!canBackspace) {
            return;
          }

          markLetterWithState(wordIndex, 0, null);
          let previousWordLastLetterState = getLetterState(
            wordIndex - 1,
            words[wordIndex - 1].length - 1
          );

          markLetterWithState(
            wordIndex - 1,
            words[wordIndex - 1].length - 1,
            `${previousWordLastLetterState} active last`
          );
          setLetterIndex(words[wordIndex - 1].length);
          decrementWordIndex();
        }

        return;
      }

      // ------- Normal typing keys ------- //
      if (letterIndex === currentWord.length) {
        return;
      }
      // Update the state of the letter and increment the index
      const letterState = currentLetterValue === key ? "correct" : "incorrect";

      // If it's the last letter then mark it as active last, otherwise mark it as active
      if (letterIndex + 1 === currentWord.length) {
        markLetterWithState(
          wordIndex,
          letterIndex,
          `${letterState} active last`
        );
      } else {
        markLetterWithState(wordIndex, letterIndex, letterState);
        markLetterWithState(wordIndex, letterIndex + 1, "active");
      }

      incrementLetterIndex();
      // -----------------------------------

      // ------ OTHERS ------
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
      words,
      wordIndex,
      letterIndex,
      updateCaret,
      markLetterWithState,
      incrementLetterIndex,
      resetLetterIndex,
      setLetterIndex,
      decrementWordIndex,
      getLetterState,
      setFocusedTrue,
      isFocused,
      appState,
      selectedWords,
      punctuationMode,
      gameMode,
      restart,
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
