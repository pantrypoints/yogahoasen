<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { people } from '$lib/data/data';
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import {
		Sun, Coffee, Wind, Moon, Clock, Users, Star,
		MapPin, Phone, Tag, ChevronRight, Sparkles,
		Instagram, CheckCircle
	} from 'lucide-svelte';

	// ── Session data ─────────────────────────────────────────────
	const sessions = [
		{
			id: 1,
			icon: Sun,
			time: '6:00 → 7:15',
			label: 'Ca 1',
			labelEn: 'Session 1',
			gradient: 'from-amber-400 via-orange-400 to-rose-400',
			bg: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20',
			border: 'border-amber-200 dark:border-amber-800/40',
			accent: 'text-amber-600 dark:text-amber-400',
			pill: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
			photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
			nameKey: 'classes.session1Name',
			descKey: 'classes.session1Desc',
			tags: ['Hatha', 'Vinyasa', 'Breathwork']
		},
		{
			id: 2,
			icon: Coffee,
			time: '11:30 → 12:45',
			label: 'Ca 2',
			labelEn: 'Session 2',
			gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
			bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20',
			border: 'border-emerald-200 dark:border-emerald-800/40',
			accent: 'text-emerald-600 dark:text-emerald-400',
			pill: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
			photo: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80',
			nameKey: 'classes.session2Name',
			descKey: 'classes.session2Desc',
			tags: ['Flow', 'Yin', 'Reset']
		},
		{
			id: 3,
			icon: Wind,
			time: '17:45 → 19:00',
			label: 'Ca 3',
			labelEn: 'Session 3',
			gradient: 'from-violet-400 via-purple-400 to-lotus-400',
			bg: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20',
			border: 'border-violet-200 dark:border-violet-800/40',
			accent: 'text-violet-600 dark:text-violet-400',
			pill: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
			photo: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80',
			nameKey: 'classes.session3Name',
			descKey: 'classes.session3Desc',
			tags: ['Vinyasa', 'Power', 'Stretch']
		},
		{
			id: 4,
			icon: Moon,
			time: '19:00 → 20:30',
			label: 'Ca 4',
			labelEn: 'Session 4',
			gradient: 'from-indigo-400 via-blue-400 to-cyan-500',
			bg: 'from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/20',
			border: 'border-indigo-200 dark:border-indigo-800/40',
			accent: 'text-indigo-600 dark:text-indigo-400',
			pill: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
			photo: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&q=80',
			nameKey: 'classes.session4Name',
			descKey: 'classes.session4Desc',
			tags: ['Yin', 'Restorative', 'Nidra']
		}
	];

	// Gallery images
	const galleryImages = [
		{ src: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80', alt: 'Group yoga class' },
		{ src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80', alt: 'Yoga instructor' },
		{ src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', alt: 'Yoga pose' },
		{ src: 'https://images.unsplash.com/photo-1510894347713-fc3dc6166086?w=600&q=80', alt: 'Yin yoga class' },
		{ src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', alt: 'Morning practice' },
		{ src: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=600&q=80', alt: 'Beginners class' }
	];

	// Contacts
	const contacts = [
		{ name: 'Cô Châu', role: 'Liên hệ đăng ký', phone: '0918.873.316', avatar: 'https://i.pravatar.cc/120?img=47' },
		{ name: 'Cô Khanh', role: 'Liên hệ đăng ký', phone: '0903.004.984', avatar: 'https://i.pravatar.cc/120?img=56' }
	];

	// Offers
	const offers = [
		{ emoji: '🎁', labelKey: 'classes.offer1Label', discountKey: 'classes.offer1Discount', highlight: false },
		{ emoji: '⭐', labelKey: 'classes.offer2Label', discountKey: 'classes.offer2Discount', highlight: true },
		{ emoji: '👥', labelKey: 'classes.offer3Label', discountKey: 'classes.offer3Discount', highlight: false }
	];

	// ── Intersection observer for reveal animations ──────────────
	type SectionKey = 'hero' | 'sessions' | 'instructors' | 'gallery' | 'contact' | `session-${number}`;
	let visible = $state<Partial<Record<SectionKey, boolean>>>({});

	function revealOn(node: Element, key: SectionKey) {
		const obs = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { visible[key] = true; obs.disconnect(); } },
			{ threshold: 0.12 }
		);
		obs.observe(node);
		return { destroy: () => obs.disconnect() };
	}
</script>

<svelte:head>
	<title>{$t('classes.title')} · Yoga Hoa Sen</title>
</svelte:head>

<!-- ══════════════════════════════════════
     HERO
══════════════════════════════════════ -->
<section class="relative min-h-[55vh] flex items-center overflow-hidden pt-20">
	<!-- Background image -->
	<div class="absolute inset-0">
		<img
			src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1600&q=80"
			alt="Yoga class"
			class="w-full h-full object-cover"
		/>
		<div class="absolute inset-0 bg-gradient-to-br from-neutral-950/80 via-lotus-950/60 to-neutral-900/70"></div>
	</div>

	<!-- Decorative petal ring -->
	<div class="absolute right-0 top-0 w-[500px] h-[500px] opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
		<div class="w-full h-full lotus-blob bg-gradient-to-br from-lotus-300 to-saffron-300 animate-petal-spin"></div>
	</div>

	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div in:fly={{ y: 30, duration: 700, delay: 100 }}>
			<p class="text-lotus-300 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
				🪷 Yoga Hoa Sen
			</p>
			<h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl">
				{$t('classes.heroTitle')}
			</h1>
			<p class="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
				{$t('classes.daily')} · {$t('classes.duration')} · {$t('classes.allLevels')}
			</p>
			<div class="flex flex-wrap gap-3">
				{#each sessions as s}
					<a
						href="#session-{s.id}"
						class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm
									border border-white/20 text-white text-sm font-medium
									hover:bg-white/20 transition-all duration-200"
					>
						<s.icon class="w-4 h-4" />
						{s.label} · {s.time}
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════
     SESSION CARDS — staggered scroll reveal
══════════════════════════════════════ -->
<section class="py-24 bg-stone-50 dark:bg-neutral-950" id="sessions">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

		<div class="text-center mb-16" use:revealOn={'sessions'}>
			{#if visible.sessions}
				<div in:fly={{ y: 20, duration: 500 }}>
					<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
						{$t('classes.subtitle')}
					</p>
					<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
						{$t('classes.title')}
					</h2>
				</div>
			{/if}
		</div>

		<!-- Each session is a wide horizontal card that reveals as it enters viewport -->
		<div class="space-y-8">
			{#each sessions as session, i}
				{@const key = `session-${session.id}` as const}
				<div id="session-{session.id}" use:revealOn={key}>
					{#if visible[key]}
						<div
							in:fly={{ x: i % 2 === 0 ? -60 : 60, y: 20, duration: 600, delay: 80, easing: cubicOut }}
							class="group relative flex flex-col lg:flex-row {i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}
										overflow-hidden rounded-3xl border {session.border}
										bg-gradient-to-br {session.bg} shadow-sm hover:shadow-xl
										transition-all duration-500 hover:-translate-y-1"
						>
							<!-- Photo side -->
							<div class="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden">
								<img
									src={session.photo}
									alt={$t(session.nameKey)}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
								/>
								<!-- Gradient overlay -->
								<div class="absolute inset-0 bg-gradient-to-r {i % 2 !== 0 ? 'lg:bg-gradient-to-l' : ''} from-transparent to-black/20"></div>

								<!-- Time badge pinned to image -->
								<div class="absolute top-4 {i % 2 !== 0 ? 'right-4' : 'left-4'}
											bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm
											rounded-2xl px-4 py-3 shadow-lg">
									<div class="flex items-center gap-2">
										<div class="w-8 h-8 rounded-xl bg-gradient-to-br {session.gradient} flex items-center justify-center shadow-sm">
											<session.icon class="w-4 h-4 text-white" />
										</div>
										<div>
											<p class="text-xs font-bold text-neutral-500 dark:text-neutral-400 leading-none">{session.label}</p>
											<p class="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{session.time}</p>
										</div>
									</div>
								</div>
							</div>

							<!-- Content side -->
							<div class="flex-1 flex flex-col justify-center p-8 lg:p-10">
								<!-- Label row -->
								<div class="flex items-center gap-2 mb-3">
									<span class="text-xs font-bold uppercase tracking-widest {session.accent}">{session.label}</span>
									<span class="w-1 h-1 rounded-full bg-current {session.accent}"></span>
									<span class="text-xs text-neutral-400">{$t('classes.daily')}</span>
								</div>

								<h3 class="font-heading text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
									{$t(session.nameKey)}
									<span class="font-normal text-lg {session.accent}"> — {session.time}</span>
								</h3>

								<p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 max-w-lg">
									{$t(session.descKey)}
								</p>

								<!-- Tags -->
								<div class="flex flex-wrap gap-2 mb-6">
									{#each session.tags as tag}
										<span class="px-3 py-1 rounded-full text-xs font-semibold {session.pill}">
											{tag}
										</span>
									{/each}
									<span class="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
										{$t('classes.duration')}
									</span>
									<span class="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
										{$t('classes.allLevels')}
									</span>
								</div>

								<!-- CTA -->
								<div class="flex items-center gap-4">
									<a
										href="#contact-section"
										class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
													bg-gradient-to-r {session.gradient} shadow-md
													hover:shadow-lg hover:scale-105 transition-all duration-200"
									>
										{$t('classes.bookNow')}
										<ChevronRight class="w-4 h-4" />
									</a>
									<div class="flex items-center gap-1.5 text-xs text-neutral-400">
										<Users class="w-3.5 h-3.5" />
										{$t('classes.allLevels')}
									</div>
								</div>
							</div>
						</div>
					{:else}
						<!-- Placeholder to maintain layout height before reveal -->
						<div class="h-64 lg:h-56 rounded-3xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════
     INSTRUCTORS
══════════════════════════════════════ -->
<section class="py-24 bg-white dark:bg-neutral-900" use:revealOn={'instructors'}>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if visible.instructors}
			<div class="text-center mb-14" in:fly={{ y: 20, duration: 500 }}>
				<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
					{$t('classes.instructorSub')}
				</p>
				<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
					{$t('classes.instructors')}
				</h2>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each people as person, i}
					<div
						in:fly={{ y: 30, delay: i * 100, duration: 500, easing: cubicOut }}
						class="group text-center"
					>
						<!-- Avatar with animated lotus border -->
						<div class="relative w-44 h-44 mx-auto mb-5">
							<!-- Spinning gradient ring -->
							<div class="absolute inset-0 rounded-full bg-gradient-to-br from-lotus-400 via-saffron-400 to-lotus-600
										group-hover:animate-petal-spin opacity-80 group-hover:opacity-100 transition-opacity duration-300"
							></div>
							<div class="absolute inset-1 rounded-full bg-white dark:bg-neutral-900"></div>
							<img
								src={person.avatar}
								alt={person.name}
								class="absolute inset-2 rounded-full object-cover w-[calc(100%-16px)] h-[calc(100%-16px)]
										group-hover:scale-105 transition-transform duration-300"
							/>
							<!-- Online dot -->
							<div class="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-sage-400 border-2 border-white dark:border-neutral-900"></div>
						</div>

						<h3 class="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-0.5">
							{person.name}
						</h3>
						<p class="text-sm text-lotus-500 font-medium mb-3">
							{$locale === 'vi' ? person.roleVi : person.role}
						</p>
						<p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 px-2">
							{$locale === 'vi' ? person.bioVi : person.bio}
						</p>

						<!-- Specialty tags -->
						<div class="flex flex-wrap justify-center gap-1.5">
							{#each person.specialties as spec}
								<span class="px-2.5 py-0.5 rounded-full text-xs font-medium
											bg-lotus-50 dark:bg-lotus-900/30 text-lotus-600 dark:text-lotus-400">
									{spec}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="h-80 rounded-3xl bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
		{/if}
	</div>
</section>

<!-- ══════════════════════════════════════
     GALLERY — masonry-style grid
══════════════════════════════════════ -->
<section class="py-24 bg-stone-50 dark:bg-neutral-950" use:revealOn={'gallery'}>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if visible.gallery}
			<div class="text-center mb-12" in:fly={{ y: 20, duration: 500 }}>
				<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
					{$t('classes.gallerySub')}
				</p>
				<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
					{$t('classes.gallery')}
				</h2>
			</div>

			<!-- Gallery grid -->
			<div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
				{#each galleryImages as img, i}
					<div
						in:scale={{ start: 0.9, duration: 400, delay: i * 80, easing: cubicOut }}
						class="group relative overflow-hidden rounded-2xl
									{i === 0 ? 'row-span-2' : ''} aspect-square"
						style="aspect-ratio: {i === 0 ? '1/1' : '1/1'}"
					>
						<img
							src={img.src}
							alt={img.alt}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent
									opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="h-96 rounded-3xl bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
		{/if}
	</div>
</section>

<!-- ══════════════════════════════════════
     CONTACT + OFFERS
══════════════════════════════════════ -->
<section id="contact-section" class="py-24 bg-white dark:bg-neutral-900" use:revealOn={'contact'}>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if visible.contact}
			<div class="text-center mb-14" in:fly={{ y: 20, duration: 500 }}>
				<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
					{$t('classes.contactSub')}
				</p>
				<h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
					{$t('classes.contact')}
				</h2>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

				<!-- ── Contact people ── -->
				<div class="lg:col-span-1 space-y-5" in:fly={{ x: -30, duration: 500, delay: 100 }}>
					<h3 class="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-4">
						📞 Thông Tin Liên Hệ
					</h3>

					<!-- Studio address -->
					<div class="flex items-start gap-3 p-4 rounded-2xl bg-lotus-50 dark:bg-lotus-900/20 border border-lotus-100 dark:border-lotus-800/30">
						<div class="w-9 h-9 rounded-xl bg-lotus-500 flex items-center justify-center flex-none shadow-sm">
							<MapPin class="w-4 h-4 text-white" />
						</div>
						<div>
							<p class="text-xs font-bold uppercase tracking-wider text-lotus-500 mb-0.5">
								{$t('classes.address')}
							</p>
							<p class="text-sm text-neutral-700 dark:text-neutral-300 leading-snug">
								Trung tâm Yoga Hoa Sen<br />
								34 Phan Liêm, Phường Tân Định<br />
								Thành phố Hồ Chí Minh
							</p>
						</div>
					</div>

					<!-- Instructors to contact -->
					{#each contacts as c, i}
						<div
							in:fly={{ x: -20, delay: 200 + i * 100, duration: 400 }}
							class="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800
										border border-neutral-100 dark:border-neutral-700
										hover:border-lotus-300 dark:hover:border-lotus-700 hover:shadow-md
										transition-all duration-200"
						>
							<img src={c.avatar} alt={c.name} class="w-14 h-14 rounded-full object-cover ring-2 ring-lotus-200 dark:ring-lotus-800" />
							<div class="flex-1">
								<p class="font-semibold text-neutral-900 dark:text-neutral-100">{c.name}</p>
								<p class="text-xs text-neutral-400 mb-2">{c.role}</p>
								<a
									href="tel:{c.phone.replace(/\./g, '')}"
									class="inline-flex items-center gap-1.5 text-sm font-bold text-lotus-600 dark:text-lotus-400
												hover:text-lotus-700 transition-colors"
								>
									<Phone class="w-3.5 h-3.5" />
									{c.phone}
								</a>
							</div>
						</div>
					{/each}
				</div>

				<!-- ── Special Offers ── -->
				<div class="lg:col-span-2" in:fly={{ x: 30, duration: 500, delay: 200 }}>
					<div class="h-full rounded-3xl bg-gradient-to-br from-lotus-600 via-lotus-700 to-pink-800 p-8 lg:p-10 relative overflow-hidden">
						<!-- Decorative elements -->
						<div class="absolute top-0 right-0 w-64 h-64 lotus-blob bg-white/5 translate-x-16 -translate-y-16"></div>
						<div class="absolute bottom-0 left-0 w-48 h-48 lotus-blob bg-white/5 -translate-x-8 translate-y-8"></div>

						<div class="relative z-10">
							<div class="flex items-center gap-2 mb-2">
								<Sparkles class="w-5 h-5 text-saffron-300" />
								<p class="text-saffron-300 font-semibold text-sm uppercase tracking-wider">
									{$t('classes.offersSub')}
								</p>
							</div>
							<h3 class="font-heading text-2xl lg:text-3xl font-bold text-white mb-8">
								{$t('classes.offers')}
							</h3>

							<div class="space-y-4">
								{#each offers as offer, oi}
									<div
										in:fly={{ y: 15, delay: 300 + oi * 100, duration: 400 }}
										class="flex items-center justify-between p-4 lg:p-5 rounded-2xl
													{offer.highlight
												? 'bg-white/20 border border-white/30 shadow-lg'
												: 'bg-white/10 border border-white/15'}"
									>
										<div class="flex items-center gap-3">
											<span class="text-2xl">{offer.emoji}</span>
											<div>
												<p class="text-white font-semibold text-sm lg:text-base">
													{$t(offer.labelKey)}
												</p>
												{#if offer.highlight}
													<p class="text-white/60 text-xs mt-0.5">Tiết kiệm nhất / Best value</p>
												{/if}
											</div>
										</div>
										<div class="text-right">
											<span class="inline-block px-4 py-2 rounded-xl
														{offer.highlight ? 'bg-saffron-400 text-neutral-900' : 'bg-white/20 text-white'}
														font-bold text-sm lg:text-base">
												{$t(offer.discountKey)}
											</span>
										</div>
									</div>
								{/each}
							</div>

							<!-- CTA buttons -->
							<div class="flex flex-wrap gap-3 mt-8">
								{#each contacts as c}
									<a
										href="tel:{c.phone.replace(/\./g, '')}"
										class="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-lotus-700 font-semibold text-sm
													hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-md"
									>
										<Phone class="w-4 h-4" />
										{c.name}: {c.phone}
									</a>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="h-80 rounded-3xl bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
		{/if}
	</div>
</section>
