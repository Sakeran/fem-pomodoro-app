<script lang="ts">
  import { SoundManager, soundManagerKey } from "../../lib/sounds";
  import Button from "../Button/Button.svelte";

  import { createEventDispatcher, getContext } from "svelte";
  import { onMount } from "svelte";

  const dispatch = createEventDispatcher();

  const soundManager: SoundManager = getContext(soundManagerKey);

  onMount(() => {
    if (soundManager) {
      soundManager.play("beep");
    }
  });

  function close() {
    dispatch("close", undefined);
  }
</script>

<div
  class="ui-font bg-white text-ui-dark rounded-md"
  role="dialog"
  aria-labelledby="help-label"
>
  <div
    class="pl-6 pr-2 pt-6 pb-7 sm:pl-10 sm:pr-6 sm:pb-8 flex justify-between items-center border-b border-gray"
  >
    <h2 id="help-label" class="text-5 sm:text-7 font-bold text-ui-dark">
      Help
    </h2>
    <button
      class="p-4 text-background/50 hover:text-background/100 focus:text-background/100"
      on:click={close}
    >
      <span class="sr-only">Close Settings</span>
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.3639 2.0502L11.9497 0.635986L6.99995 5.58573L2.0502 0.635986L0.635986 2.0502L5.58573 6.99995L0.635986 11.9497L2.0502 13.3639L6.99995 8.41416L11.9497 13.3639L13.3639 11.9497L8.41416 6.99995L13.3639 2.0502Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </button>
  </div>

  <div class="px-6 sm:px-10 mt-6 sm:mt-8 ">
    <!-- Content -->
    <div
      class="space-y-4 max-h-[20em] overflow-y-scroll px-1 pb-8"
      tabindex="0"
    >
      <h2 class="text-5">About Pomodoro</h2>

      <p class="opacity-90">
        Pomodoro is a time management technique useful for studying and
        productivity. For a more detailed description, see this <a
          class="text-[blue]"
          href="https://wikipedia.org/wiki/Pomodoro_Technique"
        >
          Wikipeida article on the Pomodoro technique
        </a>.
      </p>

      <h2 class="text-5">Using this app</h2>
      <p class="opacity-90">
        Select one of the three timer types ('Pomodoro', 'Short Break', or 'Long
        Break') to switch to that timer. Press the timer button to start the
        timer. To pause the timer, press the timer button again.
      </p>

      <p class="opacity-90">
        When the current timer reaches zero, you will hear a sound cue, see a
        notification, or both, depending on your configured settings. At this
        point, you may restart the timer by clicking the button again, or switch
        to a different timer.
      </p>

      <h2 class="text-5">Customization</h2>
      <p class="opacity-90">
        Open the settings menu to customize the appearance and behavior of the
        application. Available options include making the timer durations longer
        or shorter, custom fonts, and custom application colors.
      </p>

      <p class="opacity-90">
        Also available are options for playing sounds and displaying
        notifications when the current timer finishes. Note that selecting these
        options usually require additional browser permissions, which you will
        be prompted to give when enabling these options.
      </p>

      <h2 class="text-5">Shortcuts</h2>
      <p class="opacity-90">
        Several different shortcuts are available for starting and stopping the
        timer, as well as for switching between timer types.
      </p>

      <table class="w-full border-collapse">
        <thead class="border-b border-gray">
          <tr
            ><th class="text-start">Shortcut</th><th class="text-start"
              >Effect</th
            ></tr
          >
        </thead>
        <tbody class="opacity-90">
          <tr
            ><td class="pt-4"><kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd></td>
            <td>Start / Stop Timer</td></tr
          >
          <tr
            ><td><kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd></td>
            <td>Switch to Pomodoro timer</td></tr
          >
          <tr
            ><td><kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd></td>
            <td>Switch to Short Break timer</td></tr
          >
          <tr
            ><td><kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd></td>
            <td>Switch to Long Break timer</td></tr
          >
          <tr
            ><td><kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd></td>
            <td>Open settings menu</td></tr
          >
          <tr
            ><td><kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd></td>
            <td>Open help screen</td></tr
          >
        </tbody>
      </table>
    </div>

    <div class="relative translate-y-1/2 flex justify-center mt-1">
      <Button text="Close" on:click={close} />
    </div>
  </div>
</div>
