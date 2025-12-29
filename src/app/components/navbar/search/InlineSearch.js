'use client';
import {useDebouncedCallback} from 'use-debounce';
import {useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from "motion/react"
import Link from 'next/link';
import SkeletonLoader from "@/app/components/navbar/search/SkeletonLoader";


const PostIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><path fill="currentColor" d="M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-4.86 8.86l-3 3.87L9 13.14L6 17h12z"></path></svg>
);

const PageIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 48 48"><g fill="none"><rect width={40} height={32} x={4} y={8} stroke="currentColor" strokeLinejoin="round" strokeWidth={4} rx={3}></rect><path stroke="currentColor" strokeWidth={4} d="M4 11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9H4z"></path><circle r={2} fill="currentColor" transform="matrix(0 -1 -1 0 10 14)"></circle><circle r={2} fill="currentColor" transform="matrix(0 -1 -1 0 16 14)"></circle></g></svg>
);

export default function InlineSearch() {
	const [value, setValue] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const [open, setOpen] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const [searchWidth, setSearchWidth] = useState(250);
	const [initialLoad, setInitialLoad] = useState(true);
	const shf = value.length > 0 || hovered || focused;

	const rootRef = useRef(null);
	const inputRef = useRef(null);
	const currentQueryRef = useRef(value);

	useEffect(() => {
		currentQueryRef.current = value;
	}, [value])

	const closeSearch = () => {
		setOpen(false);
		setValue('');
		setResults([]);
		setHasMore(false)
	};

	const loadMore = useCallback(async () => {
		const query = currentQueryRef.current;

		if (loading || loadingMore || !hasMore || !query.trim()) {
			return;
		}
		setLoadingMore(true);
		const currentOffset = results.length;

		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&offset=${currentOffset}&limit=5`);
			const data = await res.json();
			const newItems = data.items || [];

			if (newItems.length > 0) {
				setResults(prev => {
					const combined = [...prev, ...newItems];
					return Array.from(new Map(combined.map(item => [item.id, item])).values());
				});
			}
			setHasMore(data.hasMore === true);
		} catch (err) {
			console.error("Błąd ładowania")
			setHasMore(false);
		} finally {
			setLoadingMore(false);
		}
	}, [loading, loadingMore, hasMore, results.length]);


	const run = useDebouncedCallback(async (q) => {
		if (!q.trim()) {
			setResults([]);
			setHasMore(false);
			setLoading(false);
			return;

		}
		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&offset=0&limit=8`);
			const data = await res.json();
			const items = data.items || [];
			setResults(items);
			setHasMore(data.hasMore === true);
		} catch {
			setResults([]);
			setHasMore(false);
		} finally {
			setLoading(false);
		}
	}, 300);

	const handleScroll = useCallback((e) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target;
		const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

		if (isNearBottom && hasMore && !loading && !loadingMore) {
			loadMore();
		}
	}, [hasMore, loading, loadingMore, loadMore]);

	const handleInputChange = (e) => {
		const newValue = e.target.value;
		setValue(newValue);

		if (newValue.trim()) {
			setOpen(true);
			setLoading(true);
			setResults([]);
			setHasMore(false);
			setInitialLoad(true);
		} else {
			setOpen(false);
			setLoading(false);
			setResults([]);
			setHasMore(false);
		}
	};

	useEffect(() => {
		if (results.length > 0 && initialLoad) {
			const timer = setTimeout(() => {
				setInitialLoad(false);
			}, results.length * 50 + 200);
			return () => clearTimeout(timer);
		}
	}, [results, initialLoad]);

	useEffect(() => { run(value); }, [value]);

	useEffect(() => {
		const onType = (e) => {
			if (!shf || focused) return;
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			if (e.key.length === 1 || e.key === 'Backspace') {
				e.preventDefault();
				inputRef.current?.focus({ preventScroll: true });
				setFocused(true);

				const currentValue = currentQueryRef.current;
				const newValue = e.key === 'Backspace' ? currentValue.slice(0, -1) : currentValue + e.key;

				setValue(newValue);

				if (newValue.trim()) {
					setOpen(true);
					setLoading(true);
					setResults([]);
					setHasMore(false);
				} else {
					setOpen(false);
					setLoading(false);
					setResults([]);
					setHasMore(false);
				}
			}
		};

		document.addEventListener('keydown', onType);
		return () => document.removeEventListener('keydown', onType);
	}, [shf, focused]);


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

	useEffect(() => {
		const updateWidth = () => {
			const w = window.innerWidth;
			if (w < 360) setSearchWidth(150)
			else if (w < 1024) setSearchWidth(220)
			else if (w < 1100) setSearchWidth(125)
			else if (w < 1140) setSearchWidth(150)
			else if (w < 1280) setSearchWidth(200)
			else setSearchWidth(250)
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	useEffect(() => {
		if (focused && inputRef.current) {
			inputRef.current.focus({ preventScroll: true });
		}
	}, [focused]);

	const stripHtml = (html) => {
		if (!html) return "";
		return html.replace(/(<([^>]+)>)/gi, "");
	};

	const containerVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: { opacity: 1, scale: 1, transition: {duration: 0.05 ,staggerChildren: 0.05} },
		exit: { opacity: 0, scale: 0.9, transition: {duration: 0.02} }
	}

	return (
		<motion.div ref={rootRef} className={`absolute size-10 rounded-xl flex items-center justify-end gap-0 right-0 ${shf ? 'bg-white' : ''} transition-colors duration-200`}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					animate={shf ? {width: searchWidth} : {} }
					onHoverStart={() => {setHovered(true)}}
					onHoverEnd={() => {setHovered(false)}}
		>
			{shf && (
				<motion.input className={`w-full rounded-md px-3 py-2 outline-none text-slate-700 `}
							  ref={inputRef}
							  type="search"
							  value={value}
							  onChange={handleInputChange}
							  onFocus={() => {
									if (value) setOpen(true);
									setFocused(true);
							  }}
							  onBlur={() => setFocused(false)}
							  placeholder="Szukaj…"
							  aria-label="Szukaj"
							  animate={shf ? {display: 'block'} : {display: 'none'}}
				/>
			)}
			<button type="button" className={`mr-2 ${shf ? 'text-slate-700' : 'text-white'} transition-colors duration-200`}
					onClick={() => !shf && setFocused(true)}
					aria-label="Szukaj"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"></path></g></svg>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div className="absolute right-0 top-10 mt-2 p-2 h-max max-h-112 w-62.5 rounded-md overflow-auto bg-zinc-100 drop-shadow-md z-100 flex flex-col items-center justify-start overscroll-contain select-none [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-full"
								variants={containerVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								onScroll={handleScroll}
					>
						{loading && (
							<SkeletonLoader />
						)}

						{!loading && results.length === 0 && value.trim() && (<div className=" py-2 w-full text-center text-zinc-500 text-xs">Brak wyników</div>)}

						{!loading && results.length > 0 && (

							<div className="w-full h-max flex flex-col items-start gap-2">
								{results.map((item, index) => (
									<motion.div key={item.id} className="w-full h-20 rounded-md overflow-hidden border-2 bg-white shadow-sm"
												initial={{ opacity: 0, scale: 0.9, y: 10 }}
												whileInView={{ opacity: 1, scale: 1, y: 0 }}
												viewport={{ once: true, amount: 0.5 }}
												whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
												whileTap={{ scale: 0.98, transition: { duration: 0.1} }}
												transition={{ duration: 0.2, delay: initialLoad ? index * 0.05 : 0}}
									>
										<Link href={item.path || '/'} className="w-full h-full flex items-center justify-start" onClick={() => closeSearch() }>
											<div className={`ml-2 p-2 rounded-md flex items-center justify-center   ${item.type === 'post' ? 'bg-sky-600/50 text-white' : 'bg-slate-400/30 text-zinc-500'}`}>
												{item.type === 'post' ? <PostIcon /> : <PageIcon />}
											</div>
											<div className="flex-1 min-w-0 ml-3 pr-2">
												<div className="flex items-center  flex-wrap">
													<div className="font-medium text-slate-800 text-sm truncate ">
														{item.title}
													</div>
													{item.excerpt && (
														<div className="text-xs font-normal text-slate-700 line-clamp-2">{stripHtml(item.excerpt)}</div>
													)}
												</div>

											</div>

										</Link>

									</motion.div>
								))}

								{loadingMore && (
									<SkeletonLoader />
								)}

								{hasMore && !loadingMore && (<div className="h-2 w-full shrink-0" />)}

								{!hasMore && results.length > 0 && (<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} className="py-2 w-full text-center text-zinc-500 text-xs">To wszystkie wyniki</motion.div>)}

							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}