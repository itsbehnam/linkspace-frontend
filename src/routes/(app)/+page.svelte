<svelte:head>
	<title>LinkSpace • Home</title>
</svelte:head>
<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { session } from '$lib/stores/session';
	import Post from '$lib/components/Post.svelte';
	import Waiter from '$lib/Waiter.svelte';
	import {goto} from '$app/navigation';

	let posts = [];
	let loading = true;

	async function fetchPosts() {
		const token = get(session).token;
		const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (response.ok) {
			const data = await response.json();
			posts = data.data;
		} else {
			console.error('Failed to fetch posts:', response.statusText);
		}

		loading = false;
	}
	onMount(() => {
		const token = get(session).token;
		if (!token) {
			goto('login')
		} else {
			fetchPosts();
			loading = false
		}
	});

	async function handlePostCreated() {
		await fetchPosts();
	}
</script>

{#if loading}
	<Waiter message="Loading" />
{:else}
	<div class="container mx-auto px-4 py-8">
		{#each posts as post (post.id)}
			<Post {post} />
		{/each}
	</div>
{/if}
