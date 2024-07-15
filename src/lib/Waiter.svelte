<script>
  export let message = 'Loading...';
</script>

<div class="flex flex-col items-center justify-center space-y-4">
  <div class="loading loading-spinner loading-lg text-primary"></div>
  <div class="text-lg font-semibold text-primary">{message}</div>
</div>