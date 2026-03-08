<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { articles } from '$lib/data/articles';
	import { fade, fly } from 'svelte/transition';
	import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight, Share2, Flower } from 'lucide-svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	let { data } = $props();

	// Pick Vietnamese content if available and locale matches, otherwise English
	const active = $derived($locale === 'vi' && data.vi ? data.vi : data.en);
	const ArticleContent = $derived(active.content);
	const metadata = $derived(active.metadata);

	// Title comes directly from the active file's frontmatter
	const displayTitle = $derived(metadata?.title ?? '');

	// Related articles — same category, excluding current slug
	const related = $derived(
		articles
			.filter((a) => a.category === metadata?.category && a.slug !== metadata?.slug)
			.slice(0, 3)
	);

	// Reading progress bar
	let progress = $state(0);
	let articleEl: HTMLElement | null = null;

	function handleScroll() {
		if (!articleEl) return;
		const total = articleEl.offsetHeight - window.innerHeight;
		const scrolled = Math.max(0, window.scrollY - (articleEl.offsetTop ?? 0));
		progress = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
	}

	$effect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function share() {
		if (navigator.share) {
			navigator.share({ title: displayTitle, url: window.location.href });
		} else {
			navigator.clipboard.writeText(window.location.href);
		}
	}
</script>


