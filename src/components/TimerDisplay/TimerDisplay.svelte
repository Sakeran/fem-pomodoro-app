<script lang="ts">
  import { settingsKey, SettingsStore } from "../../stores/settings";

  import { getContext, onMount } from "svelte";

  const store: SettingsStore = getContext(settingsKey);

  export let percentageComplete = 0;

  let circle: SVGCircleElement;
  let circleLength = 0;

  let timerValue = "17:32"; // stub
  let actionValue = "Reset"; // stub

  // Determine font / trackings
  let timerStyles = "";
  let actionStyles = "";
  $: {
    switch ($store.font) {
      case "sans":
        timerStyles = "font-sans -tracking-[4px] sm:-tracking-[5px]";
        actionStyles = "font-sans";
        break;
      case "serif":
        timerStyles = "font-serif";
        actionStyles = "font-serif";
        break;
      case "mono":
        timerStyles = "font-mono -tracking-[10px]";
        actionStyles = "font-mono";
        break;
      default:
        timerStyles = "font-sans -tracking-[4px] sm:-tracking[5px]";
        actionStyles = "font-sans";
    }
  }

  // Determine UI color for SVG stroke

  let strokeColor: string = "";

  $: {
    switch ($store.color) {
      case "red":
        strokeColor = "text-ui-red";
        break;
      case "blue":
        strokeColor = "text-ui-blue";
        break;
      case "magenta":
        strokeColor = "text-ui-magenta";
        break;
      default:
        strokeColor = "text-ui-red";
    }
  }

  onMount(() => {
    circleLength = circle.getTotalLength();
  });
</script>

<button class="block w-full">
  <div
    class="timer-outer aspect-square rounded-full flex items-center justify-center"
  >
    <div class=" relative w-[89.3%] bg-ui-dark aspect-square rounded-full">
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class={`${strokeColor} absolute inset-0 -rotate-90`}
      >
        <circle
          bind:this={circle}
          cx="50"
          cy="50"
          r="44"
          stroke="currentColor"
          stroke-width="2.8%"
          stroke-dasharray={circleLength}
          stroke-dashoffset={circleLength * percentageComplete}
          stroke-linecap="round"
        />
      </svg>
      <div class=" h-full flex items-center justify-center">
        <div>
          <div
            aria-hidden="true"
            class={`${timerStyles} flex items-center justify-center text-white timer-text`}
          >
            {timerValue}
          </div>
          <div
            class={`${actionStyles} timer-action h-0 text-white text-14p sm:text-4 uppercase tracking-[13px] sm:tracking-[15px]`}
          >
            {actionValue}
          </div>
        </div>
      </div>
    </div>
  </div></button
>

<style lang="postcss">
  .timer-outer {
    background-image: linear-gradient(
      135deg,
      theme("colors.ui.dark"),
      theme("colors.background")
    );

    filter: drop-shadow(-3.125rem -3.125rem 6.25rem hsl(234, 40%, 25%))
      drop-shadow(3.125rem 3.125rem 6.25rem theme("colors.ui.dark"));
  }

  .timer-text {
    font-size: clamp(5rem, 20vw, 6.5rem);
  }
</style>
