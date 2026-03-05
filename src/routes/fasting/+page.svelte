<script lang="ts">
  import { t, locale } from '$lib/i18n';
  import { fly, fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { Moon, Sun, Star, CalendarDays, Clock, Info, ChevronDown, Flame } from 'lucide-svelte';

  // ── 2026 Data ─────────────────────────────────────────────
  const fastingData = [
    { month: 1, monthEn: 'January', monthVi: 'Tháng Một', purnima: { day: 3, dow: 'Sat' }, ekadashii1: { day: 14, dow: 'Wed' }, amavasya: { day: 18, dow: 'Sun' }, ekadashii2: { day: 28, dow: 'Wed' } },
    { month: 2, monthEn: 'February', monthVi: 'Tháng Hai', purnima: { day: 1, dow: 'Sun' }, ekadashii1: { day: 12, dow: 'Thu' }, amavasya: { day: 16, dow: 'Mon' }, ekadashii2: { day: 27, dow: 'Fri' } },
    { month: 3, monthEn: 'March', monthVi: 'Tháng Ba', purnima: { day: 3, dow: 'Tue' }, ekadashii1: { day: 14, dow: 'Sat' }, amavasya: { day: 18, dow: 'Wed' }, ekadashii2: { day: 28, dow: 'Sat' } },
    { month: 4, monthEn: 'April', monthVi: 'Tháng Tư', purnima: { day: 1, dow: 'Wed' }, ekadashii1: { day: 13, dow: 'Mon' }, amavasya: { day: 16, dow: 'Thu' }, ekadashii2: { day: 27, dow: 'Mon' } },
    { month: 5, monthEn: 'May', monthVi: 'Tháng Năm', purnima: { day: 1, dow: 'Fri', extraDay: 31, extraDow: 'Sun' }, ekadashii1: { day: 13, dow: 'Wed' }, amavasya: { day: 16, dow: 'Sat' }, ekadashii2: { day: 26, dow: 'Tue' } },
    { month: 6, monthEn: 'June', monthVi: 'Tháng Sáu', purnima: { day: 29, dow: 'Mon' }, ekadashii1: { day: 11, dow: 'Thu' }, amavasya: { day: 14, dow: 'Sun' }, ekadashii2: { day: 25, dow: 'Thu' } },
    { month: 7, monthEn: 'July', monthVi: 'Tháng Bảy', purnima: { day: 29, dow: 'Wed' }, ekadashii1: { day: 10, dow: 'Fri' }, amavasya: { day: 14, dow: 'Tue' }, ekadashii2: { day: 24, dow: 'Fri' } },
    { month: 8, monthEn: 'August', monthVi: 'Tháng Tám', purnima: { day: 27, dow: 'Thu' }, ekadashii1: { day: 9, dow: 'Sun' }, amavasya: { day: 12, dow: 'Wed' }, ekadashii2: { day: 23, dow: 'Sun' } },
    { month: 9, monthEn: 'September', monthVi: 'Tháng Chín', purnima: { day: 26, dow: 'Sat' }, ekadashii1: { day: 7, dow: 'Mon' }, amavasya: { day: 10, dow: 'Thu' }, ekadashii2: { day: 22, dow: 'Tue' } },
    { month: 10, monthEn: 'October', monthVi: 'Tháng Mười', purnima: { day: 25, dow: 'Sun' }, ekadashii1: { day: 6, dow: 'Tue' }, amavasya: { day: 10, dow: 'Sat' }, ekadashii2: { day: 21, dow: 'Wed' } },
    { month: 11, monthEn: 'November', monthVi: 'Tháng Mười Một', purnima: { day: 24, dow: 'Tue' }, ekadashii1: { day: 4, dow: 'Wed' }, amavasya: { day: 8, dow: 'Sun' }, ekadashii2: { day: 20, dow: 'Fri' } },
    { month: 12, monthEn: 'December', monthVi: 'Tháng Mười Hai', purnima: { day: 23, dow: 'Wed' }, ekadashii1: { day: 4, dow: 'Fri' }, amavasya: { day: 8, dow: 'Tue' }, ekadashii2: { day: 20, dow: 'Sun' } }
  ];

  // ── States ────────────────────────────────────────────────
  let viewMode = $state<'table' | 'list'>('table');
  let filter = $state<'all' | 'ekadashii' | 'purnima' | 'amavasya'>('all');
  let selectedFast = $state<{ type: string; month: number; day: number; dow: string } | null>(null);
  let countdownDisplay = $state('');

  const now = new Date();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();
  const todayYear = now.getFullYear();

  // ── Config ────────────────────────────────────────────────
  const typeConfig = {
    purnima: { label: 'Purnima', labelVi: 'Trăng Tròn', labelZh: '滿月', icon: Sun, bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800/40', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300', dot: 'bg-amber-400', text: 'text-amber-700 dark:text-amber-300' },
    ekadashii: { label: 'Ekadashii', labelVi: 'Đoản Thực', labelZh: '斷食日', icon: Flame, bg: 'bg-rose-50 dark:bg-rose-950/30', border: 'border-rose-200 dark:border-rose-800/40', badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300', dot: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-300' },
    amavasya: { label: 'Amavasya', labelVi: 'Trăng Non', labelZh: '新月', icon: Moon, bg: 'bg-indigo-50 dark:bg-indigo-950/30', border: 'border-indigo-200 dark:border-indigo-800/40', badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300', dot: 'bg-indigo-500', text: 'text-indigo-700 dark:text-indigo-300' }
  };

  // ── Logic ─────────────────────────────────────────────────
  function isPast(month: number, day: number) {
    const target = new Date(2026, month - 1, day);
    return target < new Date(todayYear, todayMonth - 1, todayDay);
  }

  function isToday(month: number, day: number) {
    return todayYear === 2026 && month === todayMonth && day === todayDay;
  }

  function daysUntil(month: number, day: number) {
    const target = new Date(2026, month - 1, day);
    const today = new Date(todayYear, now.getMonth(), todayDay);
    return Math.ceil((target.getTime() - today.getTime()) / 86400000);
  }

  const allFasts = $derived(
    fastingData.flatMap(m => {
      const items = [];
      items.push({ type: 'purnima', month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.purnima.day, dow: m.purnima.dow });
      if (m.purnima.extraDay) items.push({ type: 'purnima', month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.purnima.extraDay, dow: m.purnima.extraDow });
      items.push({ type: 'ekadashii', month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.ekadashii1.day, dow: m.ekadashii1.dow });
      items.push({ type: 'amavasya', month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.amavasya.day, dow: m.amavasya.dow });
      items.push({ type: 'ekadashii', month: m.month, monthEn: m.monthEn, monthVi: m.monthVi, day: m.ekadashii2.day, dow: m.ekadashii2.dow });
      return items;
    }).filter(i => filter === 'all' || i.type === filter).sort((a, b) => a.month !== b.month ? a.month - b.month : a.day - b.day)
  );

  const nextEkadashii = $derived(
    allFasts.find(f => f.type === 'ekadashii' && daysUntil(f.month, f.day) >= 0)
  );

  onMount(() => {
    const update = () => {
      if (!nextEkadashii) return;
      const target = new Date(2026, nextEkadashii.month - 1, nextEkadashii.day);
      const diff = target.getTime() - new Date().getTime();
      if (diff <= 0) { countdownDisplay = $t('fasting.today2'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      countdownDisplay = `${d}d ${h}h ${m}m`;
    };
    update();
    const iv = setInterval(update, 60000);
    return () => clearInterval(iv);
  });
</script>

<svelte:head>
  <title>{$t('fasting.title')} · Yoga Hoa Sen</title>
</svelte:head>

<section class="relative pt-24 pb-16 bg-neutral-950 text-white overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 text-center">
    <h1 class="text-4xl font-bold mb-4">{$t('fasting.title')} 2026</h1>
    
    {#if nextEkadashii}
      <div in:scale class="inline-block bg-white/10 p-6 rounded-2xl border border-white/20 mb-8">
        <p class="text-xs uppercase tracking-widest text-rose-400 mb-2">Next Ekadashii</p>
        <p class="text-3xl font-mono font-bold text-rose-100">{countdownDisplay}</p>
      </div>
    {/if}

    <div class="flex flex-wrap justify-center gap-4">
      <button onclick={() => viewMode = 'table'} class="px-6 py-2 rounded-xl {viewMode === 'table' ? 'bg-rose-600' : 'bg-white/10'}">Table</button>
      <button onclick={() => viewMode = 'list'} class="px-6 py-2 rounded-xl {viewMode === 'list' ? 'bg-rose-600' : 'bg-white/10'}">List</button>
    </div>
  </div>
</section>

<main class="py-12 bg-stone-50 dark:bg-neutral-900 min-h-screen">
  <div class="max-w-6xl mx-auto px-4">
    {#if viewMode === 'table'}
      <div class="bg-white dark:bg-neutral-800 rounded-3xl shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-neutral-100 dark:bg-neutral-700">
            <tr>
              <th class="p-4">Month</th>
              <th class="p-4 text-center text-amber-600">Purnima</th>
              <th class="p-4 text-center text-rose-600">Ekadashii</th>
              <th class="p-4 text-center text-indigo-600">Amavasya</th>
              <th class="p-4 text-center text-rose-600">Ekadashii</th>
            </tr>
          </thead>
          <tbody>
            {#each fastingData as row}
              <tr class="border-t border-neutral-100 dark:border-neutral-700">
                <td class="p-4 font-bold">{row.monthEn}</td>
                <td class="p-4 text-center">{@render DayCell({ month: row.month, day: row.purnima.day, dow: row.purnima.dow, type: 'purnima', extraDay: row.purnima.extraDay, extraDow: row.purnima.extraDow })}</td>
                <td class="p-4 text-center">{@render DayCell({ month: row.month, day: row.ekadashii1.day, dow: row.ekadashii1.dow, type: 'ekadashii' })}</td>
                <td class="p-4 text-center">{@render DayCell({ month: row.month, day: row.amavasya.day, dow: row.amavasya.dow, type: 'amavasya' })}</td>
                <td class="p-4 text-center">{@render DayCell({ month: row.month, day: row.ekadashii2.day, dow: row.ekadashii2.dow, type: 'ekadashii' })}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <div class="space-y-4 max-w-2xl mx-auto">
        {#each allFasts as item}
          <div class="bg-white dark:bg-neutral-800 p-4 rounded-2xl flex items-center justify-between {isPast(item.month, item.day) ? 'opacity-50' : ''}">
            <div>
              <p class="text-sm font-bold text-neutral-500 uppercase">{item.type}</p>
              <p class="text-lg font-bold">{item.monthEn} {item.day}, {item.dow}</p>
            </div>
            {#if isToday(item.month, item.day)}
              <span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs">Today</span>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>

{#snippet DayCell({ month, day, dow, type, extraDay, extraDow })}
  {@const cfg = typeConfig[type as keyof typeof typeConfig]}
  {@const past = isPast(month, day)}
  {@const today = isToday(month, day)}
  
  <div class="flex flex-col items-center gap-1">
    <div class="w-12 h-12 rounded-xl flex flex-col items-center justify-center border transition-all
      {today ? 'bg-rose-500 text-white border-rose-400' : past ? 'bg-neutral-50 text-neutral-300 border-neutral-100' : `${cfg.bg} ${cfg.text} ${cfg.border}`}">
      <span class="text-lg font-bold leading-none">{day}</span>
      <span class="text-[10px] uppercase">{dow}</span>
    </div>
    {#if extraDay}
      <span class="text-[9px] font-bold text-amber-600">+{extraDay} {extraDow}</span>
    {/if}
  </div>
{/snippet}

<style>
  :global(.dark) .bg-white { background-color: #1f1f1f; }
</style>

