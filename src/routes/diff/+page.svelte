<script>
    import { goto } from '$app/navigation'
    import cheerio from 'cheerio'
    import Popupbattle from '$lib/components/Popupbattle.svelte'
    import OrderByCategory from '$lib/utils/OrderByCategory.js'
    import CategoryMenu from '$lib/components/CategoryMenu.svelte'
    import {RankIncon} from '$lib/utils/UserRankIcon.js'

    export let data

    const html_1 =  data.content_user_1, html_2 =  data.content_user_2
    
    $: challenges = []
    $: challenges_2 = []

    $: groupedByCategory  = []
    $: groupedByCategory_2 = []

    $: profile_user_1 = {
        logo : '',
        nickname : '',
        stat: { rank: null, score:null, chall_done:null },
        rank_icon : '',
        rank_title : '',
    }

    $: profile_user_2 = {
        logo : '',
        nickname : '',
        stat: { rank: null, score:null, chall_done:null },
        rank_icon : '',
        rank_title : '',
    }

    async function parser(){
        const ch_1 = cheerio.load(html_1), ch_2 = cheerio.load(html_2)
        const title_l = ch_1("title"), title_2 = ch_2("title")

        if( title_l.text().trim().substring(0,10) !== "Erreur 404" ){
            const links_1 = ch_1("a.vert, a.rouge");
            const logo = ch_1(".logo_auteur");
            const stats = ch_1("h3");
            const rank_1 = stats.eq(3).text().trim().split(" ").pop();
            const score_1 = stats.eq(4).text().trim().split(" ").pop();
            const chall_done = stats.eq(5).text().trim().split(" ").pop();

            profile_user_1.stat.rank = rank_1;
            profile_user_1.stat.score = score_1;
            profile_user_1.stat.chall_done = chall_done;
            profile_user_1.logo = (logo[0].attribs.src).split('?')[0];
            profile_user_1.nickname = logo[0].attribs.alt;
            profile_user_1.rank_icon = RankIncon(score_1);
            

            links_1.each((i, link) => {
                const category = link.attribs.href.split("/")[2];
                const name = cheerio(link).text().split("\xa0")[1];
                const points = link.attribs.title.split(" ")[0];
                const userDone = link.attribs.class === ' vert';
        
                challenges.push({ category, name, points, userDone });
            });
        
            groupedByCategory = OrderByCategory(challenges)
            
        }else{
            goto( '/');
        }

        if( title_2.text().trim().substring(0,10) !== "Erreur 404" ){
            const links_2 = ch_2("a.vert, a.rouge");
            const logo_2 = ch_2(".logo_auteur");
            const stats_2 = ch_2("h3");
            const rank_2 = stats_2.eq(3).text().trim().split(" ").pop();
            const score_2 = stats_2.eq(4).text().trim().split(" ").pop();
            const chall_done_2 = stats_2.eq(5).text().trim().split(" ").pop();

            profile_user_2.stat.rank = rank_2;
            profile_user_2.stat.score = score_2;
            profile_user_2.stat.chall_done = chall_done_2;
            profile_user_2.logo = (logo_2[0].attribs.src).split('?')[0];
            profile_user_2.nickname = logo_2[0].attribs.alt;
            profile_user_2.rank_icon = RankIncon(score_2);
            
            links_2.each((i, link) => {
                const category = link.attribs.href.split("/")[2];
                const name = cheerio(link).text().split("\xa0")[1];
                const points = link.attribs.title.split(" ")[0];
                const userDone = link.attribs.class === ' vert';
        
                challenges_2.push({ category, name, points, userDone });
            });

            groupedByCategory_2 = OrderByCategory(challenges_2)

        } else {
            goto( '/');
        }
    }
</script>

