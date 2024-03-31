import { useWordsStore } from "../../store/useWords";
import { gameModePunctuationOptions } from "../../utils/constants";

const PunctuationOptions = () => {
  const { punctuationMode, setPunctuationMode } = useWordsStore();
  // const { handleChangePunctuationMode, handleChangeNumbersMode } =
  //   useGamePunctuationMode();

  const handleChangePunctuationMode = (mode) => {
    setPunctuationMode(mode);
  };

  return (
    <section className="puntuation-options-container">
      {
        // Map over the gameModePunctuationOptions array to display the punctuation options
        gameModePunctuationOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleChangePunctuationMode(option.value)}
            className={`punctuation-options-buttons punctuation-mode-group
          ${
            punctuationMode === option.value
              ? "punctuation-options-buttons-selected"
              : "punctuation-options-buttons-not-selected"
          }`}
          >
            <div className="icon">
              <option.icon />
            </div>
            <p className="punctuation-options-text">{option.text}</p>
          </div>
        ))
      }
    </section>
  );
};

export default PunctuationOptions;
