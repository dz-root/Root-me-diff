<script>
    export let show = true
    export let profile_user_1 = {}
    export let profile_user_2 = {}
</script>


<div class:hidden={!show} class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-black/80 z-50">
    <div class="flex flex-col items-center w-[300px] bg-gradient-to-br from-slate-900 via-gray-950 to-slate-900 border-2 border-yellow-500 shadow-lg shadow-orange-400 rounded-lg ">        
        <div class="flex flex-col -mt-16">
            <img src="./crown.png" alt="" class="w-24 h-24 -mt-5">
            {#if parseInt(profile_user_1.stat.score) > parseInt(profile_user_2.stat.score)}
                <img src="https://root-me.org/{profile_user_1.logo}" alt="" class="bg-slate-900 w-24 h-24 border-4 border-yellow-500 rounded-full -mt-16 shadow-lg shadow-yellow-500">
            {:else}
                <img src="https://root-me.org/{profile_user_2.logo}" alt="" class="bg-slate-900 w-24 h-24 border-4 border-yellow-500 rounded-full -mt-16 shadow-lg shadow-yellow-500">
            {/if}
        </div>

        <div class="flex flex-col items-center justify-center mb-10 px-10">
            <div class="mt-3">
                {#if parseInt(profile_user_1.stat.score) > parseInt(profile_user_2.stat.score)}
                    <p class="text-2xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">{ profile_user_1.nickname}</p>
                {:else}
                    <p class="text-2xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">{ profile_user_2.nickname}</p>
                {/if}
            </div>

            <p class="text-white text-xs text-center italic font-bold uppercase mt-1">
                {#if profile_user_1.stat.score > profile_user_2.stat.score}
                    Won the DIFF battel against <span class=" text-yellow-400 bg-orange-900 px-2 py-0.5 rounded-full mt-5">{ profile_user_2.nickname}</span>
                {:else}
                    Won the DIFF battel against <span class="text-yellow-600">{profile_user_1.nickname}</span>
                {/if}
            </p>

            <div class="flex items-center justify-center p-1 mt-5 border border-yellow-600/50 rounded-full space-x-4">
                <img src="https://root-me.org/{profile_user_1.logo}" alt="" class="w-10 h-10 rounded-full border-2 border-yellow-600/50">
                <div class="text-yellow-500 font-bold italic">VS</div>
                <img src="https://root-me.org/{profile_user_2.logo}" alt="" class="w-10 h-10 rounded-full border-2 border-yellow-600/50">
            </div>
        </div>
        <img src="./luffy.png" alt="" class="w-24 -mb-2 -mt-5 z-20">
        <button class="w-full bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500 px-5 py-1 text-white rounded-b-md italic font-bold" on:click={()=>{show=!show}}>View Details</button>
    </div>
</div>