<script>
    export let data = []
</script>

<div class="flex flex-col px-2 py-1.5">
    <p class="text-md text-white font-semibold">Browse by category</p>
    {#each Object.entries(data) as [category]}
        <div class="py-2">
            <a href="#{category}" class="flex text-sm text-indigo-600 bg-slate-900/70 mx-1 truncate px-2 py-0.5 hover:bg-indigo-600/20 transition ease-in-out"> 
                <img src="./cat_icons/{category.toLocaleLowerCase()}.svg" alt="{category}" class="w-4 mr-1.5">
                {category}
            </a>
        </div>  
    {/each}
</div>