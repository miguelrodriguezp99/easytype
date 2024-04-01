import { useEffect, useMemo } from "react";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";
import useSendScore from "./useSendScore";

const useGameEnd = () => {
  const {
    words,
    wordIndex,
    letterIndex,
    setAppStateRunning,
    gameMode,
    setAppStateFinished,
    timeRemaining,
    calculateResults,
  } = useWordsStore();

  const { sendScore } = useSendScore();

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
    }
  }, [hasFinished, setAppStateRunning, setAppStateFinished, calculateResults]);
};

export default useGameEnd;
