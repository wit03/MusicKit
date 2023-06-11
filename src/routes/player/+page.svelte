<script lang="ts">
	let loggedIn = false;
	let tokenTimeout = 0;
</script>

<main class="flex justify-center items-center h-screen">
	{#if !loggedIn}
		<button class="btn btn-primary">Login with spotify</button>
	{/if}
	{#if loggedIn}
		<h1>Logged in</h1>
		<p>
			The access token for playback will be expired by a certain time, we will automatically refresh
			the token every 55 minutes.
		</p>
		<p>token will be valid for the next: {tokenTimeout} seconds</p>

		<button class="btn btn-primary">Refresh Token</button>
	{/if}
</main>
