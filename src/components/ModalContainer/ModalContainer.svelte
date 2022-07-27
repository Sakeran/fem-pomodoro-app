<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { scale } from "svelte/transition";

  const dispatch = createEventDispatcher();

  let modal: HTMLDivElement;
  let previousElement = document && document.activeElement;

  onMount(() => {
    const focusables = getFocusables();

    focusables[0].focus();
  });

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

    const focusables = getFocusables();

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

  function getFocusables() {
    return Array.from(
      modal.querySelectorAll(
        `:not([aria-hidden="true"] *, :disabled, input[type="radio"]:not(:checked))`
      )
    ).filter(
      (el) => el instanceof HTMLElement && el.tabIndex >= 0
    ) as HTMLElement[];
  }

  function close() {
    dispatch("close");
    if (previousElement instanceof HTMLElement) previousElement.focus();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed inset-0 z-30 bg-[#0A0C1C]/50" on:click|self={close} />

<div
  class="absolute left-0 right-0 top-0 z-40 md:flex md:bottom-0 md:items-center"
>
  <div
    class="box-content p-6 max-w-[33.75rem] mx-auto"
    bind:this={modal}
    transition:scale={{
      duration: window.matchMedia("(prefers-reduced-motion: no-preference)")
        .matches
        ? 200
        : 0,
    }}
  >
    <slot />
  </div>
</div>
