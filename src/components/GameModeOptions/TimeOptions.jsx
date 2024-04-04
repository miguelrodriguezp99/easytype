import useGameModeOpts from "../../hooks/useGameModeOptions";
import { numberOfTimeOptions } from "../../utils/constants";

const TimeOptions = () => {
  const { timeSelected, handleTimeChange } = useGameModeOpts();

  return (
    <section className="number-of-words-options-container">
      {
        // Map over the numberOfTimeOptions array to display the time options
        numberOfTimeOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleTimeChange(option.value)}
            selected={timeSelected === option.value}
          >
            <p
              className={`number-of-words-options-text ${
                timeSelected === option.value ? "selected" : "not-selected"
              }`}
            >
              {option.text}
            </p>
          </button>
        ))
      }
    </section>
  );
};

export default TimeOptions;
