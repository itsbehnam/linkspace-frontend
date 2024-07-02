<div class="flex min-h-screen bg-gray-900 text-white">
  <!-- Sidebar -->
  <div class="sidebar w-1/5 bg-gray-800 p-4">
    <div class="text-2xl font-bold mb-4">LinkSpace</div>
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
  <div class="main-content flex-1 bg-gray-900">
    <div class="max-w-4xl mx-auto p-4">
      <slot></slot>
    </div>
  </div>

  <!-- Right Sidebar -->
  <div class="right-sidebar w-1/4 bg-gray-800 p-4">
    <!-- Additional content like trends or suggestions -->
    <div class="box bg-gray-700 rounded-lg p-4">
      <h3 class="font-bold mb-2 text-white">Suggestions for you</h3>
      <ul>
        <li class="py-2 text-white">#ExampleTrend</li>
        <li class="py-2 text-white">#AnotherTrend</li>
      </ul>
    </div>
  </div>
</div>
