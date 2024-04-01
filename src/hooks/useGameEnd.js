import { useEffect, useMemo } from "react";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";
import { insertScore } from "../utils/serverFunctions";

const useGameEnd = () => {
  const {
    words,
    wordIndex,
    letterIndex,
    setAppStateRunning,
    gameMode,
    setAppStateFinished,
    calculateResults,
    timeUsed,
    timeSelected,
    timeRemaining,
    selectedWords,
    wpm,
    accuracy,
  } = useWordsStore();

  const hasFinished = useMemo(() => {
    if (gameMode === GAME_MODE.WORDS || gameMode === GAME_MODE.QUOTE) {
      //Devolvemos true si el letterIndex y el WordIndex son el ultimo de la lista de palabras (si hemos llegado al final)
      return (
        wordIndex === words.length - 1 &&
        letterIndex === words[wordIndex].length
      );
    }

    // If the game mode is time, we finish the game when the time runs out
    if (gameMode === GAME_MODE.TIME) {
      return timeRemaining === 0;
    }

    return false;
  }, [wordIndex, letterIndex, gameMode, words, timeRemaining]);

  useEffect(() => {
    if (hasFinished) {
      calculateResults();
      setAppStateFinished();
      insertScore({
        gameMode,
        timeUsed,
        timeSelected,
        timeRemaining,
        selectedWords,
        wpm,
        accuracy,
      });
    }
  }, [
    hasFinished,
    setAppStateRunning,
    setAppStateFinished,
    calculateResults,
    gameMode,
    timeUsed,
    timeSelected,
    timeRemaining,
    selectedWords,
    wpm,
    accuracy,
  ]);
};

export default useGameEnd;
