import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";

const useGameStart = () => {
  const { setWords } = useWordsStore();

  useEffect(() => {
    setWords();
  }, [setWords]);
};

export default useGameStart;
