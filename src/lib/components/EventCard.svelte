<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { Calendar, Clock, MapPin, Users } from 'lucide-svelte';
	import type { Event } from '$lib/data/events';

	interface Props {
		event: Event;
	}
	let { event }: Props = $props();

	const formattedDate = $derived(
		new Date(event.date).toLocaleDateString($locale === 'vi' ? 'vi-VN' : 'en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		})
	);

	const priceDisplay = $derived(
		event.price === 'free'
			? $t('events.free')
			: new Intl.NumberFormat($locale === 'vi' ? 'vi-VN' : 'en-US', {
					style: 'currency',
					currency: 'VND',
					maximumFractionDigits: 0
				}).format(event.price as number)
	);
</script>

<div class="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm
				border border-neutral-100 dark:border-neutral-800 hover:shadow-lg hover:shadow-lotus-200/30
				transition-all duration-300 hover:-translate-y-1">
	<!-- Image -->
	<div class="relative h-44 overflow-hidden">
		<img
			src={event.image}
			alt={$locale === 'vi' ? event.titleVi : event.title}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		<!-- Category badge -->
		<span class="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full
							bg-saffron-400/90 text-neutral-900 backdrop-blur-sm">
			{event.category}
		</span>
		<!-- Price badge -->
		<span class="absolute bottom-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full
							{event.price === 'free' ? 'bg-sage-500 text-white' : 'bg-white/90 text-neutral-900'}">
			{priceDisplay}
		</span>
	</div>

	<!-- Content -->
	<div class="p-5">
		<h3 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 leading-snug
							group-hover:text-lotus-600 dark:group-hover:text-lotus-400 transition-colors">
			{$locale === 'vi' ? event.titleVi : event.title}
		</h3>

		<div class="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
			<div class="flex items-center gap-1.5">
				<Calendar class="w-3.5 h-3.5 text-lotus-500" />
				{formattedDate} · {event.time}
			</div>
			<div class="flex items-center gap-1.5">
				<Clock class="w-3.5 h-3.5 text-lotus-500" />
				{event.duration} · {event.teacher}
			</div>
			<div class="flex items-center gap-1.5">
				<MapPin class="w-3.5 h-3.5 text-lotus-500" />
				{event.location}
			</div>
			<div class="flex items-center gap-1.5">
				<Users class="w-3.5 h-3.5 text-lotus-500" />
				{event.spotsLeft === 0 ? $t('schedule.full') : `${event.spotsLeft} ${$t('schedule.spots')}`}
			</div>
		</div>




 


{#if event.register}
	<a href={event.register} 
		target="_blank" 
		rel="noopener noreferrer"
		class="block w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 bg-gradient-to-r from-lotus-500 to-lotus-700 text-white hover:shadow-md hover:shadow-lotus-300/30 hover:scale-[1.02]">
		{$t('events.register')}
	</a>
{:else}
	<button 
		onclick={() => {
			// Scroll to contact form and pre-fill message with event title
			const contactSection = document.getElementById('contact');
			if (contactSection) {
				contactSection.scrollIntoView({ behavior: 'smooth' });
				
				// If you have a form data store, you can pre-fill the message
				// For example: formData.message = `I'm interested in the event: ${event.title}`;
			}
		}}
		class="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-lotus-500 to-lotus-700 text-white hover:shadow-md hover:shadow-lotus-300/30 hover:scale-[1.02]"
	>
		{$t('events.contactUs') || 'Contact Us'}
	</button>
{/if}



	</div>
</div>
