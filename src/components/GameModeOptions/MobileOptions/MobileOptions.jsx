import { useCallback, useState } from "react";
import { useWordsStore } from "../../../store/useWords";
import useGameModeOpts from "../../../hooks/useGameModeOptions";
import { Settings } from "../../../assets/icons/HeaderIcons";
import "../../styles/MobileOptions.css";
import { APP_STATE, GAME_MODE } from "../../../utils/constants";
import {
  gameModePunctuationOptions,
  gameModeOptions,
} from "../../../utils/constants";
import MobilenumberOfWordsOptions from "./MobileWordsOptions";
import MobileTimeOptions from "./MobileTimeOptions";

const MobileOptions = () => {
  const [modal, setModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const { gameMode, time, selectedWords, punctuationMode, appState } =
    useWordsStore();
  const { handleChangeGameMode, handleChangePunctuationMode } =
    useGameModeOpts();

  const closeModal = useCallback(() => {
    setAnimationClass("");
    setTimeout(() => {
      setAnimationClass(
        "animate-fade-up animate-once animate-duration-300 animate-ease-out animate-reverse "
      );
    }, 10);

    setTimeout(() => {
      setModal(false);
      setAnimationClass("");
    }, 300);
  }, []);

  const toggleModal = useCallback(() => {
    if (modal) {
      closeModal();
    } else {
      setModal(true);
      setAnimationClass(
        "animate-fade-up animate-once animate-duration-300 animate-ease-out animate-normal"
      );
    }
  }, [modal, closeModal]);

  return (
    <>
      <div
        className={`mobile-options-button-container ${
          appState !== APP_STATE.STOPPED && "options-hide"
        }`}
      >
        <button onClick={toggleModal} className="mobile-options-button">
          <Settings />
          Test Settings
        </button>
      </div>

      {modal && (
        <div className={`mobile-options-modal-body ${animationClass}`}>
          <div
            onClick={toggleModal}
            className="mobile-options-background"
          ></div>

          {/* MODAL CONTENT */}
          <div className="mobile-options-modal-content">
            <div className="mobile-options-container">
              {/* PUNCTUATION */}
              <div className="mobile-options-punctuation-container">
                {gameModePunctuationOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleChangePunctuationMode(option.value)}
                    className={`mobile-modal-button ${
                      punctuationMode === option.value
                        ? "punctuation-selected"
                        : "punctuation-not-selected"
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              {/* END PUNCTUATION */}

              {/* GAME MODE */}
              <div id="#options" className="mobile-game-mode-container">
                {gameModeOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`mobile-modal-button 
                    ${
                      gameMode === option.value
                        ? "gamemode-selected"
                        : "gamemode-not-selected"
                    }`}
                    onClick={() => handleChangeGameMode(option.value)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              {/* END GAME MODE */}

              {gameMode === GAME_MODE.TIME && <MobileTimeOptions time={time} />}
              {gameMode === GAME_MODE.WORDS && (
                <MobilenumberOfWordsOptions numberOfWords={selectedWords} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileOptions;
