'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useRef, useState } from 'react';
import {motion} from "motion/react"
import Link from 'next/link';

export default function InlineSearch() {
	const [value, setValue] = useState('');
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);

	const [searching, setSearching] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const shf = searching || hovered || focused;


	const rootRef = useRef(null);
	const inputRef = useRef(null);

	const closeSearch = () => {
		setOpen(false);
		setValue('');
		setResults([]);
		setTotal(0);
		setError('');
		setSearching(false);
		setHovered(false);
		setFocused(false);
		inputRef.current?.blur?.();
	};

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

	useEffect(() => {
		const onType = (e) => {
			// tylko gdy pasek jest rozwinięty i input nie ma fokusa
			if (!shf || focused) return;
			// pomiń skróty klawiszowe
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			if (e.key.length === 1 || e.key === 'Backspace') {
				e.preventDefault();
				// fokus na input i aktualizacja wartości
				inputRef.current?.focus({ preventScroll: true });
				setFocused(true);
				setOpen(true);

				setValue((prev) => {
					if (e.key === 'Backspace') return prev.slice(0, -1);
					return prev + e.key; // dopisz pierwszy wpisany znak
				});
			}
		};



		document.addEventListener('keydown', onType);
		return () => document.removeEventListener('keydown', onType);
	}, [shf, focused]);

	useEffect(()=>{
		if (value.length > 0) {setSearching(true)}
		else setSearching(false);
	})


	// zamykanie po kliknięciu poza, scrollu i klawiszu Esc
	useEffect(() => {
		const onOutside = (e) => {
			if (!rootRef.current?.contains(e.target)) {
				closeSearch();
			}
		};
		const onKey = (e) => { if (e.key === 'Escape') closeSearch(); };

		document.addEventListener('mousedown', onOutside);
		document.addEventListener('touchstart', onOutside, { passive: true });
		document.addEventListener('keydown', onKey);

		return () => {
			document.removeEventListener('mousedown', onOutside);
			document.removeEventListener('touchstart', onOutside);
			document.removeEventListener('keydown', onKey);
		};
	}, []);


	return (
		<motion.div ref={rootRef} className={`absolute w-10 h-10 rounded-full flex items-center justify-end gap-2 right-5 ${shf ? 'bg-white' : ''} transition-colors duration-200`}
		            onFocus={() => setFocused(true)}
		            onBlur={() => setFocused(false)}
		            animate={shf ? {width: '250px'} : {} }
		            onHoverStart={() => {setHovered(true)}}
		            onHoverEnd={() => {setHovered(false)}}
		>
			{shf && (
			<motion.input
				ref={inputRef}
				type="search"
				value={value}
				onChange={(e) => {
					const q = e.target.value;
					setValue(q);
					setOpen(!!q);
				}}
				onFocus={() => {
					if (value) setOpen(true);
					setFocused(true);
				}}
				onBlur={() => setHovered(false)}
				placeholder="Szukaj…"
				className={`w-full rounded-md px-3 py-2 outline-none text-slate-700 `}
				aria-label="Szukaj"
				animate={shf ? {display: 'block'} : {display: 'none'}}
			/>
			)}
			<div className={`min-h-5 min-w-5 right-2 shrink-0 mr-[8px] ${shf ? 'text-slate-700' : 'text-white'} transition-colors duration-200`}>
				<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"></path></svg>

			</div>


			{open && (
				<div className="absolute left-0 top-10 right-0 mt-2 rounded-lg border bg-white shadow-lg z-50">
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
		</motion.div>
	);
}
