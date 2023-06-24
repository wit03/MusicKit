<script lang="ts">
	import { nanoid } from 'nanoid';

	const handleLogin = () => {
		var state = nanoid(16);
		var scope = 'user-modify-playback-state user-read-playback-state';
		localStorage.setItem('spotify_auth_state', state);

		window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
			import.meta.env.VITE_CLIENT_ID
		}&scope=${scope}&redirect_uri=https://musickit.vercel.app/player&state=${state}`;
	};
</script>

<main class="flex justify-center items-center h-screen">
	<button class="btn btn-primary" on:click={() => handleLogin()}>Login with spotify</button>
</main>
