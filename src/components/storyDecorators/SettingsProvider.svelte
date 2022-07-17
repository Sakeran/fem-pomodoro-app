<script>
  import { setContext } from "svelte";
  import { createSettingsStore, settingsKey } from "../..//stores/settings";

  export let storeValues = {};

  const store = createSettingsStore(storeValues);

  setContext(settingsKey, store);
</script>

<div data-ui-color={$store.color} data-ui-font={$store.font}>
  <slot />
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
