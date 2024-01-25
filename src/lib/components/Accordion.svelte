<script>
    export let open = false;
    import { slide } from 'svelte/transition';
    $: icon = `
        <svg data-slot="icon" class="text-white w-5" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"></path>
        </svg>
    `

    const handleClick = () => {
        open = !open
        open ? icon= `
        <svg data-slot="icon" class="text-white w-5" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"></path>
        </svg>`: icon= `<svg class="text-white w-5" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>`
    }
  </script>
  
    <div class="w-full">
        <div class="w-full flex items-center justify-between cursor-pointer" transition:slide>
            <div class="" on:click={handleClick}>
                <slot name="head"></slot>	
            </div>
            
            <button on:click={handleClick} >
                {@html icon}
            </button>
        </div>
        <slot name="sub-head"></slot>	
      
      {#if open}
      <div class="details" transition:slide>
          <slot name="details">
          </slot>
      </div>
      {/if}
  </div>
