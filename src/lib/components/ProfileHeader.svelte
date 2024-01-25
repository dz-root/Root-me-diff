<script>

export let profile_user_1 = {}
export let profile_user_2 = {}
</script>

<div class="profile flex flex-col sm:border-x border-indigo-600/20 sm:px-5 py-3">

    <div class="flex items-center">
        <a href="https://www.root-me.org/{profile_user_1.nickname}" target="_blank" class="flex flex-col items-center">
            {#if parseInt(profile_user_1.stat.score) > parseInt(profile_user_2.stat.score) }
                <img src="./crown.png" alt="" class="w-8 -mt-4 -mb-4 z-90">
                <img src="https://root-me.org/{profile_user_1.logo}" alt="{profile_user_1.nickname}" title="{profile_user_1.nickname}" class="w-16 h-16 rounded-full border-4 border-yellow-500 shadow-lg shadow-yellow-500">
            {:else}
                <img src="https://root-me.org/{profile_user_1.logo}" alt="{profile_user_1.nickname}" title="{profile_user_1.nickname}" class="w-16 h-16 rounded-full border-4 border-indigo-900 shadow-lg shadow-indigo-900">
            {/if}
        </a>
        <div class="flex flex-col ml-2">
            <div class="flex items-center sm:mr-5">
                <img src="{profile_user_1.rank_icon}" alt="" class="w-6 h-6 mr-2">
                <a href="https://www.root-me.org/{profile_user_1.nickname}" target="_blank" class="text-xl font-bold text-white">{profile_user_1.nickname}</a>
            </div>
           <div class="flex">
            <div class="flex items-center px-2">
                <img src="https://www.root-me.org/squelettes/img/valid.svg" alt="Score" class="w-8 mr-2">
                <div class="flex flex-col">
                    <p class="font-bold text-yellow-500">{profile_user_1.stat.score}</p>
                    <span class="text-xs italic text-yellow-300">Score</span>
                </div>
            </div>
            <div class="flex items-center px-2">
                <img src="https://www.root-me.org/squelettes/img/classement.svg" alt="Rank" class="w-8 mr-2">
                <div class="flex flex-col">
                    <p class="font-bold text-yellow-500">{profile_user_1.stat.rank}</p>
                    <span class="text-xs italic text-yellow-300">Rank</span>
                </div>
            </div>
            <div class="flex lg:hidden xl:flex items-center px-2">
                <img src=" https://www.root-me.org/IMG/logo/rubon5.svg" alt="challanges" class="w-8 mr-2">
                <div class="flex flex-col">
                    <p class="font-bold text-yellow-500">{profile_user_1.stat.chall_done}</p>
                    <span class="text-xs italic text-yellow-300">Challenges</span>
                </div>
            </div>
           </div>
        </div>
    </div>

</div>