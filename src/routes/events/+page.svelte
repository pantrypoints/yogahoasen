<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import EventCard from '$lib/components/EventCard.svelte';
	import { events } from '$lib/data/events';
	import { Search, X, CalendarDays } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';

	let query = $state('');
	const categories = $derived(['All', ...new Set(events.map(e => e.category))]);
	let activeCategory = $state('All');

	const filtered = $derived(
		events.filter(ev => {
			const q = query.toLowerCase();
			const title = $locale === 'vi' ? ev.titleVi : ev.title;
			const desc = $locale === 'vi' ? ev.descriptionVi : ev.description;
			const matchQ = !q || title.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || ev.teacher.toLowerCase().includes(q);
			const matchCat = activeCategory === 'All' || ev.category === activeCategory;
			return matchQ && matchCat;
		})
	);
</script>

<svelte:head>
	<title>{$t('events.title')} · Yoga Hoa Sen</title>
</svelte:head>

<!-- Header -->
<div class="pt-32 pb-16 bg-gradient-to-br from-saffron-50 via-lotus-50 to-stone-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div in:fly={{ y: 20, duration: 500 }}>
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				{$t('events.subtitle')}
			</p>
			<h1 class="font-heading text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
				{$t('events.title')}
			</h1>
		</div>

		<!-- Search -->
		<div in:fly={{ y: 15, delay: 150, duration: 500 }} class="max-w-xl mx-auto">
			<div class="relative">
				<Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
				<input
					type="search"
					bind:value={query}
					placeholder={$t('events.search')}
					class="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700
								bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100
								focus:border-lotus-400 focus:ring-0 text-sm shadow-sm"
				/>
				{#if query}
					<button onclick={() => query = ''} class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
						<X class="w-4 h-4" />
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Category filters -->
	<div class="flex flex-wrap gap-2 mb-10 justify-center">
		{#each categories as cat}
			<button
				onclick={() => activeCategory = cat}
				class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
							{activeCategory === cat
						? 'bg-lotus-600 text-white shadow-md'
						: 'bg-stone-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-lotus-50'}"
			>
				{cat}
			</button>
		{/each}
	</div>

	{#if filtered.length === 0}
		<div in:fade class="text-center py-20 text-neutral-400">
			<CalendarDays class="w-12 h-12 mx-auto mb-4 opacity-30" />
			<p class="text-lg">{$t('events.noResults')}</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filtered as event, i (event.id)}
				<div in:fly={{ y: 20, delay: i * 60, duration: 400 }}>
					<EventCard {event} />
				</div>
			{/each}
		</div>
	{/if}
</div>
