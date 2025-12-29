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
	const offset = parseInt(searchParams.get('offset') || '0', 10);
	const limit = parseInt(searchParams.get('limit') || '10', 10);
	const debug = searchParams.get('debug') === '1';

	try {
		// Cache dla pełnych wyników (bez paginacji)
		const cacheKey = `search_${q}`;
		let allFiltered;

		const cached = searchCache.get(cacheKey);
		if (cached && Date.now() - cached.time < CACHE_TTL) {
			allFiltered = cached.data;
		} else {
			const all = [];

		// Przeszukiwanie struktury menu (podstrony)
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

		// Posty
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

			// Jeżeli brak zapytań
			if (!q) {
				return NextResponse.json({
					items: [],
					total: 0,
					hasMore: false,
					...(debug ? { _debug: { totalItems: all.length } } : {})
				});
			}

			// Filtrowanie
			allFiltered = all.filter(x =>
				(x.title || '').toLowerCase().includes(q) ||
				(x.excerpt || '').toLowerCase().includes(q) ||
				(x.author || '').toLowerCase().includes(q)
			);

			// Sortowanie
			allFiltered.sort((a, b) => {
				if (a.type === 'post' && b.type !== 'post') return -1;
				if (a.type !== 'post' && b.type === 'post') return 1;

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

			// Zapisz do cache
			searchCache.set(cacheKey, { data: allFiltered, time: Date.now() });
		}

		const paginatedItems = allFiltered.slice(offset, offset + limit);
		const hasMore = offset + limit < allFiltered.length;

		const result = {
			items: paginatedItems,
			total: allFiltered.length,
			hasMore,
			offset,
			limit,
			...(debug ? {
				_debug: {
					totalFiltered: allFiltered.length,
					returnedCount: paginatedItems.length,
					nextOffset: offset + limit
				}
			} : {})
		};

		return NextResponse.json(result);
	} catch (e) {
		console.error('API /search error:', e);
		return NextResponse.json(
			{ items: [], total: 0, hasMore: false, error: 'search_failed' },
			{ status: 500 }
		);
	}
}

export function clearSearchCache() {
	searchCache.clear();
}