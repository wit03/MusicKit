<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { io } from '../lib/webSocketConnection';

	import Card from '../components/Card.svelte';
	import Search from '../components/Search.svelte';

	let token: any = {};
	let data: any = [];

	let added = false;

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

	const queue = (data: any) => {
		io.emit('track', data);
		added = true;
		setTimeout(() => {
			added = false;
		}, 3000);
	};
</script>

<main class="flex justify-center items-center flex-col">
	<Search bind:data {token} />
	{#if added}
	<div class="alert alert-success fixed w-[90vw] bottom-[40px] flex justify-center z-[999]" in:fade out:fade>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>Added to the queue!</span>
	</div>
	{/if}
	
	<div class="flex flex-wrap flex-row justify-center gap-10">
		{#each data as e}
			<Card
				name={e.name}
				image={e.album.images[0].url}
				artist={e.artists[0].name}
				link={e.uri}
				enqueue={queue}
			/>
		{/each}
	</div>
</main>
