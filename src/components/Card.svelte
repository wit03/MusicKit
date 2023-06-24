<script lang="ts">
	export let name: string;
	export let image: string;
	export let artist: string;
	export let link: string;
	export let enqueue: any;

	$: data = {
		name: name,
		image: image,
		artist: artist,
		link: link
	};
</script>

<div class="card w-72 bg-base-100 shadow-xl image-full">
	<figure>
		<img src={image} alt="Song" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{name}</h2>
		<p>{artist}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary btn-circle" on:click={enqueue(data)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>
</div>
