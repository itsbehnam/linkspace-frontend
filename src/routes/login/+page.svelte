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
		loading = true;

		try {
			const response = await login({ email, password });
			session.set({ user_id: response.user_id, username: response.username, token: response.token });
			goto('/');
		} catch (error) {
			console.error('Error logging in:', error);
			loading = false;
		}
	}
</script>

{#if loading}
	<div class="min-h-screen flex items-center justify-center">
		<Waiter message="Loading..." />
	</div>
{:else}
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col lg:flex-row-reverse">
			<div class="text-center lg:text-left">
				<h1 class="text-5xl font-bold">Login now!</h1>
				<p class="py-6">Join LinkSpace and connect with your community.</p>
			</div>
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<form on:submit|preventDefault={handleSubmit} class="card-body">
					<div class="form-control">
						<label class="label" for="email">
							<span class="label-text">Email</span>
						</label>
						<input
							type="email"
							id="email"
							placeholder="email"
							bind:value={email}
							required
							class="input input-bordered"
						/>
					</div>
					<div class="form-control">
						<label class="label" for="password">
							<span class="label-text">Password</span>
						</label>
						<input
							type="password"
							id="password"
							placeholder="password"
							bind:value={password}
							required
							class="input input-bordered"
						/>
						<label class="label">
							<a href="/forgot-password" class="label-text-alt link link-hover">Forgot password?</a>
						</label>
					</div>
					<div class="form-control mt-6">
						<button type="submit" class="btn btn-primary" disabled={loading}>
							{loading ? 'Logging in...' : 'Login'}
						</button>
					</div>
				</form>
				<div class="text-center mb-4">
					<p>Don't have an account yet? <a href="/signup" class="link link-primary">Sign Up here</a></p>
				</div>
			</div>
		</div>
	</div>
{/if}