{#await parser()}
    <div class="flex items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            <img src="./logo.png" alt="loader" class="animate-pulse">
        </div>
    </div>
{:then data}

    <Popupbattle profile_user_1="{profile_user_1}" profile_user_2="{profile_user_2}"/>
    <div class="flex flex-col sm:flex-row justify-between items-center my-10">
            <div class="profile flex flex-col w-full sm:w-auto">
                <div class="flex items-center sm:justify-end sm:mr-5 mb-2 ">
                    <img src="{profile_user_1.rank_icon}" alt="" class="w-6 h-6 mr-2 ">
                    <a href="https://www.root-me.org/{profile_user_1.nickname}" target="_blank" class="text-xl font-bold text-indigo-600 sm:text-right ">{profile_user_1.nickname}</a>
                </div>
                <div class="flex w-full sm:w-auto sm:flex-row-reverse bg-gradient-to-l from-indigo-800 top-indigo-900 shadow-md shadow-indigo-700/40 border border-indigo-600/60 rounded-full">
                        <a href="https://www.root-me.org/{profile_user_1.nickname}" target="_blank" class="flex flex-col items-center">
                            {#if parseInt(profile_user_1.stat.score) > parseInt(profile_user_2.stat.score) }
                                <img src="./crown.png" alt="" class="w-8 -mt-4 -mb-4 z-90">
                                <img src="https://root-me.org/{profile_user_1.logo}" alt="{profile_user_1.nickname}" title="{profile_user_1.nickname}" class="w-16 h-16 rounded-full border-4 border-yellow-500 shadow-lg shadow-yellow-500">
                            {:else}
                                <img src="https://root-me.org/{profile_user_1.logo}" alt="{profile_user_1.nickname}" title="{profile_user_1.nickname}" class="w-16 h-16 rounded-full border-4 border-indigo-500 shadow-lg shadow-indigo-500">
                            {/if}
                        </a>
                        <div class="flex items-center px-5">
                            <img src="https://www.root-me.org/squelettes/img/valid.svg" alt="Rank" class="w-10 mr-2">
                            <div class="flex flex-col">
                                <p class="font-bold text-yellow-500">{profile_user_1.stat.score}</p>
                                <span class="text-xs italic text-yellow-300">Score</span>
                            </div>
                        </div>

                        <div class="flex items-center px-5">
                            <img src="https://www.root-me.org/squelettes/img/classement.svg" alt="Rank" class="w-10 mr-2">
                            <div class="flex flex-col">
                                <p class="font-bold text-yellow-500">{profile_user_1.stat.rank}</p>
                                <span class="text-xs italic text-yellow-300">Rank</span>
                            </div>
                        </div>

                        <div class="hidden xl:flex items-center px-5">
                            <img src=" https://www.root-me.org/IMG/logo/rubon5.svg" alt="Rank" class="w-10 mr-2">
                            <div class="flex flex-col">
                                <p class="font-bold text-yellow-500">{profile_user_1.stat.chall_done}</p>
                                <span class="text-xs italic text-yellow-300">Challenges</span>
                            </div>
                        </div>
                </div>
            </div>

            <div class="flex items-center justify-between order-first sm:order-none">
                <a href="/" class="logo" title="Back to home"><img src="./logo.png" alt="Back to home" class="w-36 sm:w-48 py-2 hover:opacity-60 transition ease-in-out"></a>
            </div>

            <div class="profile flex flex-col w-full sm:w-auto">
                <div class="flex items-center mt-8 sm:mt-0 sm:ml-5 mb-2 ">
                    <a href="https://www.root-me.org/{profile_user_2.nickname}" target="_blank" class="text-xl font-bold text-indigo-600">{profile_user_2.nickname}</a>
                    <img src="{profile_user_2.rank_icon}" alt="" class="w-6 h-6 mr-2 sm:ml-2 order-first sm:order-last">
                </div>
                <div class="flex w-full sm:w-auto bg-gradient-to-r from-indigo-800 top-indigo-900 shadow-md shadow-indigo-700/40 border border-indigo-600/60 rounded-full">
                        <a href="https://www.root-me.org/{profile_user_2.nickname}" target="_blank" class="flex flex-col items-center">
                            {#if parseInt(profile_user_2.stat.score) > parseInt(profile_user_1.stat.score) }
                                <img src="./crown.png" alt="" class="w-8 -mt-4 -mb-4 z-90">
                                <img src="https://root-me.org/{profile_user_2.logo}" alt="{profile_user_2.nickname}" title="{profile_user_2.nickname}" class="w-16 h-16 rounded-full border-4 border-yellow-500 shadow-lg shadow-yellow-500">
                            {:else}
                                <img src="https://root-me.org/{profile_user_2.logo}" alt="{profile_user_2.nickname}" title="{profile_user_2.nickname}" class="w-16 h-16 rounded-full border-4 border-indigo-500 shadow-lg shadow-indigo-500">
                            {/if}                        </a>
                        <div class="flex items-center px-5">
                            <img src="https://www.root-me.org/squelettes/img/valid.svg" alt="Rank" class="w-10 mr-2">
                            <div class="flex flex-col">
                                <p class="font-bold text-yellow-500">{profile_user_2.stat.score}</p>
                                <span class="text-xs italic text-yellow-300">Score</span>
                            </div>
                        </div>

                        <div class="flex items-center px-5 ">
                            <img src="https://www.root-me.org/squelettes/img/classement.svg" alt="Rank" class="w-10 mr-2">
                            <div class="flex flex-col">
                                <p class="font-bold text-yellow-500">{profile_user_2.stat.rank}</p>
                                <span class="text-xs italic text-yellow-300">Rank</span>
                            </div>
                        </div>
                        <div class="hidden xl:flex items-center px-5">
                            <img src=" https://www.root-me.org/IMG/logo/rubon5.svg" alt="Rank" class="w-10 mr-2">
                            <div class="flex flex-col">
                                <p class="font-bold text-yellow-500">{profile_user_2.stat.chall_done}</p>
                                <span class="text-xs italic text-yellow-300">Challenges</span>
                            </div>
                        </div>
                </div>
            </div>
    </div>
    
    <CategoryMenu groupedByCategory={groupedByCategory} />

    <div class="flex w-full flex-row-reverse lg:flex-row border border-indigo-600/40 overflow-x-auto p-5 sm:p-10 bg-slate-900/50" >
            <div class="flex flex-col flex-1 ">
                {#each Object.entries(groupedByCategory) as [category]}
                    <div id="{category}" class="py-5">
                        {#each groupedByCategory[category] as item, i}
                            <div class="flex items-center flex-row-reverse justify-end lg:flex-row lg:justify-between border-b border-indigo-600/20 py-2 { i%2 ? 'bg-indigo-900/10' : ''}">
                                <p class="flex items-center text-center text-xs text-gray-200 sm:text-base truncate sm:order-1">
                                    <span class="bg-indigo-600/10 text-sm text-indigo-800 mr-1 rounded-full px-1">{category}</span>
                                    <span class="flex text-yellow-500 text-xs font-bold mr-1 px-1.5 bg-orange-500/50 rounded-sm">
                                        {item.points} pts
                                    </span>
                                    {item.name}
                                </p>
                                
                                {#if item.userDone}
                                    <span class="flex items-center truncate bg-green-600/30 text-green-600 px-2 py-1 rounded-full text-xs font-bold mr-2 order-1 border border-green-800">
                                        Flagged
                                        <img src="https://root-me.org/{profile_user_1.logo}" alt="{profile_user_1.nickname}" title="{profile_user_1.nickname}" class="w-6 h-6 rounded-full border-2 border-green-500 ml-2">
                                    </span>
                                {:else}
                                    <span class="flex items-center truncate bg-red-600/30 text-red-600 px-2 py-1 rounded-full text-xs font-bold mr-2 order-1 border border-red-800">
                                        Not yet
                                        <img src="https://root-me.org/{profile_user_1.logo}" alt="{profile_user_1.nickname}" title="{profile_user_1.nickname}" class="w-6 h-6 rounded-full border-2 border-red-500 ml-2">
                                    </span>
                                {/if}
                            </div>  
                        {/each}
                    </div>
                {/each}
            </div>
            <div class="flex flex-col">
                {#each Object.entries(groupedByCategory_2) as [category]}
                    <div class="py-5">
                        {#each groupedByCategory_2[category] as item}
                        <div class="flex items-center justify-between min-w-[100px] border-b border-indigo-600/20 py-2">
                            {#if item.userDone}
                                <div class="flex items-center bg-green-600/30 text-green-600 px-2 py-1 rounded-full text-xs font-bold mr-2  border border-green-800">
                                    <img src="https://root-me.org/{profile_user_2.logo}" alt="{profile_user_2.nickname}" title="{profile_user_2.nickname}" class="w-6 h-6 rounded-full border-2 border-green-500 mr-1">
                                    <p class="flex">Flagged</p>
                                </div>
                            {:else}
                                <span class="flex items-center bg-red-600/30 text-red-600 px-2 py-1 rounded-full text-xs font-bold mr-2 border border-red-800">
                                    <img src="https://root-me.org/{profile_user_2.logo}" alt="{profile_user_2.nickname}" title="{profile_user_2.nickname}" class="w-6 h-6 rounded-full border-2 border-red-500 mr-1">
                                    Not yet
                                </span>
                            {/if}
                        </div>
                        {/each}
                    </div>
                {/each}
            </div>
    </div>
{/await}