<script>
    import { slide } from 'svelte/transition'
    import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
    let show = false

    export let profile_user_1 ={}, profile_user_2={}

    const date = new Date().toJSON().slice(0, 10);
    
    function SavePhoto(){
        let node = document.getElementById('my-node');

        toJpeg(node, { cacheBust: true, }).then(function (dataUrl) {
            var link = document.createElement('a');
            link.download =`${profile_user_1.nickname}_x_${profile_user_2.nickname}.jpeg`;
            link.href = dataUrl;
            link.click();
        });
    }


</script>

<button on:click={()=> show = !show} class="group-hover">
        <svg class="p-1.5 w-10 h-10 text-white shadow-lg hover:shadow-indigo-600 rounded-md" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
        </svg>
</button>
{#if show}
<div class="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-black/90" transition:slide>
    <button  class="fixed top-10 right-10" on:click={()=> show = !show} >X</button>
    <div id="my-node" class="relative w-[600px] h-[600px] bg-gradient-to-bl from-slate-900 via-gray-950 to-slate-900 flex items-center justify-center rounded-lg">
        <img src="./logo.png" alt="" class="absolute top-8 left-6 w-24">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <img src="./luffy.png" alt="" class="w-32 z-10">
                <div class="flex flex-col items-center justify-center px-10 py-5 -mt-3 bg-gradient-to-br from-slate-900/50 via-gray-950/50 to-slate-900/50 border border-yellow-500/30 shadow-inner shadow-orange-600  rounded-xl">
                    {#if parseInt(profile_user_1.stat.score) > parseInt(profile_user_2.stat.score) }
                        <p class="text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">{profile_user_1.nickname}</p>
                        <p class="text-white text-xs text-center italic font-bold uppercase mt-1">
                            Won the DIFF battel against <span class="text-yellow-400 bg-orange-900 px-2 py-0.5 rounded-full mt-5">{ profile_user_2.nickname}</span>
                        </p>
                    {:else}
                        <p class="text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">{profile_user_2.nickname}</p>
                        <p class="text-white text-xs text-center italic font-bold uppercase mt-1">
                            Won the DIFF battel against <span class="text-yellow-400 bg-orange-900 px-2 py-0.5 rounded-full mt-5">{profile_user_1.nickname}</span>
                        </p>
                    {/if}
        
                    <ul class="w-full text-white text-sm mt-5">
                        <p class="uppercase font-bold">Score</p>
                        <li class="flex justify-between">
                            <span>{profile_user_1.nickname}</span>{profile_user_1.stat.score}
                        </li>
                        <li class="flex justify-between">
                            <span>{profile_user_2.nickname}</span> {profile_user_2.stat.score}
                        </li>
                        <li class="flex justify-between items-center mt-2">
                            {#if parseInt(profile_user_1.stat.score) > parseInt(profile_user_2.stat.score) }
                                <span class="text-lime-500 bg-green-900/50 px-2 py-0.5 rounded-full">{profile_user_1.nickname} has:  +{parseInt(profile_user_1.stat.score) -parseInt(profile_user_2.stat.score)} Pt</span>
                            {:else}
                                <span class="text-lime-500 bg-green-900/50 px-2 py-0.5 rounded-full">{profile_user_2.nickname} has:  +{parseInt(profile_user_2.stat.score) -parseInt(profile_user_1.stat.score)} Pt</span>
                            {/if}
                        </li>
                    </ul>
                    <ul class="w-full text-white text-sm mt-5">
                        <p class="uppercase font-bold">Challenge</p>
                        <li class="flex justify-between">
                            <span>{profile_user_1.nickname}</span>{profile_user_1.stat.chall_done}
                        </li>
                        <li class="flex justify-between">
                            <span>{profile_user_2.nickname}</span> {profile_user_2.stat.chall_done}
                        </li>
                        <li class="flex justify-between items-center mt-2">
                            {#if parseInt(profile_user_1.stat.chall_done) > parseInt(profile_user_2.stat.chall_done) }
                                <span class="text-lime-500 bg-green-900/50 px-2 py-0.5 rounded-full">{profile_user_1.nickname} has: +{parseInt(profile_user_1.stat.chall_done) -parseInt(profile_user_2.stat.chall_done)} Challenges</span>
                            {:else}
                                <span class="text-lime-500 bg-green-900/50 px-2 py-0.5 rounded-full">{profile_user_2.nickname} has: +{parseInt(profile_user_2.stat.chall_done) -parseInt(profile_user_1.stat.chall_done)} Challenges</span>
                            {/if}
                        </li>
                    </ul>
                </div>
                <p class="absolute bottom-5 left-8 flex items-center text-gray-700 mt-5">
                    DIFF Date: {date}
                </p>
            </div>
        </div>
    </div>
    <button on:click={()=>{SavePhoto()}} class="flex items-center text-white font-semibold bg-indigo-600 px-5 py-2 rounded-md -mt-14 z-10 hover:bg-indigo-800 transition ease-in-out">
        <svg class="w-6 mr-2" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
        </svg>
        Save image
    </button>
</div>
{/if}