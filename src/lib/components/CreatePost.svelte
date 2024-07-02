<script>
  import { createPost } from '$lib/api';
  import { session } from '$lib/stores/session';
  import { get } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';

  let link = '';
  let content = '';
  let likedByCreator = null;
  let loading = false;
  let errorMessage = '';
  const dispatch = createEventDispatcher();

  async function handleSubmit(event) {
    event.preventDefault();
    loading = true;
    errorMessage = '';

    const token = get(session).token;

    try {
      await createPost({ link, content, liked_by_creator: likedByCreator }, token);
      link = '';
      content = '';
      likedByCreator = null;
      // Optionally, you can emit an event or trigger a reload of the posts
      dispatch('postCreated');
    } catch (error) {
      errorMessage = 'Error creating post. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-4">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <input
        type="url"
        bind:value={link}
        required
        class="w-full px-3 py-2 border rounded-lg"
        placeholder="Enter a valid URL"
      />
    </div>
    <div class="mb-4">
      <textarea
        bind:value={content}
        required
        class="w-full px-3 py-2 border rounded-lg"
        placeholder="Write your comment (max 280 characters)"
        maxlength="280"
      ></textarea>
    </div>
    <div class="mb-4 flex items-center space-x-4">
      <button
        type="button"
        class={`px-3 py-2 border rounded-lg ${likedByCreator === true ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        on:click={() => likedByCreator = true}
      >
        👍
      </button>
      <button
        type="button"
        class={`px-3 py-2 border rounded-lg ${likedByCreator === false ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        on:click={() => likedByCreator = false}
      >
        👎
      </button>
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
