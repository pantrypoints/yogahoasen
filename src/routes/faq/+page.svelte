<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { faqItems } from '$lib/data/data';
	import { slide, fly } from 'svelte/transition';
	import { ChevronDown, HelpCircle } from 'lucide-svelte';

	let openIndex = $state<number | null>(null);

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<svelte:head>
	<title>{$t('faq.title')} · Yoga Hoa Sen</title>
</svelte:head>

<!-- Header -->
<div class="pt-32 pb-16 bg-gradient-to-br from-lotus-50 via-stone-50 to-sage-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
		<div in:fly={{ y: 20, duration: 500 }}>
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				{$t('faq.subtitle')}
			</p>
			<h1 class="font-heading text-5xl font-bold text-neutral-900 dark:text-neutral-100">
				{$t('faq.title')}
			</h1>
		</div>
	</div>
</div>

<!-- Decorative lotus -->
<div class="relative overflow-hidden">
	<div class="absolute right-0 top-0 w-96 h-96 opacity-5 pointer-events-none">
		<div class="w-full h-full lotus-blob bg-lotus-400"></div>
	</div>

	<div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
		<div class="space-y-3">
			{#each faqItems as item, i}
				<div
					in:fly={{ y: 10, delay: i * 60, duration: 300 }}
					class="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800
								overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
				>
					<button
						onclick={() => toggle(i)}
						class="w-full flex items-center justify-between px-6 py-5 text-left"
					>
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 rounded-xl bg-lotus-50 dark:bg-lotus-900/30 flex items-center justify-center flex-none">
								<HelpCircle class="w-4 h-4 text-lotus-500" />
							</div>
							<span class="font-semibold text-neutral-900 dark:text-neutral-100">
								{$locale === 'vi' ? item.qVi : item.q}
							</span>
						</div>
						<div
							class="flex-none w-7 h-7 rounded-full bg-stone-100 dark:bg-neutral-800 flex items-center justify-center
										transition-transform duration-300 {openIndex === i ? 'rotate-180' : ''}"
						>
							<ChevronDown class="w-4 h-4 text-neutral-500" />
						</div>
					</button>

					{#if openIndex === i}
						<div transition:slide={{ duration: 250 }}>
							<div class="px-6 pb-5 pt-0">
								<div class="ml-11 text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed border-l-2 border-lotus-200 dark:border-lotus-800 pl-4">
									{$locale === 'vi' ? item.aVi : item.a}
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- CTA -->
		<div class="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-lotus-50 to-pink-50 dark:from-lotus-900/20 dark:to-pink-900/10 border border-lotus-100 dark:border-lotus-800/30">
			<p class="text-neutral-600 dark:text-neutral-300 mb-4">
				Still have questions? We're happy to help.
			</p>
			<a
				href="/#contact"
				class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-lotus-500 to-lotus-700
							text-white font-semibold text-sm hover:shadow-lg hover:shadow-lotus-300/40 hover:scale-105 transition-all duration-200"
			>
				{$t('nav.bookClass')}
			</a>
		</div>
	</div>
</div>
