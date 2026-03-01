// import type { PageLoad } from './$types';
// import { error } from '@sveltejs/kit';

// export const load: PageLoad = async ({ params }) => {
// 	try {
// 		const article = await import(`../../../../content/articles/${params.slug}.md`);

// 	} catch (e) {
// 		throw error(404, 'Article not found');
// 	}
// };



// src/routes/articles/[slug]/+page.ts
// export const load: PageLoad = async ({ params }) => {
//   try {
//     // const article = await import(`../../../content/articles/${params.slug}.md`);
//     // or if you moved to src:
//     const article = await import(`$lib/content/articles/${params.slug}.md`);
// 	return {
// 		content: article.default,
// 		metadata: article.metadata
// 	};
//   } catch (e) {
//     throw error(404, 'Article not found');
//   }
// };




import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  try {
    const article = await import(`../../../content/articles/${params.slug}.md`);
    
    return {
      content: article.default,
      metadata: article.metadata || {}
    };
  } catch (e) {
    throw error(404, 'Article not found');
  }
};