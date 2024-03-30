import { useWordsStore } from "../../store/useWords";

import { PUNCTUATION_MODE } from "../../utils/constants";
import { AtSign, Hashtag } from "../../assets/icons/HeaderIcons";

const PunctuationOptions = () => {
  const { punctuation } = useWordsStore();
  // const { handleChangePunctuationMode, handleChangeNumbersMode } =
  //   useGamePunctuationMode();

  return (
    <section
      className="flex lg:gap-4 md:gap-2 sm:gap-10 gap-10 tracking-tight mr-3
    animate-fade animate-duration-800 animate-ease-in-out animate-normal animate-fill-both"
    >
      <div
        className={`group cursor-pointer flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1 lg:ml-3 md:ml-1
      ${
        punctuation === PUNCTUATION_MODE.PUNCTUATION
          ? "fill-secondary text-secondary"
          : "fill-iconstext text-iconstext"
      }`}
      >
        <AtSign props="w-4 h-4 group-hover:fill-iconstext-hover transtion-all duration-300" />
        <p className="text-sm group-hover:text-iconstext-hover transtion-all duration-300">
          punctuation
        </p>
      </div>

      <div
        // onClick={() => handleChangeNumbersMode(PUNCTUATION_MODE.PUNCTUATION)}
        className={`group cursor-pointer flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1 
      ${
        punctuation === PUNCTUATION_MODE.NUMBERS
          ? "fill-secondary text-secondary"
          : "fill-iconstext text-iconstext"
      }`}
      >
        <Hashtag props="w-4 h-4 group-hover:fill-iconstext-hover transtion-all duration-300" />
        <p className="text-sm group-hover:text-iconstext-hover transtion-all duration-300">
          numbers
        </p>
      </div>
    </section>
  );
};

export default PunctuationOptions;
