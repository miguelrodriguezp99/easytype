import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE, APP_STATE } from "../utils/constants";

const useCountdownTimer = () => {
  const { appState, finishedState, gameMode, timeRemaining, setTimeRemaining } =
    useWordsStore();

  //Time countdown every second
  useEffect(() => {
    if (appState === APP_STATE.RUNNING && gameMode === GAME_MODE.TIME) {
      const timer =
        timeRemaining > 0 &&
        appState === APP_STATE.RUNNING &&
        setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [appState, finishedState, gameMode, timeRemaining, setTimeRemaining]);

  return { timeRemaining };
};

export default useCountdownTimer;
