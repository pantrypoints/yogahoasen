import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function getInitialTheme(): 'light' | 'dark' {
	if (browser) {
		const saved = localStorage.getItem('theme');
		if (saved === 'dark' || saved === 'light') return saved;
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
	}
	return 'light';
}

export const theme = writable<'light' | 'dark'>(getInitialTheme());

if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
}

export function toggleTheme() {
	theme.update((t) => (t === 'light' ? 'dark' : 'light'));
}
