import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const useSendScore = () => {
  const {
    gameMode,
    timeUsed,
    timeSelected,
    timeRemaining,
    numberOfWords,
    wpm,
    accuracy,
  } = useWordsStore();

  const sendScore = async () => {
    let timePlayed = 0;
    let game_mode = "";
    if (gameMode === GAME_MODE.TIME) {
      timePlayed = timeSelected - timeRemaining;
      game_mode = `time ${timeSelected}`;
    } else {
      timePlayed = timeUsed;
      game_mode = `words ${numberOfWords}`;
    }

    // `https://${process.env.REACT_APP_API_URL}/scores`,
    try {
      const res = await fetch(`http://localhost:5000/scores/scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game_mode,
          wpm,
          accuracy,
          timeSelected,
          timePlayed,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.error) {
        //toast.error(data.error);
        return;
      }
    } catch (error) {
      //toast.error("An error saving the score. Sorry!");
    }
  };

  return { sendScore };
};

export default useSendScore;
