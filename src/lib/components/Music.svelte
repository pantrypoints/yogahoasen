<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { Play, Pause, Volume2, VolumeX } from 'lucide-svelte';
  
  // Props using $props() in Svelte 5 runes mode
  let {
    src = '/kiirtan.mp3',
    autoplay = true,
    loop = true,
    showVolume = false
  } = $props();
  
  // State using $state
  let audio: HTMLAudioElement | null = $state(null);
  let isPlaying = $state(false);
  let isLoading = $state(false);
  let error: string | null = $state(null);
  let volume = $state(0.5);
  let muted = $state(false);
  
  // Autoplay attempt flag
  let autoplayAttempted = $state(false);
  
  onMount(() => {
    if (!browser) return;
    
    // Create audio element
    audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    
    // Event listeners
    audio.addEventListener('loadeddata', () => {
      isLoading = false;
    });
    
    audio.addEventListener('canplaythrough', () => {
      isLoading = false;
      if (autoplay && !autoplayAttempted) {
        attemptAutoplay();
      }
    });
    
    audio.addEventListener('play', () => {
      isPlaying = true;
      error = null;
    });
    
    audio.addEventListener('pause', () => {
      isPlaying = false;
    });
    
    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      isLoading = false;
      error = 'Failed to load audio';
    });
    
    audio.addEventListener('volumechange', () => {
      muted = audio?.muted || false;
    });
    
    // Preload
    audio.load();
    isLoading = true;
    
    // Cleanup
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
        audio = null;
      }
    };
  });
  
  async function attemptAutoplay() {
    if (!audio || autoplayAttempted) return;
    autoplayAttempted = true;
    
    try {
      await audio.play();
      // Autoplay succeeded
    } catch (err) {
      // Autoplay blocked – do nothing, user will click play
      console.log('Autoplay prevented by browser:', err);
    }
  }
  
  async function togglePlay() {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      try {
        isLoading = true;
        await audio.play();
      } catch (err) {
        error = 'Playback failed';
        console.error(err);
      } finally {
        isLoading = false;
      }
    }
  }
  
  function handleVolumeChange(e: Event) {
    if (!audio) return;
    const value = parseFloat((e.target as HTMLInputElement).value);
    volume = value;
    audio.volume = value;
    if (audio.muted && value > 0) audio.muted = false;
  }
  
  function toggleMute() {
    if (!audio) return;
    audio.muted = !audio.muted;
    muted = audio.muted;
  }
</script>

<div class="music-player flex items-center gap-1">
  <button
    onclick={togglePlay}
    disabled={isLoading || !!error}
    class="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-50"
    aria-label={isPlaying ? 'Pause music' : 'Play music'}
    title={isPlaying ? 'Pause meditation music' : 'Play meditation music'}
  >
    {#if isLoading}
      <span class="block w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
    {:else if isPlaying}
      <Pause class="w-5 h-5" />
    {:else}
      <Play class="w-5 h-5" />
    {/if}
  </button>
  
  {#if showVolume}
    <button
      onclick={toggleMute}
      class="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      {#if muted || volume === 0}
        <VolumeX class="w-4 h-4" />
      {:else}
        <Volume2 class="w-4 h-4" />
      {/if}
    </button>
    
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={muted ? 0 : volume}
      oninput={handleVolumeChange}
      disabled={!audio}
      class="w-16 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer"
    />
  {/if}
</div>

<style>
  /* Optional custom styling for the range input */
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #b28cf2;
    border-radius: 50%;
    cursor: pointer;
  }
  input[type=range]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #b28cf2;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
</style>