<script>
  import { createEventDispatcher } from 'svelte';
  import { createComment } from '$lib/api';
  import { session } from '$lib/stores/session';
  import { get } from 'svelte/store';

  export let postId;

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
      await createComment(postId, { content });
    } catch (error) {
      errorMessage = 'Error creating comment. Please try again.';
    } finally {
      content = '';
      loading = false;
      dispatch('commentCreated')
    }
  }
</script>

<div class="bg-gray-800 p-4 rounded-lg mt-4 text-white">
  <h4 class="text-lg font-bold mb-2">Add a Comment</h4>
  <form on:submit|preventDefault={handleSubmit}>
    <textarea
      bind:value={content}
      required
      class="w-full px-3 py-2 border rounded-lg mb-2 bg-gray-700 text-white placeholder-gray-400"
      placeholder="Write your comment (max 280 characters)"
      maxlength="280"
    ></textarea>
    {#if errorMessage}
      <p class="text-red-500 mb-2">{errorMessage}</p>
    {/if}
    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 rounded-lg"
      disabled={loading}
    >
      {#if loading}
        Adding...
      {:else}
        Post
      {/if}
    </button>
  </form>
</div>

