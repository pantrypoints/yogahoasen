<script lang="ts">
  import { t, locale } from '$lib/i18n';
  import { people } from '$lib/data/data';
  import { fly, fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Contact from '$lib/components/Contact.svelte';
  import {
    Sun, Coffee, Wind, Moon, Clock, Users, Star, MapPin, Phone, Tag,
    ChevronRight, Sparkles, Instagram, CheckCircle
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


  // ── Session data ─────────────────────────────────────────────
  const sessions = [
    {
      id: 1, icon: Sun, time: '6:00 → 7:15', label: 'Ca 1', labelEn: 'Session 1',
      gradient: 'from-amber-400 via-orange-400 to-rose-400',
      bg: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20',
      border: 'border-amber-200 dark:border-amber-800/40',
      accent: 'text-amber-600 dark:text-amber-400',
      pill: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
      photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
      nameKey: 'classes.session1Name',
      descKey: 'classes.session1Desc',
      // tags: ['Hatha', 'Vinyasa', 'Breathwork']
    },
    {
      id: 2, icon: Coffee, time: '11:30 → 12:45', label: 'Ca 2', labelEn: 'Session 2',
      gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
      bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20',
      border: 'border-emerald-200 dark:border-emerald-800/40',
      accent: 'text-emerald-600 dark:text-emerald-400',
      pill: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      photo: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80',
      nameKey: 'classes.session2Name',
      descKey: 'classes.session2Desc',
      // tags: ['Flow', 'Yin', 'Reset']
    },
    {
      id: 3, icon: Wind, time: '17:45 → 19:00', label: 'Ca 3', labelEn: 'Session 3',
      gradient: 'from-violet-400 via-purple-400 to-lotus-400',
      bg: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20',
      border: 'border-violet-200 dark:border-violet-800/40',
      accent: 'text-violet-600 dark:text-violet-400',
      pill: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
      photo: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80',
      nameKey: 'classes.session3Name',
      descKey: 'classes.session3Desc',
      // tags: ['Vinyasa', 'Power', 'Stretch']
    },
    {
      id: 4, icon: Moon, time: '19:00 → 20:30', label: 'Ca 4', labelEn: 'Session 4',
      gradient: 'from-indigo-400 via-blue-400 to-cyan-500',
      bg: 'from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/20',
      border: 'border-indigo-200 dark:border-indigo-800/40',
      accent: 'text-indigo-600 dark:text-indigo-400',
      pill: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
      photo: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&q=80',
      nameKey: 'classes.session4Name',
      descKey: 'classes.session4Desc',
      // tags: ['Yin', 'Restorative', 'Nidra']
    }
  ];

  // Gallery images
  const galleryImages = [
    { src: '/1.jpg', alt: 'Group yoga class' },
    { src: '/2.jpg', alt: 'Yoga instructor' },
    { src: '/3.jpg', alt: 'Yoga pose' },
    { src: '/4.jpg', alt: 'Yin yoga class' },
    { src: '/5.jpg', alt: 'Morning practice' },
    { src: '/6.jpg', alt: 'Morning practice' },
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
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        visible[key] = true;
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(node);
    return { destroy: () => obs.disconnect() };
  }

  // ── Carousel state ───────────────────────────────────────────
  let currentIndex = $state(0);
  let touchStartX = $state(0);
  let touchEndX = $state(0);
  let autoplayTimer: NodeJS.Timeout | null = $state(null);
  let autoplay = true;
  const autoplayInterval = 5000;

  // Modal state
  let showModal = $state(false);
  let modalIndex = $state(0);

  // Carousel functions
  function nextSlide() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  }

  function goToSlide(index: number) {
    currentIndex = index;
  }

  function startAutoplay() {
    if (!autoplay) return;
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function handleTouchStart(e: TouchEvent) {
    stopAutoplay();
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchMove(e: TouchEvent) {
    touchEndX = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    touchStartX = 0;
    touchEndX = 0;
    startAutoplay();
  }

  function openModal(index: number) {
    modalIndex = index;
    showModal = true;
    stopAutoplay();
  }

  function closeModal() {
    showModal = false;
    startAutoplay();
  }

  function modalNext() {
    modalIndex = (modalIndex + 1) % galleryImages.length;
  }

  function modalPrev() {
    modalIndex = (modalIndex - 1 + galleryImages.length) % galleryImages.length;
  }

  onMount(() => {
    startAutoplay();
    return () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    };
  });
</script>

<svelte:head>
  <title>{$t('classes.title')} · Yoga Hoa Sen</title>
</svelte:head>

<!-- HERO -->
<section class="relative min-h-[55vh] flex items-center overflow-hidden pt-20">
  <div class="absolute inset-0">
    <img src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1600&q=80" alt="Yoga class" class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-br from-neutral-950/80 via-lotus-950/60 to-neutral-900/70"></div>
  </div>
  <div class="absolute right-0 top-0 w-[500px] h-[500px] opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
    <div class="w-full h-full lotus-blob bg-gradient-to-br from-lotus-300 to-saffron-300 animate-petal-spin"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div in:fly={{ y: 30, duration: 700, delay: 100 }}>
      <p class="text-lotus-300 text-sm font-semibold uppercase tracking-[0.3em] mb-4">🪷 Yoga Hoa Sen</p>
      <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl">
        {$t('classes.heroTitle')}
      </h1>
      <p class="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
        {$t('classes.daily')} · {$t('classes.duration')} · {$t('classes.allLevels')}
      </p>
      <div class="flex flex-wrap gap-3">
        {#each sessions as s}
          <a href="#session-{s.id}" class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all duration-200">
            <s.icon class="w-4 h-4" /> {s.label} · {s.time}
          </a>
        {/each}
        
      </div>
    </div>
  </div>
</section>

<!-- SESSIONS -->
<section class="py-24 bg-stone-50 dark:bg-neutral-950" id="sessions">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16" use:revealOn={'sessions'}>
      {#if visible.sessions}
        <div in:fly={{ y: 20, duration: 500 }}>
          <p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">{$t('classes.subtitle')}</p>
          <h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">{$t('classes.title')}</h2>
        </div>
      {/if}
    </div>
    <div class="space-y-8">
      {#each sessions as session, i}
        {@const key = `session-${session.id}` as const}
        <div id="session-{session.id}" use:revealOn={key}>
          {#if visible[key]}
            <div in:fly={{ x: i % 2 === 0 ? -60 : 60, y: 20, duration: 600, delay: 80, easing: cubicOut }} 
                 class="group relative flex flex-col lg:flex-row {i % 2 !== 0 ? 'lg:flex-row-reverse' : ''} overflow-hidden rounded-3xl border {session.border} bg-gradient-to-br {session.bg} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div class="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden">
                <img src={session.photo} alt={$t(session.nameKey)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-r {i % 2 !== 0 ? 'lg:bg-gradient-to-l' : ''} from-transparent to-black/20"></div>
                <div class="absolute top-4 {i % 2 !== 0 ? 'right-4' : 'left-4'} bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
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
              <div class="flex-1 flex flex-col justify-center p-8 lg:p-10">
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xs font-bold uppercase tracking-widest {session.accent}">{session.label}</span>
                  <span class="w-1 h-1 rounded-full bg-current {session.accent}"></span>
                  <span class="text-xs text-neutral-400">{$t('classes.daily')}</span>
                </div>
                <h3 class="font-heading text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  {$t(session.nameKey)} <span class="font-normal text-lg {session.accent}"> — {session.time}</span>
                </h3>
                <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 max-w-lg">{$t(session.descKey)}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                  {#each session.tags as tag}
                    <span class="px-3 py-1 rounded-full text-xs font-semibold {session.pill}">{tag}</span>
                  {/each}
                </div>
                <div class="flex items-center gap-4">
                  <a href="#contact-section" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r {session.gradient} shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                    {$t('classes.bookNow')} <ChevronRight class="w-4 h-4" />
                  </a>
                  <div class="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Users class="w-3.5 h-3.5" /> {$t('classes.allLevels')}
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <div class="h-64 lg:h-56 rounded-3xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>



<!-- GALLERY CAROUSEL -->
<section class="py-24 bg-stone-50 dark:bg-neutral-950" use:revealOn={'gallery'}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if visible.gallery}
      <div class="text-center mb-12" in:fly={{ y: 20, duration: 500 }}>
        <p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">{$t('classes.gallerySub')}</p>
        <h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">{$t('classes.gallery')}</h2>
      </div>

      <div class="relative overflow-hidden rounded-3xl bg-neutral-200 dark:bg-neutral-800 shadow-xl">
        <div class="flex transition-transform duration-500 ease-out"
             style="transform: translateX(-{currentIndex * 100}%)"
             ontouchstart={handleTouchStart}
             ontouchmove={handleTouchMove}
             ontouchend={handleTouchEnd}
             onmouseenter={stopAutoplay}
             onmouseleave={startAutoplay}>
          {#each galleryImages as img, i}
            <div class="flex-shrink-0 w-full relative group cursor-pointer" style="aspect-ratio: 16/9" onclick={() => openModal(i)}>
              <img src={img.src} alt={img.alt} class="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
              <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="text-sm font-medium">{img.alt}</p>
                  <p class="text-xs text-white/80 mt-1">{i + 1}/{galleryImages.length}</p>
                </div>
              </div>
              <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          {/each}
        </div>

        <button onclick={prevSlide} class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-lotus-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 lg:w-6 lg:h-6 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button onclick={nextSlide} class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-lotus-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 lg:w-6 lg:h-6 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {#each galleryImages as _, i}
            <button onclick={() => goToSlide(i)} class="w-2 h-2 rounded-full transition-all duration-200 {i === currentIndex ? 'w-6 bg-lotus-500' : 'bg-white/60 hover:bg-white'}" />
          {/each}
        </div>

        <div class="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
          {currentIndex + 1} / {galleryImages.length}
        </div>
      </div>

      <div class="grid grid-cols-6 gap-2 mt-4">
        {#each galleryImages as img, i}
          <button onclick={() => goToSlide(i)} class="relative rounded-lg overflow-hidden aspect-square transition-all duration-200 {i === currentIndex ? 'ring-2 ring-lotus-500 scale-105 shadow-lg' : 'opacity-60 hover:opacity-100'}">
            <img src={img.src} alt={img.alt} class="w-full h-full object-cover" />
          </button>
        {/each}
      </div>
    {:else}
      <div class="h-96 rounded-3xl bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
    {/if}
  </div>
</section>



<!-- MODAL/LIGHTBOX -->
{#if showModal}
  <div class="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center" onclick={closeModal} transition:fly={{ y: 20, duration: 200 }}>
    <button onclick={closeModal} class="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all z-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <button onclick={(e) => { e.stopPropagation(); modalPrev(); }} class="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all z-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button onclick={(e) => { e.stopPropagation(); modalNext(); }} class="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all z-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div class="max-w-5xl max-h-[90vh] w-full px-4" onclick={(e) => e.stopPropagation()}>
      <img src={galleryImages[modalIndex].src} alt={galleryImages[modalIndex].alt} class="w-full h-full object-contain rounded-lg" transition:scale={{ duration: 300, easing: cubicOut }} />
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
        {modalIndex + 1} / {galleryImages.length} - {galleryImages[modalIndex].alt}
      </div>
    </div>

    <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-3xl overflow-x-auto px-4 pb-2">
      {#each galleryImages as img, i}
        <button onclick={(e) => { e.stopPropagation(); modalIndex = i; }} class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden {i === modalIndex ? 'ring-2 ring-lotus-500' : 'opacity-60 hover:opacity-100'}">
          <img src={img.src} alt={img.alt} class="w-full h-full object-cover" />
        </button>
      {/each}
    </div>
  </div>
{/if}



<!-- ═══════════════════════════════════════ MAP + CONTACT ═══════════════════════════════════════ -->
<section id="contact" class="py-24 bg-white dark:bg-neutral-900" use:reveal={'contact'}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-14 {visibleSections.contact ? 'animate-fade-up' : 'opacity-0'}">
      <p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
        {$t('contact.subtitle')}
      </p>
      <h2 class="font-heading text-4xl font-bold text-neutral-900 dark:text-neutral-100">
        {$t('contact.title')}
      </h2>
    </div>
    
    <!-- Use the combined Contact component -->
    <Contact 
      showAnimation={visibleSections.contact}
      animationDelay={200}
    />
  </div>
</section>






<style>
  .overflow-x-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
</style>