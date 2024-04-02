import { useSoundsStore } from "../../store/useSound";
import { Volume, VolumeSilence } from "../../assets/icons/FooterIcons";
import "./../styles/Footer.css";

const MuteButton = () => {
  const { muted, setMuteOn, setMuteOff } = useSoundsStore();
  const handleToggleMute = () => {
    if (muted) {
      setMuteOff();
      localStorage.setItem("muted", "false");
    } else {
      setMuteOn();
      localStorage.setItem("muted", "true");
    }
  };

  return (
    <div className="mute-btn-container">
      {muted ? (
        <button onClick={handleToggleMute} className="volume-button">
          <VolumeSilence />
          <div className="volume-button-text">muted</div>
        </button>
      ) : (
        <button onClick={handleToggleMute} className="volume-button">
          <Volume />
          <div className="volume-button-text">volume</div>
        </button>
      )}
    </div>
  );
};

export default MuteButton;
