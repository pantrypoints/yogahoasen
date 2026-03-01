<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import Carousel from '$lib/components/Carousel.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import { testimonials, people, schedule, faqItems } from '$lib/data/data';
	import { articles } from '$lib/data/articles';
	import { events } from '$lib/data/events';
	import { fade, fly, scale } from 'svelte/transition';
	// import { inview } from 'svelte/action';  
	import {
		Wind, Heart, Moon, Sparkles, Baby, Users,
		MapPin, Phone, Mail, Clock, ChevronDown,
		Instagram, Send, Check, Flower, Leaf,
		Star, CalendarDays, ArrowRight
	} from 'lucide-svelte';

	// Intersection observer for reveal animations
	let visibleSections = $state<Record<string, boolean>>({});
	function reveal(node: Element, key: string) {
		const obs = new IntersectionObserver((entries) => {
			entries.forEach(e => { if (e.isIntersecting) { visibleSections[key] = true; obs.disconnect(); } });
		}, { threshold: 0.1 });
		obs.observe(node);
		return { destroy: () => obs.disconnect() };
	}

	// Services
	const serviceIcons = [Wind, Heart, Moon, Sparkles, Baby, Users];

	// Schedule
	const days = ['mon','tue','wed','thu','fri','sat','sun'] as const;
	let activeDay = $state<typeof days[number]>('mon');

	// Contact form
	let formData = $state({ name: '', email: '', message: '' });
	let formSent = $state(false);
	function submitForm(e: Event) {
		e.preventDefault();
		formSent = true;
		formData = { name: '', email: '', message: '' };
		setTimeout(() => formSent = false, 5000);
	}

	// Services data
	const serviceKeys = ['hatha','vinyasa','yin','meditation','prenatal','kids'] as const;

	// Stat counter animation
	let statsVisible = $state(false);
	const stats = [
		{ key: 'about.stat1', value: 35 },
		{ key: 'about.stat2', value: 4 },
		{ key: 'about.stat3', value: 500 }
	];
</script>

<!-- ═══════════════════════════════════════ 
     HERO — Full-screen video
═══════════════════════════════════════ -->
<section class="relative h-screen flex items-center justify-center overflow-hidden">
	<!-- Video background -->
	<video
		autoplay
		muted
		loop
		playsinline
		poster="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1600&q=80"
		class="absolute inset-0 w-full h-full object-cover"
	>
		<!-- Provide a real yoga video in /static/hero.mp4 for production -->
		<source src="/hero.mp4" type="video/mp4" />
	</video>

	<!-- Overlay gradient -->
	<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>

	<!-- Decorative lotus petal -->
	<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
		<div class="w-[600px] h-[600px] opacity-10 animate-petal-spin">
			<Flower class="w-full h-full text-lotus-300" />
		</div>
	</div>

	<!-- Hero content -->
	<div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
		<div in:fly={{ y: 30, delay: 200, duration: 700 }}>
			<p class="text-lotus-300 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
				🪷 Yoga Hoa Sen
			</p>
		</div>
		<div in:fly={{ y: 40, delay: 350, duration: 700 }}>
			<h1 class="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
				{$t('hero.tagline')}
			</h1>
		</div>
		<div in:fly={{ y: 30, delay: 500, duration: 700 }}>
			<p class="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
				{$t('hero.subtitle')}
			</p>
		</div>
		<div in:fly={{ y: 20, delay: 650, duration: 500 }} class="flex flex-wrap gap-4 justify-center">
			<a
				href="/#contact"
				class="px-8 py-4 rounded-full bg-gradient-to-r from-lotus-500 to-lotus-700 text-white
							font-semibold text-sm shadow-lg shadow-lotus-600/40 hover:shadow-lotus-500/60
							hover:scale-105 transition-all duration-200"
			>
				{$t('hero.cta')}
			</a>
			<a
				href="/#schedule"
				class="px-8 py-4 rounded-full border-2 border-white/60 text-white font-semibold text-sm
							hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
			>
				{$t('hero.ctaSecondary')}
			</a>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
		<ChevronDown class="w-6 h-6" />
	</div>
</section>

<!-- ═══════════════════════════════════════ 
     ABOUT
