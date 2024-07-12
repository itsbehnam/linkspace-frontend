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
      // Optionally, you can emit an event or trigger a reload of the posts
    } catch (error) {
      errorMessage = 'Error creating post. Please try again.';
    } finally {
      link = '';
      content = '';
      loading = false;
      dispatch('postCreated');
    }
  }
</script>

<div class="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md mb-4 text-white">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <input
        type="url"
        bind:value={link}
        required
        class="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400"
        placeholder="Enter a valid URL"
      />
    </div>
    <div class="mb-4">
      <textarea
        bind:value={content}
        required
        class="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400"
        placeholder="Write your comment (max 280 characters)"
        maxlength="280"
      ></textarea>
    </div>
    {#if errorMessage}
      <p class="text-red-500 mb-4">{errorMessage}</p>
    {/if}
    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 rounded-lg"
      disabled={loading}
    >
      {#if loading}
        Creating...
      {:else}
        Post
      {/if}
    </button>
  </form>
</div>
