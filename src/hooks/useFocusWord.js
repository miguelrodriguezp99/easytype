import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const useFocusWord = () => {
  const { wordIndex, gameMode } = useWordsStore();

  useEffect(() => {
    if (gameMode === GAME_MODE.ZEN) return;
    const wordElement = document.getElementById(`word-${wordIndex}`);
    if (wordElement) {
      wordElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [wordIndex, gameMode]);
};

export default useFocusWord;
