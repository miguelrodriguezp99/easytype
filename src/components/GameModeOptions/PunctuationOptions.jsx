import { useWordsStore } from "../../store/useWords";
import {
  PUNCTUATION_MODE,
  gameModePunctuationOptions,
} from "../../utils/constants";

const PunctuationOptions = () => {
  const { punctuationMode, setPunctuationMode } = useWordsStore();
  // const { handleChangePunctuationMode, handleChangeNumbersMode } =
  //   useGamePunctuationMode();

  const handleChangePunctuationMode = (mode) => {
    if (punctuationMode === mode) setPunctuationMode(PUNCTUATION_MODE.DISABLED);
    else setPunctuationMode(mode);
  };

  return (
    <section className="puntuation-options-container">
      {
        // Map over the gameModePunctuationOptions array to display the punctuation options
        gameModePunctuationOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleChangePunctuationMode(option.value)}
            className={`punctuation-options-buttons 
          ${
            punctuationMode === option.value
              ? "punctuation-options-buttons-selected"
              : "punctuation-options-buttons-not-selected punctuation-mode-group"
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
