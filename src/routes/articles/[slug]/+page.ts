import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const article = await import(`../../../../content/articles/${params.slug}.md`);
		return {
			content: article.default,
			metadata: article.metadata
		};
	} catch (e) {
		throw error(404, 'Article not found');
	}
};
