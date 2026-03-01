import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import en from './en.json';
import vi from './vi.json';

export type Locale = 'en' | 'vi';

const messages: Record<Locale, Record<string, unknown>> = { en, vi };

function getInitialLocale(): Locale {
	if (browser) {
		const saved = localStorage.getItem('locale') as Locale;
		if (saved && ['en', 'vi'].includes(saved)) return saved;
		if (navigator.language.startsWith('vi')) return 'vi';
	}
	return 'en';
}

export const locale = writable<Locale>(getInitialLocale());

// Persist locale changes
if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem('locale', value);
		document.documentElement.lang = value;
	});
}

function resolve(obj: Record<string, unknown>, path: string): string {
	return path.split('.').reduce((acc: unknown, key) => {
		if (typeof acc === 'object' && acc !== null) {
			return (acc as Record<string, unknown>)[key];
		}
		return undefined;
	}, obj) as string ?? path;
}

export const t = derived(locale, ($locale) => {
	return (key: string): string => resolve(messages[$locale] as Record<string, unknown>, key);
});

export function toggleLocale() {
	locale.update((l) => (l === 'en' ? 'vi' : 'en'));
}
