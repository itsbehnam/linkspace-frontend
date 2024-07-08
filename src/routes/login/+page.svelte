<svelte:head>
	<title>LinkSpace • Login</title>
</svelte:head>
<script>
	import { login } from '$lib/api';
	import { session } from '$lib/stores/session';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Waiter from '$lib/Waiter.svelte';

	let email = '';
	let password = '';
	let loading = true;

	onMount(() => {
		if (get(session).username) {
			goto('/');
		} else {
			loading = false;
		}
	});

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const response = await login({ email, password });
			session.set({ user_id: response.user_id, username: response.username, token: response.token });
			goto('/');
		} catch (error) {
			console.error('Error logging in:', error);
		}
	}
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div class="min-h-screen flex items-center justify-center bg-gray-100">
		<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
			<h2 class="text-2xl font-bold mb-4">Login</h2>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="mb-4">
					<label class="block text-gray-700">
						Email
						<input
							type="email"
							bind:value={email}
							required
							class="w-full px-3 py-2 border rounded-lg"
						/>
					</label>
				</div>
				<div class="mb-4">
					<label class="block text-gray-700">
						Password
						<input
							type="password"
							bind:value={password}
							required
							class="w-full px-3 py-2 border rounded-lg"
						/>
					</label>
				</div>
				<button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg"> Login </button>
			</form>

			{#if loading}
				<div class="mt-4">
					<Waiter message="Signing up..." />
				</div>
			{/if}
			<div class="mt-4 text-center">
				<p>Don't have an account yet? <a href="/signup" class="text-blue-500">Sign Up here</a></p>
			</div>
		</div>
	</div>
{/if}
