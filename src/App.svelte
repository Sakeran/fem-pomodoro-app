<script lang="ts">
  import { setContext } from "svelte";
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
  } from "./stores/settings";
  import { createTimer } from "./stores/timerStore";

  import { SoundManager, soundManagerKey } from "./lib/sounds";
  import { Notifier, notifierKey } from "./lib/notifications";
  import { deriveTimerState } from "./stores/deriveTimerState";
  import { deriveRemainingTime } from "./stores/deriveRemainingTime";
  import { derivePercentageComplete } from "./stores/derivePercentageComplete";
  import { makeNotificationMessage } from "./lib/notificationMessages";

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
  const percentageComplete = derivePercentageComplete(
    settingsStore,
    timeRemaining
  );

  $: {
    if ($timerState === "finished" && $timerStore.running) {
      onFinish();
    }
  }

  function startTimer(restart = false) {
    soundManager.play("beep");
    if (restart) timerStore.restart();
    timerStore.start();
  }

  function stopTimer() {
    soundManager.play("close");
    timerStore.pause();
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
        return startTimer();
      case "finished":
        return startTimer(true);
      case "running":
        return stopTimer();
    }
  }

  function closeModal() {
    soundManager.play("close");
    currentScreen = "main";
  }

  function onFinish() {
    const msg = makeNotificationMessage(
      $settingsStore.timerType,
      $settingsStore.time[$settingsStore.timerType]
    );
    notifier.notify(msg.title, msg.message);
    soundManager.play("ring");
    timerStore.pause();
  }

  function handleKeydown(e: KeyboardEvent) {
    // Handle Shortcuts

    // Shortcuts are active only on the main screen.
    if (currentScreen !== "main") return;

    // Shortcuts always of the form (shift+alt+KEY)
    if (!(e.shiftKey && e.altKey)) return;

    // Ignore repeats
    if (e.repeat) return;

    switch (e.key) {
      case "S":
        // Start / Stop Timer
        e.preventDefault();
        return handleTimerClick();
      case "J":
        // Select Pomodoro Timer
        e.preventDefault();
        return selectTimerType("pomodoro");
      case "K":
        // Select Short Break Timer
        e.preventDefault();
        return selectTimerType("shortBreak");
      case "L":
        // Select Long Break Timer
        e.preventDefault();
        return selectTimerType("longBreak");
      case "H":
        // Open Help Modal
        e.preventDefault();
        return (currentScreen = "help");
      case "M":
        // Open Settings Modal
        e.preventDefault();
        return (currentScreen = "settings");
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div data-ui-color={$settingsStore.color} data-ui-font={$settingsStore.font}>
  <header>
    <!-- TITLE -->
    <h1 class="text-8 lowercase text-center mt-8 sm:mt-20 md:mt-12">Pomodoro</h1>
  </header>
  <main class="relative box-content px-6 max-w-[25.625rem] mx-auto">
    <!-- TIMER TABS -->
    <section class="relative z-10 mt-11 sm:mt-14">
      <h2 class="sr-only">Select Timer Mode</h2>
      <TimerTabList
        activeTimer={$settingsStore.timerType}
        on:selectTimerType={(e) => selectTimerType(e.detail)}
      />
    </section>

    <!-- TIMER DISPLAY -->
    <section class="mt-12 sm:mt-[6.75rem] md:mt-11">
      <h2 class="sr-only">Timer View</h2>
      <TimerDisplay
        on:click={handleTimerClick}
        secondsRemaining={$timeRemaining}
        percentageComplete={$percentageComplete}
        timerState={$timerState}
      />
    </section>

    <!-- BUTTONS BAR -->
    <section class="relative z-10 mt-20 sm:mt-36 lg:mt-16 max-w-max mx-auto">
      <h2 class="sr-only">Options</h2>
      <MenuBar
        on:openHelp={() => (currentScreen = "help")}
        on:openSettings={() => (currentScreen = "settings")}
      />
    </section>
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
