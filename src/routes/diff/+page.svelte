<script>
    import { slide, draw, fly } from 'svelte/transition'
    import Popupbattle from '$lib/components/Popupbattle.svelte'
    import CategoryMenu from '$lib/components/CategoryMenu.svelte'
    import ProfileHeader from '$lib/components/ProfileHeader.svelte'
    import Accordion from '$lib/components/Accordion.svelte'
    import { slugify } from '$lib/utils/Slugify.js';
    import DiffStats from '$lib/components/DiffStats.svelte';

    export let data

    let result = data.result
    let profile_user_1 = data.profile_user_1
    let profile_user_2 = data.profile_user_2
    let show_bar = true
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
                <div class="sticky top-10"  transition:slide>
                    <a href="/" class="flex ">
                        <svg class="w-5" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                        </svg>
                        Back to Home
                    </a>
                    <CategoryMenu data={result} />
                    <img src="https://canary.discord.com/api/guilds/700478419527270430/widget.png" alt="Root-me.org Discord">
                </div>
            </div>
        {/if}
        <div class="flex flex-col min-h-screen w-full">
            <div class="flex flex-col items-center justify-between sm:flex-row mb-10 border-b border-indigo-600/20 sm:px-10 bg-slate-900/50"> 
                <a href="/" class="flex justify-center items-center order-first" title="Back to home">
                    <img src="./logo.png" alt="Back to home" class="w-36 sm:w-48 py-2 hover:opacity-60 transition ease-in-out">
                </a>

                <div class="flex flex-col sm:flex-row">
                    <ProfileHeader {profile_user_1} {profile_user_2}/>
                    <ProfileHeader  profile_user_1={profile_user_2}  profile_user_2={profile_user_1}/>
                </div>

                <div class="flex hidden sm:block ">
                    <DiffStats user_1={profile_user_1} user_2={profile_user_2}/>    

                    <button on:click={()=>{ show_bar= !show_bar}} class="group-hover">
                        <svg transition:draw class="w-10 h-10 text-white hover:bg-indigo-600 rounded-md" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {#each Object.entries(result) as [category]}
                <div class="px-5 sm:px-20 pt-20" id="{category}" transition:fly>
                    <Accordion open>
                        <p slot="head" class="text-4xl text-white font-extrabold ">{category}</p>
                        <div slot="details"  class="grid grid-cols-1 sm:grid-cols-4 gap-4 py-5">
                            {#each result[category] as item, i}
                                <div class="flex flex-col justify-between p-5 bg-slate-950/20 rounded-md">
                            
                                    <p class="text-white font-bold">{item.name}</p>
                
                                    <div class="flex flex-col items-cente my-2">
                                        {#if item.user_1_flagged}
                                            <div class="flex items-center  text-sm text-green-500">
                                                <div class="w-2.5 h-2.5 rounded-full bg-green-600 mr-1"></div>
                                                {profile_user_1.nickname} Flagged
                                            </div>
                                        {:else}
                                            <div class="flex items-center  text-sm text-red-500">
                                                <div class="w-2.5 h-2.5 rounded-full bg-red-600 mr-1"></div>
                                                {profile_user_1.nickname} Not yet
                                            </div>
                                        {/if}
                
                                        {#if item.user_2_flagged}
                                            <div class="flex items-center text-sm text-green-500">
                                                <div class="w-2.5 h-2.5 rounded-full bg-green-600 mr-1"></div>
                                                {profile_user_2.nickname} Flagged
                                            </div>
                                        {:else}
                                            <div class="flex items-center text-sm text-red-500">
                                                <div class="w-2.5 h-2.5 rounded-full bg-red-600 mr-1"></div>
                                                {profile_user_2.nickname} Not yet
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
                                        <a href="https://www.root-me.org/en/Challenges/{category}/{slugify(item.name)}" target="_blank" class="flex text-indigo-600">
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