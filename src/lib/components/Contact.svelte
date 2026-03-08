<script lang="ts">
  import { t } from '$lib/i18n';
  import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-svelte';
  import { scale } from 'svelte/transition';
  
  // Props with Svelte 5 runes
  let {
    className = '',
    showAnimation = false,
    animationDelay = 0,
    mapHeight = 'h-[300px] md:h-[400px]',
    mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2825800304004!2d106.6950329!3d10.789655800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528cb4c6e4b99%3A0x51673e8931ad6b18!2zMzQgxJAuIFBoYW4gTGnDqm0sIMSQYSBLYW8sIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2sph!4v1772949866611!5m2!1svi!2sph',
    showFormLabels = true,
    formButtonText = '',
    formSuccessMessage = ''
  }: {
    className?: string;
    showAnimation?: boolean;
    animationDelay?: number;
    mapHeight?: string;
    mapSrc?: string;
    showFormLabels?: boolean;
    formButtonText?: string;
    formSuccessMessage?: string;
  } = $props();
  
  // Contact form state with runes
  let formData = $state({ name: '', email: '', message: '' });
  let formSent = $state(false);
  
  function submitForm(e: Event) {
    e.preventDefault();
    formSent = true;
    formData = { name: '', email: '', message: '' };
    setTimeout(() => formSent = false, 5000);
  }
  
  // Derived values with runes
  let contactItems = $derived([
    { icon: MapPin, label: $t('contact.address'), value: 'Số 34 Phan Liêm, Phường Đa Kao, Quận 1, Tp. Hồ Chí Minh' },
    { icon: Phone, label: $t('contact.phone'), value: '91 887 3316' },
    { icon: Mail, label: $t('contact.email'), value: 'yogahoasen.vn@gmail.com' },
    { icon: Clock, label: $t('contact.hours'), value: $t('contact.hoursValue') }
  ]);
    

// Thời gian làm việc:

//     Thứ 2 – Thứ 5: 06:00 – 21:00
//     Thứ 7 & CN: 09:00 – 18:00
//     Lưu ý: Thứ 6 nghỉ


  
  let nameLabel = $derived($t('contact.formName'));
  let emailLabel = $derived($t('contact.formEmail'));
  let messageLabel = $derived($t('contact.formMessage'));
  let sendText = $derived(formButtonText || $t('contact.formSend'));
  let successText = $derived(formSuccessMessage || $t('contact.formSuccess'));
</script>



<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 {className}">
  <!-- Left: Map + contact info -->
  <div class="{showAnimation ? 'animate-fade-up' : ''}">
    <!-- Map embed -->
    <div class="rounded-2xl overflow-hidden mb-8 shadow-lg">
      <iframe 
        src={mapSrc}
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        class="w-full {mapHeight}"
      ></iframe>
    </div>
    
    <!-- Contact details -->
    <div class="space-y-4">
      {#each contactItems as item}
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
  <div class="{showAnimation ? 'animate-fade-up' : ''}" style="animation-delay: {animationDelay}ms">
    <div class="bg-stone-50 dark:bg-neutral-800/50 rounded-2xl p-8 border border-neutral-100 dark:border-neutral-700">
      {#if formSent}
        <div in:scale={{ duration: 300 }} class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 rounded-full bg-sage-100 dark:bg-sage-900/30 flex items-center justify-center mb-4">
            <Check class="w-8 h-8 text-sage-600" />
          </div>
          <p class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {successText}
          </p>
        </div>
      {:else}
        <form onsubmit={submitForm} class="space-y-5" id="contact" action="https://usebasin.com/f/15fcd8b54101" method="post">    
          <!-- target="_blank" -->
          {#if showFormLabels}
            <div>
              <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5">
                {nameLabel}
              </label>
              <input
                type="text"
                required
                bind:value={formData.name}
                class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-lotus-400 focus:ring-0 text-sm transition-colors"
              />
            </div>
          {:else}
            <input
              type="text"
              required
              placeholder={nameLabel}
              bind:value={formData.name}
              class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-lotus-400 focus:ring-0 text-sm transition-colors"
            />
          {/if}
          
          {#if showFormLabels}
            <div>
              <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5">
                {emailLabel}
              </label>
              <input
                type="email"
                required
                bind:value={formData.email}
                class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-lotus-400 focus:ring-0 text-sm transition-colors"
              />
            </div>
          {:else}
            <input
              type="email"
              required
              placeholder={emailLabel}
              bind:value={formData.email}
              class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-lotus-400 focus:ring-0 text-sm transition-colors"
            />
          {/if}
          
          {#if showFormLabels}
            <div>
              <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5">
                {messageLabel}
              </label>
              <textarea
                rows="5"
                required
                bind:value={formData.message}
                class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-lotus-400 focus:ring-0 text-sm transition-colors resize-none"
              ></textarea>
            </div>
          {:else}
            <textarea
              rows="5"
              required
              placeholder={messageLabel}
              bind:value={formData.message}
              class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-lotus-400 focus:ring-0 text-sm transition-colors resize-none"
            ></textarea>
          {/if}
          
          <button
            type="submit"
            class="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-lotus-500 to-lotus-700 hover:shadow-lg hover:shadow-lotus-300/40 hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Send class="w-4 h-4" />
            {sendText}
          </button>
        </form>
      {/if}
    </div>
  </div>
</div>


