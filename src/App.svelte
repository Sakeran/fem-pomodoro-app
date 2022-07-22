<script lang="ts">
  import { setContext } from "svelte";
  import { derived } from "svelte/store";
  import { tweened } from "svelte/motion";
  import HelpModal from "./components/HelpModal/HelpModal.svelte";
  import MenuBar from "./components/MenuBar/MenuBar.svelte";
  import ModalContainer from "./components/ModalContainer/ModalContainer.svelte";
  import SettingsModal from "./components/SettingsModal/SettingsModal.svelte";

  import TimerDisplay from "./components/TimerDisplay/TimerDisplay.svelte";
  import TimerTabList from "./components/TimerTabList/TimerTabList.svelte";
  import {
    createSettingsStore,
    settingsKey,
    SettingsOptions,
    SettingsStore,
  } from "./stores/settings";
  import { createTimer, TimerStore } from "./stores/timerStore";

  import { SoundManager, soundManagerKey } from "./lib/sounds";
  import { Notifier, notifierKey } from "./lib/notifications";
  import { deriveTimerState } from "./stores/deriveTimerState";
  import { deriveRemainingTime } from "./stores/deriveRemainingTime";
import { derivePercentageComplete } from "./stores/derivePercentageComplete";

  let currentScreen: "main" | "settings" | "help" = "main";

  type TimerType = keyof SettingsOptions["time"];

  // General Settings

  const settingsStore = createSettingsStore();
  setContext(settingsKey, settingsStore);

  // Notifications
  const notifier = new Notifier();
  $: notifier.notificationsEnabled = $settingsStore.notifications;
  setContext(notifierKey, notifier);

  // Remove 'notifications=on' setting if permission is revoked.
  notifier.onPermissionsRevoked(() => {
    $settingsStore.notifications = false;
  });

  // Sounds

  const soundManager = new SoundManager();
  $: soundManager.soundIsAllowed = $settingsStore.sound;
  setContext(soundManagerKey, soundManager);

  // Timers

  const timerStore = createTimer();

  const timeRemaining = deriveRemainingTime(settingsStore, timerStore);
  const timerState = deriveTimerState(settingsStore, timerStore);
  const percentageComplete = derivePercentageComplete(settingsStore, timeRemaining);

  // Animated display
  const timerBarPercentage = tweened(0, {
    duration:
      window &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches
        ? 1000
        : 0,
  });
  $: timerBarPercentage.set($percentageComplete);

  $: {
    if ($timerState === "finished" && $timerStore.running) {
      onFinish();
    }
  }

  function selectTimerType(newType: TimerType) {
    soundManager.play("beep");
    if (newType === $settingsStore.timerType) return;

    $settingsStore.timerType = newType;
    timerStore.restart();
  }

  function handleTimerClick() {
    switch ($timerState) {
      case "initial":
      case "paused":
        soundManager.play("beep");
        timerStore.start();
        return;
      case "finished":
        soundManager.play("beep");
        timerStore.restart();
        timerStore.start();
        return;
      case "running":
        soundManager.play("close");
        timerStore.pause();
        return;
    }
  }

  function closeModal() {
    soundManager.play("close");
    currentScreen = "main";
  }

  function onFinish() {
    soundManager.play("ring");
    timerStore.pause();
  }
</script>

<div data-ui-color={$settingsStore.color} data-ui-font={$settingsStore.font}>
  <main class="box-content px-6 max-w-[25.625rem] mx-auto">
    <!-- TITLE -->
    <h1 class="text-8 lowercase text-center mt-8 sm:mt-20">Pomodoro</h1>

    <!-- TIMER TABS -->
    <div class="relative: z-10 mt-11 sm:mt-14">
      <TimerTabList
        activeTimer={$settingsStore.timerType}
        on:selectTimerType={(e) => selectTimerType(e.detail)}
      />
    </div>

    <!-- TIMER DISPLAY -->
    <div class="mt-12 sm:mt-[6.75rem]">
      <!-- <TimerDisplay
      on:click={handleTimerClick}
      percentageComplete={1 -
        $timeRemaining / ($settingsStore.time[timerType] * 60)}
      secondsRemaining={$timeRemaining}
      {actionName}
    /> -->
      <TimerDisplay
        on:click={handleTimerClick}
        secondsRemaining={$timeRemaining}
        percentageComplete={$timerBarPercentage}
        timerState={$timerState}
      />
    </div>

    <!-- BUTTONS BAR -->
    <div class="relative z-10 mt-20 max-w-max mx-auto">
      <MenuBar
        on:openHelp={() => (currentScreen = "help")}
        on:openSettings={() => (currentScreen = "settings")}
      />
    </div>
  </main>

  <!-- MODALS -->
  {#if currentScreen === "help" || currentScreen === "settings"}
    <ModalContainer on:close={closeModal}>
      {#if currentScreen === "help"}
        <HelpModal on:close={closeModal} />
      {:else}
        <SettingsModal on:close={closeModal} />
      {/if}
    </ModalContainer>
  {/if}
</div>

<style>
  [data-ui-color="red"] {
    --ui-color: theme("colors.ui.red");
  }

  [data-ui-color="blue"] {
    --ui-color: theme("colors.ui.blue");
  }

  [data-ui-color="magenta"] {
    --ui-color: theme("colors.ui.magenta");
  }

  [data-ui-font="sans"] {
    --ui-font: theme("fontFamily.sans");
  }

  [data-ui-font="serif"] {
    --ui-font: theme("fontFamily.serif");
  }

  [data-ui-font="mono"] {
    --ui-font: theme("fontFamily.mono");
  }
</style>
