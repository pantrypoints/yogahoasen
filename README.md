# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
bun x sv create --template minimal --types ts --add eslint vitest="usages:unit,component" tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:cloudflare+cfTarget:pages" mdsvex paraglide="languageTags:en, vi+demo:yes" prettier --install bun yogahoasen
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


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





        <form class="space-y-5" id="contact" action="https://usebasin.com/f/15fcd8b54101" method="post" target="_blank">    
          <!-- onsubmit={submitForm}  -->
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
                    transition-all duration-200">
              <img src={c.avatar} alt={c.name} class="w-14 h-14 rounded-full object-cover ring-2 ring-lotus-200 dark:ring-lotus-800" />
              <div class="flex-1">
                <p class="font-semibold text-neutral-900 dark:text-neutral-100">{c.name}</p>
                <p class="text-xs text-neutral-400 mb-2">{c.role}</p>
                <a href="tel:{c.phone.replace(/\./g, '')}"
                  class="inline-flex items-center gap-1.5 text-sm font-bold text-lotus-600 dark:text-lotus-400
                        hover:text-lotus-700 transition-colors">
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
                        : 'bg-white/10 border border-white/15'}">
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
        