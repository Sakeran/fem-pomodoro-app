<script lang="ts">
  export let label: string;
  export let id: string = "";
  export let placeholder: number;

  export let value: number;

  let input;

  const inputID = id || Math.random().toString();

  function increment() {
    value += 1;
    input.focus();
  }

  function decrement() {
    value = Math.max(value - 1, 1);
    input.focus();
  }

  function handleOuterClick() {
    input.focus();
  }
</script>

<div
  class="flex space-between items-center sm:flex-col sm:items-start sm:gap-[0.625rem]"
>
  <label class="text-background/40 text-12p mr-auto" for={inputID}
    >{label}</label
  >
  <div
    class="bg-ui-light rounded-sm px-4 py-3 sm:py-4 flex flex-row cursor-text"
    on:click|self={handleOuterClick}
  >
    <input
      bind:this={input}
      type="number"
      id={inputID}
      placeholder={placeholder.toString()}
      class="bg-ui-light text-14p max-w-[6.75em] invalid:text-ui-red"
      bind:value
      min="1"
    />
    <div
      class="flex flex-col gap-2 text-background/25 self-stretch cursor-auto"
    >
      <button
        tabindex="-1"
        class="hover:text-background/100 motion-safe:transition-colors"
        on:click={increment}
        ><span class="sr-only">increment</span><svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="7"
          aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            d="M1 6l6-4 6 4"
          /></svg
        ></button
      >
      <button
        tabindex="-1"
        aria-label="decrement"
        on:click={decrement}
        class="hover:text-background/100 motion-safe:transition-colors"
        ><span class="sr-only">decrement</span><svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="7"
          aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            d="M1 1l6 4 6-4"
          /></svg
        ></button
      >
    </div>
  </div>
</div>

<style lang="postcss">
  input {
    appearance: textfield;
    outline: none;
  }
</style>
