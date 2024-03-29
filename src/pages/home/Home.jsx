import Options from "../../components/Options";
import TypingArea from "../../components/TypingArea";
import useGameStart from "../../hooks/useGameStart";
import "./Home.css";

const Home = () => {
  // Initialize the game
  useGameStart();

  return (
    <section className="typing-app">
      <Options />
      <TypingArea />
    </section>
  );
};

export default Home;
