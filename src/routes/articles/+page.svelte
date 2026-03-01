<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import { articles } from '$lib/data/articles';
	import { Search, X } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';

	let query = $state('');
	const categories = $derived(['All', ...new Set(articles.map(a => a.category))]);
	let activeCategory = $state('All');

	const filtered = $derived(
		articles.filter(a => {
			const q = query.toLowerCase();
			const title = $locale === 'vi' ? a.titleVi : a.title;
			const excerpt = $locale === 'vi' ? a.excerptVi : a.excerpt;
			const matchQuery = !q || title.toLowerCase().includes(q) || excerpt.toLowerCase().includes(q) || a.author.toLowerCase().includes(q);
			const matchCat = activeCategory === 'All' || a.category === activeCategory;
			return matchQuery && matchCat;
		})
	);
</script>

<svelte:head>
	<title>{$t('articles.allArticles')} · Yoga Hoa Sen</title>
</svelte:head>

<!-- Page header -->
<div class="pt-32 pb-16 bg-gradient-to-br from-lotus-50 via-pink-50 to-stone-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div in:fly={{ y: 20, duration: 500 }}>
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				{$t('articles.subtitle')}
			</p>
			<h1 class="font-heading text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
				{$t('articles.allArticles')}
			</h1>
		</div>

		<!-- Search -->
		<div in:fly={{ y: 15, delay: 150, duration: 500 }} class="max-w-xl mx-auto">
			<div class="relative">
				<Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
				<input
					type="search"
					bind:value={query}
					placeholder={$t('articles.search')}
					class="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700
								bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100
								focus:border-lotus-400 focus:ring-0 text-sm shadow-sm"
				/>
				{#if query}
					<button onclick={() => query = ''} class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
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
						: 'bg-stone-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-lotus-50 dark:hover:bg-lotus-900/30'}"
			>
				{cat}
			</button>
		{/each}
	</div>

	<!-- Results -->
	{#if filtered.length === 0}
		<div in:fade class="text-center py-20 text-neutral-400">
			<p class="text-lg">{$t('articles.noResults')}</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filtered as article, i (article.slug)}
				<div in:fly={{ y: 20, delay: i * 60, duration: 400 }}>
					<ArticleCard {article} />
				</div>
			{/each}
		</div>
	{/if}
</div>
