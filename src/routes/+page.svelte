<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../components/Card.svelte';
	import Search from '../components/Search.svelte';

	let token: any = {};
	let data: any = [];

    //get client credential
	onMount(async () => {
		token = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `grant_type=client_credentials&client_id=${
				import.meta.env.VITE_CLIENT_ID
			}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`
		}).then((res) => res.json());
	});

    
</script>

<main class="flex justify-center flex-col">
	<Search bind:data {token} />
	<div class="flex flex-wrap flex-row justify-center gap-10">
		{#each data as e}
			<Card name={e.name} image={e.album.images[0].url} artist={e.artists[0].name} />
		{/each}
	</div>
</main>
