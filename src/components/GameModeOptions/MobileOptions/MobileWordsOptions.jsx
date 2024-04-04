import useGameModeOpts from "../../../hooks/useGameModeOptions";
import { useWordsStore } from "../../../store/useWords";
import { numberOfWordsOptions } from "../../../utils/constants";

const MobileWordsOptions = () => {
  const { selectedWords } = useWordsStore();
  const { handleWordsChange } = useGameModeOpts();

  return (
    <div id="#second-options" className="mobile-game-mode-container">
      {numberOfWordsOptions.map((option, index) => (
        <button
          key={index}
          onClick={() => handleWordsChange(option.value)}
          selected={selectedWords === option.value}
        >
          <p
            className={`mobile-modal-button ${
              selectedWords === option.value
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

export default MobileWordsOptions;
