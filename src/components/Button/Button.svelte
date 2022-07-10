<script lang="ts">
  export let text: string;
  export let disabled: boolean;
</script>

<button class="bg-ui-red rounded-pill text-white px-12 py-4" on:click {disabled}
  >{text}</button
>
