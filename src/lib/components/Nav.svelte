<script lang="ts">
	import { page } from '$app/stores';
	import { t, locale, toggleLocale } from '$lib/i18n';
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { slide, fade } from 'svelte/transition';
	import { Sun, Moon, Globe, Menu, X, Flower } from 'lucide-svelte';

	let menuOpen = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;
		const handleScroll = () => { scrolled = window.scrollY > 20; };
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const navLinks = $derived([
		{ href: '/', label: $t('nav.home') },
		{ href: '/articles', label: $t('nav.articles') },
		{ href: '/events', label: $t('nav.events') },
		{ href: '/faq', label: $t('nav.faq') }
	]);
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
		? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm'
		: 'bg-transparent'}"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16 lg:h-20">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 group">
				<div class="relative w-9 h-9">
					<div
						class="absolute inset-0 bg-gradient-to-br from-lotus-400 to-lotus-600 lotus-blob
									group-hover:scale-110 transition-transform duration-300"
					></div>
					<Flower class="absolute inset-0 w-full h-full p-1.5 text-white" />
				</div>
				<span class="font-heading text-xl font-semibold text-lotus-700 dark:text-lotus-300">
					Yoga Hoa Sen
				</span>
			</a>

			<!-- Desktop Links -->
			<div class="hidden lg:flex items-center gap-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-sm font-medium transition-colors duration-200
									{$page.url.pathname === link.href
								? 'text-lotus-600 dark:text-lotus-400'
								: 'text-neutral-600 dark:text-neutral-300 hover:text-lotus-600 dark:hover:text-lotus-400'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Controls -->
			<div class="flex items-center gap-2">
				<!-- Language Toggle -->
				<button
					onclick={toggleLocale}
					aria-label="Toggle language"
					class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
								bg-lotus-100 dark:bg-lotus-900/30 text-lotus-700 dark:text-lotus-300
								hover:bg-lotus-200 dark:hover:bg-lotus-800/40 transition-colors duration-200"
				>
					<Globe class="w-3.5 h-3.5" />
					{$locale === 'en' ? 'VI' : 'EN'}
				</button>

				<!-- Dark Mode Toggle -->
				<button
					onclick={toggleTheme}
					aria-label={$t('darkMode.toggle')}
					class="p-2 rounded-full text-neutral-500 dark:text-neutral-400
								hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
				>
					{#if $theme === 'dark'}
						<Sun class="w-5 h-5" />
					{:else}
						<Moon class="w-5 h-5" />
					{/if}
				</button>

				<!-- Book CTA — desktop only -->
				<a
					href="/#contact"
					class="hidden lg:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold
								bg-gradient-to-r from-lotus-500 to-lotus-700 text-white shadow-md
								hover:shadow-lotus-300/50 hover:scale-105 transition-all duration-200"
				>
					{$t('nav.bookClass')}
				</a>

				<!-- Mobile menu button -->
				<button
					onclick={() => (menuOpen = !menuOpen)}
					class="lg:hidden p-2 text-neutral-600 dark:text-neutral-300"
					aria-label="Toggle menu"
				>
					{#if menuOpen}
						<X class="w-6 h-6" />
					{:else}
						<Menu class="w-6 h-6" />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if menuOpen}
		<div
			transition:slide={{ duration: 200 }}
			class="lg:hidden bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800"
		>
			<div class="px-4 py-4 space-y-1">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={() => (menuOpen = false)}
						class="block px-4 py-3 rounded-xl text-sm font-medium transition-colors
									{$page.url.pathname === link.href
								? 'bg-lotus-50 dark:bg-lotus-900/30 text-lotus-700 dark:text-lotus-300'
								: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'}"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/#contact"
					onclick={() => (menuOpen = false)}
					class="block mt-3 px-4 py-3 text-center rounded-xl text-sm font-semibold
								bg-gradient-to-r from-lotus-500 to-lotus-700 text-white"
				>
					{$t('nav.bookClass')}
				</a>
			</div>
		</div>
	{/if}
</nav>
