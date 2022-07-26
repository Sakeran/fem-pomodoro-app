<script lang="ts">
  export let text: string;
  export let disabled: boolean = false;
</script>

<button
  class="font-sans rounded-pill text-white px-12 py-4 motion-safe:transition-colors motion-safe:duration-500"
  on:click
  {disabled}>{text}</button
>

<style lang="postcss">
  button {
    background-color: theme("colors.gray");
  }

  button:enabled {
    background-color: var(--ui-color);
  }
</style>
