import { NextResponse } from 'next/server';
import { strapiFetch } from '../../lib/strapi';

export const dynamic = 'force-dynamic';

const attrs = (x) => (x?.attributes ?? x ?? {});

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const q = (searchParams.get('q') || '').trim().toLowerCase();
	const debug = searchParams.get('debug') === '1';

	try {
		const menu = await strapiFetch('/api/menu?populate[Kategoria][populate]=*', { cache: 'no-store' });
		const root = attrs(menu?.data);
		const cats = root?.Kategoria || [];

		const all = [];
		for (const cat of cats) {
			const pages = cat?.Podstrona || cat?.podstrona || [];
			for (const p of pages) {
				const ap = attrs(p);
				const title   = ap.Tytul ?? ap.Tytuł ?? ap.tytul ?? ap.tytuł ?? '';
				const excerpt = ap.Opis  ?? ap.opis  ?? '';
				const path    = ap.Link  ?? ap.link  ?? '';
				const id      = ap.id ?? `${title}::${path}`;
				all.push({ id, title, excerpt, path });
			}
		}

		if (!q) {
			return NextResponse.json({
				items: [], total: 0,
				...(debug ? { _debug: { cats: cats.length, all: all.length } } : {})
			});
		}

		const filtered = all.filter(x =>
			(x.title || '').toLowerCase().includes(q) ||
			(x.excerpt || '').toLowerCase().includes(q)
		);

		filtered.sort((a, b) => {
			const inx = (s) => (s || '').toLowerCase().indexOf(q);
			const as = Math.min(inx(a.title),  inx(a.excerpt) === -1 ? 999 : inx(a.excerpt) + 5);
			const bs = Math.min(inx(b.title),  inx(b.excerpt) === -1 ? 999 : inx(b.excerpt) + 5);
			return (as === -1 ? 999 : as) - (bs === -1 ? 999 : bs);
		});

		return NextResponse.json({
			items: filtered.slice(0, 10),
			total: filtered.length,
			...(debug ? { _debug: { cats: cats.length, all: all.length } } : {})
		});
	} catch (e) {
		console.error('API /search error:', e);
		return NextResponse.json({ items: [], total: 0, error: 'search_failed' }, { status: 500 });
	}
}
