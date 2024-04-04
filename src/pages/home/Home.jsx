import MobileOptions from "../../components/GameModeOptions/MobileOptions/MobileOptions";
import Options from "../../components/GameModeOptions/Options";
import Results from "../../components/Results";
import TypingArea from "../../components/TypingArea";
import useFocusWord from "../../hooks/useFocusWord";
import useGameEnd from "../../hooks/useGameEnd";
import useGameStart from "../../hooks/useGameStart";
import useMobileOptions from "../../hooks/useMobileOptions";
import useMouseOut from "../../hooks/useMouseOut";
import "./Home.css";

const Home = () => {
  // Initialize the game
  useGameStart();

  // Control when the game ends
  useGameEnd();

  // MouseOut to control the blur
  useMouseOut();

  // Focus the word
  useFocusWord();

  //Hook to change UI if mobile or not
  const { isMobile } = useMobileOptions();

  return (
    <section className="typing-app">
      {isMobile ? <MobileOptions /> : <Options />}
      <TypingArea />
      <Results />
    </section>
  );
};

export default Home;
