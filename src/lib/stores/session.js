import { writable } from 'svelte/store';

function createSession() {
	let initialData = { user: null, token: null };

	if (typeof localStorage !== 'undefined') {
		const storedSession = localStorage.getItem('session');
		if (storedSession) {
			initialData = JSON.parse(storedSession);
		}
	}

	const { subscribe, set, update } = writable(initialData);

	return {
		subscribe,
		set: (value) => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('session', JSON.stringify(value));
			}
			set(value);
		},
		update: (updater) => {
			const updatedValue = updater(get({ subscribe }));
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('session', JSON.stringify(updatedValue));
			}
			set(updatedValue);
		},
		reset: () => {
			if (typeof localStorage !== 'undefined') {
				localStorage.removeItem('session');
			}
			set({ user: null, token: null });
		}
	};
}

export const session = createSession();
