import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import { APP_STATE } from "../utils/constants";

const useGameStart = () => {
  const {
    setWords,
    wordIndex,
    letterIndex,
    setAppStateRunning,
    gameMode,
    selectedWords,
    restart,
    timeSelected,
    punctuationMode,
  } = useWordsStore();

  useEffect(() => {
    setWords();
  }, [setWords]);

  // If the game is stopped and the user types a letter, start the game
  useEffect(() => {
    if ((wordIndex >= 1 || letterIndex >= 1) && APP_STATE.STOPPED) {
      setAppStateRunning();
    }
  }, [wordIndex, letterIndex, setAppStateRunning]);

  // Conditions to restart the game if something changes
  useEffect(() => {
    restart();
  }, [selectedWords, restart, gameMode, timeSelected, punctuationMode]);
};

export default useGameStart;
