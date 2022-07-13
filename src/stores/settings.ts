import { writable } from "svelte/store";

type SettingsOptions = {
  time: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };

  font: "sans" | "serif" | "mono";
  color: "red" | "blue" | "magenta";

  sound: boolean;
  notifications: boolean;
};

const initialSettings: SettingsOptions = {
  time: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  },

  font: "sans",
  color: "red",

  sound: false,
  notifications: false,
};

export const settingsKey = "pomodoro-settings-key";

export function createSettingsStore(
  defaultSettings?: Partial<SettingsOptions>
) {
  return writable<SettingsOptions>(
    Object.assign({}, initialSettings, defaultSettings || {})
  );
}
