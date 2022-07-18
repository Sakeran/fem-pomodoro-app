<script lang="ts">
  export let text: string;
  export let disabled: boolean = false;
</script>

<button
  class:bg-ui-red={!disabled}
  class:bg-ui-dull-red={disabled}
  class="font-sans rounded-pill text-white px-12 py-4 enabled:hover:bg-ui-light-red enabled:focus:bg-ui-light-red motion-safe:transition-colors motion-safe:duration-500"
  on:click
  {disabled}>{text}</button
>
