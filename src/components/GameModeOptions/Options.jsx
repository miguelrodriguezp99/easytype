import { useWordsStore } from "../../store/useWords";
import GameMode from "./GameMode";
import WordsOptions from "./WordsOptions";
import { GAME_MODE, APP_STATE } from "../../utils/constants";
import TimeOptions from "./TimeOptions";

import "./../styles/Options.css";
import PunctuationOptions from "./PunctuationOptions";

const Options = () => {
  const { gameMode, appState } = useWordsStore();
  return (
    <div
      className={`options-div ${
        appState !== APP_STATE.STOPPED && "options-hide"
      }`}
    >
      <div className="content">
        {/* -------- Header Top Left || SELECTION OF PUNCTUATION -----------  */}
        {(gameMode === GAME_MODE.WORDS || gameMode === GAME_MODE.TIME) && (
          <PunctuationOptions />
        )}

        {/* -------- Header Middle  -----------  */}
        <GameMode />

        {/* -------- Header Bottom Right || SELECTION OF WORDS -----------  */}
        {gameMode === GAME_MODE.WORDS && <WordsOptions />}
        {gameMode === GAME_MODE.TIME && <TimeOptions />}
      </div>
    </div>
  );
};

export default Options;
