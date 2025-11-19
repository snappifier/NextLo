// app/api/search/route.js
import { NextResponse } from 'next/server';
import { strapiFetch } from '../../lib/strapi';

export const dynamic = 'force-dynamic';

const attrs = (x) => (x?.attributes ?? x ?? {});

const searchCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const q = (searchParams.get('q') || '').trim().toLowerCase();
	const debug = searchParams.get('debug') === '1';

	try {
		const cacheKey = `search_${q}`;
		const cached = searchCache.get(cacheKey);
		if (cached && Date.now() - cached.time < CACHE_TTL) {
			return NextResponse.json(cached.data);
		}

		const all = [];

		// 1. Przeszukaj strukturę menu (podstrony)
		try {
			const menu = await strapiFetch('/api/menu?populate[Kategoria][populate]=*', { cache: 'no-store' });
			const root = attrs(menu?.data);
			const cats = root?.Kategoria || [];

			for (const cat of cats) {
				const pages = cat?.Podstrona || cat?.podstrona || [];
				for (const p of pages) {
					const ap = attrs(p);
					const title = ap["Tytul"] ?? '';
					const excerpt = ap["Opis"] ?? '';
					const path = ap["Link"] ?? '';
					const id = ap.id ?? `menu::${title}::${path}`;
					all.push({ id, title, excerpt, path, type: 'page' });
				}
			}
		} catch (e) {
			console.error('Menu fetch error:', e);
		}

		// 2. Przeszukaj posty (jeśli jest query)
		if (q) {
			try {
				const postsRes = await strapiFetch(
					'/api/posts?pagination[pageSize]=100',
					{ cache: 'no-store' }
				);

				const posts = postsRes?.data || [];

				for (const post of posts) {
					const title = post.Tytul || '';
					const excerpt = post.Opis || '';
					const documentId = post.documentId;
					const author = post.Autor || '';
					const date = post.Data || '';

					if (!documentId) continue;

					all.push({
						id: `post::${post.id}`,
						title,
						excerpt,
						path: `/aktualnosci/${documentId}`,
						type: 'post',
						author,
						date
					});
				}
			} catch (e) {
				console.error('Posts fetch error:', e);
			}
		}

		// Jeśli brak zapytania, zwróć pustą listę
		if (!q) {
			return NextResponse.json({
				items: [],
				total: 0,
				...(debug ? { _debug: { totalItems: all.length } } : {})
			});
		}

		// Filtruj wyniki
		const filtered = all.filter(x =>
			(x.title || '').toLowerCase().includes(q) ||
			(x.excerpt || '').toLowerCase().includes(q) ||
			(x.author || '').toLowerCase().includes(q)
		);

		// Sortuj wyniki (posty na górze, potem dopasowanie w tytule)
		filtered.sort((a, b) => {
			// Najpierw posty
			if (a.type === 'post' && b.type !== 'post') return -1;
			if (a.type !== 'post' && b.type === 'post') return 1;

			// Potem dopasowanie w tytule
			const inx = (s) => (s || '').toLowerCase().indexOf(q);
			const as = Math.min(
				inx(a.title) === -1 ? 999 : inx(a.title),
				inx(a.excerpt) === -1 ? 999 : inx(a.excerpt) + 5
			);
			const bs = Math.min(
				inx(b.title) === -1 ? 999 : inx(b.title),
				inx(b.excerpt) === -1 ? 999 : inx(b.excerpt) + 5
			);
			return as - bs;
		});

		const result = {
			items: filtered.slice(0, 10),
			total: filtered.length,
			...(debug ? {
				_debug: {
					totalItems: all.length,
					byType: {
						pages: all.filter(x => x.type === 'page').length,
						posts: all.filter(x => x.type === 'post').length,
					}
				}
			} : {})
		};

		searchCache.set(cacheKey, { data: result, time: Date.now() });
		return NextResponse.json(result);
	} catch (e) {
		console.error('API /search error:', e);
		return NextResponse.json(
			{ items: [], total: 0, error: 'search_failed' },
			{ status: 500 }
		);
	}
}

export function clearSearchCache() {
	searchCache.clear();
}