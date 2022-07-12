<script lang="ts">
  export let label;
  export let checked;

  const id = Math.random().toString();
</script>

<div class="flex items-center justify-between">
  <label class="text-13p uppercase tracking-5" for={id}>{label}</label>

  <div class="grid place-items-center">
    <input
      class="appearance-none row-start-1 row-end-1 col-start-1 col-end-1 min-w-[2.5rem] aspect-square bg-ui-light checked:bg-ui-dark rounded-full motion-safe:transition-colors motion-safe:ease-in-out"
      type="checkbox"
      {id}
      bind:checked
    />
    <svg
      aria-hidden="true"
      class:opacity-0={!checked}
      class="row-start-1 row-end-1 col-start-1 col-end-1  motion-safe:transition-opacity motion-safe:ease-in-out pointer-events-none"
      width="15"
      height="11"
      viewBox="0 0 15 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.5L4.95263 9.45263L13.4053 1"
        stroke="#eff1fa"
        stroke-width="2"
      />
    </svg>
  </div>

</div>
