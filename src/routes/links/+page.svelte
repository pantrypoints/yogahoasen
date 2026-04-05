<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { slide, fly } from 'svelte/transition';
	import { ChevronDown, HelpCircle } from 'lucide-svelte';
</script>


<svelte:head>
	<title>Resources & Links · Yoga Hoa Sen</title>
</svelte:head>


<!-- Header -->
<div class="pt-32 pb-16 bg-gradient-to-br from-lotus-50 via-stone-50 to-sage-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
		<div in:fly={{ y: 20, duration: 500 }}>
			<p class="text-sm font-semibold text-lotus-500 uppercase tracking-widest mb-3">
				Related sites about yoga, wellness, meditation, and Ananda Marga
			</p>
			<h1 class="font-heading text-5xl font-bold text-neutral-900 dark:text-neutral-100">
				Partners and External Links
			</h1>
		</div>
	</div>
</div>
 


<div class="bg-gray-100 dark:bg-gray-900 p-8 min-h-screen">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    <a href="https://amyoganaturopathy.org/" target="_blank" class="group block shadow rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80" alt="Yoga India" class="w-full h-48 object-cover">
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Naturopathy & Yoga Treatment Center in India</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Explore traditional holistic healing and yogic treatments in India.</p>
      </div>
    </a>

    <a href="https://www.amwellness.org/" target="_blank" class="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img src="https://amwellness.org/site2015/wp-content/uploads/2017/01/cardio2-600x400.jpg" alt="Wellness Philippines" class="w-full h-48 object-cover">
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">AM Wellness Center in Philippines</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Dedicated wellness programs and retreats based in the Philippines.</p>
      </div>
    </a>

    <a href="https://yogadetox.in/" target="_blank" class="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" alt="Healthy Food" class="w-full h-48 object-cover">
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Yoga Detox India</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Resources for nutrition, health documentaries, and natural wellness.</p>
      </div>
    </a>

    <a href="https://yogataipei.org/" target="_blank" class="group block  rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80" alt="Juicing" class="w-full h-48 object-cover">
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Yoga Taipei</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Ananda Marga in Taipei</p>
      </div>
    </a>

    <a href="https://anandasuruci.org/" target="_blank" class="group block  rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img src="https://anandasuruci.org/wp-content/uploads/2021/03/Veg-farm-Jan2016-300x199.jpg" alt="Eco Village" class="w-full h-48 object-cover">
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Ananda Suruci Eco-village</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Sustainable living and spiritual retreat center in Yu Jing, Taiwan.</p>
      </div>
    </a>

    <a href="https://anandamarga.org.sg/" target="_blank" class="group block  rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img src="https://plus.unsplash.com/premium_photo-1697729420937-0ecb0ddb6e85" alt="Meditation" class="w-full h-48 object-cover">
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Ananda Marga Singapore</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400"></p>
      </div>
    </a>

    <a href="https://www.anandamarga.org/" target="_blank" class="group block  rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img src="https://images.unsplash.com/reserve/YEc7WB6ASDydBTw6GDlF_antalya-beach-lulu.jpg" alt="Meditation" class="w-full h-48 object-cover">
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Global Ananda Marga</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">The international portal for the Ananda Marga socio-spiritual movement.</p>
      </div>
    </a>


<!-- https://yogataichung.org/en/home/ -->


  </div>
</div>