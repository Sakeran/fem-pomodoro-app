import { derived } from "svelte/store";
import type { SettingsStore } from "./settings";
import type { TimerStore } from "./timerStore";

export function deriveRemainingTime(
  settings: SettingsStore,
  timer: TimerStore
) {
  return derived<[SettingsStore, TimerStore], number>(
    [settings, timer],
    ([settings, timer]) => {
      return Math.max(
        0,
        settings.time[settings.timerType] * 60 - timer.ellapsedTime
      );
    }
  );
}
