<script>
  import { setContext } from "svelte";
  import { createSettingsStore, settingsKey } from "../..//stores/settings";

  export let storeValues = {};

  const store = createSettingsStore(storeValues);

  setContext(settingsKey, store);
</script>

<slot />
