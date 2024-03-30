import { useWordsStore } from "../../store/useWords";

const WordsOptions = () => {
  const { numberOfWords } = useWordsStore();

  // const { handleWordsChange } = useGameModeOpts();

  return (
    <section
      className="flex mx-3 gap-8 sm:gap-8 lg:gap-3 md:gap-2.5
    animate-fade animate-duration-800 animate-ease-in-out animate-normal animate-fill-both"
    >
      <button
        // onClick={(event) => handleWordsChange(15, event)}
        selected={numberOfWords === "15"}
      >
        <p
          className={`text-sm font-semibold transition-all duration-300 ${
            numberOfWords === 15
              ? "text-selected"
              : "text-iconstext hover:text-iconstext-hover"
          }`}
        >
          15
        </p>
      </button>

      <button>
        <p
          className={`text-sm font-semibold transition-all duration-300 ${
            numberOfWords === 30
              ? "text-selected"
              : "text-iconstext hover:text-iconstext-hover"
          }`}
        >
          30
        </p>
      </button>
      <button>
        <p
          className={`text-sm font-semibold transition-all duration-300 ${
            numberOfWords === 60
              ? "text-selected"
              : "text-iconstext hover:text-iconstext-hover"
          }`}
        >
          60
        </p>
      </button>
      <button>
        <p
          className={`text-sm font-semibold transition-all duration-300 ${
            numberOfWords === 75
              ? "text-selected"
              : "text-iconstext hover:text-iconstext-hover"
          }`}
        >
          75
        </p>
      </button>
    </section>
  );
};

export default WordsOptions;
