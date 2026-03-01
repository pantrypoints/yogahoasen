<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { ArrowRight, Clock, Tag } from 'lucide-svelte';
	import type { Article } from '$lib/data/articles';

	interface Props {
		article: Article;
	}
	let { article }: Props = $props();
</script>

<a
	href="/articles/{article.slug}"
	class="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm
				border border-neutral-100 dark:border-neutral-800 hover:shadow-lg hover:shadow-lotus-200/30
				dark:hover:shadow-lotus-900/20 transition-all duration-300 hover:-translate-y-1"
>
	<!-- Image -->
	<div class="relative h-48 overflow-hidden">
		<img
			src={article.image}
			alt={$locale === 'vi' ? article.titleVi : article.title}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
		/>
		<span class="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full
							bg-lotus-500/90 text-white backdrop-blur-sm">
			{article.category}
		</span>
	</div>

	<!-- Content -->
	<div class="flex flex-col flex-1 p-5">
		<div class="flex items-center gap-3 text-xs text-neutral-400 mb-2">
			<span class="flex items-center gap-1">
				<Clock class="w-3.5 h-3.5" />
				{article.readTime} {$t('articles.minRead')}
			</span>
			<span>{new Date(article.date).toLocaleDateString($locale === 'vi' ? 'vi-VN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
		</div>

		<h3 class="font-semibold text-neutral-900 dark:text-neutral-100 leading-snug mb-2 group-hover:text-lotus-600 dark:group-hover:text-lotus-400 transition-colors">
			{$locale === 'vi' ? article.titleVi : article.title}
		</h3>

		<p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1">
			{$locale === 'vi' ? article.excerptVi : article.excerpt}
		</p>

		<div class="flex items-center justify-between mt-4">
			<span class="text-xs text-neutral-400">{article.author}</span>
			<span class="flex items-center gap-1 text-xs font-semibold text-lotus-600 dark:text-lotus-400">
				{$t('articles.readMore')}
				<ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
			</span>
		</div>
	</div>
</a>
