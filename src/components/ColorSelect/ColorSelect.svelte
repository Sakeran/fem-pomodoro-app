<script lang="ts">
  export let selection = "red";

  const iconClasses =
    "inline-grid place-content-center min-w-[2.5rem] aspect-square rounded-full cursor-pointer outline outline-1 outline-ui-light/0 outline-offset-[5px] motion-safe:transition-colors";
</script>

<fieldset
  class="text-15p flex flex-col gap-4 sm:flex-row sm:justify-between items-center"
>
  <legend class="sr-only">Select UI Color</legend>
  <div aria-hidden="true" class="text-13p uppercase tracking-5">Color</div>

  <div class="flex gap-4">
    <!-- Red -->
    <input
      type="radio"
      class="sr-only"
      name="ui-color"
      id="ui-color-red"
      bind:group={selection}
      value="red"
    />
    <label for="ui-color-red" class:bg-ui-red={true} class={iconClasses}>
      <span class="sr-only">red</span>
      <svg
        aria-hidden="true"
        class:opacity-0={selection !== "red"}
        class="motion-safe:transition-opacity motion-safe:ease-in-out"
        width="15"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5.5L4.95263 9.45263L13.4053 1"
          stroke="#161932"
          stroke-width="2"
        />
      </svg>
    </label>

    <!-- Blue -->
    <input
      type="radio"
      class="sr-only"
      name="ui-color"
      id="ui-color-blue"
      bind:group={selection}
      value="blue"
    />
    <label for="ui-color-blue" class:bg-ui-blue={true} class={iconClasses}>
      <span class="sr-only">blue</span>
      <svg
        aria-hidden="true"
        class:opacity-0={selection !== "blue"}
        class="motion-safe:transition-opacity motion-safe:ease-in-out"
        width="15"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5.5L4.95263 9.45263L13.4053 1"
          stroke="#161932"
          stroke-width="2"
        />
      </svg>
    </label>

    <!-- Magenta -->
    <input
      type="radio"
      class="sr-only"
      name="ui-color"
      id="ui-color-magenta"
      bind:group={selection}
      value="magenta"
    />
    <label
      for="ui-color-magenta"
      class:bg-ui-magenta={true}
      class={iconClasses}
    >
      <span class="sr-only">magenta</span>
      <svg
        aria-hidden="true"
        class:opacity-0={selection !== "magenta"}
        class="motion-safe:transition-opacity motion-safe:ease-in-out"
        width="15"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5.5L4.95263 9.45263L13.4053 1"
          stroke="#161932"
          stroke-width="2"
        />
      </svg>
    </label>
  </div>
</fieldset>

<style lang="postcss">
  input:not(:checked) + label:hover {
    @apply outline-ui-light/100;
  }

  input:focus-visible:checked + label {
    @apply outline-[1px] outline-ui-dark outline-dashed;
  }
</style>
