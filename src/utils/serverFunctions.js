/* eslint-disable no-undef */
import { GAME_MODE } from "../utils/constants";

export const insertScore = async ({
  gameMode,
  timeUsed,
  timeSelected,
  timeRemaining,
  selectedWords,
  wpm,
  accuracy,
}) => {
  const timePlayed =
    gameMode === GAME_MODE.TIME ? timeSelected - timeRemaining : timeUsed;
  const game_mode = `${gameMode === GAME_MODE.TIME ? "time" : "words"} ${
    gameMode === GAME_MODE.TIME ? timeSelected : selectedWords
  }`;

  const authUserString = localStorage.getItem("authUser");
  const authUser = authUserString ? JSON.parse(authUserString) : null;
  const token = authUser?.jwt;

  if (!token) {
    return;
  }

  //  https://miguel-main-server.vercel.app/scores/scores   //local
  //  https://${import.meta.env.VITE_API_URL}/scores/scores //production
  try {
    const response = await fetch(
      `https://miguel-main-server.vercel.app/scores/scores`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          game_mode,
          wpm,
          accuracy,
          timeSelected,
          timePlayed,
        }),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (data.error) {
      return;
    }
  } catch (error) {
    console.log("An error occurred while saving your score.");
  }
};
