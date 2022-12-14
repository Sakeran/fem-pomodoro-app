import { Writable, writable } from "svelte/store";

export type SettingsOptions = {
  time: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };

  timerType: "pomodoro" | "shortBreak" | "longBreak";

  font: "sans" | "serif" | "mono";
  color: "red" | "blue" | "magenta";

  sound: boolean;
  notifications: boolean;
};

export type SettingsStore = Writable<SettingsOptions>;

const initialSettings: () => SettingsOptions = () => ({
  time: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  },

  timerType: "pomodoro",

  font: "sans",
  color: "red",

  sound: true,
  notifications: false,
});

export const settingsKey = "pomodoro-settings-key";

export function createSettingsStore(
  defaultSettings: Partial<SettingsOptions> = {}
): SettingsStore {
  return writable<SettingsOptions>(
    Object.assign({}, initialSettings(), {
      ...defaultSettings,
      time: {
        pomodoro: defaultSettings.time?.pomodoro || 25,
        shortBreak: defaultSettings.time?.shortBreak || 5,
        longBreak: defaultSettings.time?.longBreak || 15,
      },
    })
  );
}
