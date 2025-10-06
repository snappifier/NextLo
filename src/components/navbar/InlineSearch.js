'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function InlineSearch() {
	const [value, setValue] = useState('');
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);

	const rootRef = useRef(null);

	const run = useDebouncedCallback(async (q) => {
		if (!q) { setResults([]); setTotal(0); setError(''); return; }
		setLoading(true);
		try {
			const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { cache: 'no-store' });
			const j = await r.json();
			setResults(j.items || []);
			setTotal(j.total || 0);
			setError(r.ok ? '' : 'Błąd wyszukiwania');
		} catch {
			setResults([]); setTotal(0); setError('Błąd połączenia');
		} finally { setLoading(false); }
	}, 300);

	useEffect(() => { run(value); }, [value, run]);

	// zamykanie po kliknięciu poza, scrollu i klawiszu Esc
	useEffect(() => {
		if (!open) return;

		const onOutside = (e) => {
			if (!rootRef.current?.contains(e.target)) setOpen(false);
		};
		const onScroll = () => setOpen(false);
		const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };

		document.addEventListener('mousedown', onOutside);
		document.addEventListener('touchstart', onOutside, { passive: true });
		window.addEventListener('scroll', onScroll, { passive: true });
		document.addEventListener('keydown', onKey);

		return () => {
			document.removeEventListener('mousedown', onOutside);
			document.removeEventListener('touchstart', onOutside);
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('keydown', onKey);
		};
	}, [open]);

	return (
		<div ref={rootRef} className="relative w-full max-w-xl">
			<input
				type="search"
				value={value}
				onChange={(e) => {
					const q = e.target.value;
					setValue(q);
					setOpen(!!q);       // otwórz gdy coś wpisane
				}}
				onFocus={() => value && setOpen(true)}
				placeholder="Szukaj…"
				className="w-full rounded-md border px-3 py-2 outline-none"
				aria-label="Szukaj"
			/>

			{open && (
				<div className="absolute left-0 right-0 mt-2 rounded-lg border bg-white shadow-lg z-50">
					{loading && <div className="p-3 text-sm text-gray-500">Szukam…</div>}
					{!loading && error && <div className="p-3 text-sm text-red-600">{error}</div>}
					{!loading && !error && results.length === 0 && (
						<div className="p-3 text-sm text-gray-500">Brak wyników.</div>
					)}
					{!loading && !error && results.length > 0 && (
						<ul className="max-h-80 overflow-auto divide-y">
							{results.map((it) => (
								<li key={it.id} className="p-3 hover:bg-gray-50">
									<Link
										href={it.path || '/'}
										className="block"
										onClickCapture={() => setOpen(false)} // zamknij na klik wyniku
									>
										<div className="font-medium text-black">{it.title}</div>
										{it.excerpt && (
											<div className="text-xs text-gray-600 line-clamp-2">{it.excerpt}</div>
										)}
									</Link>
								</li>
							))}
						</ul>
					)}
					{!loading && !error && total > results.length && (
						<div className="p-2 text-right text-xs text-gray-500">
							{results.length} z {total}.
						</div>
					)}
				</div>
			)}
		</div>
	);
}
