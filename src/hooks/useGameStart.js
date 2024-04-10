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
    appState,
  } = useWordsStore();

  useEffect(() => {
    setWords();
  }, [setWords]);

  // If the game is stopped and the user types a letter, start the game
  useEffect(() => {
    if (
      (wordIndex >= 1 || letterIndex >= 1) &&
      appState === APP_STATE.STOPPED
    ) {
      console.log("Entro");
      setAppStateRunning();
    }
  }, [wordIndex, appState, letterIndex, setAppStateRunning]);

  // Conditions to restart the game if something changes
  useEffect(() => {
    restart();
  }, [selectedWords, restart, gameMode, timeSelected, punctuationMode]);
};

export default useGameStart;
