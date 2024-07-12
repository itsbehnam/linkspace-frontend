<script>
  import { likePost, dislikePost } from '$lib/api';
  import Comment from './Comment.svelte';
  import { formatDistanceToNow, format } from 'date-fns';

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

  function formatPostDate(dateString) {
		const date = new Date(dateString);
		const now = new Date();
		const diffInSeconds = (now - date) / 1000;

		// Show X min ago or X days ago
		if (diffInSeconds < 86400) { // Less than 1 day
			return `${formatDistanceToNow(date)} ago`;
		}

		// If older than a day, show the datetime
		return format(date, "yyyy-MM-dd HH:mm");
	}

</script>

<div class="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md mb-4 text-white">
  <div class="mb-2">
    <p class="text-gray-400">
      <span class="font-semibold">@{post.creator_username}</span>
      <span class="text-sm"> • {formatPostDate(post.updated_at)}</span>
      {#if post.edited}
        <span class="text-sm text-yellow-400 ml-2">Edited</span>
      {/if}
    </p>
  </div>
  <p class="text-gray-200 mb-4">{post.content}</p>
  <a class="text-blue-400 mb-4 block" href={post.link} target="_blank">{post.link}</a>
  <div class="flex items-center space-x-4">
    <button
      type="button"
      class="px-3 py-2 border rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
      on:click={handleLike}
      disabled={loadingLike}
    >
      👍 {post.likes_count}
    </button>
    <button
      type="button"
      class="px-3 py-2 border rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
      on:click={handleDislike}
      disabled={loadingDislike}
    >
      👎 {post.dislikes_count}
    </button>
    <button
      type="button"
      class="px-3 py-2 border rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
      on:click={() => showComments = !showComments}
    >
      💬 {post.comments_count}
    </button>
  </div>
  {#if showComments}
    <Comment postId={post.id} on:commentCreated={handleCommentCreated} />
  {/if}
</div>
