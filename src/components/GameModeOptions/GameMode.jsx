import { useWordsStore } from "../../store/useWords";

import { gameModeOptions } from "../../utils/constants";
import "./../styles/Options.css";

import { GAME_MODE } from "../../utils/constants";

const GameMode = () => {
  const { gameMode, setGameMode } = useWordsStore();

  const handleChangeGameMode = (mode) => {
    setGameMode(mode);
  };

  return (
    <section className="options-game-mode-container">
      {(gameMode === GAME_MODE.WORDS || gameMode === GAME_MODE.TIME) && (
        <div className="options-divider "></div>
      )}

      {
        // Map over the gameModeOptions array to display the game mode options
        gameModeOptions.map((option, index) => (
          <div
            key={index}
            className={`game-mode-group game-options-buttons 
            ${
              gameMode === option.value
                ? "game-options-buttons-selected "
                : "game-options-buttons-not-selected"
            }`}
            onClick={() => handleChangeGameMode(option.value)}
          >
            <option.icon />
            <p className="game-options-text">{option.text}</p>
          </div>
        ))
      }

      {(gameMode === GAME_MODE.WORDS || gameMode === GAME_MODE.TIME) && (
        <div className="options-divider"></div>
      )}
    </section>
  );
};

export default GameMode;
