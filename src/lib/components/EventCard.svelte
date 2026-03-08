<script lang="ts">
  import { t, locale } from '$lib/i18n';
  import { CalendarDays, MapPin, Users, Clock, ExternalLink } from 'lucide-svelte';
  import type { Event } from '$lib/data/events';
  
  let {
    event,
    isUpcoming = true
  }: {
    event: Event;
    isUpcoming?: boolean;
  } = $props();
  
  // Format date
  let formattedDate = $derived(
    new Date(event.date).toLocaleDateString($locale === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  );
  
  // Get localized title and description
  let title = $derived($locale === 'vi' ? event.titleVi || event.title : event.title);
  let description = $derived($locale === 'vi' ? event.descriptionVi || event.description : event.description);
</script>

<div class="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800 hover:shadow-lg hover:shadow-lotus-100/50 dark:hover:shadow-lotus-900/20 transition-all duration-300 {!isUpcoming ? 'opacity-80 hover:opacity-100' : ''}">
  <!-- Image -->
  <div class="relative h-48 overflow-hidden">
    <img
      src={event.image}
      alt={title}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
    {#if !isUpcoming}
      <div class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold bg-stone-800/80 text-white backdrop-blur-sm">
        {$t('events.past')}
      </div>
    {/if}
    <div class="absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 backdrop-blur-sm">
      {event.category}
    </div>
  </div>
  
  <!-- Content -->
  <div class="p-5">
    <h3 class="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
      {title}
    </h3>
    
    <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
      {description}
    </p>
    
    <!-- Event details -->
    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <CalendarDays class="w-3.5 h-3.5 flex-none" />
        <span>{formattedDate} · {event.time}</span>
      </div>
      
      <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <MapPin class="w-3.5 h-3.5 flex-none" />
        <span>{event.location}</span>
      </div>
      
      {#if event.teacher}
        <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <Users class="w-3.5 h-3.5 flex-none" />
          <span>{event.teacher}</span>
        </div>
      {/if}
      
      <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <Clock class="w-3.5 h-3.5 flex-none" />
        <span>{event.duration}</span>
      </div>
    </div>
    
    <!-- Price and spots -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <span class="text-lg font-bold text-lotus-600 dark:text-lotus-400">
          <!-- {typeof event.price === 'number' ? `$${event.price}` : $t('events.free')} -->
          <span>{event.price}</span>
        </span>
      </div>
      {#if event.spotsLeft !== undefined && isUpcoming}
        <div class="text-xs text-neutral-500 dark:text-neutral-400">
          {event.spotsLeft} / {event.spots} {$t('events.spots')}
        </div>
      {/if}
    </div>
    
    <!-- Register/Learn More button -->
    <a
      href={event.register || '#'}
      target="_blank"
      rel="noopener noreferrer"
      class="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 {isUpcoming
        ? 'bg-gradient-to-r from-lotus-500 to-lotus-700 text-white hover:shadow-lg hover:shadow-lotus-300/40 hover:scale-[1.02]'
        : 'border border-lotus-300 dark:border-lotus-700 text-lotus-700 dark:text-lotus-300 hover:bg-lotus-50 dark:hover:bg-lotus-900/30'}"
    >
      <ExternalLink class="w-4 h-4" />
      {isUpcoming ? $t('events.register') : $t('events.learnMore')}
    </a>
  </div>
</div>
