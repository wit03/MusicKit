<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { io } from '$lib/webSocketConnection';

	let loggedIn = false;

	let tokenTimeout = 0;
	let refreshToken = '';
	let accessToken = '';

	var code = $page.url.searchParams.get('code') || null;
	var state = $page.url.searchParams.get('state') || null;

	onMount(() => {
		if (state === null) {
			console.log('state is null');
		} else {
			fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization:
						'Basic ' +
						btoa(import.meta.env.VITE_CLIENT_ID + ':' + import.meta.env.VITE_CLIENT_SECRET)
				},
				body: new URLSearchParams({
					code: code!,
					redirect_uri: 'https://musickit.vercel.app/player',
					grant_type: 'authorization_code'
				})
			})
				.then((res) => res.json())
				.then((res) => {
					loggedIn = true;
					tokenTimeout = res.expires_in;
					refreshToken = res.refresh_token;
					accessToken = res.access_token;

					io.emit('token', res);
				})
				.catch((err) => {
					console.log(err);
 				});
		}
	});

	//refresh token
	// setTimeout(() => {
	const click = () => {
		fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization:
					'Basic ' +
					btoa(import.meta.env.VITE_CLIENT_ID + ':' + import.meta.env.VITE_CLIENT_SECRET)
			},
			body: new URLSearchParams({
					grant_type: 'refresh_token',
					refresh_token: refreshToken
			})
		}).then((res) => res.json()).then((res)=>{
			// accessToken = res.access_token;
			// tokenTimeout = res.expires_in;
			// refreshToken = res.refresh_token;

			// io.emit('token', res);
			console.log(res)
		})
	}
		
	// }, tokenTimeout*1000);


	//TODO: refresh token every 1 hour
	//TODO: manually trigger refresh token
</script>

<main class="flex justify-center items-center h-screen flex-col">
	{#if !loggedIn}
		<p>Go to /player/login to login first</p>
	{:else}
		<p>Logged in</p>
		<p>Token will be valid until:</p>
		<button on:click={click}>Refresh token</button>
	{/if}
</main>
