<script lang="ts">
  import { setContext } from "svelte";
  import { derived } from "svelte/store";
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

  let currentScreen: "main" | "settings" | "help" = "main";

  type TimerType = keyof SettingsOptions["time"];
  type TimerState = "initial" | "running" | "paused" | "finished";

  const settingsStore = createSettingsStore();
  setContext(settingsKey, settingsStore);

  const timerStore = createTimer();

  let timerType: TimerType = "pomodoro";

  const timerState = derived<[SettingsStore, TimerStore], TimerState>(
    [settingsStore, timerStore],
    ([settings, timer]) => {
      if (timer.ellapsedTime >= settings.time[timerType] * 60) {
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

  const timeRemaining = derived<[SettingsStore, TimerStore], number>(
    [settingsStore, timerStore],
    ([settings, timer]) => {
      return Math.max(0, settings.time[timerType] * 60 - timer.ellapsedTime);
    }
  );

  const percentageComplete = derived(
    [settingsStore, timeRemaining],
    ([settings, timeRemaining]) => {
      return 1 - timeRemaining / (settings.time[timerType] * 60);
    }
  );

  const displayAction = derived([timerState], ([state]) => {
    switch ($timerState) {
      case "initial":
      case "paused":
        return "start";
      case "finished":
        return "restart";
      case "running":
        return "pause";
    }
  });

  $: {
    if ($timerState === "finished" && $timerStore.running) {
      onFinish();
    }
  }

  function selectTimerType(newType: TimerType) {
    if (newType === timerType) return;

    timerType = newType;
    timerStore.restart();
  }

  function handleTimerClick() {
    switch ($timerState) {
      case "initial":
      case "paused":
        timerStore.start();
        return;
      case "finished":
        timerStore.restart();
        timerStore.start();
        return;
      case "running":
        timerStore.pause();
        return;
    }
  }

  function closeModal() {
    currentScreen = "main";
  }

  function onFinish() {
    timerStore.pause();
  }
</script>

<main
  class="box-content px-6 max-w-[25.625rem] mx-auto"
  data-ui-color={$settingsStore.color}
  data-ui-font={$settingsStore.font}
>
  <!-- TITLE -->
  <h1 class="text-8 lowercase text-center mt-8 sm:mt-20">Pomodoro</h1>

  <!-- TIMER TABS -->
  <div class="relative: z-10 mt-11 sm:mt-14">
    <TimerTabList
      activeTimer={timerType}
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
      percentageComplete={$percentageComplete}
      actionName={$displayAction}
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
