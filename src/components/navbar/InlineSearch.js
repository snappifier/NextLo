'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useRef, useState } from 'react';
import {motion} from "motion/react"
import Link from 'next/link';

// Ikona posta
const PostIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
		<path fill="currentColor" d="M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-4.86 8.86l-3 3.87L9 13.14L6 17h12z"/>
	</svg>
);

// Ikona strony
const PageIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
		<path fill="currentColor" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/>
	</svg>
);

// Formatowanie daty
const formatDate = (dateStr) => {
	if (!dateStr) return '';
	try {
		return new Date(dateStr).toLocaleDateString('pl-PL', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	} catch {
		return dateStr;
	}
};

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
			if (!shf || focused) return;
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			if (e.key.length === 1 || e.key === 'Backspace') {
				e.preventDefault();
				inputRef.current?.focus({ preventScroll: true });
				setFocused(true);
				setOpen(true);

				setValue((prev) => {
					if (e.key === 'Backspace') return prev.slice(0, -1);
					return prev + e.key;
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
		<motion.div ref={rootRef} className={`absolute size-11 rounded-full flex items-center justify-end gap-0 right-0 ${shf ? 'bg-white' : ''} transition-colors duration-200`}
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
			<div className={`mr-[8px] ${shf ? 'text-slate-700' : 'text-white'} transition-colors duration-200`}>
				<svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"></path></g></svg>
			</div>

			{open && (
				<div className="absolute left-0 top-10 right-0 mt-2 rounded-lg border border-slate-200 bg-white shadow-lg z-50 max-w-md">
					{loading && <div className="p-3 text-sm text-gray-500">Szukam…</div>}
					{!loading && error && <div className="p-3 text-sm text-red-600">{error}</div>}
					{!loading && !error && results.length === 0 && (
						<div className="p-3 text-sm text-gray-500">Brak wyników.</div>
					)}
					{!loading && !error && results.length > 0 && (
						<ul className="max-h-80 overflow-auto divide-y divide-slate-100">
							{results.map((it) => (
								<li key={it.id} className="hover:bg-slate-50 transition-colors">
									<Link
										href={it.path || '/'}
										className="block p-3"
										onClickCapture={() => setOpen(false)}
									>
										<div className="flex items-start gap-2">
											<div className={`mt-0.5 ${it.type === 'post' ? 'text-sky-600' : 'text-slate-500'}`}>
												{it.type === 'post' ? <PostIcon /> : <PageIcon />}
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 flex-wrap">
													<div className="font-medium text-slate-900 text-sm line-clamp-1">
														{it.title}
													</div>
													{it.type === 'post' && (
														<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-700 shrink-0">
															Aktualność
														</span>
													)}
												</div>
												{it.excerpt && (
													<div className="text-xs text-slate-600 line-clamp-2 mt-1">
														{it.excerpt}
													</div>
												)}
												{it.type === 'post' && (it.author || it.date) && (
													<div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
														{it.author && <span>{it.author}</span>}
														{it.author && it.date && <span>•</span>}
														{it.date && <span>{formatDate(it.date)}</span>}
													</div>
												)}
											</div>
										</div>
									</Link>
								</li>
							))}
						</ul>
					)}
					{!loading && !error && total > results.length && (
						<div className="p-2 text-right text-xs text-gray-500 border-t border-slate-100">
							Pokazano {results.length} z {total} wyników
						</div>
					)}
				</div>
			)}
		</motion.div>
	);
}