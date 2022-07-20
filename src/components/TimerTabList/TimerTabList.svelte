<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let activeTimer: "pomodoro" | "shortBreak" | "longBreak";

  const dispatch = createEventDispatcher();
  const select = (type: typeof activeTimer) => () =>
    dispatch("selectTimerType", type);

  const isPressed = (timerType: typeof activeTimer) =>
    timerType === activeTimer;

  const commonClasses =
    "basis-full py-4 rounded-pill ui-font motion-safe:transition-colors motion-safe:ease-in-out text-12p sm:text-14p focus-visible:outline-ui-light focus-visible:outline focus-visible:outline-2";
  const selectedClasses = commonClasses + " ui-bg-color text-background";
</script>

<div class="bg-ui-dark p-2 rounded-pill flex gap-1 max-w-sm">
  <button
    class={activeTimer === "pomodoro" ? selectedClasses : commonClasses}
    on:click={select("pomodoro")}
    aria-pressed={isPressed("pomodoro")}>pomodoro</button
  >
  <button
    class={activeTimer === "shortBreak" ? selectedClasses : commonClasses}
    on:click={select("shortBreak")}
    aria-pressed={isPressed("shortBreak")}>short break</button
  >
  <button
    class={activeTimer === "longBreak" ? selectedClasses : commonClasses}
    on:click={select("longBreak")}
    aria-pressed={isPressed("longBreak")}>long break</button
  >
</div>
