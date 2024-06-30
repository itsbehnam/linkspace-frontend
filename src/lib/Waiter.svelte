<script>
    export let message = 'Loading...';
  </script>
  
  <div class="flex items-center justify-center space-x-2">
    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500 border-t-transparent"></div>
    <div>{message}</div>
  </div>
  
  <style>
    .spinner-border {
      border-width: 4px;
      border-style: solid;
      border-color: currentColor;
      border-radius: 9999px;
      animation: spin 1s linear infinite;
      border-right-color: transparent;
      border-bottom-color: transparent;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  