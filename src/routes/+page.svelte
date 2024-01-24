<script>
    import { goto } from "$app/navigation"

	let user_1 = ''
	let user_2 = ''
	let loader = false

	function getDiff(){
		if(user_1 !== '' && user_2 !== '' && user_1 !== user_2){
			loader = true
			goto(`./diff?user_1=${user_1}&user_2=${user_2}`)
		}else{
			loader = false
			alert('Need 2 valid Root-me players')
		}
	}

</script>

<svelte:head>
    <title>Root-me DIFF</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Compare Root-me users. GET DIFF between two Root-me users">
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Root-me DIFF" />
	<meta property="og:image" content="https://root-me-diff.vercel.app/og_cover/og-image.png"/>
	<meta property="og:description" content="Compare Root-me users. GET DIFF between two Root-me users" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Compare Root-me users. GET DIFF between two Root-me users" />
	<meta property="twitter:description" content="Compare Root-me users. GET DIFF between two Root-me users" />
	<meta property="twitter:image" content="https://root-me-diff.vercel.app/og_cover/og-image.png" />
</svelte:head>


<div class:hidden={loader} class="flex flex-col items-center justify-center w-full">

	<div class="flex flex-col items-center ">
		<div class="flex flex-col items-center justify-center space-y-4 p-5 border border-indigo-600/30 rounded-lg shadow-xl shadow-indigo-600/20 bg-indigo-900/5">
			<img src="./logo.png" alt="Root-me DIFF">
			<input type="text" name="user_1" bind:value={user_1} class="w-full px-5 py-1.5 bg-slate-900 text-indigo-600 rounded-md border border-indigo-600/30 focus:outline-none focus:ring-0 focus:border-indigo-600 placeholder:text-indigo-900" placeholder="User 1" required>
			<input type="text" name="user_2" bind:value={user_2} class="w-full px-5 py-1.5 bg-slate-900 text-indigo-600 rounded-md border border-indigo-600/30 focus:outline-none focus:ring-0 focus:border-indigo-600 placeholder:text-indigo-900" on:keydown={(e)=> e.key ==='Enter' ? getDiff() : ''} placeholder="User 2" required>
			<button type="submit" class="w-full font-bold bg-gradient-to-tl shadow-md from-indigo-900 to-indigo-600 text-white px-5 py-1.5 rounded-full hover:bg-gradient-to-tr hover:shadow-indigo-600/50 transition ease-in-out" on:click={()=>getDiff()}> >_ GET Diff</button>
		</div>
	</div>

</div>


<div class:hidden={!loader} class="w-full h-full flex flex-col items-center justify-center">
	<img src="./logo.png" alt="loader" class="animate-pulse">
</div>
