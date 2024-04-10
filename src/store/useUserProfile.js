import { create } from "zustand";

export const useSoundsStore = create((set, get) => ({
  experience: 0,
  startedTests: 0,
  completedTests: 0,
}));
