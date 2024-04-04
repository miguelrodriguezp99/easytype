import useGameModeOpts from "../../hooks/useGameModeOptions";
import { numberOfWordsOptions } from "../../utils/constants";

const WordsOptions = () => {
  const { selectedWords, handleWordsChange } = useGameModeOpts();

  return (
    <section className="number-of-words-options-container">
      {numberOfWordsOptions.map((option, index) => (
        <button
          key={index}
          onClick={(event) => handleWordsChange(option.value, event)}
          selected={selectedWords === option.value}
        >
          <p
            className={`number-of-words-options-text ${
              selectedWords === option.value ? "selected" : "not-selected"
            }`}
          >
            {option.text}
          </p>
        </button>
      ))}
    </section>
  );
};

export default WordsOptions;
