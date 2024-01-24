<script>
	import { page } from '$app/stores'
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<code class="text-xl">{$page.status}: {$page.error.message}</code>

	{#if $page.status === 500}
		<code class="bg-slate-900 p-2 rounded-md">It seems that the root-me user you are looking for doesn't existe, please check the usernames</code>
	{/if}
	
	<a href="/" class="px-5 py-2 text-indigo-800 hover:text-indigo-600">Back to Homepage</a>
</div>
