<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { ArrowLeft, Calendar, Clock, User } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		title?: string;
		titleVi?: string;
		excerpt?: string;
		excerptVi?: string;
		date?: string;
		readTime?: number;
		author?: string;
		image?: string;
		category?: string;
		children?: import('svelte').Snippet;
	}

	let { title, titleVi, date, readTime, author, image, category, children }: Props = $props();

	const displayTitle = $derived($locale === 'vi' && titleVi ? titleVi : title);
</script>

<article in:fade={{ duration: 300 }} class="min-h-screen pt-20">
	<!-- Hero image -->
	{#if image}
		<div class="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
			<img src={image} alt={displayTitle} class="w-full h-full object-cover" />
			<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
		</div>
	{/if}

	<div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
		<!-- Back link -->
		<a
			href="/articles"
			class="inline-flex items-center gap-1.5 text-sm text-lotus-600 dark:text-lotus-400 hover:text-lotus-700 mb-8 transition-colors"
		>
			<ArrowLeft class="w-4 h-4" />
			{$t('articles.allArticles')}
		</a>

		{#if category}
			<span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-lotus-100 dark:bg-lotus-900/30 text-lotus-700 dark:text-lotus-300 mb-4">
				{category}
			</span>
		{/if}

		<h1 class="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight mb-4">
			{displayTitle}
		</h1>

		<div class="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-10 pb-8 border-b border-neutral-200 dark:border-neutral-800">
			{#if author}
				<span class="flex items-center gap-1.5">
					<User class="w-4 h-4" />
					{author}
				</span>
			{/if}
			{#if date}
				<span class="flex items-center gap-1.5">
					<Calendar class="w-4 h-4" />
					{new Date(date).toLocaleDateString($locale === 'vi' ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
				</span>
			{/if}
			{#if readTime}
				<span class="flex items-center gap-1.5">
					<Clock class="w-4 h-4" />
					{readTime} {$t('articles.minRead')}
				</span>
			{/if}
		</div>

		<div class="prose prose-neutral dark:prose-invert prose-lotus max-w-none
					prose-headings:font-heading prose-a:text-lotus-600 dark:prose-a:text-lotus-400
					prose-img:rounded-2xl prose-img:shadow-lg">
			{@render children?.()}
		</div>
	</div>
</article>
