import "./styles/BlurEffect.css";
import { Cursor } from "../assets/icons/ResultsIcon";
import { useWordsStore } from "../store/useWords";

const BlurEffect = () => {
  const { isFocused, setFocusedTrue } = useWordsStore();

  const handleSetFocusedTrue = (e) => {
    e.stopPropagation();
    setFocusedTrue();
  };
  return (
    <>
      <div
        className={`blur-text ${!isFocused && "text-blur-appear"}`}
        onClick={(e) => handleSetFocusedTrue(e)}
      >
        <Cursor props="w-5 h-5 fill-white" />
        Click here or start typing to focus
      </div>
    </>
  );
};

export default BlurEffect;
