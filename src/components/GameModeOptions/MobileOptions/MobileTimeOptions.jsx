import useGameModeOpts from "../../../hooks/useGameModeOptions";
import { useWordsStore } from "../../../store/useWords";
import { numberOfTimeOptions } from "../../../utils/constants";

const MobileTimeOptions = () => {
  const { timeSelected } = useWordsStore();
  const { handleTimeChange } = useGameModeOpts();

  return (
    <div id="#second-options" className="mobile-game-mode-container">
      {numberOfTimeOptions.map((option, index) => (
        <button
          key={index}
          onClick={() => handleTimeChange(option.value)}
          selected={timeSelected === option.value}
        >
          <p
            className={`mobile-modal-button ${
              timeSelected === option.value
                ? "timewords-selected"
                : "timewords-not-selected"
            }`}
          >
            {option.text}
          </p>
        </button>
      ))}
    </div>
  );
};

export default MobileTimeOptions;
