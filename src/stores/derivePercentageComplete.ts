import { derived, Readable } from "svelte/store";
import type { SettingsStore } from "./settings";

export function derivePercentageComplete(
  settings: SettingsStore,
  timeRemaining: Readable<number>
) {
  return derived([settings, timeRemaining], ([settings, timeRemaining]) => {
    return 1 - timeRemaining / (settings.time[settings.timerType] * 60);
  });
}
