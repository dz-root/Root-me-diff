<script>
    import { slide } from 'svelte/transition'
    export let user_1 ={}, user_2={}
    let show = false
</script>

<button on:click={()=> show = !show} class="group-hover">
    <svg class="p-1.5 w-10 h-10 text-white shadow-lg hover:shadow-indigo-600 rounded-md" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"></path>
    </svg>
</button>
{#if show}
<div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/90" transition:slide>
    <button  class="fixed top-10 right-10" on:click={()=> show = !show} >X</button>
    <div class="w-[800px] grid grid-cols-2 gap-4 -full items-center justify-center">
        <div class="flex flex-col">
            <img src="https://root-me.org/{user_1.logo}" alt="" class="h-36 object-cover rounded-t-md">
            <div class="relative min-h-[500px] bg-slate-900">
                <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center animate-pulse">
                    <svg class="w-6 h-6 mr-2 text-white shadow-lg hover:shadow-indigo-600 rounded-md" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"></path>
                    </svg>
                    Loading...
                </div>
                <img src="https://root-me-diff.vercel.app/rm-gh?nickname={user_1.nickname}&style=midnight" alt="" class="w-full absolute top-0 left-0 min-h-[500px] object-cover rounded-b-md">
            </div>
        </div>
        <div class="flex flex-col">
            <img src="https://root-me.org/{user_2.logo}" alt="" class="h-36 object-cover rounded-t-md">
            <div class="relative min-h-[500px] bg-slate-900">
                <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center animate-pulse">
                    <svg class="w-6 h-6 mr-2 text-white shadow-lg hover:shadow-indigo-600 rounded-md" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"></path>
                    </svg>
                    loading...
                </div>
                <img src="https://root-me-diff.vercel.app/rm-gh?nickname={user_2.nickname}&style=midnight" alt="" class="w-full absolute top-0 left-0 min-h-[500px] object-cover rounded-b-md">
            </div>
        </div>
    </div>
</div>
{/if}