<svelte:head>
	<title>{displayTitle} · Yoga Hoa Sen</title>
	{#if metadata?.excerpt}<meta name="description" content={metadata.excerpt} />{/if}
	{#if metadata?.image}<meta property="og:image" content={metadata.image} />{/if}
</svelte:head>

<!-- Reading progress bar -->
<div class="fixed top-0 left-0 right-0 z-[60] h-0.5" aria-hidden="true">
	<div
		class="h-full bg-gradient-to-r from-lotus-400 via-lotus-500 to-saffron-400 transition-[width] duration-100 ease-out"
		style="width: {progress}%"
	></div>
</div>

<div in:fade={{ duration: 300 }}>

	<!-- ── HERO IMAGE ──────────────────────────────────────────── -->
	{#if metadata?.image}
		<div class="relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
			<img src={metadata.image} alt={displayTitle} class="w-full h-full object-cover" />
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

			<!-- Category pill over image -->
			{#if metadata?.category}
				<div class="absolute top-24 left-4 sm:left-8" in:fly={{ y: -10, delay: 200, duration: 400 }}>
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
							bg-lotus-500/90 text-white backdrop-blur-sm shadow-md">
						<Tag class="w-3 h-3" />
						{metadata.category}
					</span>
				</div>
			{/if}

			<!-- Title overlaid on hero — desktop only -->
			<div class="absolute bottom-0 left-0 right-0 hidden lg:block">
				<div class="max-w-3xl mx-auto px-6 pb-10">
					<h1
						in:fly={{ y: 20, delay: 150, duration: 600 }}
						class="font-heading text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg"
					>
						{displayTitle}
					</h1>
				</div>
			</div>
		</div>
	{:else}
		<!-- No image: subtle gradient band keeps the nav from floating on white -->
		<div class="h-32 sm:h-40 bg-gradient-to-br
				from-lotus-50 via-pink-50 to-stone-50
				dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
		</div>
	{/if}



	<!-- ── ARTICLE BODY ────────────────────────────────────────── -->
	<article bind:this={articleEl} class="bg-white dark:bg-neutral-900 min-h-screen">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

			<!-- Back link -->
			<a
				href="/articles"
				class="inline-flex items-center gap-1.5 text-sm font-medium
						text-lotus-600 dark:text-lotus-400 hover:text-lotus-700 dark:hover:text-lotus-300
						mb-8 group transition-colors duration-200"
			>
				<ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
				{$t('articles.allArticles')}
			</a>

			<!-- Category + title — mobile (always) and desktop when no hero image -->
			<div class="{metadata?.image ? 'lg:hidden' : ''} mb-6">
				{#if metadata?.category}
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
							bg-lotus-100 dark:bg-lotus-900/30 text-lotus-700 dark:text-lotus-300 mb-4">
						<Tag class="w-3 h-3" />
						{metadata.category}
					</span>
				{/if}
				<h1 class="font-heading text-3xl sm:text-4xl font-bold
						text-neutral-900 dark:text-neutral-100 leading-tight">
					{displayTitle}
				</h1>
			</div>

			<!-- Meta row -->
			<div class="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8
					border-b border-neutral-200 dark:border-neutral-800">
				<div class="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
					{#if metadata?.author}
						<span class="flex items-center gap-2">
							{#if metadata?.icon}
								<img 
									src={metadata.icon} 
									alt={metadata.author}
									class="w-12 h-12 rounded-full object-cover shadow-sm"
								/>
							{:else}
								<span class="w-6 h-6 rounded-full bg-gradient-to-br from-lotus-400 to-lotus-600
										flex items-center justify-center shadow-sm">
									<User class="w-3 h-3 text-white" />
								</span>
							{/if}
							<span class="font-medium text-neutral-700 dark:text-neutral-300">{metadata.author}</span>
						</span>
					{/if}


<!--  					{#if metadata?.author}
						<span class="flex items-center gap-2">
							<span class="w-6 h-6 rounded-full bg-gradient-to-br from-lotus-400 to-lotus-600
									flex items-center justify-center shadow-sm">
								<User class="w-3 h-3 text-white" />
							</span>
							<span class="font-medium text-neutral-700 dark:text-neutral-300">{metadata.author}</span>
						</span>
					{/if}  -->


					{#if metadata?.date}
						<span class="flex items-center gap-1.5">
							<Calendar class="w-4 h-4" />
							{new Date(metadata.date).toLocaleDateString(
								$locale === 'vi' ? 'vi-VN' : 'en-US',
								{ year: 'numeric', month: 'long', day: 'numeric' }
							)}
						</span>
					{/if}
					{#if metadata?.readTime}
						<span class="flex items-center gap-1.5">
							<Clock class="w-4 h-4" />
							{metadata.readTime} {$t('articles.minRead')}
						</span>
					{/if}
				</div>

				<button
					onclick={share}
					aria-label="Share article"
					class="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
							border border-neutral-200 dark:border-neutral-700
							text-neutral-500 dark:text-neutral-400
							hover:border-lotus-300 hover:text-lotus-600
							dark:hover:border-lotus-700 dark:hover:text-lotus-400
							transition-all duration-200"
				>
					<Share2 class="w-3.5 h-3.5" />
					Share
				</button>
			</div>

			<!-- Prose body -->
			<div class="
				prose prose-neutral dark:prose-invert max-w-none

				prose-headings:font-heading
				prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100
				prose-h1:text-3xl
				prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2
				prose-h2:border-b prose-h2:border-neutral-100 dark:prose-h2:border-neutral-800
				prose-h3:text-xl prose-h3:text-lotus-700 dark:prose-h3:text-lotus-300

				prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-[1.85]
				prose-p:text-[1.05rem]

				prose-a:text-lotus-600 dark:prose-a:text-lotus-400
				prose-a:no-underline prose-a:font-medium prose-a:border-b
				prose-a:border-lotus-200 dark:prose-a:border-lotus-800
				hover:prose-a:border-lotus-500
				prose-a:transition-colors prose-a:duration-150

				prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
				prose-strong:font-semibold

				prose-blockquote:border-l-4 prose-blockquote:border-lotus-400
				prose-blockquote:bg-lotus-50 dark:prose-blockquote:bg-lotus-900/20
				prose-blockquote:rounded-r-2xl prose-blockquote:py-3 prose-blockquote:px-5
				prose-blockquote:not-italic
				prose-blockquote:text-neutral-700 dark:prose-blockquote:text-neutral-300

				prose-code:text-lotus-700 dark:prose-code:text-lotus-300
				prose-code:bg-lotus-50 dark:prose-code:bg-lotus-900/30
				prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5
				prose-code:font-medium prose-code:text-[0.9em]
				prose-code:before:content-[''] prose-code:after:content-['']

				prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950
				prose-pre:rounded-2xl prose-pre:shadow-xl

				prose-img:rounded-2xl prose-img:shadow-lg prose-img:mx-auto

				prose-ul:my-4 prose-ol:my-4
				prose-li:text-neutral-700 dark:prose-li:text-neutral-300 prose-li:my-1.5
				prose-ul:marker:text-lotus-400

				prose-hr:border-neutral-200 dark:prose-hr:border-neutral-800 prose-hr:my-10
			">
				<ArticleContent />
			</div>

			<!-- Bottom strip -->
			<div class="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800
					flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center gap-2.5">
					<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-lotus-400 to-lotus-600
							lotus-blob flex items-center justify-center shadow-sm">
						<Flower class="w-4 h-4 text-white" />
					</div>
					<div>
						<p class="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Yoga Hoa Sen</p>
						<p class="text-xs text-neutral-400">{metadata?.author ?? ''}</p>
					</div>
				</div>
				<button
					onclick={share}
					class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
							bg-gradient-to-r from-lotus-500 to-lotus-700 text-white shadow-md
							hover:shadow-lotus-300/40 hover:scale-105 transition-all duration-200"
				>
					<Share2 class="w-4 h-4" />
					{$locale === 'vi' ? 'Chia sẻ bài viết' : 'Share this article'}
				</button>
			</div>
		</div>
	</article>

	<!-- ── RELATED ARTICLES ────────────────────────────────────── -->
	{#if related.length > 0}
		<section class="py-20 bg-stone-50 dark:bg-neutral-950">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex items-end justify-between mb-10">
					<div>
						<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-2">
							{$locale === 'vi' ? 'Cùng chủ đề' : 'Keep reading'}
						</p>
						<h2 class="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
							{$locale === 'vi' ? 'Bài Viết Liên Quan' : 'Related Articles'}
						</h2>
					</div>
					<a
						href="/articles"
						class="hidden sm:flex items-center gap-1.5 text-sm font-semibold
								text-lotus-600 dark:text-lotus-400 hover:text-lotus-700 transition-colors"
					>
						{$t('articles.allArticles')}
						<ArrowRight class="w-4 h-4" />
					</a>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each related as article}
						<ArticleCard {article} />
					{/each}
				</div>
			</div>
		</section>
	{:else}
		<section class="py-16 bg-stone-50 dark:bg-neutral-950">
			<div class="max-w-3xl mx-auto px-4 text-center">
				<a
					href="/articles"
					class="inline-flex items-center gap-2 px-6 py-3 rounded-full
							bg-gradient-to-r from-lotus-500 to-lotus-700 text-white font-semibold text-sm
							hover:shadow-lg hover:shadow-lotus-300/40 hover:scale-105 transition-all duration-200"
				>
					<ArrowLeft class="w-4 h-4" />
					{$t('articles.allArticles')}
				</a>
			</div>
		</section>
	{/if}

</div>



<!-- <script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { articles } from '$lib/data/articles';
	import { fade, fly } from 'svelte/transition';
	import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight, Share2, Flower } from 'lucide-svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	let { data } = $props();
	const { content: ArticleContent, metadata } = data;

	// Localised display title
	const displayTitle = $derived(active.metadata?.title ?? '');
	// const displayTitle = $derived(
	// 	$locale === 'vi' && metadata?.titleVi ? metadata.titleVi : metadata?.title ?? ''
	// );

	// Related articles — same category, excluding current slug
	const related = $derived(
		articles
			.filter((a) => a.category === metadata?.category && a.slug !== metadata?.slug)
			.slice(0, 3)
	);

	// Reading progress bar
	let progress = $state(0);
	let articleEl: HTMLElement | null = null;

	function handleScroll() {
		if (!articleEl) return;
		const total = articleEl.offsetHeight - window.innerHeight;
		const scrolled = Math.max(0, window.scrollY - (articleEl.offsetTop ?? 0));
		progress = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
	}

	$effect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function share() {
		if (navigator.share) {
			navigator.share({ title: displayTitle, url: window.location.href });
		} else {
			navigator.clipboard.writeText(window.location.href);
		}
	}

  // Falls back to English if Vietnamese file doesn't exist
  const active = $derived(
    $locale === 'vi' && data.vi ? data.vi : data.en
  );




</script>


<svelte:head>
	<title>{displayTitle} · Yoga Hoa Sen</title>
	{#if metadata?.excerpt}<meta name="description" content={metadata.excerpt} />{/if}
	{#if metadata?.image}<meta property="og:image" content={metadata.image} />{/if}
</svelte:head>


<div class="fixed top-0 left-0 right-0 z-[60] h-0.5" aria-hidden="true">
	<div
		class="h-full bg-gradient-to-r from-lotus-400 via-lotus-500 to-saffron-400 transition-[width] duration-100 ease-out"
		style="width: {progress}%"
	></div>
</div>

<div in:fade={{ duration: 300 }}>


	{#if metadata?.image}
		<div class="relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
			<img src={metadata.image} alt={displayTitle} class="w-full h-full object-cover" />
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

			{#if metadata?.category}
				<div class="absolute top-24 left-4 sm:left-8" in:fly={{ y: -10, delay: 200, duration: 400 }}>
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
							bg-lotus-500/90 text-white backdrop-blur-sm shadow-md">
						<Tag class="w-3 h-3" />
						{metadata.category}
					</span>
				</div>
			{/if}

			<div class="absolute bottom-0 left-0 right-0 hidden lg:block">
				<div class="max-w-3xl mx-auto px-6 pb-10">
					<h1
						in:fly={{ y: 20, delay: 150, duration: 600 }}
						class="font-heading text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg">
						{displayTitle}
					</h1>
				</div>
			</div>
		</div>
	{:else}

		<div class="h-32 sm:h-40 bg-gradient-to-br
				from-lotus-50 via-pink-50 to-stone-50
				dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
		</div>
	{/if}




	<article bind:this={articleEl} class="bg-white dark:bg-neutral-900 min-h-screen">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">


			<a
				href="/articles"
				class="inline-flex items-center gap-1.5 text-sm font-medium
						text-lotus-600 dark:text-lotus-400 hover:text-lotus-700 dark:hover:text-lotus-300
						mb-8 group transition-colors duration-200"
			>
				<ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
				{$t('articles.allArticles')}
			</a>

			<div class="{metadata?.image ? 'lg:hidden' : ''} mb-6">
				{#if metadata?.category}
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
							bg-lotus-100 dark:bg-lotus-900/30 text-lotus-700 dark:text-lotus-300 mb-4">
						<Tag class="w-3 h-3" />
						{metadata.category}
					</span>
				{/if}
				<h1 class="font-heading text-3xl sm:text-4xl font-bold
						text-neutral-900 dark:text-neutral-100 leading-tight">
					{displayTitle}
				</h1>
			</div>

			<div class="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8
					border-b border-neutral-200 dark:border-neutral-800">
				<div class="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">

					{#if metadata?.author}
						<span class="flex items-center gap-2">
							{#if metadata?.icon}
								<img 
									src={metadata.icon} 
									alt={metadata.author}
									class="w-12 h-12 rounded-full object-cover shadow-sm"
								/>
							{:else}
								<span class="w-6 h-6 rounded-full bg-gradient-to-br from-lotus-400 to-lotus-600
										flex items-center justify-center shadow-sm">
									<User class="w-3 h-3 text-white" />
								</span>
							{/if}
							<span class="font-medium text-neutral-700 dark:text-neutral-300">{metadata.author}</span>
						</span>
					{/if}


 					{#if metadata?.author}
						<span class="flex items-center gap-2">
							<span class="w-6 h-6 rounded-full bg-gradient-to-br from-lotus-400 to-lotus-600
									flex items-center justify-center shadow-sm">
								<User class="w-3 h-3 text-white" />
							</span>
							<span class="font-medium text-neutral-700 dark:text-neutral-300">{metadata.author}</span>
						</span>
					{/if} 





					{#if metadata?.date}
						<span class="flex items-center gap-1.5">
							<Calendar class="w-4 h-4" />
							{new Date(metadata.date).toLocaleDateString(
								$locale === 'vi' ? 'vi-VN' : 'en-US',
								{ year: 'numeric', month: 'long', day: 'numeric' }
							)}
						</span>
					{/if}
					{#if metadata?.readTime}
						<span class="flex items-center gap-1.5">
							<Clock class="w-4 h-4" />
							{metadata.readTime} {$t('articles.minRead')}
						</span>
					{/if}
				</div>

				<button
					onclick={share}
					aria-label="Share article"
					class="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
							border border-neutral-200 dark:border-neutral-700
							text-neutral-500 dark:text-neutral-400
							hover:border-lotus-300 hover:text-lotus-600
							dark:hover:border-lotus-700 dark:hover:text-lotus-400
							transition-all duration-200"
				>
					<Share2 class="w-3.5 h-3.5" />
					Share
				</button>
			</div>



			<div class="
				prose prose-neutral dark:prose-invert max-w-none

				prose-headings:font-heading
				prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100
				prose-h1:text-3xl
				prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2
				prose-h2:border-b prose-h2:border-neutral-100 dark:prose-h2:border-neutral-800
				prose-h3:text-xl prose-h3:text-lotus-700 dark:prose-h3:text-lotus-300

				prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-[1.85]
				prose-p:text-[1.05rem]

				prose-a:text-lotus-600 dark:prose-a:text-lotus-400
				prose-a:no-underline prose-a:font-medium prose-a:border-b
				prose-a:border-lotus-200 dark:prose-a:border-lotus-800
				hover:prose-a:border-lotus-500
				prose-a:transition-colors prose-a:duration-150

				prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
				prose-strong:font-semibold

				prose-blockquote:border-l-4 prose-blockquote:border-lotus-400
				prose-blockquote:bg-lotus-50 dark:prose-blockquote:bg-lotus-900/20
				prose-blockquote:rounded-r-2xl prose-blockquote:py-3 prose-blockquote:px-5
				prose-blockquote:not-italic
				prose-blockquote:text-neutral-700 dark:prose-blockquote:text-neutral-300

				prose-code:text-lotus-700 dark:prose-code:text-lotus-300
				prose-code:bg-lotus-50 dark:prose-code:bg-lotus-900/30
				prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5
				prose-code:font-medium prose-code:text-[0.9em]
				prose-code:before:content-[''] prose-code:after:content-['']

				prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950
				prose-pre:rounded-2xl prose-pre:shadow-xl

				prose-img:rounded-2xl prose-img:shadow-lg prose-img:mx-auto

				prose-ul:my-4 prose-ol:my-4
				prose-li:text-neutral-700 dark:prose-li:text-neutral-300 prose-li:my-1.5
				prose-ul:marker:text-lotus-400

				prose-hr:border-neutral-200 dark:prose-hr:border-neutral-800 prose-hr:my-10
			">
				<ArticleContent />
			</div>



			<div class="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800
					flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center gap-2.5">
					<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-lotus-400 to-lotus-600
							lotus-blob flex items-center justify-center shadow-sm">
						<Flower class="w-4 h-4 text-white" />
					</div>
					<div>
						<p class="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Yoga Hoa Sen</p>
						<p class="text-xs text-neutral-400">{metadata?.author ?? ''}</p>
					</div>
				</div>
				<button
					onclick={share}
					class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
							bg-gradient-to-r from-lotus-500 to-lotus-700 text-white shadow-md
							hover:shadow-lotus-300/40 hover:scale-105 transition-all duration-200"
				>
					<Share2 class="w-4 h-4" />
					{$locale === 'vi' ? 'Chia sẻ bài viết' : 'Share this article'}
				</button>
			</div>
		</div>
	</article>


	{#if related.length > 0}
		<section class="py-20 bg-stone-50 dark:bg-neutral-950">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex items-end justify-between mb-10">
					<div>
						<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-2">
							{$locale === 'vi' ? 'Cùng chủ đề' : 'Keep reading'}
						</p>
						<h2 class="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
							{$locale === 'vi' ? 'Bài Viết Liên Quan' : 'Related Articles'}
						</h2>
					</div>
					<a
						href="/articles"
						class="hidden sm:flex items-center gap-1.5 text-sm font-semibold
								text-lotus-600 dark:text-lotus-400 hover:text-lotus-700 transition-colors"
					>
						{$t('articles.allArticles')}
						<ArrowRight class="w-4 h-4" />
					</a>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each related as article}
						<ArticleCard {article} />
					{/each}
				</div>
			</div>
		</section>
	{:else}
		<section class="py-16 bg-stone-50 dark:bg-neutral-950">
			<div class="max-w-3xl mx-auto px-4 text-center">
				<a
					href="/articles"
					class="inline-flex items-center gap-2 px-6 py-3 rounded-full
							bg-gradient-to-r from-lotus-500 to-lotus-700 text-white font-semibold text-sm
							hover:shadow-lg hover:shadow-lotus-300/40 hover:scale-105 transition-all duration-200"
				>
					<ArrowLeft class="w-4 h-4" />
					{$t('articles.allArticles')}
				</a>
			</div>
		</section>
	{/if}

</div>
 -->