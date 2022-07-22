import { derived } from "svelte/store";
import type { SettingsStore } from "./settings";
import type { TimerStore } from "./timerStore";

export type TimerState = "initial" | "running" | "paused" | "finished";

export function deriveTimerState(settings: SettingsStore, timer: TimerStore) {
  return derived<[SettingsStore, TimerStore], TimerState>(
    [settings, timer],
    ([settings, timer]) => {
      if (timer.ellapsedTime >= settings.time[settings.timerType] * 60) {
        return "finished";
      }

      if (timer.running) {
        return "running";
      }

      if (timer.ellapsedTime === 0) {
        return "initial";
      }

      return "paused";
    }
  );
}
