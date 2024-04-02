import { ZenModeResultIcon } from "../assets/icons/ResultsIcon";
import useCountdownTimer from "../hooks/useCountdownTimer";
import useCountupTimer from "../hooks/useCountupTimer";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";
import "./styles/Timer.css";

const Timer = () => {
  const { gameMode } = useWordsStore();
  const { timeRemaining } = useCountdownTimer();
  const { timeUsed } = useCountupTimer();

  return (
    <div className="timer-container">
      {gameMode === GAME_MODE.TIME ? timeRemaining : timeUsed}

      {gameMode === GAME_MODE.ZEN && (
        <div className="timer-zen-guide">
          <ZenModeResultIcon />
          shift + enter to finish zen
        </div>
      )}
    </div>
  );
};

export default Timer;
