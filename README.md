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