import { gameModeOptions } from "../../utils/constants";
import "./../styles/Options.css";
import { GAME_MODE } from "../../utils/constants";
import useGameModeOpts from "../../hooks/useGameModeOptions";

const GameMode = () => {
  const { gameMode, handleChangeGameMode } = useGameModeOpts();

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
            className={`game-options-buttons 
            ${
              gameMode === option.value
                ? "game-options-buttons-selected "
                : "game-options-buttons-not-selected game-mode-group"
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
