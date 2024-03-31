import { useWordsStore } from "../../store/useWords";
import { numberOfTimeOptions } from "../../utils/constants";

const TimeOptions = () => {
  const { timeSelected, setTimeSelected } = useWordsStore();
  // const { handleTimeChange } = useGameModeOpts();
  const handleTimeChange = (value) => {
    // event.preventDefault();
    // setSelectedWords(value);
    setTimeSelected(value);
  };

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
