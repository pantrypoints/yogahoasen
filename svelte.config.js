// import { mdsvex } from 'mdsvex';
// import adapter from '@sveltejs/adapter-cloudflare';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: { adapter: adapter() },
// 	preprocess: [mdsvex()],
// 	extensions: ['.svelte', '.svx']
// };

// export default config;




import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Add .md and .svx extensions to the list of files that Svelte handles
  extensions: ['.svelte', '.md', '.svx'],
  
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md', '.svx'],
      // Optional: configure markdown options
      smartypants: {
        dashes: 'oldschool'
      },
      // You can add remark/rehype plugins here if needed
      remarkPlugins: [],
      rehypePlugins: []
    })
  ],
  
  kit: {
    adapter: adapter()
  }
};

export default config;