<style>
  /* Add any custom styles here if needed */
</style>

<div class="flex h-screen">
  <!-- Sidebar -->
  <div class="w-1/5 bg-gray-800 p-4 text-white">
    <div class="text-2xl font-bold mb-4">Logo</div>
    <nav>
      <ul>
        <li class="py-2"><a href="/" class="hover:text-gray-400">Home</a></li>
        <li class="py-2"><a href="/" class="hover:text-gray-400">Explore</a></li>
        <li class="py-2"><a href="/" class="hover:text-gray-400">Notifications</a></li>
        <li class="py-2"><a href="/" class="hover:text-gray-400">Messages</a></li>
        <li class="py-2"><a href="/" class="hover:text-gray-400">Settings</a></li>
        <li class="py-2"><a href="/logout" class="hover:text-gray-400">Logout</a></li>
      </ul>
    </nav>
  </div>

  <!-- Main Content -->
  <div class="flex-1 bg-gray-100">
    <div class="max-w-2xl mx-auto p-4">
      <slot></slot>
    </div>
  </div>

  <!-- Right Sidebar -->
  <div class="w-1/4 bg-gray-200 p-4">
    <!-- Additional content like trends or suggestions -->
    <div class="bg-white p-4 rounded-lg">
      <h3 class="font-bold mb-2">Suggestions for you</h3>
      <ul>
        <li class="py-2">#ExampleTrend</li>
        <li class="py-2">#AnotherTrend</li>
      </ul>
    </div>
  </div>
</div>
