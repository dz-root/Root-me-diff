<script>
    import { fly, slide } from 'svelte/transition'
    import Popupbattle from '$lib/components/Popupbattle.svelte'
    import CategoryMenu from '$lib/components/CategoryMenu.svelte'
    import ProfileHeader from '$lib/components/ProfileHeader.svelte'
    import Accordion from '$lib/components/Accordion.svelte'
    import DiffStats from '$lib/components/DiffStats.svelte';
    import TakePhoto from '$lib/components/TakePhoto.svelte';

    export let data

    let result = data.result
    let profile_user_1 = data.profile_user_1
    let profile_user_2 = data.profile_user_2
    let show_bar = true
    let show_filter = false

    function Highlight(user){
        RemoveHighlight()
        show_filter = true
        let challs_done_1 = document.querySelectorAll(`[data-user-1="true"]`)
        let challs_done_2 = document.querySelectorAll(`[data-user-2="true"]`)
        
        if(user === 1){
            challs_done_1.forEach(e=>e.classList.add('border-lime-500'))
        }
        if(user === 2){
            challs_done_2.forEach(e=>e.classList.add('border-lime-500'))
        }
    }

    function RemoveHighlight(){
        show_filter = false
        let cards = document.querySelectorAll(`.card`)
        cards.forEach(e=>e.classList.remove('border-lime-500'))

    }
</script>

