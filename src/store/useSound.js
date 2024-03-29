import { create } from "zustand";
import typeSoft from "../assets/sound/typeSoft.wav";
import cherryBlue from "../assets/sound/cherryBlue.wav";
import keyboard from "../assets/sound/keyboard.wav";

const SOUND_MAP = {
  keyboard: keyboard,
  typewriter: typeSoft,
  cherry: cherryBlue,
};

export const useSoundsStore = create((set, get) => ({
  volume: 0.25,
  currentSound: SOUND_MAP["cherry"],
  muted: false,

  setCurrentSound: (sound) => {
    set({ currentSound: sound });
  },

  setVolume: (volume) => {
    set({ volume: volume });
  },

  toggleMute: () => {
    set({ muted: !get().muted });
  },

  setMuteOn: () => {
    set({ muted: true });
  },

  getMute: () => {
    return get().muted;
  },

  setMuteOff: () => {
    set({ muted: false });
  },
}));
