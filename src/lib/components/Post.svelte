<script>
  import { likePost, dislikePost } from '$lib/api';
  import Comment from './Comment.svelte';

  export let post;

  let loadingLike = false;
  let loadingDislike = false;
  let showComments = false;

  async function handleLike() {
    loadingLike = true;
    try {
      const updatedPost = await likePost(post.id);
      post.likes_count = updatedPost.likes_count;
      post.dislikes_count = updatedPost.dislikes_count;
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      loadingLike = false;
    }
  }

  async function handleDislike() {
    loadingDislike = true;
    try {
      const updatedPost = await dislikePost(post.id);
      post.likes_count = updatedPost.likes_count;
      post.dislikes_count = updatedPost.dislikes_count;
    } catch (error) {
      console.error('Error disliking post:', error);
    } finally {
      loadingDislike = false;
    }
  }

  function handleCommentCreated() {
    showComments = false;
    post.comments_count += 1;
  }
</script>

<div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-4">
  <p class="text-gray-600 mb-2">{post.content}</p>
  <p class="text-gray-500 mb-4">{post.link}</p>
  <div class="flex items-center space-x-4">
    <button
      type="button"
      class="px-3 py-2 border rounded-lg bg-gray-200 text-gray-700"
      on:click={handleLike}
      disabled={loadingLike}
    >
      👍 {post.likes_count}
    </button>
    <button
      type="button"
      class="px-3 py-2 border rounded-lg bg-gray-200 text-gray-700"
      on:click={handleDislike}
      disabled={loadingDislike}
    >
      👎 {post.dislikes_count}
    </button>
    <button
      type="button"
      class="px-3 py-2 border rounded-lg bg-gray-200 text-gray-700"
      on:click={() => showComments = !showComments}
    >
      💬 {post.comments_count}
    </button>
  </div>
  {#if showComments}
    <Comment postId={post.id} on:commentCreated={handleCommentCreated}/>
  {/if}
</div>
