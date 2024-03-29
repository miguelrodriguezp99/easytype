import typeSoft from "../assets/sound/typeSoft.wav";
import keyboard from "../assets/sound/keyboard.wav";
import cherryBlue from "../assets/sound/cherryBlue.wav";

const SOUND_MAP = {
  keyboard: keyboard,
  typewriter: typeSoft,
  cherry: cherryBlue,
};

export const getSoundName = (sound) => {
  switch (sound) {
    case SOUND_MAP["keyboard"]:
      return "keyboard";
    case SOUND_MAP["typewriter"]:
      return "typewriter";
    case SOUND_MAP["cherry"]:
      return "cherry";
    default:
      return "cherry";
  }
};

export { SOUND_MAP };
