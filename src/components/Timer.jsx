import useCountdownTimer from "../hooks/useCountdownTimer";
import useCountupTimer from "../hooks/useCountupTimer";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const Timer = () => {
  const { gameMode } = useWordsStore();
  const { timeRemaining } = useCountdownTimer();
  const { timeUsed } = useCountupTimer();

  return <div>{gameMode === GAME_MODE.TIME ? timeRemaining : timeUsed}</div>;
};

export default Timer;
