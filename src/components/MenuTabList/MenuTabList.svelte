<script lang="ts">
  export let label: string;
  export let options: string[];
  export let activeTab: number = 0;

  let tablist: HTMLDivElement;

  function select(optionIndex) {
    activeTab = optionIndex;
    const focusThis = tablist.querySelector(
      `[aria-controls="menutab-${options[optionIndex]}"]`
    ) as HTMLButtonElement;
    focusThis.focus();
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "Left":
      case "ArrowLeft":
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        select(activeTab == 0 ? options.length - 1 : activeTab - 1);
        return;
      case "Right":
      case "ArrowRight":
      case "Down":
      case "ArrowDown":
        e.preventDefault();
        select(activeTab === options.length - 1 ? 0 : activeTab + 1);
        return;
    }
  }
</script>

<div
  bind:this={tablist}
  role="tablist"
  aria-label={label}
  class="bg-ui-light p-2 rounded-pill flex gap-1 max-w-sm"
>
  {#each options as option, i}
    <button
      on:click={() => select(i)}
      on:keydown={handleKeydown}
      id={`menutabbutton-${option}`}
      tabindex={activeTab === i ? 0 : -1}
      class="basis-full py-4 text-background text-14p rounded-pill motion-safe:transition-colors motion-safe:ease-in-out"
      role="tab"
      aria-controls={`menutab-${option}`}
      aria-selected={activeTab === i}>{option}</button
    >
  {/each}
</div>

<style lang="postcss">
  button:hover {
    @apply bg-background/10;
  }

  button[aria-selected="true"] {
    @apply bg-background text-white;
  }

  button[aria-selected="true"]:focus-visible {
  }
</style>
