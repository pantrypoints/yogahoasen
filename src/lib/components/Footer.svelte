<script lang="ts">
	import { t } from '$lib/i18n';
	import { Flower, Instagram, Facebook, Youtube } from 'lucide-svelte';
</script>

<footer class="bg-neutral-900 dark:bg-black text-neutral-300">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-12">
			<!-- Brand -->
			<div class="md:col-span-2">
				<div class="flex items-center gap-2 mb-4">
					<div class="relative w-10 h-10">
						<img src="/logo.svg" alt="Logo" class="object-cover shadow-sm"/>
					</div>
					<span class="font-heading text-xl font-semibold text-white">Yoga Hoa Sen</span>
				</div>
				<p class="text-sm text-neutral-400 max-w-xs leading-relaxed mb-6">
					{$t('footer.tagline')}
				</p>
				<div class="flex gap-3">
					{#each [Instagram, Facebook, Youtube] as Icon, i}
						<a
							href="#"
							class="p-2 rounded-full bg-neutral-800 hover:bg-lotus-600 text-neutral-400 hover:text-white
										transition-all duration-200 hover:scale-110"
							aria-label="Social link"
						>
							<Icon class="w-4 h-4" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Pages</h3>
				<ul class="space-y-2">
					{#each [
						{ href: '/', label: $t('nav.home') },
						{ href: '/articles', label: $t('nav.articles') },
						{ href: '/events', label: $t('nav.events') },
						{ href: '/faq', label: $t('nav.faq') }
					] as link}
						<li>
							<a
								href={link.href}
								class="text-sm hover:text-lotus-400 transition-colors duration-200"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
					{$t('contact.title')}
				</h3>
				<address class="not-italic text-sm text-neutral-400 space-y-2">
					<p>34 Phan Liêm, Phường Tân Định, Thành phố Hồ Chí Minh</p>
					<p>91 887 3316</p>
					<p>yogahoasen.vn@gmail.com</p>
				</address>
			</div>
		</div>

		<div
			class="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4"
		>
			<p class="text-xs text-neutral-500">
				© {new Date().getFullYear()} Yoga Hoa Sen. {$t('footer.rights')}
			</p>
			<div class="flex gap-4 text-xs text-neutral-500">
				<a href="#" class="hover:text-lotus-400 transition-colors">{$t('footer.privacy')}</a>
				<a href="#" class="hover:text-lotus-400 transition-colors">{$t('footer.terms')}</a>
			</div>
		</div>
	</div>
</footer>
