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




// import type { PageLoad } from './$types';
// import { error } from '@sveltejs/kit';

// export const load: PageLoad = async ({ params }) => {
//   try {
//     const article = await import(`../../../content/articles/${params.slug}.md`);
    
//     return {
//       content: article.default,
//       metadata: article.metadata || {}
//     };
//   } catch (e) {
//     throw error(404, 'Article not found');
//   }
// };


// src/routes/articles/[slug]/+page.ts
// import type { PageLoad } from './$types';
// import { error } from '@sveltejs/kit';

// export const load: PageLoad = async ({ params }) => {
//   try {
//     const enModule = await import(
//       `../../../../content/articles/${params.slug}/en.md`
//     );

//     let viModule = null;
//     try {
//       viModule = await import(
//         `../../../../content/articles/${params.slug}/vi.md`
//       );
//     } catch {
//       // Vietnamese version not yet written — that's fine
//     }

//     return {
//       en: { content: enModule.default, metadata: enModule.metadata },
//       vi: viModule
//         ? { content: viModule.default, metadata: viModule.metadata }
//         : null
//     };
//   } catch {
//     throw error(404, 'Article not found');
//   }
// };



import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  // 1. Try new folder structure: content/articles/<slug>/en.md
  try {
    const enModule = await import(
      `../../../../content/articles/${params.slug}/en.md`
    );

    let viModule = null;
    try {
      viModule = await import(
        `../../../../content/articles/${params.slug}/vi.md`
      );
    } catch {
      // Vietnamese version not yet written — fall back to English
    }

    return {
      en: { content: enModule.default, metadata: enModule.metadata },
      vi: viModule
        ? { content: viModule.default, metadata: viModule.metadata }
        : null
    };
  } catch {
    // ignore — try legacy flat file next
  }

  // 2. Fallback: legacy flat file content/articles/<slug>.md
  try {
    const article = await import(
      `../../../../content/articles/${params.slug}.md`
    );
    return {
      en: { content: article.default, metadata: article.metadata },
      vi: null
    };
  } catch {
    throw error(404, 'Article not found');
  }
};
