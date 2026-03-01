<script lang="ts">
  import { t, locale } from '$lib/i18n';
  import { fly, fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { Moon, Sun, Star, CalendarDays, Clock, Info, ChevronDown, Flame, Flower } from 'lucide-svelte';

  // ── 2026 Ananda Marga Fasting Data ──────────────────────────
  // Type: P = Purnima (Full Moon), E = Ekadashii (Fasting), A = Amavasya (New Moon)
  const fastingData = [
    {month: 1, monthEn: 'January', monthVi: 'Tháng Một', 
      purnima: { day: 3, dow: 'Sat' }, 
      ekadashii1: { day: 14, dow: 'Wed' }, 
      amavasya: { day: 18, dow: 'Sun' }, 
      ekadashii2: { day: 28, dow: 'Wed' }
    },
    {month: 2, monthEn: 'February', monthVi: 'Tháng Hai', 
      purnima: { day: 1, dow: 'Sun' }, 
      ekadashii1: { day: 12, dow: 'Thu' }, 
      amavasya: { day: 16, dow: 'Mon' }, 
      ekadashii2: { day: 27, dow: 'Fri' }
    },
    {month: 3, monthEn: 'March', monthVi: 'Tháng Ba', 
      purnima: { day: 3, dow: 'Tue' }, 
      ekadashii1: { day: 14, dow: 'Sat' }, 
      amavasya: { day: 18, dow: 'Wed' }, 
      ekadashii2: { day: 28, dow: 'Sat' }
    },
    {month: 4, monthEn: 'April', monthVi: 'Tháng Tư', 
      purnima: { day: 1, dow: 'Wed' }, 
      ekadashii1: { day: 13, dow: 'Mon' }, 
      amavasya: { day: 16, dow: 'Thu' }, 
      ekadashii2: { day: 27, dow: 'Mon' }
    },
    {month: 5, monthEn: 'May', monthVi: 'Tháng Năm', 
      purnima: { day: 1, dow: 'Fri', extra: '1/31 Fri/Sun', extraDay: 31, extraDow: 'Sun' }, 
      ekadashii1: { day: 13, dow: 'Wed' }, 
      amavasya: { day: 16, dow: 'Sat' }, 
      ekadashii2: { day: 26, dow: 'Tue' }
    },
    {month: 6, monthEn: 'June', monthVi: 'Tháng Sáu', 
      purnima: { day: 29, dow: 'Mon' }, 
      ekadashii1: { day: 11, dow: 'Thu' }, 
      amavasya: { day: 14, dow: 'Sun' }, 
      ekadashii2: { day: 25, dow: 'Thu' }
    },
    {month: 7, monthEn: 'July', monthVi: 'Tháng Bảy', 
      purnima: { day: 29, dow: 'Wed' }, 
      ekadashii1: { day: 10, dow: 'Fri' }, 
      amavasya: { day: 14, dow: 'Tue' }, 
      ekadashii2: { day: 24, dow: 'Fri' }
    },
    {month: 8, monthEn: 'August', monthVi: 'Tháng Tám', 
      purnima: { day: 27, dow: 'Thu' }, 
      ekadashii1: { day: 9, dow: 'Sun' }, 
      amavasya: { day: 12, dow: 'Wed' }, 
      ekadashii2: { day: 23, dow: 'Sun' }
    },
    {month: 9, monthEn: 'September', monthVi: 'Tháng Chín', 
      purnima: { day: 26, dow: 'Sat' }, 
      ekadashii1: { day: 7, dow: 'Mon' }, 
      amavasya: { day: 10, dow: 'Thu' }, 
      ekadashii2: { day: 22, dow: 'Tue' }
    },
    {month: 10, monthEn: 'October', monthVi: 'Tháng Mười', 
      purnima: { day: 25, dow: 'Sun' }, 
      ekadashii1: { day: 6, dow: 'Tue' }, 
      amavasya: { day: 10, dow: 'Sat' }, 
      ekadashii2: { day: 21, dow: 'Wed' }
    },
    {month: 11, monthEn: 'November', monthVi: 'Tháng Mười Một', 
      purnima: { day: 24, dow: 'Tue' }, 
      ekadashii1: { day: 4, dow: 'Wed' }, 
      amavasya: { day: 8, dow: 'Sun' }, 
      ekadashii2: { day: 20, dow: 'Fri' }
    },
    {month: 12, monthEn: 'December', monthVi: 'Tháng Mười Hai', 
      purnima: { day: 23, dow: 'Wed' }, 
      ekadashii1: { day: 4, dow: 'Fri' }, 
      amavasya: { day: 8, dow: 'Tue' }, 
      ekadashii2: { day: 20, dow: 'Sun' }
    }
  ];

  // ── View mode ─────────────────────────────────────────────
  type ViewMode = 'table' | 'list';
  let viewMode = $state<ViewMode>('table');
  type Filter = 'all' | 'ekadashii' | 'purnima' | 'amavasya';
  let filter = $state<Filter>('all');

  // ── Today info ────────────────────────────────────────────
  const now = new Date();
  const todayMonth = now.getMonth() + 1; // 1-12
  const todayDay = now.getDate();
  const todayYear = now.getFullYear();

  function getDate2026(month: number, day: number) {
    return new Date(2026, month - 1, day);
  }

  function isPast(month: number, day: number) {
    if (todayYear > 2026) return true;
    if (todayYear < 2026) return false;
    if (month < todayMonth) return true;
    if (month === todayMonth && day < todayDay) return true;
    return false;
  }

  function isToday(month: number, day: number) {
    return todayYear === 2026 && month === todayMonth && day === todayDay;
  }

  function daysUntil(month: number, day: number) {
    const target = new Date(2026, month - 1, day);
    const today = new Date(todayYear, now.getMonth(), todayDay);
    return Math.ceil((target.getTime() - today.getTime()) / 86400000);
  }

  // Find next Ekadashii
  const allEkadashii = fastingData.flatMap(m => [
    { month: m.month, day: m.ekadashii1.day, dow: m.ekadashii1.dow },
    { month: m.month, day: m.ekadashii2.day, dow: m.ekadashii2.dow }
  ]);
  const nextEkadashii = $derived(
    allEkadashii.find(e => daysUntil(e.month, e.day) >= 0)
  );
  const nextDays = $derived(nextEkadashii ? daysUntil(nextEkadashii.month, nextEkadashii.day) : null);

  // Upcoming list (all fast types in order)
  const allFasts = $derived(
    fastingData
      .flatMap(m => {
        const items = [];
        if (filter === 'all' || filter === 'purnima')
          items.push({ 
            type: 'purnima' as const, 
            month: m.month, 
            monthEn: m.monthEn, 
            monthVi: m.monthVi, 
            day: m.purnima.day, 
            dow: m.purnima.dow 
          });
        if (filter === 'all' || filter === 'ekadashii')
          items.push({ 
            type: 'ekadashii' as const, 
            month: m.month, 
            monthEn: m.monthEn, 
            monthVi: m.monthVi, 
            day: m.ekadashii1.day, 
            dow: m.ekadashii1.dow 
          });
        if (filter === 'all' || filter === 'amavasya')
          items.push({ 
            type: 'amavasya' as const, 
            month: m.month, 
            monthEn: m.monthEn, 
            monthVi: m.monthVi, 
            day: m.amavasya.day, 
            dow: m.amavasya.dow 
          });
        if (filter === 'all' || filter === 'ekadashii')
          items.push({ 
            type: 'ekadashii' as const, 
            month: m.month, 
            monthEn: m.monthEn, 
            monthVi: m.monthVi, 
            day: m.ekadashii2.day, 
            dow: m.ekadashii2.dow 
          });
        return items;
      })
      .sort((a, b) => a.month !== b.month ? a.month - b.month : a.day - b.day)
  );

  const typeConfig = {
    purnima: {
      label: 'Purnima', labelVi: 'Trăng Tròn', labelZh: '滿月',
      icon: Sun,
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800/40',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
      dot: 'bg-amber-400',
      text: 'text-amber-700 dark:text-amber-300',
      headerBg: 'bg-amber-500',
    },
    ekadashii: {
      label: 'Ekadashii', labelVi: 'Đoản Thực', labelZh: '斷食日',
      icon: Flame,
      bg: 'bg-lotus-50 dark:bg-lotus-950/30',
      border: 'border-lotus-200 dark:border-lotus-800/40',
      badge: 'bg-lotus-100 text-lotus-800 dark:bg-lotus-900/50 dark:text-lotus-300',
      dot: 'bg-lotus-500',
      text: 'text-lotus-700 dark:text-lotus-300',
      headerBg: 'bg-lotus-500',
    },
    amavasya: {
      label: 'Amavasya', labelVi: 'Trăng Non', labelZh: '新月',
      icon: Moon,
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      border: 'border-indigo-200 dark:border-indigo-800/40',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
      dot: 'bg-indigo-500',
      text: 'text-indigo-700 dark:text-indigo-300',
      headerBg: 'bg-indigo-500',
    }
  };

  // Expanded info panel
  let selectedFast = $state<{ type: keyof typeof typeConfig; month: number; day: number; dow: string } | null>(null);
  function selectFast(item: typeof selectedFast) {
    selectedFast = selectedFast?.month === item?.month && selectedFast?.day === item?.day ? null : item;
  }

  // Countdown timer for display
  let countdownDisplay = $state('');
  onMount(() => {
    function updateCountdown() {
      if (!nextEkadashii) return;
      const target = new Date(2026, nextEkadashii.month - 1, nextEkadashii.day);
      target.setHours(0, 0, 0, 0);
      const now2 = new Date();
      const diff = target.getTime() - now2.getTime();
      if (diff <= 0) { 
        countdownDisplay = $t('fasting.today2'); 
        return; 
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      countdownDisplay = `${days}d ${hours}h ${mins}m`;
    }
    updateCountdown();
    const iv = setInterval(updateCountdown, 30000);
    return () => clearInterval(iv);
  });
</script>

<svelte:head>
  <title>{$t('fasting.title')} · Yoga Hoa Sen</title>
</svelte:head>

<!-- ══════════════════════════════════════ HERO ══════════════════════════════════════ -->
<div in:fade={{ duration: 300 }}>
  <section class="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-indigo-950 via-neutral-950 to-lotus-950">
    <!-- Starfield decoration -->
    {#each Array(18) as _, i}
      <div 
        class="absolute w-1 h-1 rounded-full bg-white/40"
        style="top: {(i * 37) % 80}%; left: {(i * 53 + 10) % 95}%; animation-delay: {i * 0.4}s;"
        style:animation="twinkle 3s ease-in-out {i * 0.3}s infinite alternate"
      ></div>
    {/each}
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center" in:fly={{ y: 30, duration: 700 }}>
        <!-- Lotus icon -->
        <div class="flex justify-center mb-6">
          <div class="relative w-20 h-20">
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-lotus-300 to-amber-500 opacity-20 blur-xl scale-150"></div>
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 to-lotus-400 flex items-center justify-center shadow-2xl shadow-amber-500/30">
              <Flower class="w-10 h-10 text-amber-900" />
            </div>
          </div>
        </div>
        
        <p class="text-lotus-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3">
          Ananda Marga
        </p>
        <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
          {$t('fasting.title')}
        </h1>
        <p class="text-amber-300/80 text-xl mb-2 font-medium">2026年阿南達瑪迦斷食表</p>
        <p class="text-white/50 max-w-xl mx-auto text-sm leading-relaxed mb-10">
          {$t('fasting.whatIsBody')}
        </p>

        <!-- Next ekadashii countdown -->
        {#if nextEkadashii}
          <div 
            in:scale={{ duration: 500, delay: 300 }}
            class="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl mb-8"
          >
            <div class="flex items-center gap-2">
              <Flame class="w-5 h-5 text-lotus-400" />
              <span class="text-sm font-medium text-white/80">{$t('fasting.countdown')}</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-center">
                <div class="text-3xl font-bold bg-gradient-to-r from-amber-400 to-lotus-400 bg-clip-text text-transparent">
                  {countdownDisplay || `${nextDays} ${$t('fasting.daysAway')}`}
                </div>
                <div class="text-xs text-white/50">
                  {fastingData[nextEkadashii.month - 1]?.monthEn} {nextEkadashii.day}, 2026 · {nextEkadashii.dow}
                </div>
              </div>
            </div>
          </div>
        {/if}

        <!-- View toggles -->
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <div class="flex rounded-xl border border-white/20 overflow-hidden">
            {#each [{ v: 'table' as ViewMode, label: $t('fasting.tableView') }, { v: 'list' as ViewMode, label: $t('fasting.listView') }] as btn}
              <button 
                onclick={() => viewMode = btn.v}
                class="px-5 py-2.5 text-sm font-semibold transition-all duration-200 {viewMode === btn.v 
                  ? 'bg-lotus-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'}"
              >
                {btn.label}
              </button>
            {/each}
          </div>

          <!-- Type filter chips -->
          <div class="flex flex-wrap gap-2 justify-center">
            {#each [
              { f: 'all' as Filter, label: $t('fasting.filterAll') },
              { f: 'ekadashii' as Filter, label: 'Ekadashii 斷食' },
              { f: 'purnima' as Filter, label: 'Purnima 滿月' },
              { f: 'amavasya' as Filter, label: 'Amavasya 新月' }
            ] as chip}
              <button 
                onclick={() => filter = chip.f}
                class="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 {filter === chip.f 
                  ? chip.f === 'ekadashii' 
                    ? 'bg-lotus-500 text-white' 
                    : chip.f === 'purnima' 
                      ? 'bg-amber-500 text-white' 
                      : chip.f === 'amavasya' 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-white text-neutral-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'}"
              >
                {chip.label}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════ TABLE VIEW ══════════════════════════════════════ -->
  {#if viewMode === 'table'}
    <section class="py-16 bg-stone-50 dark:bg-neutral-950">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Legend -->
        <div class="flex flex-wrap gap-4 justify-center mb-8">
          {#each Object.entries(typeConfig) as [type, cfg]}
            {#if filter === 'all' || filter === type}
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full {cfg.dot}"></div>
                <span class="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  {cfg.label} ({cfg.labelZh})
                </span>
              </div>
            {/if}
          {/each}
          {#if todayYear === 2026}
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-sage-500 ring-2 ring-sage-300"></div>
              <span class="text-xs font-medium text-neutral-600 dark:text-neutral-300">Today</span>
            </div>
          {/if}
        </div>

        <!-- Desktop table -->
        <div class="hidden md:block overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
                <th class="px-5 py-4 text-left font-semibold w-32">
                  月份 / {$t('fasting.month')}
                </th>
                {#if filter === 'all' || filter === 'purnima'}
                  <th class="px-4 py-4 text-center font-semibold bg-amber-500/20">
                    <div class="flex flex-col items-center gap-1">
                      <Sun class="w-4 h-4 text-amber-300" />
                      <span>Purnima<br/><span class="text-xs text-amber-200/70">滿月</span></span>
                    </div>
                  </th>
                {/if}
                {#if filter === 'all' || filter === 'ekadashii'}
                  <th class="px-4 py-4 text-center font-semibold bg-lotus-500/20">
                    <div class="flex flex-col items-center gap-1">
                      <Flame class="w-4 h-4 text-lotus-300" />
                      <span>Ekadashii<br/><span class="text-xs text-lotus-200/70">斷食日</span></span>
                    </div>
                  </th>
                {/if}
                {#if filter === 'all' || filter === 'amavasya'}
                  <th class="px-4 py-4 text-center font-semibold bg-indigo-500/20">
                    <div class="flex flex-col items-center gap-1">
                      <Moon class="w-4 h-4 text-indigo-300" />
                      <span>Amavasya<br/><span class="text-xs text-indigo-200/70">新月</span></span>
                    </div>
                  </th>
                {/if}
                {#if filter === 'all' || filter === 'ekadashii'}
                  <th class="px-4 py-4 text-center font-semibold bg-lotus-500/20">
                    <div class="flex flex-col items-center gap-1">
                      <Flame class="w-4 h-4 text-lotus-300" />
                      <span>Ekadashii<br/><span class="text-xs text-lotus-200/70">斷食日</span></span>
                    </div>
                  </th>
                {/if}
              </tr>
            </thead>
            <tbody>
              {#each fastingData as row, i}
                {@const isCurrentMonth = todayYear === 2026 && row.month === todayMonth}
                <tr 
                  class="border-t border-neutral-100 dark:border-neutral-800 transition-colors duration-150 {isCurrentMonth 
                    ? 'bg-lotus-50/50 dark:bg-lotus-900/10' 
                    : i % 2 === 0 
                      ? 'bg-white dark:bg-neutral-900' 
                      : 'bg-neutral-50/50 dark:bg-neutral-900/50'} hover:bg-lotus-50 dark:hover:bg-lotus-900/20"
                >
                  <!-- Month cell -->
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-2">
                      {#if isCurrentMonth}
                        <div class="w-2 h-2 rounded-full bg-lotus-500 animate-pulse"></div>
                      {/if}
                      <div>
                        <p class="font-bold text-neutral-900 dark:text-neutral-100 text-sm">{row.monthEn}</p>
                        <p class="text-xs text-neutral-400">{row.monthVi}</p>
                      </div>
                    </div>
                  </td>

                  <!-- Purnima -->
                  {#if filter === 'all' || filter === 'purnima'}
                    <td class="px-4 py-4 text-center">
                      <DayCell 
                        month={row.month} 
                        day={row.purnima.day} 
                        dow={row.purnima.dow} 
                        type="purnima" 
                        extra={row.purnima.extra} 
                        extraDay={row.purnima.extraDay} 
                        extraDow={row.purnima.extraDow} 
                      />
                    </td>
                  {/if}

                  <!-- Ekadashii 1 -->
                  {#if filter === 'all' || filter === 'ekadashii'}
                    <td class="px-4 py-4 text-center">
                      <DayCell 
                        month={row.month} 
                        day={row.ekadashii1.day} 
                        dow={row.ekadashii1.dow} 
                        type="ekadashii" 
                      />
                    </td>
                  {/if}

                  <!-- Amavasya -->
                  {#if filter === 'all' || filter === 'amavasya'}
                    <td class="px-4 py-4 text-center">
                      <DayCell 
                        month={row.month} 
                        day={row.amavasya.day} 
                        dow={row.amavasya.dow} 
                        type="amavasya" 
                      />
                    </td>
                  {/if}

                  <!-- Ekadashii 2 -->
                  {#if filter === 'all' || filter === 'ekadashii'}
                    <td class="px-4 py-4 text-center">
                      <DayCell 
                        month={row.month} 
                        day={row.ekadashii2.day} 
                        dow={row.ekadashii2.dow} 
                        type="ekadashii" 
                      />
                    </td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Mobile: card-per-month layout -->
        <div class="md:hidden space-y-4">
          {#each fastingData as row, i}
            {@const isCurrentMonth = todayYear === 2026 && row.month === todayMonth}
            <div 
              in:fly={{ y: 15, delay: i * 40, duration: 350 }}
              class="rounded-2xl overflow-hidden border {isCurrentMonth 
                ? 'border-lotus-400 shadow-md shadow-lotus-200/30 dark:shadow-lotus-900/30' 
                : 'border-neutral-200 dark:border-neutral-800'}"
            >
              <!-- Month header -->
              <div class="px-4 py-3 {isCurrentMonth ? 'bg-lotus-600' : 'bg-neutral-800'} text-white flex items-center justify-between">
                <div class="flex items-center gap-2">
                  {#if isCurrentMonth}
                    <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  {/if}
                  <span class="font-bold">{row.monthEn}</span>
                  <span class="text-white/60 text-xs">{row.monthVi}</span>
                </div>
                {#if isCurrentMonth}
                  <span class="text-xs bg-white/20 px-2 py-0.5 rounded-full">Current</span>
                {/if}
              </div>

              <!-- Fast days grid -->
              <div class="bg-white dark:bg-neutral-900 grid grid-cols-2 gap-px">
                {#if filter === 'all' || filter === 'purnima'}
                  <MobileCell 
                    label="Purnima 滿月" 
                    day={row.purnima.day} 
                    dow={row.purnima.dow} 
                    type="purnima" 
                    month={row.month} 
                  />
                {/if}
                {#if filter === 'all' || filter === 'ekadashii'}
                  <MobileCell 
                    label="Ekadashii 斷食" 
                    day={row.ekadashii1.day} 
                    dow={row.ekadashii1.dow} 
                    type="ekadashii" 
                    month={row.month} 
                  />
                {/if}
                {#if filter === 'all' || filter === 'amavasya'}
                  <MobileCell 
                    label="Amavasya 新月" 
                    day={row.amavasya.day} 
                    dow={row.amavasya.dow} 
                    type="amavasya" 
                    month={row.month} 
                  />
                {/if}
                {#if filter === 'all' || filter === 'ekadashii'}
                  <MobileCell 
                    label="Ekadashii 斷食" 
                    day={row.ekadashii2.day} 
                    dow={row.ekadashii2.dow} 
                    type="ekadashii" 
                    month={row.month} 
                  />
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- ══════════════════════════════════════ LIST VIEW — upcoming fasts ══════════════════════════════════════ -->
  {#if viewMode === 'list'}
    <section class="py-16 bg-stone-50 dark:bg-neutral-950">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <div class="space-y-3">
          {#each allFasts as fast, i (fast.month + '-' + fast.day + '-' + fast.type)}
            {@const past = isPast(fast.month, fast.day)}
            {@const today = isToday(fast.month, fast.day)}
            {@const days = daysUntil(fast.month, fast.day)}
            {@const cfg = typeConfig[fast.type]}
            
            <div 
              in:fly={{ x: -20, delay: Math.min(i * 30, 800), duration: 350, easing: cubicOut }}
              class="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 {today 
                ? 'bg-sage-50 dark:bg-sage-950/30 border-sage-300 dark:border-sage-700 shadow-md' 
                : past 
                  ? 'opacity-40 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800' 
                  : cfg.bg + ' ' + cfg.border + ' hover:shadow-md hover:scale-[1.01]'}"
            >
              <!-- Type icon -->
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-none {today 
                ? 'bg-sage-500' 
                : past 
                  ? 'bg-neutral-300 dark:bg-neutral-700' 
                  : cfg.dot + ' bg-opacity-20'}">
                <cfg.icon class="w-5 h-5 {today 
                  ? 'text-white' 
                  : past 
                    ? 'text-neutral-400' 
                    : cfg.text}" />
              </div>

              <!-- Date info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center flex-wrap gap-2">
                  <span class="text-xs font-bold {cfg.text}">
                    {$locale === 'vi' ? cfg.labelVi : cfg.label}
                  </span>
                  <span class="text-xs text-neutral-400">·</span>
                  <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    {$locale === 'vi' ? fast.monthVi : fast.monthEn} {fast.day}, 2026 · {fast.dow}
                  </span>
                </div>
                {#if today}
                  <p class="text-xs font-bold text-sage-600 dark:text-sage-400 mt-0.5">🌿 {$t('fasting.today2')}</p>
                {/if}
              </div>

              <!-- Days away badge -->
              <div class="text-right flex-none">
                {#if today}
                  <span class="px-3 py-1 rounded-full bg-sage-500 text-white text-xs font-bold">
                    Today
                  </span>
                {:else if !past}
                  <span class="px-3 py-1 rounded-full {cfg.badge} text-xs font-semibold">
                    {days === 1 ? $t('fasting.tomorrow') : `${days} ${$t('fasting.daysAway')}`}
                  </span>
                {:else}
                  <span class="text-xs text-neutral-400">past</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- ══════════════════════════════════════ WHAT IS EKADASHII — info box ══════════════════════════════════════ -->
  <section class="py-16 bg-white dark:bg-neutral-900">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <div class="rounded-3xl bg-gradient-to-br from-indigo-50 via-lotus-50 to-amber-50 dark:from-indigo-950/40 dark:via-lotus-950/30 dark:to-amber-950/30 border border-indigo-100 dark:border-indigo-900/40 p-8">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-lotus-500 to-indigo-600 flex items-center justify-center flex-none shadow-md">
            <Info class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              {$t('fasting.whatIsTitle')}
            </h2>
            <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
              {$t('fasting.whatIsBody')}
            </p>
            
            <!-- Type legend -->
            <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {#each Object.entries(typeConfig) as [type, cfg]}
                <div class="flex items-center gap-2.5 p-3 rounded-xl {cfg.bg} border {cfg.border}">
                  <cfg.icon class="w-4 h-4 {cfg.text} flex-none" />
                  <div>
                    <p class="text-xs font-bold {cfg.text}">{cfg.label}</p>
                    <p class="text-xs text-neutral-400">{cfg.labelZh}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- ══════════════════════════════════════ Sub-components as inline snippets ══════════════════════════════════════ -->
{#snippet DayCell(props: { month: number; day: number; dow: string; type: keyof typeof typeConfig; extra?: string; extraDay?: number; extraDow?: string })}
  {@const cfg = typeConfig[props.type]}
  {@const today = isToday(props.month, props.day)}
  {@const past = isPast(props.month, props.day)}
  {@const days = daysUntil(props.month, props.day)}
  
  <div class="inline-flex flex










  

<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Moon, Sun, Star, CalendarDays, Clock, Info, ChevronDown, Flame } from 'lucide-svelte';

	// ── 2026 Ananda Marga Fasting Data ──────────────────────────
	// Type: P = Purnima (Full Moon), E = Ekadashii (Fasting), A = Amavasya (New Moon)
	const fastingData = [
		{
			month: 1, monthEn: 'January', monthVi: 'Tháng Một',
			purnima: { day: 3, dow: 'Sat' },
			ekadashii1: { day: 14, dow: 'Wed' },
			amavasya: { day: 18, dow: 'Sun' },
			ekadashii2: { day: 28, dow: 'Wed' }
		},
		{
			month: 2, monthEn: 'February', monthVi: 'Tháng Hai',
			purnima: { day: 1, dow: 'Sun' },
			ekadashii1: { day: 12, dow: 'Thu' },
			amavasya: { day: 16, dow: 'Mon' },
			ekadashii2: { day: 27, dow: 'Fri' }
		},
		{
			month: 3, monthEn: 'March', monthVi: 'Tháng Ba',
			purnima: { day: 3, dow: 'Tue' },
			ekadashii1: { day: 14, dow: 'Sat' },
			amavasya: { day: 18, dow: 'Wed' },
			ekadashii2: { day: 28, dow: 'Sat' }
		},
		{
			month: 4, monthEn: 'April', monthVi: 'Tháng Tư',
			purnima: { day: 1, dow: 'Wed' },
			ekadashii1: { day: 13, dow: 'Mon' },
			amavasya: { day: 16, dow: 'Thu' },
			ekadashii2: { day: 27, dow: 'Mon' }
		},
		{
			month: 5, monthEn: 'May', monthVi: 'Tháng Năm',
			purnima: { day: 1, dow: 'Fri', extra: '1/31 Fri/Sun', extraDay: 31, extraDow: 'Sun' },
			ekadashii1: { day: 13, dow: 'Wed' },
			amavasya: { day: 16, dow: 'Sat' },
			ekadashii2: { day: 26, dow: 'Tue' }
		},
		{
			month: 6, monthEn: 'June', monthVi: 'Tháng Sáu',
			purnima: { day: 29, dow: 'Mon' },
			ekadashii1: { day: 11, dow: 'Thu' },
			amavasya: { day: 14, dow: 'Sun' },
			ekadashii2: { day: 25, dow: 'Thu' }
		},
		{
			month: 7, monthEn: 'July', monthVi: 'Tháng Bảy',
			purnima: { day: 29, dow: 'Wed' },
			ekadashii1: { day: 10, dow: 'Fri' },
			amavasya: { day: 14, dow: 'Tue' },
			ekadashii2: { day: 24, dow: 'Fri' }
		},
		{
			month: 8, monthEn: 'August', monthVi: 'Tháng Tám',
			purnima: { day: 27, dow: 'Thu' },
			ekadashii1: { day: 9, dow: 'Sun' },
			amavasya: { day: 12, dow: 'Wed' },
			ekadashii2: { day: 23, dow: 'Sun' }
		},
		{
			month: 9, monthEn: 'September', monthVi: 'Tháng Chín',
			purnima: { day: 26, dow: 'Sat' },
			ekadashii1: { day: 7, dow: 'Mon' },
			amavasya: { day: 10, dow: 'Thu' },
			ekadashii2: { day: 22, dow: 'Tue' }
		},
		{
			month: 10, monthEn: 'October', monthVi: 'Tháng Mười',
			purnima: { day: 25, dow: 'Sun' },
			ekadashii1: { day: 6, dow: 'Tue' },
			amavasya: { day: 10, dow: 'Sat' },
			ekadashii2: { day: 21, dow: 'Wed' }
		},
		{
			month: 11, monthEn: 'November', monthVi: 'Tháng Mười Một',
			purnima: { day: 24, dow: 'Tue' },
			ekadashii1: { day: 4, dow: 'Wed' },
			amavasya: { day: 8, dow: 'Sun' },
			ekadashii2: { day: 20, dow: 'Fri' }
		},
		{
			month: 12, monthEn: 'December', monthVi: 'Tháng Mười Hai',
			purnima: { day: 23, dow: 'Wed' },
			ekadashii1: { day: 4, dow: 'Fri' },
			amavasya: { day: 8, dow: 'Tue' },
			ekadashii2: { day: 20, dow: 'Sun' }
		}
	];

	// ── View mode ─────────────────────────────────────────────
	type ViewMode = 'table' | 'list';
	let viewMode = $state<ViewMode>('table');
	type Filter = 'all' | 'ekadashii' | 'purnima' | 'amavasya';
	let filter = $state<Filter>('all');

	// ── Today info ────────────────────────────────────────────
	const now = new Date();
	const todayMonth = now.getMonth() + 1; // 1-12
	const todayDay = now.getDate();
	const todayYear = now.getFullYear();

	function getDate2026(month: number, day: number) {
		return new Date(2026, month - 1, day);
	}

	function isPast(month: number, day: number) {
		if (todayYear > 2026) return true;
		if (todayYear < 2026) return false;
		if (month < todayMonth) return true;
		if (month === todayMonth && day < todayDay) return true;
		return false;
	}

	function isToday(month: number, day: number) {
		return todayYear === 2026 && month === todayMonth && day === todayDay;
	}

	function daysUntil(month: number, day: number) {
		const target = new Date(2026, month - 1, day);
		const today = new Date(todayYear, now.getMonth(), todayDay);
		return Math.ceil((target.getTime() - today.getTime()) / 86400000);
	}

	// Find next Ekadashii
	const allEkadashii = fastingData.flatMap(m => [
		{ month: m.month, day: m.ekadashii1.day, dow: m.ekadashii1.dow },
		{ month: m.month, day: m.ekadashii2.day, dow: m.ekadashii2.dow }
	]);

	const nextEkadashii = $derived(
		allEkadashii.find(e => daysUntil(e.month, e.day) >= 0)
	);

	const nextDays = $derived(nextEkadashii ? daysUntil(nextEkadashii.month, nextEkadashii.day) : null);

	// Upcoming list (all fast types in order)
	const allFasts = $derived(
		fastingData
			.flatMap(m => {
				const items = [];
				if (filter === 'all' || filter === 'purnima')
					items.push({ type: 'purnima' as const, month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.purnima.day, dow: m.purnima.dow });
				if (filter === 'all' || filter === 'ekadashii')
					items.push({ type: 'ekadashii' as const, month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.ekadashii1.day, dow: m.ekadashii1.dow });
				if (filter === 'all' || filter === 'amavasya')
					items.push({ type: 'amavasya' as const, month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.amavasya.day, dow: m.amavasya.dow });
				if (filter === 'all' || filter === 'ekadashii')
					items.push({ type: 'ekadashii' as const, month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.ekadashii2.day, dow: m.ekadashii2.dow });
				return items;
			})
			.sort((a, b) => a.month !== b.month ? a.month - b.month : a.day - b.day)
	);

	const typeConfig = {
		purnima: {
			label: 'Purnima', labelVi: 'Trăng Tròn', labelZh: '滿月',
			icon: Sun,
			bg: 'bg-amber-50 dark:bg-amber-950/30',
			border: 'border-amber-200 dark:border-amber-800/40',
			badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
			dot: 'bg-amber-400',
			text: 'text-amber-700 dark:text-amber-300',
			headerBg: 'bg-amber-500',
		},
		ekadashii: {
			label: 'Ekadashii', labelVi: 'Đoản Thực', labelZh: '斷食日',
			icon: Flame,
			bg: 'bg-lotus-50 dark:bg-lotus-950/30',
			border: 'border-lotus-200 dark:border-lotus-800/40',
			badge: 'bg-lotus-100 text-lotus-800 dark:bg-lotus-900/50 dark:text-lotus-300',
			dot: 'bg-lotus-500',
			text: 'text-lotus-700 dark:text-lotus-300',
			headerBg: 'bg-lotus-500',
		},
		amavasya: {
			label: 'Amavasya', labelVi: 'Trăng Non', labelZh: '新月',
			icon: Moon,
			bg: 'bg-indigo-50 dark:bg-indigo-950/30',
			border: 'border-indigo-200 dark:border-indigo-800/40',
			badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
			dot: 'bg-indigo-500',
			text: 'text-indigo-700 dark:text-indigo-300',
			headerBg: 'bg-indigo-500',
		}
	};

	// Expanded info panel
	let selectedFast = $state<{ type: keyof typeof typeConfig; month: number; day: number; dow: string } | null>(null);

	function selectFast(item: typeof selectedFast) {
		selectedFast = selectedFast?.month === item?.month && selectedFast?.day === item?.day ? null : item;
	}

	// Countdown timer for display
	let countdownDisplay = $state('');
	onMount(() => {
		function updateCountdown() {
			if (!nextEkadashii) return;
			const target = new Date(2026, nextEkadashii.month - 1, nextEkadashii.day);
			target.setHours(0, 0, 0, 0);
			const now2 = new Date();
			const diff = target.getTime() - now2.getTime();
			if (diff <= 0) { countdownDisplay = $t('fasting.today2'); return; }
			const days = Math.floor(diff / 86400000);
			const hours = Math.floor((diff % 86400000) / 3600000);
			const mins = Math.floor((diff % 3600000) / 60000);
			countdownDisplay = `${days}d ${hours}h ${mins}m`;
		}
		updateCountdown();
		const iv = setInterval(updateCountdown, 30000);
		return () => clearInterval(iv);
	});
</script>

<svelte:head>
	<title>{$t('fasting.title')} · Yoga Hoa Sen</title>
</svelte:head>

<!-- ══════════════════════════════════════
     HERO
══════════════════════════════════════ -->
<section class="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-indigo-950 via-neutral-950 to-lotus-950">
	<!-- Starfield decoration -->
	{#each Array(18) as _, i}
		<div
			class="absolute w-1 h-1 rounded-full bg-white/40"
			style="top: {(i * 37) % 80}%; left: {(i * 53 + 10) % 95}%; animation-delay: {i * 0.4}s;
					animation: twinkle 3s ease-in-out {i * 0.3}s infinite alternate"
		></div>
	{/each}

	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center" in:fly={{ y: 30, duration: 700 }}>
			<!-- Moon icon -->
			<div class="flex justify-center mb-6">
				<div class="relative w-20 h-20">
					<div class="absolute inset-0 rounded-full bg-gradient-to-br from-saffron-300 to-amber-500 opacity-20 blur-xl scale-150"></div>
					<div class="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 to-saffron-400 flex items-center justify-center shadow-2xl shadow-amber-500/30">
						<Moon class="w-10 h-10 text-amber-900" />
					</div>
				</div>
			</div>

			<p class="text-saffron-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3">
				Ananda Marga
			</p>
			<h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
				{$t('fasting.title')}
			</h1>
			<p class="text-amber-300/80 text-xl mb-2 font-medium">2026年阿南達瑪迦斷食表</p>
			<p class="text-white/50 max-w-xl mx-auto text-sm leading-relaxed mb-10">
				{$t('fasting.whatIsBody')}
			</p>

			<!-- Next ekadashii countdown -->
			{#if nextEkadashii}
				<div in:scale={{ duration: 500, delay: 300 }}
					class="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl
							bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl mb-8">
					<div class="flex items-center gap-2">
						<Flame class="w-5 h-5 text-lotus-400" />
						<span class="text-sm font-medium text-white/80">{$t('fasting.countdown')}</span>
					</div>
					<div class="flex items-center gap-3">
						<div class="text-center">
							<div class="text-3xl font-bold gradient-text">{countdownDisplay || `${nextDays} ${$t('fasting.daysAway')}`}</div>
							<div class="text-xs text-white/50">
								{fastingData[nextEkadashii.month - 1]?.monthEn} {nextEkadashii.day}, 2026 · {nextEkadashii.dow}
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- View toggles -->
			<div class="flex items-center justify-center gap-3 flex-wrap">
				<div class="flex rounded-xl border border-white/20 overflow-hidden">
					{#each [{ v: 'table' as ViewMode, label: $t('fasting.tableView') }, { v: 'list' as ViewMode, label: $t('fasting.listView') }] as btn}
						<button
							onclick={() => viewMode = btn.v}
							class="px-5 py-2.5 text-sm font-semibold transition-all duration-200
									{viewMode === btn.v ? 'bg-lotus-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}"
						>
							{btn.label}
						</button>
					{/each}
				</div>

				<!-- Type filter chips -->
				<div class="flex flex-wrap gap-2 justify-center">
					{#each [
						{ f: 'all' as Filter, label: $t('fasting.filterAll') },
						{ f: 'ekadashii' as Filter, label: 'Ekadashii 斷食' },
						{ f: 'purnima' as Filter, label: 'Purnima 滿月' },
						{ f: 'amavasya' as Filter, label: 'Amavasya 新月' }
					] as chip}
						<button
							onclick={() => filter = chip.f}
							class="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200
									{filter === chip.f
								? chip.f === 'ekadashii' ? 'bg-lotus-500 text-white'
									: chip.f === 'purnima' ? 'bg-amber-500 text-white'
									: chip.f === 'amavasya' ? 'bg-indigo-500 text-white'
									: 'bg-white text-neutral-900'
								: 'bg-white/10 text-white/70 hover:bg-white/20'}"
						>
							{chip.label}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════
     TABLE VIEW
══════════════════════════════════════ -->
{#if viewMode === 'table'}
	<section class="py-16 bg-stone-50 dark:bg-neutral-950">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Legend -->
			<div class="flex flex-wrap gap-4 justify-center mb-8">
				{#each Object.entries(typeConfig) as [type, cfg]}
					{#if filter === 'all' || filter === type}
						<div class="flex items-center gap-2">
							<div class="w-3 h-3 rounded-full {cfg.dot}"></div>
							<span class="text-xs font-medium text-neutral-600 dark:text-neutral-300">
								{cfg.label} ({cfg.labelZh})
							</span>
						</div>
					{/if}
				{/each}
				{#if todayYear === 2026}
					<div class="flex items-center gap-2">
						<div class="w-3 h-3 rounded-full bg-sage-500 ring-2 ring-sage-300"></div>
						<span class="text-xs font-medium text-neutral-600 dark:text-neutral-300">Today</span>
					</div>
				{/if}
			</div>

			<!-- Desktop table -->
			<div class="hidden md:block overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
				<table class="w-full text-sm">
					<thead>
						<tr class="bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
							<th class="px-5 py-4 text-left font-semibold w-32">
								月份 / {$t('fasting.month')}
							</th>
							{#if filter === 'all' || filter === 'purnima'}
								<th class="px-4 py-4 text-center font-semibold bg-amber-500/20">
									<div class="flex flex-col items-center gap-1">
										<Sun class="w-4 h-4 text-amber-300" />
										<span>Purnima<br/><span class="text-xs text-amber-200/70">滿月</span></span>
									</div>
								</th>
							{/if}
							{#if filter === 'all' || filter === 'ekadashii'}
								<th class="px-4 py-4 text-center font-semibold bg-lotus-500/20">
									<div class="flex flex-col items-center gap-1">
										<Flame class="w-4 h-4 text-lotus-300" />
										<span>Ekadashii<br/><span class="text-xs text-lotus-200/70">斷食日</span></span>
									</div>
								</th>
							{/if}
							{#if filter === 'all' || filter === 'amavasya'}
								<th class="px-4 py-4 text-center font-semibold bg-indigo-500/20">
									<div class="flex flex-col items-center gap-1">
										<Moon class="w-4 h-4 text-indigo-300" />
										<span>Amavasya<br/><span class="text-xs text-indigo-200/70">新月</span></span>
									</div>
								</th>
							{/if}
							{#if filter === 'all' || filter === 'ekadashii'}
								<th class="px-4 py-4 text-center font-semibold bg-lotus-500/20">
									<div class="flex flex-col items-center gap-1">
										<Flame class="w-4 h-4 text-lotus-300" />
										<span>Ekadashii<br/><span class="text-xs text-lotus-200/70">斷食日</span></span>
									</div>
								</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#each fastingData as row, i}
							{@const isCurrentMonth = todayYear === 2026 && row.month === todayMonth}
							<tr
								class="border-t border-neutral-100 dark:border-neutral-800 transition-colors duration-150
										{isCurrentMonth
									? 'bg-lotus-50/50 dark:bg-lotus-900/10'
									: i % 2 === 0
										? 'bg-white dark:bg-neutral-900'
										: 'bg-neutral-50/50 dark:bg-neutral-900/50'}
										hover:bg-lotus-50 dark:hover:bg-lotus-900/20"
							>
								<!-- Month cell -->
								<td class="px-5 py-4">
									<div class="flex items-center gap-2">
										{#if isCurrentMonth}
											<div class="w-2 h-2 rounded-full bg-lotus-500 animate-pulse"></div>
										{/if}
										<div>
											<p class="font-bold text-neutral-900 dark:text-neutral-100 text-sm">{row.monthEn}</p>
											<p class="text-xs text-neutral-400">{row.monthVi}</p>
										</div>
									</div>
								</td>

								<!-- Purnima -->
								{#if filter === 'all' || filter === 'purnima'}
									<td class="px-4 py-4 text-center">
										<DayCell month={row.month} day={row.purnima.day} dow={row.purnima.dow} type="purnima" extra={row.purnima.extra} extraDay={row.purnima.extraDay} extraDow={row.purnima.extraDow} />
									</td>
								{/if}

								<!-- Ekadashii 1 -->
								{#if filter === 'all' || filter === 'ekadashii'}
									<td class="px-4 py-4 text-center">
										<DayCell month={row.month} day={row.ekadashii1.day} dow={row.ekadashii1.dow} type="ekadashii" />
									</td>
								{/if}

								<!-- Amavasya -->
								{#if filter === 'all' || filter === 'amavasya'}
									<td class="px-4 py-4 text-center">
										<DayCell month={row.month} day={row.amavasya.day} dow={row.amavasya.dow} type="amavasya" />
									</td>
								{/if}

								<!-- Ekadashii 2 -->
								{#if filter === 'all' || filter === 'ekadashii'}
									<td class="px-4 py-4 text-center">
										<DayCell month={row.month} day={row.ekadashii2.day} dow={row.ekadashii2.dow} type="ekadashii" />
									</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Mobile: card-per-month layout -->
			<div class="md:hidden space-y-4">
				{#each fastingData as row, i}
					{@const isCurrentMonth = todayYear === 2026 && row.month === todayMonth}
					<div
						in:fly={{ y: 15, delay: i * 40, duration: 350 }}
						class="rounded-2xl overflow-hidden border {isCurrentMonth ? 'border-lotus-400 shadow-md shadow-lotus-200/30 dark:shadow-lotus-900/30' : 'border-neutral-200 dark:border-neutral-800'}"
					>
						<!-- Month header -->
						<div class="px-4 py-3 {isCurrentMonth ? 'bg-lotus-600' : 'bg-neutral-800'} text-white flex items-center justify-between">
							<div class="flex items-center gap-2">
								{#if isCurrentMonth}
									<div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
								{/if}
								<span class="font-bold">{row.monthEn}</span>
								<span class="text-white/60 text-xs">{row.monthVi}</span>
							</div>
							{#if isCurrentMonth}
								<span class="text-xs bg-white/20 px-2 py-0.5 rounded-full">Current</span>
							{/if}
						</div>

						<!-- Fast days grid -->
						<div class="bg-white dark:bg-neutral-900 grid grid-cols-2 gap-px">
							{#if filter === 'all' || filter === 'purnima'}
								<MobileCell label="Purnima 滿月" day={row.purnima.day} dow={row.purnima.dow} type="purnima" month={row.month} />
							{/if}
							{#if filter === 'all' || filter === 'ekadashii'}
								<MobileCell label="Ekadashii 斷食" day={row.ekadashii1.day} dow={row.ekadashii1.dow} type="ekadashii" month={row.month} />
							{/if}
							{#if filter === 'all' || filter === 'amavasya'}
								<MobileCell label="Amavasya 新月" day={row.amavasya.day} dow={row.amavasya.dow} type="amavasya" month={row.month} />
							{/if}
							{#if filter === 'all' || filter === 'ekadashii'}
								<MobileCell label="Ekadashii 斷食" day={row.ekadashii2.day} dow={row.ekadashii2.dow} type="ekadashii" month={row.month} />
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- ══════════════════════════════════════
     LIST VIEW — upcoming fasts
══════════════════════════════════════ -->
{#if viewMode === 'list'}
	<section class="py-16 bg-stone-50 dark:bg-neutral-950">
		<div class="max-w-3xl mx-auto px-4 sm:px-6">
			<div class="space-y-3">
				{#each allFasts as fast, i (fast.month + '-' + fast.day + '-' + fast.type)}
					{@const past = isPast(fast.month, fast.day)}
					{@const today = isToday(fast.month, fast.day)}
					{@const days = daysUntil(fast.month, fast.day)}
					{@const cfg = typeConfig[fast.type]}
					<div
						in:fly={{ x: -20, delay: Math.min(i * 30, 800), duration: 350, easing: cubicOut }}
						class="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200
								{today
							? 'bg-sage-50 dark:bg-sage-950/30 border-sage-300 dark:border-sage-700 shadow-md'
							: past
								? 'opacity-40 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
								: cfg.bg + ' ' + cfg.border + ' hover:shadow-md hover:scale-[1.01]'}"
					>
						<!-- Type icon -->
						<div class="w-10 h-10 rounded-xl flex items-center justify-center flex-none
									{today ? 'bg-sage-500' : past ? 'bg-neutral-300 dark:bg-neutral-700' : cfg.dot + ' bg-opacity-20'}">
							<cfg.icon class="w-5 h-5 {today ? 'text-white' : past ? 'text-neutral-400' : cfg.text}" />
						</div>

						<!-- Date info -->
						<div class="flex-1 min-w-0">
							<div class="flex items-center flex-wrap gap-2">
								<span class="text-xs font-bold {cfg.text}">
									{$locale === 'vi' ? cfg.labelVi : cfg.label}
								</span>
								<span class="text-xs text-neutral-400">·</span>
								<span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
									{$locale === 'vi' ? fast.monthVi : fast.monthEn} {fast.day}, 2026 · {fast.dow}
								</span>
							</div>
							{#if today}
								<p class="text-xs font-bold text-sage-600 dark:text-sage-400 mt-0.5">🌿 {$t('fasting.today2')}</p>
							{/if}
						</div>

						<!-- Days away badge -->
						<div class="text-right flex-none">
							{#if today}
								<span class="px-3 py-1 rounded-full bg-sage-500 text-white text-xs font-bold">
									Today
								</span>
							{:else if !past}
								<span class="px-3 py-1 rounded-full {cfg.badge} text-xs font-semibold">
									{days === 1 ? $t('fasting.tomorrow') : `${days} ${$t('fasting.daysAway')}`}
								</span>
							{:else}
								<span class="text-xs text-neutral-400">past</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- ══════════════════════════════════════
     WHAT IS EKADASHII — info box
══════════════════════════════════════ -->
<section class="py-16 bg-white dark:bg-neutral-900">
	<div class="max-w-3xl mx-auto px-4 sm:px-6">
		<div class="rounded-3xl bg-gradient-to-br from-indigo-50 via-lotus-50 to-amber-50
					dark:from-indigo-950/40 dark:via-lotus-950/30 dark:to-amber-950/30
					border border-indigo-100 dark:border-indigo-900/40 p-8">
			<div class="flex items-start gap-4">
				<div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-lotus-500 to-indigo-600 flex items-center justify-center flex-none shadow-md">
					<Info class="w-6 h-6 text-white" />
				</div>
				<div>
					<h2 class="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
						{$t('fasting.whatIsTitle')}
					</h2>
					<p class="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
						{$t('fasting.whatIsBody')}
					</p>
					<!-- Type legend -->
					<div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
						{#each Object.entries(typeConfig) as [type, cfg]}
							<div class="flex items-center gap-2.5 p-3 rounded-xl {cfg.bg} border {cfg.border}">
								<cfg.icon class="w-4 h-4 {cfg.text} flex-none" />
								<div>
									<p class="text-xs font-bold {cfg.text}">{cfg.label}</p>
									<p class="text-xs text-neutral-400">{cfg.labelZh}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════
     Sub-components as inline snippets
══════════════════════════════════════ -->

{#snippet DayCell(props: { month: number; day: number; dow: string; type: keyof typeof typeConfig; extra?: string; extraDay?: number; extraDow?: string })}
	{@const cfg = typeConfig[props.type]}
	{@const today = isToday(props.month, props.day)}
	{@const past = isPast(props.month, props.day)}
	{@const days = daysUntil(props.month, props.day)}
	<div class="inline-flex flex-col items-center">
		<button
			onclick={() => selectFast(today || past ? null : { type: props.type, month: props.month, day: props.day, dow: props.dow })}
			class="relative w-14 h-14 rounded-2xl flex flex-col items-center justify-center
					transition-all duration-200 font-semibold
					{today
				? 'bg-sage-500 text-white shadow-lg shadow-sage-300/50 scale-110 ring-2 ring-sage-300'
				: past
					? 'text-neutral-300 dark:text-neutral-600'
					: `${cfg.bg} ${cfg.text} border ${cfg.border} hover:scale-110 hover:shadow-md cursor-pointer`}"
		>
			<span class="text-lg font-bold leading-none">{props.day}</span>
			<span class="text-[10px] font-medium opacity-70">{props.dow}</span>
			{#if !past && !today && days <= 7}
				<div class="absolute -top-1 -right-1 w-3 h-3 rounded-full {cfg.dot} border-2 border-white dark:border-neutral-900 animate-pulse"></div>
			{/if}
		</button>
		{#if props.extra && props.extraDay}
			<div class="mt-1 text-[10px] text-amber-500 font-semibold">+{props.extraDay} {props.extraDow}</div>
		{/if}
		{#if selectedFast?.month === props.month && selectedFast?.day === props.day}
			<div in:scale={{ duration: 200 }} class="absolute mt-16 z-20 w-48 p-3 rounded-xl {cfg.bg} border {cfg.border} shadow-xl text-left">
				<p class="font-bold text-xs {cfg.text} mb-1">{cfg.label} · {props.day} {cfg.labelZh}</p>
				<p class="text-xs text-neutral-500 dark:text-neutral-400">
					{days === 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `${days} days away`}
				</p>
			</div>
		{/if}
	</div>
{/snippet}

{#snippet MobileCell(props: { label: string; day: number; dow: string; type: keyof typeof typeConfig; month: number })}
	{@const cfg = typeConfig[props.type]}
	{@const today = isToday(props.month, props.day)}
	{@const past = isPast(props.month, props.day)}
	<div class="p-3 {today ? 'bg-sage-50 dark:bg-sage-950/30' : past ? 'opacity-40' : cfg.bg}">
		<p class="text-[10px] font-semibold {cfg.text} mb-1">{props.label}</p>
		<div class="flex items-baseline gap-1">
			<span class="text-2xl font-bold {today ? 'text-sage-600 dark:text-sage-400' : past ? 'text-neutral-400' : 'text-neutral-900 dark:text-neutral-100'}">
				{props.day}
			</span>
			<span class="text-xs text-neutral-400">{props.dow}</span>
		</div>
	</div>
{/snippet}

<style>
	@keyframes twinkle {
		from { opacity: 0.2; transform: scale(0.8); }
		to   { opacity: 0.8; transform: scale(1.2); }
	}
</style>
