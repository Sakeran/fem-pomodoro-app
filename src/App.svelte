<script lang="ts">
  import { setContext } from "svelte";
  import HelpModal from "./components/HelpModal/HelpModal.svelte";
  import MenuBar from "./components/MenuBar/MenuBar.svelte";
  import ModalContainer from "./components/ModalContainer/ModalContainer.svelte";
  import SettingsModal from "./components/SettingsModal/SettingsModal.svelte";

  import TimerDisplay from "./components/TimerDisplay/TimerDisplay.svelte";
  import TimerTabList from "./components/TimerTabList/TimerTabList.svelte";
  import { createSettingsStore, settingsKey } from "./stores/settings";

  const settingsStore = createSettingsStore();
  setContext(settingsKey, settingsStore);

  let currentScreen: "main" | "settings" | "help" = "main";

  function closeModal() {
    currentScreen = "main";
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
    <TimerTabList activeTimer="pomodoro" />
  </div>

  <!-- TIMER DISPLAY -->
  <div class="mt-12 sm:mt-[6.75rem]">
    <TimerDisplay />
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
