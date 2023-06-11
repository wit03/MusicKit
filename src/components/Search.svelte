<script lang="ts">
	export let token: any = {};
	export let data: any = [];
	let search: string = '';

	async function searchSong(query: string) {
		const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`, {
			headers: {
				Authorization: `Bearer ${token.access_token}`
			}
		}).then((res) => res.json());

		data = res.tracks.items.sort((a: any, b: any) => b.popularity - a.popularity);
	}
</script>

<form on:submit|preventDefault={() => search} class="form-control">
	<div class="input-group flex justify-center items-center my-10">
		<input
			type="text"
			placeholder="your favorite song..."
			class="input input-bordered w-full max-w-xs"
			bind:value={search}
		/>
		<button class="btn btn-square" on:click={() => searchSong(search)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</button>
	</div>
</form>
