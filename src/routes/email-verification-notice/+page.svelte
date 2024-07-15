<svelte:head>
    <title>LinkSpace • Email Verification Required</title>
</svelte:head>
<script>
    import { goto } from '$app/navigation';

    function handleResendVerification() {
        // Logic to resend the email verification link
        // For now, let's just mock this with a message
        alert('Verification link has been resent. Please check your email.');
    }

    function handleGoToLogin() {
        goto('/login');
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-full max-w-md shadow-2xl bg-base-100 p-6">
        <div class="card-body text-center">
            <h2 class="card-title text-2xl font-bold">Verify Your Email</h2>
            <p class="py-4">To continue using LinkSpace, please verify your email address. Check your email for the verification link.</p>
            <div class="form-control mt-6">
                <button class="btn btn-primary mb-2" on:click={handleResendVerification}>Resend Verification Email</button>
                <button class="btn btn-secondary" on:click={handleGoToLogin}>Go to Login</button>
            </div>
        </div>
    </div>
</div>
