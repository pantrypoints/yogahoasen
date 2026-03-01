<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme';
	import { locale } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	interface Props { children: import('svelte').Snippet; }
	let { children }: Props = $props();

	// Apply dark class on mount
	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'dark') {
			document.documentElement.classList.add('dark');
		}
	});
</script>

<svelte:head>
	<title>Yoga Hoa Sen</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Nav />
	<main class="flex-1">
		{#key $page.url.pathname}
			<div in:fade={{ duration: 250, delay: 50 }}>
				{@render children()}
			</div>
		{/key}
	</main>
	<Footer />
</div>
