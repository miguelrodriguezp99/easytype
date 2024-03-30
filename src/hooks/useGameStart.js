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
};

export default useGameStart;
