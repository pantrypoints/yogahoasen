<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { ChevronLeft, ChevronRight, Star } from 'lucide-svelte';
	import type { Testimonial } from '$lib/data/data';
	import { locale } from '$lib/i18n';

	interface Props {
		items: Testimonial[];
	}

	let { items }: Props = $props();

	let current = $state(0);
	let direction = $state(1);
	let auto: ReturnType<typeof setInterval>;

	function next() {
		direction = 1;
		current = (current + 1) % items.length;
		restart();
	}

	function prev() {
		direction = -1;
		current = (current - 1 + items.length) % items.length;
		restart();
	}

	function restart() {
		clearInterval(auto);
		auto = setInterval(next, 6000);
	}

	auto = setInterval(next, 6000);
	onDestroy(() => clearInterval(auto));
</script>

<div class="relative overflow-hidden">
	<!-- Slide -->
	{#key current}
		<div
			in:fly={{ x: direction * 60, opacity: 0, duration: 400 }}
			class="flex flex-col items-center text-center px-8"
		>
			<img
				src={items[current].avatar}
				alt={items[current].name}
				class="w-20 h-20 rounded-full object-cover ring-4 ring-lotus-200 dark:ring-lotus-800 mb-4"
			/>
			<!-- Stars -->
			<div class="flex gap-1 mb-4">
				{#each Array(items[current].rating) as _}
					<Star class="w-4 h-4 fill-saffron-400 text-saffron-400" />
				{/each}
			</div>
			<!-- Quote -->
			<blockquote class="text-lg text-neutral-700 dark:text-neutral-200 leading-relaxed mb-6 max-w-2xl">
				"{$locale === 'vi' ? items[current].textVi : items[current].text}"
			</blockquote>
			<div>
				<p class="font-semibold text-neutral-900 dark:text-neutral-100">{items[current].name}</p>
				<p class="text-sm text-lotus-500">{items[current].role}</p>
			</div>
		</div>
	{/key}

	<!-- Controls -->
	<div class="flex items-center justify-center gap-6 mt-8">
		<button
			onclick={prev}
			class="p-2 rounded-full border border-neutral-200 dark:border-neutral-700
						hover:bg-lotus-50 dark:hover:bg-lotus-900/30 transition-colors"
			aria-label="Previous"
		>
			<ChevronLeft class="w-5 h-5" />
		</button>

		<!-- Dots -->
		<div class="flex gap-2">
			{#each items as _, i}
				<button
					onclick={() => { direction = i > current ? 1 : -1; current = i; restart(); }}
					class="w-2 h-2 rounded-full transition-all duration-300
								{i === current ? 'w-6 bg-lotus-500' : 'bg-neutral-300 dark:bg-neutral-600'}"
					aria-label={`Go to slide ${i + 1}`}
				></button>
			{/each}
		</div>

		<button
			onclick={next}
			class="p-2 rounded-full border border-neutral-200 dark:border-neutral-700
						hover:bg-lotus-50 dark:hover:bg-lotus-900/30 transition-colors"
			aria-label="Next"
		>
			<ChevronRight class="w-5 h-5" />
		</button>
	</div>
</div>