═══════════════════════════════════════ -->
<section
	id="about"
	class="py-24 bg-stone-50 dark:bg-neutral-950"
	use:reveal={'about'}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<!-- Visual -->
			<div class="relative {visibleSections.about ? 'animate-fade-up' : 'opacity-0'}">
				<div class="relative w-full max-w-md mx-auto">
					<!-- Main image -->
					<img
						src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80"
						alt="Yoga practice"
						class="rounded-3xl shadow-2xl w-full object-cover h-[480px]"
					/>
					<!-- Floating badge -->
					<div
						class="absolute -bottom-6 -right-6 w-36 h-36 lotus-blob
									bg-gradient-to-br from-lotus-400 to-lotus-600 flex flex-col items-center justify-center
									text-white shadow-lg shadow-lotus-400/40"
					>
						<span class="text-3xl font-bold">7+</span>
						<span class="text-xs text-center leading-tight px-4">Years of Bloom</span>
					</div>
					<!-- Decoration -->
					<div class="absolute -top-4 -left-4 w-24 h-24 lotus-blob bg-saffron-300/50 dark:bg-saffron-900/30"></div>
				</div>
			</div>

			<!-- Text -->
			<div class="{visibleSections.about ? 'animate-fade-up' : 'opacity-0'}" style="animation-delay:200ms">
				<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
					{$t('about.subtitle')}
				</p>
				<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
					{$t('about.title')}
				</h2>
				<p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
					{$t('about.body')}
				</p>
				<p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-10">
					{$t('about.body2')}
				</p>

				<!-- Stats -->
				<div class="grid grid-cols-3 gap-6" use:reveal={'stats'}>
					{#each stats as stat, i}
						<div class="text-center">
							<div class="text-3xl font-bold gradient-text mb-1">{stat.value}+</div>
							<div class="text-xs text-neutral-500 dark:text-neutral-400">{$t(stat.key)}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════ 
     SERVICES
═══════════════════════════════════════ -->
<section
	id="services"
	class="py-24 bg-white dark:bg-neutral-900"
	use:reveal={'services'}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-16 {visibleSections.services ? 'animate-fade-up' : 'opacity-0'}">
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				{$t('services.subtitle')}
			</p>
			<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
				{$t('services.title')}
			</h2>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each serviceKeys as key, i}
				{@const Icon = serviceIcons[i]}
				<div
					class="group p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800
								hover:border-lotus-200 dark:hover:border-lotus-700
								hover:shadow-lg hover:shadow-lotus-100/50 dark:hover:shadow-lotus-900/30
								transition-all duration-300 bg-stone-50 dark:bg-neutral-800/50
								{visibleSections.services ? 'animate-fade-up' : 'opacity-0'}"
					style="animation-delay:{i * 80}ms"
				>
					<div
						class="w-14 h-14 rounded-2xl bg-gradient-to-br from-lotus-100 to-lotus-200
									dark:from-lotus-900/50 dark:to-lotus-800/50 flex items-center justify-center mb-4
									group-hover:scale-110 transition-transform duration-300"
					>
						<Icon class="w-7 h-7 text-lotus-600 dark:text-lotus-400" />
					</div>
					<h3 class="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-2">
						{$t(`services.${key}.name`)}
					</h3>
					<p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
						{$t(`services.${key}.desc`)}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════ 
     CLASS SCHEDULE
