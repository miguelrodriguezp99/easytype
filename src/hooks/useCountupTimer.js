import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const useCountupTimer = () => {
  const {
    appState,
    finishedState,
    gameMode,
    timeUsed,
    setTimeUsed,
    setWordsStats,
  } = useWordsStore();

  //Time countdown every second
  useEffect(() => {
    if (
      appState === "RUNNING" &&
      (gameMode === GAME_MODE.WORDS ||
        gameMode === GAME_MODE.QUOTE ||
        gameMode === GAME_MODE.ZEN)
    ) {
      const timer =
        appState === "RUNNING" &&
        setInterval(() => setTimeUsed(timeUsed + 1), 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [appState, finishedState, gameMode, timeUsed, setTimeUsed]);

  useEffect(() => {
    if (gameMode === GAME_MODE.WORDS) {
      setWordsStats();
    }
  }, [timeUsed, gameMode, setWordsStats]);

  return { timeUsed };
};

export default useCountupTimer;
