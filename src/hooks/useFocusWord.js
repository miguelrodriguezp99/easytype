import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";

const useFocusWord = () => {
  const { wordIndex, gameMode, letterIndex } = useWordsStore();

  useEffect(() => {
    //if (gameMode === GAME_MODE.ZEN) return;
    const wordElement = document.getElementById(`word-${wordIndex}`);
    if (wordElement) {
      wordElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [wordIndex, gameMode, letterIndex]);
};

export default useFocusWord;
