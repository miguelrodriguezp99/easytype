import Options from "../../components/GameModeOptions/Options";
import Results from "../../components/Results";
import TypingArea from "../../components/TypingArea";
import useFocusWord from "../../hooks/useFocusWord";
import useGameEnd from "../../hooks/useGameEnd";
import useGameStart from "../../hooks/useGameStart";
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

  return (
    <section className="typing-app">
      <Options />
      <TypingArea />
      <Results />
    </section>
  );
};

export default Home;
