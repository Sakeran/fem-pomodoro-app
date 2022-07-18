<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let modal: HTMLDivElement;

  function handleKeydown(e: KeyboardEvent) {
    // Implements focus wrapping on keyboard.

    if (e.key === "Escape") {
      e.preventDefault();
      return close();
    }
    if (e.key !== "Tab") return;
    if (!modal) return;

    const shifted = e.shiftKey;
    const activeElement = document.activeElement;

    const focusables = Array.from(modal.querySelectorAll("*")).filter(
      (el) => el instanceof HTMLElement && el.tabIndex >= 0
    ) as HTMLElement[];

    const activePosition = focusables.indexOf(activeElement as HTMLElement);

    if (activePosition === 0 && shifted) {
      e.preventDefault();
      focusables[focusables.length - 1].focus();
    }

    if (activePosition === focusables.length - 1 && !shifted) {
      e.preventDefault();
      focusables[0].focus();
    }
  }

  function close() {
    dispatch("close");
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="fixed inset-0 z-40 bg-[#0A0C1C]/50 flex justify-center items-center"
  on:click|self={close}
>
  <div class="box-content p-6 w-full max-w-[33.75rem]" bind:this={modal}>
    <slot />
  </div>
</div>