{#await result}
    <div class="flex items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            <img src="./logo.png" alt="loader" class="animate-pulse">
        </div>
    </div>
{:then data}

    <Popupbattle profile_user_1="{profile_user_1}" profile_user_2="{profile_user_2}" />
    
    <div class="flex w-full">
        {#if show_bar}      
            <div class="hidden sm:block sm:w-[400px] border-r border-indigo-600/20 bg-slate-900 p-10 " transition:fly>
                <div class="sticky top-10" transition:slide>
                    <a href="/" class="flex ">
                        <svg class="w-5" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                        </svg>
                        Back to Home
                    </a>
                    <CategoryMenu data={result} />
                    <a href="https://discord.com/invite/XejsBJdUch" target="_blank">
                        <img src="https://canary.discord.com/api/guilds/700478419527270430/widget.png" alt="Root-me.org Discord">
                    </a>
                </div>
            </div>
        {/if}
        <div class="flex flex-col min-h-screen w-full">
            <div class="flex flex-col items-center justify-between lg:flex-row mb-10 border-b border-indigo-600/20 2xl:px-10 bg-slate-900/50"> 
                <a href="/" class="flex justify-center items-center order-first" title="Back to home">
                    <img src="./logo.png" alt="Back to home" class="w-48 py-2 hover:opacity-60 transition ease-in-out">
                </a>

                <div class="flex flex-col lg:flex-row">
                    <ProfileHeader {profile_user_1} {profile_user_2}/>
                    <ProfileHeader  profile_user_1={profile_user_2}  profile_user_2={profile_user_1}/>
                </div>

                <div class="flex hidden sm:block ">
                    <DiffStats user_1={profile_user_1} user_2={profile_user_2}/>    
                    <TakePhoto {profile_user_1} {profile_user_2}></TakePhoto>

                    <button on:click={()=>{ show_bar= !show_bar}} class="group-hover">
                        {#if show_bar}
                            <svg transition:slide class="p-1.5 w-10 h-10 text-white shadow-lg hover:shadow-indigo-600 hover:text-indgo-600 rounded-md" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"></path>
                            </svg>
                        {:else}
                            <svg transition:slide class="w-10 h-10 text-white shadow-lg hover:shadow-indigo-600 hover:text-indgo-600 rounded-md" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"></path>
                            </svg>
                        {/if}
                    </button>
                </div>
            </div>

            {#each Object.entries(result) as [category]}
                <div class="px-5 2xl:px-20 pt-20" id="{category}" transition:fly>
                    <Accordion open>
                        <p slot="head" class="text-4xl text-white font-extrabold ">{category}</p>
                        
                        <div slot="sub-head" class="flex mt-2 text-sm">
                            <span class="bg-slate-900 text-indigo-500">{result[category].length} Challenges</span>
                            <button class="flex bg-green-950 text-lime-500 mx-1 hover:opacity-80 transition ease-in-out" on:click={()=>{Highlight(1)}}>
                                <img src="{profile_user_1.logo}" alt="" class="w-5">
                                <span class="mx-2">{profile_user_1.nickname} solved: {result[category].filter((obj) => obj.user_1_flagged === true).length}</span>
                            </button>
                            <button class="flex bg-green-950 text-lime-500 mx-1 hover:opacity-80 transition ease-in-out" on:click={()=>{Highlight(2)}}>
                                <img src="{profile_user_2.logo}" alt="" class="w-5">
                                <span class="mx-2">{profile_user_2.nickname} solved: {result[category].filter((obj) => obj.user_2_flagged === true).length}</span>
                            </button>
                            {#if show_filter}
                                <button on:click={()=>RemoveHighlight()}>
                                    <svg class="w-5" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"></path>
                                    </svg>
                                </button>
                            {/if}
                        </div>

                        <div slot="details" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 py-5">
                            {#each result[category] as item, i}
                                <div class="card flex flex-col justify-between p-5 bg-slate-950/20 border border-indigo-600/20 rounded-md" data-category="{category}" data-user-1="{item.user_1_flagged ? 'true': 'false'}" data-user-2="{item.user_2_flagged ? 'true': 'false'}">
                            
                                    <p class="text-white font-bold">{item.name}</p>
                
                                    <div class="flex flex-col items-cente my-2">
                                        {#if item.user_1_flagged}
                                            <div class="flex items-center  text-sm text-green-500">
                                                <div class="w-2.5 h-2.5 rounded-full bg-green-600 mr-1"></div>
                                                <span class="font-semibold mr-1">{profile_user_1.nickname}</span> Flagged
                                            </div>
                                        {:else}
                                            <div class="flex items-center  text-sm text-red-500">
                                                <div class="w-2.5 h-2.5 rounded-full bg-red-600 mr-1"></div>
                                                <span class="font-semibold mr-1">{profile_user_1.nickname}</span> Not yet
                                            </div>
                                        {/if}
                
                                        {#if item.user_2_flagged}
                                            <div class="flex items-center text-sm text-green-500">
                                                <div class="w-2.5 h-2.5 rounded-full bg-green-600 mr-1"></div>
                                                <span class="font-semibold mr-1">{profile_user_2.nickname} </span>Flagged
                                            </div>
                                        {:else}
                                            <div class="flex items-center text-sm text-red-500">
                                                <div class="w-2.5 h-2.5 rounded-full bg-red-600 mr-1"></div>
                                                <span class="font-semibold mr-1">{profile_user_2.nickname} </span> Not yet
                                            </div>
                                        {/if}
                                    </div>
                                    <div class="flex items-center justify-between text-xs text-gray-200 sm:text-base">
                                        <div class="flex items-center">
                                            <span class="flex text-xs bg-indigo-900/50 rounded-sm px-2">
                                                <img src="./cat_icons/{category.toLocaleLowerCase()}.svg" alt="{category}" class="w-4 mr-1">
                                                {category}
                                            </span>
                                            <span class="flex text-yellow-500 text-xs font-bold bg-orange-500/50 rounded-sm px-2">
                                                {item.points} pts
                                            </span>
                                        </div>
                                        <a href="{item.chall_link}" target="_blank" class="flex text-indigo-600 hover:text-indigo-500 transition ease-in-out">
                                            Try it 
                                            <svg class="w-4" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>  
                            {/each}
                        </div>
                    </Accordion>
                </div>
            {/each}

        </div>
    </div>

    
{/await}