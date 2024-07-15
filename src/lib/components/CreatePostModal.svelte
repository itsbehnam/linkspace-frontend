<script>
  import { createPost } from '$lib/api';
  import { session } from '$lib/stores/session';
  import { get } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';

  let link = '';
  let content = '';
  let loading = false;
  let errorMessage = '';
  const dispatch = createEventDispatcher();

  async function handleSubmit(event) {
    event.preventDefault();
    loading = true;
    errorMessage = '';

    const token = get(session).token;

    try {
      await createPost({ link, content }, token);
      dispatch('close');
      dispatch('postCreated');
    } catch (error) {
      errorMessage = 'Error creating post. Please try again.';
    } finally {
      loading = false;
    }
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-md">
    <div class="flex justify-between items-center p-4 border-b border-base-300">
      <h2 class="text-xl font-bold">Create New Post</h2>
      <button on:click={handleClose} class="btn btn-ghost btn-sm btn-circle">✕</button>
    </div>
    <form on:submit|preventDefault={handleSubmit} class="p-4">
      <div class="form-control mb-4">
        <label for="link" class="label">
          <span class="label-text">Link</span>
        </label>
        <input
          type="url"
          id="link"
          bind:value={link}
          required
          class="input input-bordered w-full"
          placeholder="Enter a valid URL"
        />
      </div>
      <div class="form-control mb-4">
        <label for="content" class="label">
          <span class="label-text">Content</span>
        </label>
        <textarea
          id="content"
          bind:value={content}
          required
          class="textarea textarea-bordered w-full h-24"
          placeholder="Write your comment (max 280 characters)"
          maxlength="280"
        ></textarea>
      </div>
      {#if errorMessage}
        <div class="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      {/if}
      <button
        type="submit"
        class="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Post'}
      </button>
    </form>
  </div>
</div>