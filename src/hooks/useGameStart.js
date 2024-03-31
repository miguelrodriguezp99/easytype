import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import { APP_STATE, GAME_MODE } from "../utils/constants";

const useGameStart = () => {
  const {
    setWords,
    wordIndex,
    letterIndex,
    setAppStateRunning,
    gameMode,
    setSelectedWords,
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

  // If the game mode is time, set the selected words to 75
  useEffect(() => {
    if (gameMode === GAME_MODE.TIME) {
      setSelectedWords(75);
    }
  }, [gameMode, setSelectedWords]);

  // Conditions to restart the game if something changes
  useEffect(() => {
    restart();
  }, [selectedWords, restart, gameMode, timeSelected, punctuationMode]);
};

export default useGameStart;
