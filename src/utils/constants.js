import {
  Clock,
  LetterA,
  Mountain,
  Quote,
  Tool,
} from "../assets/icons/HeaderIcons";
import {
  Mail,
  Support,
  Code,
  Discord,
  X,
  Terms,
  Security,
  Privacy,
} from "../assets/icons/FooterIcons";
import { AtSign, Hashtag } from "../assets/icons/HeaderIcons";
import {
  Ad,
  Danger,
  History,
  Next,
  Replay,
  Restart,
  Screenshot,
} from "../assets/icons/ResultsIcon";
import { takeScreenshot } from "../utils/resultFunctions";

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

export const footerLinks = [
  {
    icon: Mail,
    text: "Contact",
    href: "mailto:miguelrodriguez.p99@gmail.com",
  },
  {
    icon: Support,
    text: "Support",
    href: "https://support.example.com",
  },
  {
    icon: Code,
    text: "Github",
    href: "https://github.com/miguelrodriguezp99/typing-web",
  },
  {
    icon: Discord,
    text: "Discord",
    href: "https://github.com/miguelrodriguezp99/typing-web",
  },
  {
    icon: X,
    text: "Twitter",
    href: "https://twitter.com/miguelrguez99",
  },
  {
    icon: Terms,
    text: "Terms",
    href: "https://github.com/miguelrodriguezp99/typing-web",
  },
  {
    icon: Security,
    text: "Security",
    href: "https://github.com/miguelrodriguezp99/typing-web",
  },
  {
    icon: Privacy,
    text: "Privacy",
    href: "https://github.com/miguelrodriguezp99/typing-web",
  },
];

export const gameModePunctuationOptions = [
  {
    icon: AtSign,
    text: "punctuation",
    value: PUNCTUATION_MODE.PUNCTUATION,
  },
  {
    icon: Hashtag,
    text: "numbers",
    value: PUNCTUATION_MODE.NUMBERS,
  },
];

export const resultIconsButtons = ({ restart }) => [
  {
    icon: Next,
    text: "next",
    fn: () => console.log("next"),
  },
  {
    icon: Restart,
    text: "restart",
    fn: restart,
  },
  {
    icon: Danger,
    text: "danger",
    fn: () => console.log("danger"),
  },
  {
    icon: History,
    fn: () => console.log("history"),
  },

  {
    icon: Replay,
    text: "replay",
    fn: () => console.log("replay"),
  },
  {
    icon: Screenshot,
    text: "screenshot",
    fn: takeScreenshot,
  },
  {
    icon: Ad,
    text: "ad",
    fn: () => console.log("ad"),
  },
];

export const numberOfWordsOptions = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "25",
    value: 25,
  },
  {
    text: "50",
    value: 50,
  },
  {
    text: "100",
    value: 100,
  },
];

export const numberOfTimeOptions = [
  {
    text: "15",
    value: 15,
  },
  {
    text: "30",
    value: 30,
  },
  {
    text: "60",
    value: 60,
  },
  {
    text: "120",
    value: 120,
  },
];
