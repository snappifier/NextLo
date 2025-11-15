// app/api/search/route.js
import { NextResponse } from 'next/server';
import { strapiFetch } from '../../lib/strapi';

export const dynamic = 'force-dynamic';

const attrs = (x) => (x?.attributes ?? x ?? {});

const searchCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

// Mapowanie Single Types (używane przez custom endpoint Strapi)
// Jeśli chcesz przeszukiwać więcej Single Types, dodaj je do search.js w Strapi

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

		// 1. Przeszukaj strukturę menu (istniejący kod)
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
					all.push({ id, title, excerpt, path, type: 'menu' });
				}
			}
		} catch (e) {
			console.error('Menu fetch error:', e);
		}

		// 2. Użyj custom search endpoint ze Strapi (tylko jeśli jest zapytanie)
		if (q) {
			try {
				const strapiSearchRes = await strapiFetch(
					`/api/search?query=${encodeURIComponent(q)}`,
					{ cache: 'no-store' }
				);

				// Dodaj posty z wyników Strapi search
				const posts = strapiSearchRes?.results?.posts || [];
				for (const post of posts) {
					const title = post.title || post.Tytul || '';
					const excerpt = post.description || post.Opis || '';
					const slug = post.slug || post.id;
					const path = `/blog/${slug}`; // dostosuj do swojej struktury URL

					all.push({
						id: `post::${post.id}`,
						title,
						excerpt,
						path,
						type: 'post'
					});
				}

				// Dodaj Single Types z wyników Strapi search
				const singleTypes = strapiSearchRes?.results?.singleTypes || [];
				for (const st of singleTypes) {
					// Mapowanie nazw Single Types na polskie nazwy i ścieżki
					const nameMap = {
						'hymn': { name: 'Hymn', path: '/hymn' },
						'patron': { name: 'Patron', path: '/patron' },
						'akademia-zamojska': { name: 'Akademia Zamojska', path: '/akademia-zamojska' },
					};

					const mapped = nameMap[st.name] || {
						name: st.name.charAt(0).toUpperCase() + st.name.slice(1),
						path: `/${st.name}`
					};

					// Spróbuj wyciągnąć tytuł z danych
					const data = st.data || {};
					const dataTitle = data.Tytul || data.title || '';

					all.push({
						id: `single::${st.name}`,
						title: dataTitle || mapped.name,
						excerpt: `Strona: ${mapped.name}`,
						path: mapped.path,
						type: 'single-type'
					});
				}
			} catch (e) {
				console.error('Strapi search endpoint error:', e);
				// Jeśli custom endpoint nie działa, kontynuuj bez błędu
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
			(x.excerpt || '').toLowerCase().includes(q)
		);

		// Sortuj wyniki (preferuj dopasowania w tytule)
		filtered.sort((a, b) => {
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
						menu: all.filter(x => x.type === 'menu').length,
						posts: all.filter(x => x.type === 'post').length,
						singleTypes: all.filter(x => x.type === 'single-type').length,
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

// Opcjonalnie: funkcja do czyszczenia cache
export function clearSearchCache() {
	searchCache.clear();
}