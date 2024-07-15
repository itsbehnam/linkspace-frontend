<script>
  import { page } from '$app/stores';
  import CreatePostModal from '$lib/components/CreatePostModal.svelte';

  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }
</script>

<div class="flex justify-center min-h-screen bg-base-200">
  <div class="flex max-w-[1280px] w-full">
    <!-- Left Sidebar -->
    <div class="w-64 bg-base-100 p-4 flex flex-col justify-between">
      <div>
        <div class="text-2xl font-bold mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        </div>
        <nav>
          <ul>
            <li class="py-2">
              <a href="/" class="flex items-center space-x-4 hover:bg-base-200 p-2 rounded-full {$page.url.pathname === '/' ? 'font-bold' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </a>
            </li>
            <li class="py-2">
              <a href="/explore" class="flex items-center space-x-4 hover:bg-base-200 p-2 rounded-full {$page.url.pathname === '/explore' ? 'font-bold' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span>Explore</span>
              </a>
            </li>
            <li class="py-2">
              <a href="/notifications" class="flex items-center space-x-4 hover:bg-base-200 p-2 rounded-full {$page.url.pathname === '/notifications' ? 'font-bold' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Notifications</span>
              </a>
            </li>
            <li class="py-2">
              <a href="/messages" class="flex items-center space-x-4 hover:bg-base-200 p-2 rounded-full {$page.url.pathname === '/messages' ? 'font-bold' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Messages</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <button on:click={toggleModal} class="btn btn-primary btn-lg rounded-full mb-4 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </button>
        <a href="/logout" class="flex items-center space-x-4 hover:bg-base-200 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </a>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-[600px] bg-base-100 border-x border-base-300">
      <div class="p-4">
        <slot></slot>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-80 bg-base-100 p-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Trends for you</h3>
          <ul>
            <li class="py-2">#ExampleTrend</li>
            <li class="py-2">#AnotherTrend</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

{#if showModal}
  <CreatePostModal on:close={toggleModal} />
{/if}