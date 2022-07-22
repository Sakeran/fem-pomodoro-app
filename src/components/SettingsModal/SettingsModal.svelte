<script lang="ts">
  import { SoundManager, soundManagerKey } from "../../lib/sounds";
  import { Notifier, notifierKey } from "../../lib/notifications";

  import MenuTabList from "../MenuTabList/MenuTabList.svelte";
  import Button from "../Button/Button.svelte";
  import NumberInput from "../NumberInput/NumberInput.svelte";
  import FontSelect from "../FontSelect/FontSelect.svelte";
  import ColorSelect from "../ColorSelect/ColorSelect.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import { createEventDispatcher, getContext } from "svelte";
  import {
    createSettingsStore,
    settingsKey,
    SettingsStore,
  } from "../../stores/settings";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  let activeTab = 0;
  let hasUnappliedSettings = false;

  const dispatch = createEventDispatcher();

  const store: SettingsStore = getContext(settingsKey);

  const soundManager: SoundManager = getContext(soundManagerKey);
  const notifier: Notifier = getContext(notifierKey);

  // Temporary store to track settings changes
  const currentStore = createSettingsStore({ ...get(store) });

  // Notifications permission might be revoked while editing.
  // Handle this for the currentStore.
  function clearNotificationsSet() {
    $currentStore.notifications = false;
  }

  onMount(() => {
    if (notifier) {
      notifier.onPermissionsRevoked(clearNotificationsSet);

      return () => notifier.removeOnPermissionsRevoked(clearNotificationsSet);
    }
  });

  $: {
    // Determine if any settings are currently unapplied.
    hasUnappliedSettings =
      $store.time.pomodoro !== $currentStore.time.pomodoro ||
      $store.time.shortBreak !== $currentStore.time.shortBreak ||
      $store.time.longBreak !== $currentStore.time.longBreak ||
      $store.color !== $currentStore.color ||
      $store.font !== $currentStore.font ||
      $store.notifications !== $currentStore.notifications ||
      $store.sound !== $currentStore.sound;

    if (soundManager) {
      soundManager.play("beep");
    }
  }

  $: {
    if ($currentStore.notifications && notifier) {
      notifier.requestPermissions();
    }
  }

  function switchTab() {
    if (soundManager) {
      soundManager.play("beep");
    }
  }

  function applySettings() {
    if (!hasUnappliedSettings) return;

    $store.time.pomodoro = $currentStore.time.pomodoro;
    $store.time.shortBreak = $currentStore.time.shortBreak;
    $store.time.longBreak = $currentStore.time.longBreak;
    $store.color = $currentStore.color;
    $store.font = $currentStore.font;
    $store.notifications = $currentStore.notifications;
    $store.sound = $currentStore.sound;

    close();
  }

  function close() {
    dispatch("close");
  }
</script>

<div
  class="ui-font bg-white text-ui-dark rounded-md"
  role="dialog"
  aria-labelledby="settings-label"
>
  <div
    class="pl-6 pr-2 pt-6 pb-7 sm:pl-10 sm:pr-6 sm:pb-8 flex justify-between items-center border-b border-gray"
  >
    <h2 id="settings-label" class="text-5 sm:text-7 font-bold text-ui-dark">
      Settings
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

  <div class="tablist-container px-6 sm:px-10 mt-6 sm:mt-8">
    <MenuTabList
      options={["timer", "system"]}
      bind:activeTab
      on:tabSelect={switchTab}
      label={"Option Tabs"}
    />
  </div>

  <div class="px-6 sm:px-10 mt-6 sm:mt-8 grid">
    <!-- Tab 1 -->
    <div
      id="menutab-timer"
      role="tabpanel"
      aria-labelledby={"menutabbutton-timer"}
      aria-hidden={activeTab !== 0}
      class="col-start-1 col-end-1 row-start-1 row-end-1"
    >
      <div>
        <fieldset>
          <legend class="sr-only">Time in Minutes</legend>
          <div aria-hidden="true" class="text-13p uppercase tracking-5">
            Time (Minutes)
          </div>

          <div class="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-5">
            <NumberInput
              label="pomodoro"
              bind:value={$currentStore.time.pomodoro}
              placeholder={30}
            />
            <NumberInput
              label="short break"
              bind:value={$currentStore.time.shortBreak}
              placeholder={5}
            />
            <NumberInput
              label="long break"
              bind:value={$currentStore.time.longBreak}
              placeholder={15}
            />
          </div>
        </fieldset>

        <div class="pt-6 mt-6 border-t border-gray">
          <FontSelect bind:selection={$currentStore.font} />
        </div>

        <div class="pt-6 mt-6 border-t border-gray">
          <ColorSelect bind:selection={$currentStore.color} />
        </div>
      </div>
    </div>

    <!-- Tab 2 -->
    <div
      id="menutab-system"
      role="tabpanel"
      aria-labelledby={"menutabbutton-timer"}
      aria-hidden={activeTab !== 1}
      class="col-start-1 col-end-1 row-start-1 row-end-1"
    >
      <div>
        <div>
          <Checkbox label="sound" bind:checked={$currentStore.sound} />
        </div>
        <div class="pt-6 mt-6 border-t border-gray">
          <Checkbox
            label="notifications"
            bind:checked={$currentStore.notifications}
          />
        </div>
      </div>
    </div>
  </div>

  <div class="relative translate-y-1/2 flex justify-center mt-1">
    <Button
      text="Apply"
      disabled={!hasUnappliedSettings}
      on:click={applySettings}
    />
  </div>
</div>

<style>
  .tablist-container > :global(*) {
    margin-left: auto;
    margin-right: auto;
  }

  [id^="menutab-"][aria-hidden="true"] {
    visibility: hidden;
  }
</style>