═══════════════════════════════════════ -->
<section
	id="schedule"
	class="py-24 bg-gradient-to-br from-lotus-50 to-pink-50 dark:from-neutral-950 dark:to-neutral-900"
	use:reveal={'schedule'}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12 {visibleSections.schedule ? 'animate-fade-up' : 'opacity-0'}">
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				{$t('schedule.subtitle')}
			</p>
			<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
				{$t('schedule.title')}
			</h2>
		</div>

		<!-- Day tabs -->
		<div class="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-hide justify-start lg:justify-center">
			{#each days as day}
				<button
					onclick={() => activeDay = day}
					class="flex-none px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
								{activeDay === day
							? 'bg-lotus-600 text-white shadow-md shadow-lotus-300/40'
							: 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-lotus-50 dark:hover:bg-lotus-900/30'}"
				>
					{$t(`schedule.${day}`)}
				</button>
			{/each}
		</div>

		<!-- Classes for active day -->
		{#key activeDay}
			<div
				in:fly={{ x: 20, duration: 250 }}
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
			>
				{#each schedule[activeDay] as cls}
					<div
						class="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-800
									hover:shadow-md transition-all duration-200"
					>
						<div class="text-2xl font-bold text-lotus-600 dark:text-lotus-400 mb-2">{cls.time}</div>
						<h4 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{cls.name}</h4>
						<p class="text-xs text-neutral-500 mb-3">{cls.teacher} · {cls.duration} min</p>
						<div class="flex items-center justify-between">
							<span
								class="text-xs px-2 py-0.5 rounded-full
											{cls.level === 'Beginner' ? 'bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-400'
										: cls.level === 'Advanced' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
										: 'bg-lotus-100 text-lotus-700 dark:bg-lotus-900/30 dark:text-lotus-400'}"
							>
								{cls.level}
							</span>
							<span class="text-xs text-neutral-400">
								{cls.spots === 0 ? $t('schedule.full') : `${cls.spots} ${$t('schedule.spots')}`}
							</span>
						</div>
						<button
							disabled={cls.spots === 0}
							class="mt-3 w-full py-2 rounded-xl text-xs font-semibold transition-all
										{cls.spots === 0
									? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
									: 'bg-lotus-500 text-white hover:bg-lotus-600'}"
						>
							{cls.spots === 0 ? $t('schedule.full') : $t('schedule.bookNow')}
						</button>
					</div>
				{/each}
			</div>
		{/key}
	</div>
</section>

<!-- ═══════════════════════════════════════ 
     TESTIMONIALS
═══════════════════════════════════════ -->
<section
	id="testimonials"
	class="py-24 bg-white dark:bg-neutral-900"
	use:reveal={'testimonials'}
>
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12 {visibleSections.testimonials ? 'animate-fade-up' : 'opacity-0'}">
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				{$t('testimonials.subtitle')}
			</p>
			<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
				{$t('testimonials.title')}
			</h2>
		</div>

		<div class="{visibleSections.testimonials ? 'animate-fade-up' : 'opacity-0'}" style="animation-delay:200ms">
			<Carousel items={testimonials} />
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════ 
     RECENT ARTICLES
═══════════════════════════════════════ -->
<section
	id="blog"
	class="py-24 bg-stone-50 dark:bg-neutral-950"
	use:reveal={'articles'}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-end justify-between mb-12 {visibleSections.articles ? 'animate-fade-up' : 'opacity-0'}">
			<div>
				<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
					{$t('articles.subtitle')}
				</p>
				<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
					{$t('articles.title')}
				</h2>
			</div>
			<a
				href="/articles"
				class="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-lotus-600 dark:text-lotus-400
							hover:text-lotus-700 transition-colors"
			>
				{$t('articles.allArticles')}
				<ArrowRight class="w-4 h-4" />
			</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each articles.slice(0, 3) as article, i}
				<div
					class="{visibleSections.articles ? 'animate-fade-up' : 'opacity-0'}"
					style="animation-delay:{i * 100}ms"
				>
					<ArticleCard {article} />
				</div>
			{/each}
		</div>

		<div class="text-center mt-10 sm:hidden">
			<a
				href="/articles"
				class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-lotus-300 text-lotus-600 font-semibold text-sm hover:bg-lotus-50 transition-colors"
			>
				{$t('articles.allArticles')} <ArrowRight class="w-4 h-4" />
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════ 
     PEOPLE / TEACHERS
═══════════════════════════════════════ -->
<section
	id="teachers"
	class="py-24 bg-white dark:bg-neutral-900"
	use:reveal={'people'}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-14 {visibleSections.people ? 'animate-fade-up' : 'opacity-0'}">
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				{$t('people.subtitle')}
			</p>
			<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
				{$t('people.title')}
			</h2>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each people as person, i}
				<div
					class="group text-center {visibleSections.people ? 'animate-fade-up' : 'opacity-0'}"
					style="animation-delay:{i * 100}ms"
				>
					<div class="relative w-40 h-40 mx-auto mb-5">
						<div
							class="absolute inset-0 lotus-blob bg-gradient-to-br from-lotus-200 to-lotus-400
										dark:from-lotus-900/50 dark:to-lotus-700/50
										group-hover:scale-110 transition-transform duration-300"
						></div>
						<img
							src={person.avatar}
							alt={person.name}
							class="absolute inset-2 lotus-blob object-cover w-[calc(100%-16px)] h-[calc(100%-16px)]"
						/>
					</div>
					<h3 class="font-semibold text-lg text-neutral-900 dark:text-neutral-100">{person.name}</h3>
					<p class="text-sm text-lotus-500 mb-3">
						{$locale === 'vi' ? person.roleVi : person.role}
					</p>
					<p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
						{$locale === 'vi' ? person.bioVi : person.bio}
					</p>
					<div class="flex flex-wrap justify-center gap-1">
						{#each person.specialties as specialty}
							<span class="px-2 py-0.5 text-xs rounded-full bg-lotus-50 dark:bg-lotus-900/30 text-lotus-600 dark:text-lotus-400">
								{specialty}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════ 
     EVENTS
═══════════════════════════════════════ -->
<section
	id="events"
	class="py-24 bg-stone-50 dark:bg-neutral-950"
	use:reveal={'events'}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-end justify-between mb-12 {visibleSections.events ? 'animate-fade-up' : 'opacity-0'}">
			<div>
				<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
					{$t('events.subtitle')}
				</p>
				<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
					{$t('events.title')}
				</h2>
			</div>
			<a
				href="/events"
				class="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-lotus-600 dark:text-lotus-400 hover:text-lotus-700"
			>
				{$t('events.allEvents')} <ArrowRight class="w-4 h-4" />
			</a>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each events.slice(0, 3) as event, i}
				<div
					class="{visibleSections.events ? 'animate-fade-up' : 'opacity-0'}"
					style="animation-delay:{i * 100}ms"
				>
					<EventCard {event} />
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════ 
     MAP + CONTACT
═══════════════════════════════════════ -->
<section
	id="contact"
	class="py-24 bg-white dark:bg-neutral-900"
	use:reveal={'contact'}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-14 {visibleSections.contact ? 'animate-fade-up' : 'opacity-0'}">
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				{$t('contact.subtitle')}
			</p>
			<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
				{$t('contact.title')}
			</h2>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Left: Map + contact info -->
			<div class="{visibleSections.contact ? 'animate-fade-up' : 'opacity-0'}">
				<!-- Map embed -->
				<div class="rounded-2xl overflow-hidden mb-8 shadow-lg">
					<iframe
						src="https://www.openstreetmap.org/export/embed.html?bbox=105.8400%2C21.0200%2C105.8600%2C21.0350&layer=mapnik&marker=21.0285%2C105.8542"
						width="100%"
						height="300"
						style="border:0"
						loading="lazy"
						title="Studio Location"
						class="w-full"
					></iframe>
				</div>

				<!-- Contact details -->
				<div class="space-y-4">
					{#each [
						{ icon: MapPin, label: $t('contact.address'), value: '123 Hoa Sen Street, Hoan Kiem, Hanoi' },
						{ icon: Phone, label: $t('contact.phone'), value: '+84 24 1234 5678' },
						{ icon: Mail, label: $t('contact.email'), value: 'namaste@yogahoasen.vn' },
						{ icon: Clock, label: $t('contact.hours'), value: $t('contact.hoursValue') }
					] as item}
						<div class="flex items-start gap-4">
							<div class="w-10 h-10 rounded-xl bg-lotus-50 dark:bg-lotus-900/30 flex items-center justify-center flex-none">
								<item.icon class="w-5 h-5 text-lotus-500" />
							</div>
							<div>
								<p class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">{item.label}</p>
								<p class="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line">{item.value}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right: Contact form -->
			<div class="{visibleSections.contact ? 'animate-fade-up' : 'opacity-0'}" style="animation-delay:200ms">
				<div class="bg-stone-50 dark:bg-neutral-800/50 rounded-2xl p-8 border border-neutral-100 dark:border-neutral-700">
					{#if formSent}
						<div in:scale={{ duration: 300 }} class="flex flex-col items-center justify-center py-12 text-center">
							<div class="w-16 h-16 rounded-full bg-sage-100 dark:bg-sage-900/30 flex items-center justify-center mb-4">
								<Check class="w-8 h-8 text-sage-600" />
							</div>
							<p class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
								{$t('contact.formSuccess')}
							</p>
						</div>
					{:else}
						<form onsubmit={submitForm} class="space-y-5">
							<div>
								<label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5">
									{$t('contact.formName')}
								</label>
								<input
									type="text"
									required
									bind:value={formData.name}
									class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700
												bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100
												focus:border-lotus-400 focus:ring-0 text-sm transition-colors"
								/>
							</div>
							<div>
								<label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5">
									{$t('contact.formEmail')}
								</label>
								<input
									type="email"
									required
									bind:value={formData.email}
									class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700
												bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100
												focus:border-lotus-400 focus:ring-0 text-sm transition-colors"
								/>
							</div>
							<div>
								<label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5">
									{$t('contact.formMessage')}
								</label>
								<textarea
									rows="5"
									required
									bind:value={formData.message}
									class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700
												bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100
												focus:border-lotus-400 focus:ring-0 text-sm transition-colors resize-none"
								></textarea>
							</div>
							<button
								type="submit"
								class="w-full py-3.5 rounded-xl font-semibold text-sm text-white
											bg-gradient-to-r from-lotus-500 to-lotus-700
											hover:shadow-lg hover:shadow-lotus-300/40 hover:scale-[1.01]
											transition-all duration-200 flex items-center justify-center gap-2"
							>
								<Send class="w-4 h-4" />
								{$t('contact.formSend')}
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
