import { useCallback, useState } from "react";
import { useWordsStore } from "../../../store/useWords";
import useGameModeOpts from "../../../hooks/useGameModeOptions";
import { Settings } from "../../../assets/icons/HeaderIcons";
import "../../styles/MobileOptions.css";

const MobileOptions = () => {
  const [modal, setModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const { punctuation, gameMode, time, selectedWords } = useWordsStore();
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
    <div className="mobile-options-container">
      <button onClick={toggleModal} className="mobile-options-button">
        <Settings props="fill-iconstext w-3 h-3" />
        Test Settings
      </button>
    </div>
  );
};

export default MobileOptions;
