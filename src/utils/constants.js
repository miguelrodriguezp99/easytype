import {
  Clock,
  LetterA,
  Mountain,
  Quote,
  Tool,
} from "../assets/icons/HeaderIcons";

export const APP_STATE = {
  STOPPED: "STOPPED",
  RUNNING: "RUNNING",
  FINISHED: "FINISHED",
};

export const PUNCTUATION_MODE = {
  PUNCTUATION: "PUNCTUATION",
  NUMBERS: "NUMBERS",
  DISABLED: "DISABLED",
};

export const GAME_MODE = {
  WORDS: "WORDS",
  TIME: "TIME",
  QUOTE: "QUOTE",
  ZEN: "ZEN",
  CUSTOM: "CUSTOM",
};

export const gameModeOptions = [
  {
    icon: Clock,
    text: "time",
    value: GAME_MODE.TIME,
  },
  {
    icon: LetterA,
    text: "words",
    value: GAME_MODE.WORDS,
  },
  {
    icon: Quote,
    text: "quote",
    value: GAME_MODE.QUOTE,
  },
  {
    icon: Mountain,
    text: "zen",
    value: GAME_MODE.ZEN,
  },
  {
    icon: Tool,
    text: "custom",
    value: GAME_MODE.CUSTOM,
  },
];
