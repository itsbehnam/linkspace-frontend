<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { session } from '$lib/stores/session';
    import Waiter from '$lib/Waiter.svelte';
    import { get } from 'svelte/store';

    let verificationUrl;
    let loading = true;
    let successMessage = '';
    let errorMessage = '';

    $: {
        const urlParams = new URLSearchParams($page.url.search);
        verificationUrl = urlParams.get('url');
    }

    onMount(async () => {
        if (verificationUrl) {
            try {
                const token = get(session).token;
                if (!token) {
                    errorMessage = 'Please log in first.';
                    loading = false;
                    return;
                }

                const response = await fetch(verificationUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    session.update(sess => ({ ...sess, email_verified: true }));
                    successMessage = 'Email verified successfully!';
                    setTimeout(() => goto('/'), 3000); // Redirect after 3 seconds
                } else {
                    errorMessage = 'Email verification failed. Please try again.';
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                errorMessage = 'An error occurred during email verification. Please try again.';
            } finally {
                loading = false;
            }
        }
    });
</script>

<svelte:head>
    <title>Email Verification</title>
</svelte:head>

{#if loading}
    <div class="min-h-screen flex items-center justify-center">
        <Waiter message="Verifying your email..." />
    </div>
{:else}
    <div class="hero min-h-screen bg-base-200 flex items-center justify-center">
        {#if successMessage}
            <div class="text-center">
                <h1 class="text-3xl font-bold">{successMessage}</h1>
                <p class="py-6">Redirecting to home...</p>
            </div>
        {:else if errorMessage}
            <div class="text-center">
                <h1 class="text-3xl font-bold text-red-500">{errorMessage}</h1>
                <p class="py-6">Please try again.</p>
            </div>
        {/if}
    </div>
{/if}
