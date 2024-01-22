<script>
    export let groupedByCategory = []
</script>

<div class="flex bg-gray-900 px-2 py-1.5 overflow-x-auto border border-indigo-600/30 rounded-t-lg shadow-xl shadow-indigo-600/10 sticky top-0">
    {#each Object.entries(groupedByCategory) as [category]}
        <div class="py-2">
            <a href="#{category}" class="flex text-sm text-indigo-600 bg-slate-900/70 border border-indigo-600/30 rounded-full mx-1 truncate px-2 py-0.5 hover:bg-indigo-600/20 transition ease-in-out"> 
                <img src="./cat_icons/{category.toLocaleLowerCase()}.svg" alt="{category}" class="w-4 mr-1.5">
                {category}
            </a>
        </div>  
    {/each}
</div>