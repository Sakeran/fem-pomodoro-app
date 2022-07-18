<script lang="ts">
  import { settingsKey, SettingsStore } from "../../stores/settings";

  import { createEventDispatcher, getContext } from "svelte";

  export let activeTimer: "pomodoro" | "shortBreak" | "longBreak";

  const dispatch = createEventDispatcher();
  const select = (type: typeof activeTimer) => () =>
    dispatch("selectTimerType", type);

  const isPressed = (timerType: typeof activeTimer) =>
    timerType === activeTimer;

  const classes =
    "ui-font basis-full py-4 text-12p sm:text-14p rounded-pill focus-visible:outline-ui-light focus-visible:outline focus-visible:outline-2 motion-safe:transition-colors motion-safe:ease-in-out";
  const btnClasses = (type: typeof activeTimer) =>
    isPressed(type)
      ? "ui-bg-color text-background " + classes
      : "text-ui-light/40 hover:text-ui-light/100 focus-visible:text-ui-light/100 " +
        classes;
</script>

<div class="bg-ui-dark p-2 rounded-pill flex gap-1 max-w-sm">
  <button
    on:click={select("pomodoro")}
    class={btnClasses("pomodoro")}
    aria-pressed={isPressed("pomodoro")}>pomodoro</button
  >
  <button
    on:click={select("shortBreak")}
    class={btnClasses("shortBreak")}
    aria-pressed={isPressed("shortBreak")}>short break</button
  >
  <button
    on:click={select("longBreak")}
    class={btnClasses("longBreak")}
    aria-pressed={isPressed("longBreak")}>long break</button
  >
</div>
