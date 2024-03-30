import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";

const useFocusWord = () => {
  const { wordIndex } = useWordsStore();

  useEffect(() => {
    const wordElement = document.getElementById(`word-${wordIndex}`);
    if (wordElement) {
      wordElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [wordIndex]);
};

export default useFocusWord;
