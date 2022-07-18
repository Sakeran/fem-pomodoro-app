<script lang="ts">
  import Button from "../Button/Button.svelte";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close", undefined);
  }
</script>

<div class=" bg-white text-ui-dark rounded-md">
  <div
    class="pl-6 pr-2 pt-6 pb-7 sm:pl-10 sm:pr-6 sm:pb-8 flex justify-between items-center border-b border-gray"
  >
    <h2 class="text-5 sm:text-7 font-bold text-ui-dark">Help</h2>
    <button
      class="p-4 text-background/50 hover:text-background/100 focus:text-background/100"
      on:click={close}
    >
      <span class="sr-only">Close Settings</span>
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.3639 2.0502L11.9497 0.635986L6.99995 5.58573L2.0502 0.635986L0.635986 2.0502L5.58573 6.99995L0.635986 11.9497L2.0502 13.3639L6.99995 8.41416L11.9497 13.3639L13.3639 11.9497L8.41416 6.99995L13.3639 2.0502Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </button>
  </div>

  <div class="px-6 sm:px-10 mt-6 sm:mt-8 ">
    <!-- Content -->
    <div class="space-y-4 max-h-[20em] overflow-scroll">
      <p>TODO: Add Help Text</p>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        harum dignissimos nostrum odit, voluptatem officiis laboriosam odio
        dolorum accusamus animi a, rerum, placeat quod. Quod ipsa pariatur unde
        voluptatum commodi?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        harum dignissimos nostrum odit, voluptatem officiis laboriosam odio
        dolorum accusamus animi a, rerum, placeat quod. Quod ipsa pariatur unde
        voluptatum commodi?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        harum dignissimos nostrum odit, voluptatem officiis laboriosam odio
        dolorum accusamus animi a, rerum, placeat quod. Quod ipsa pariatur unde
        voluptatum commodi?
      </p>
    </div>

    <div class="relative translate-y-1/2 flex justify-center mt-1">
      <Button text="Close" on:click={close} />
    </div>
  </div>
</div>
