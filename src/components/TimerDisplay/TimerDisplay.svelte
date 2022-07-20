<script lang="ts">
  import { settingsKey, SettingsStore } from "../../stores/settings";

  import { getContext, onMount } from "svelte";

  const store: SettingsStore = getContext(settingsKey);

  export let percentageComplete = 0;

  let circle: SVGCircleElement;
  let circleLength = 0;

  export let secondsRemaining: number;
  export let actionName: string;

  // Determine font / tracking for timer display
  let timerStyles = "";
  $: {
    switch ($store.font) {
      case "sans":
        timerStyles = "font-sans -tracking-[4px] sm:-tracking-[5px]";
        break;
      case "serif":
        timerStyles = "font-serif";
        break;
      case "mono":
        timerStyles = "font-mono -tracking-[10px]";
        break;
      default:
        timerStyles = "font-sans -tracking-[4px] sm:-tracking[5px]";
    }
  }

  function formatSeconds(s) {
    const seconds = s % 60;

    const minutes = (s - seconds) / 60;

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  onMount(() => {
    circleLength = circle.getTotalLength();
  });
</script>

<button on:click class="block w-full rounded-full">
  <div
    class="timer-outer aspect-square rounded-full flex items-center justify-center"
  >
    <div class=" relative w-[89.3%] bg-ui-dark aspect-square rounded-full">
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="ui-color absolute inset-0 -rotate-90"
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
            class={`${timerStyles} flex items-center justify-center text-white timer-text leading-none`}
          >
            {formatSeconds(secondsRemaining)}
          </div>
          <div
            class={`ui-font mt-5 timer-action h-0 text-white text-14p sm:text-4 uppercase tracking-[13px] sm:tracking-[15px] motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in-out`}
          >
            {actionName}
          </div>
        </div>
      </div>
    </div>
  </div></button
>

<style lang="postcss">
  button:focus-visible {
    @apply outline outline-ui-light outline-offset-4;
  }

  button:hover .timer-action,
  button:focus-visible .timer-action {
    color: var(--ui-color, white);
  }

  .timer-outer {
    background-image: linear-gradient(
      135deg,
      theme("colors.ui.dark"),
      theme("colors.background")
    );
    --shadow-size: 50px;
    --shadow-blur: 36px;

    filter: drop-shadow(
        calc(-1 * var(--shadow-size)) calc(-1 * var(--shadow-size))
          var(--shadow-blur) hsl(234, 40%, 25%)
      )
      drop-shadow(
        calc(var(--shadow-size)) calc(var(--shadow-size)) var(--shadow-blur)
          theme("colors.ui.dark")
      );
  }

  .timer-text {
    font-size: clamp(5rem, 20vw, 6.5rem);
  }
</style>
