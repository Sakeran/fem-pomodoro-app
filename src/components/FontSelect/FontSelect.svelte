<script lang="ts">
  export let selection = "sans";

  const iconClasses =
    "bg-ui-light text-background/75 font-bold inline-grid place-content-center min-w-[2.5rem] aspect-square rounded-full cursor-pointer outline outline-1 outline-offset-[5px] outline-ui-light/0 motion-safe:transition-colors";

  
</script>

<fieldset class="text-15p flex justify-between items-center">
  <legend class="sr-only">Select Font</legend>
  <div aria-hidden="true" class="text-13p uppercase tracking-5">Font</div>

  <div class="flex gap-4">
    
    <!-- Sans Serif -->
    <input
      type="radio"
      class="sr-only"
      name="font-type"
      id="font-type-sans"
      bind:group={selection}
      value="sans"
    />
    <label for="font-type-sans">
      <span class="sr-only">sans-serif</span>
      <span aria-hidden="true" class:font-sans={true} class={iconClasses}
        >Aa</span
      >
    </label>

    <!-- Serif -->
    <input
      type="radio"
      class="sr-only"
      name="font-type"
      id="font-type-serif"
      bind:group={selection}
      value="serif"
    />
    <label for="font-type-serif">
      <span class="sr-only">serif</span>
      <span aria-hidden="true" class:font-serif={true} class={iconClasses}
        >Aa</span
      >
    </label>

    <!-- Monospace -->
    <input
      type="radio"
      class="sr-only"
      name="font-type"
      id="font-type-mono"
      bind:group={selection}
      value="mono"
    />
    <label for="font-type-mono">
      <span class="sr-only">monospace</span>
      <span aria-hidden="true" class:font-mono={true} class={iconClasses}
        >Aa</span
      >
    </label>
  </div>
</fieldset>

<style lang="postcss">
  input:checked + label > span + span {
    @apply bg-ui-dark text-white;
  }

  input:not(:checked) + label > span + span:hover {
    @apply outline-ui-light/100;
  }

  input:focus-visible:checked + label > span + span {
    @apply outline-[1px] outline-ui-dark outline-dashed;
  }
</style>
