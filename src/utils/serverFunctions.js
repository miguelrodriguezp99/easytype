/* eslint-disable no-undef */
import { GAME_MODE } from "../utils/constants";

export const insertScore = ({
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

  try {
    fetch(`https://${import.meta.env.VITE_API_URL}/scores/scores`, {
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
    });
  } catch (error) {
    console.log("An error occurred while saving your score.");
  }
};

export const getLeaderboardScores = async (gameMode) => {
  try {
    const response = await fetch(
      `https://${
        import.meta.env.VITE_API_URL
      }/scores/leaderboard?gameMode=${encodeURIComponent(gameMode)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      return [];
    }

    return data;
  } catch (error) {
    console.log(error);
    console.log("An error occurred while fetching top scores.");
    return [];
  }
};

export const getUserTopScore = async (gameMode) => {
  try {
    // Obtenemos el token del local storage del usuario autenticado
    const authUserString = localStorage.getItem("authUser");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const token = authUser?.jwt;

    if (!token) {
      return;
    }

    const response = await fetch(
      `https://${
        import.meta.env.VITE_API_URL
      }/scores/usertopscore?gameMode=${encodeURIComponent(gameMode)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      return [];
    }

    return data;
  } catch (error) {
    console.log(error);
    console.log("An error occurred while fetching top scores.");
    return [];
  }
};

export const incrementStartedTests = () => {
  const authUserString = localStorage.getItem("authUser");
  const authUser = authUserString ? JSON.parse(authUserString) : null;
  const token = authUser?.jwt;

  if (!token) {
    return;
  }

  fetch(`https://${import.meta.env.VITE_API_URL}/auth/incrementstartedtests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
};
