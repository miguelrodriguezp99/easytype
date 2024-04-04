import { useCallback, useEffect, useState } from "react";
import "../styles/SoundModal.css";
import { useSoundsStore } from "../../store/useSound";
import { SOUND_MAP, getSoundName } from "../../utils/soundsMap";
import { MusicalNote } from "../../assets/icons/FooterIcons";
import useSound from "use-sound";

export default function SoundModal() {
  const [modal, setModal] = useState(false);
  const [actualNameSong, setActualNameSong] = useState("cherry");
  const {
    currentSound,
    volume,
    setCurrentSound,

    setMuteOn,
    setMuteOff,
  } = useSoundsStore();
  const [play] = useSound(currentSound, { volume: volume });
  const [animationClass, setAnimationClass] = useState("");

  //Sound local Storage
  useEffect(() => {
    const mutedLocal = localStorage.getItem("muted");
    if (mutedLocal === "true") {
      setMuteOn();
    }
  }, [setMuteOff, setMuteOn]);

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
        "animate-fade animate-once animate-duration-200 animate-ease-out animate-normal"
      );
    }
  }, [modal, closeModal]);

  const switchSound = useCallback(
    (sound) => {
      return () => {
        setCurrentSound(sound);
        setActualNameSong(getSoundName(sound));
        toggleModal();
        localStorage.setItem("sound", sound);
        play();
      };
    },
    [play, setCurrentSound, toggleModal, setActualNameSong]
  );

  return (
    <>
      <div className="footer-sound-icons">
        <button onClick={toggleModal} className="sound-modal-button group">
          <MusicalNote />
          <p className="footer-volume-text">{actualNameSong}</p>
        </button>
      </div>

      {modal && (
        <div className={`sound-modal-body ${animationClass}`}>
          <div onClick={toggleModal} className="sound-background"></div>
          <div className="sound-modal-content">
            <h2>Select your sound!</h2>
            <div className="sound-modal-buttons">
              <button onClick={switchSound(SOUND_MAP["cherry"])}>cherry</button>
              <button onClick={switchSound(SOUND_MAP["typewriter"])}>
                typewriter
              </button>
              <button onClick={switchSound(SOUND_MAP["keyboard"])}>
                keyboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
