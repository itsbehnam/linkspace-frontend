import { writable } from 'svelte/store';

export const session = writable({
  token: null,
});
