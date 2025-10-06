"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";

function useDebounced(value, delay = 200) {
	const [v, setV] = useState(value);
	useEffect(() => {
		const id = setTimeout(() => setV(value), delay);
		return () => clearTimeout(id);
	}, [value, delay]);
	return v;
}

function Highlight({ text, q }) {
	if (!q) return text;
	const idx = text.toLowerCase().indexOf(q.toLowerCase());
	if (idx === -1) return text;
	const before = text.slice(0, idx);
	const match = text.slice(idx, idx + q.length);
	const after = text.slice(idx + q.length);
	return (
		<>
			{before}
			<mark className="rounded px-0.5 bg-yellow-200/70 dark:bg-yellow-300/30">{match}</mark>
			{after}
		</>
	);
}

export default function SearchBar({ items, placeholder = "Szukaj…", onSelect }) {
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef(null);
	const debounced = useDebounced(query, 200);

	// Skróty: "/" fokus, ESC czyszczenie/zamknięcie
	useEffect(() => {
		const onKey = (e) => {
			const target = e.target;
			const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.getAttribute("contenteditable") === "true");
			if (!typing && e.key === "/") {
				e.preventDefault();
				inputRef.current?.focus();
			}
			if (e.key === "Escape") {
				if (query) setQuery("");
				else setIsOpen(false);
				inputRef.current?.blur();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [query]);

	// Filtrowanie (może być zastąpione fetch'em do API)
	const [results, setResults] = useState(items || []);
	useEffect(() => {
		let active = true;
		setIsLoading(true);
		const id = setTimeout(() => {
			if (!active) return;
			const q = (debounced || "").toLowerCase();
			const filtered = (items || []).filter((i) => (i || "").toLowerCase().includes(q));
			setResults(filtered);
			setIsLoading(false);
		}, 220);
		return () => { active = false; clearTimeout(id); };
	}, [debounced, items]);

	const hasQuery = query.trim().length > 0;

	return (
		<div className="relative">
			{/* Pole */}
			<m.div
				initial={{ opacity: 0, y: 4 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 400, damping: 30 }}
				className="group flex items-center gap-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/40"
			>
				<SearchIcon className="size-5 opacity-70" aria-hidden />
				<input
					ref={inputRef}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setIsOpen(true)}
					aria-label="Search"
					placeholder={placeholder}
					className="peer w-full bg-transparent outline-none text-[15px] placeholder:text-slate-400"
				/>
				<kbd className="hidden sm:inline-flex select-none items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700">/</kbd>
				<button
					onClick={() => setQuery("")}
					aria-label="Clear search"
					className={`transition-opacity ${hasQuery ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				>
					<X className="size-5" />
				</button>
			</m.div>

			{/* Wyniki */}
			<AnimatePresence>
				{isOpen && (
					<m.div
						key="results"
						initial={{ opacity: 0, y: 8, scale: 0.98 }}
						animate={{ opacity: 1, y: 6, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.98 }}
						transition={{ duration: 0.18 }}
						role="listbox"
						aria-label="Search results"
						className="absolute left-0 right-0 mt-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden"
					>
						{/* Pasek ładowania */}
						<m.div aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: isLoading ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ transformOrigin: "0% 50%" }} className="h-0.5 bg-blue-500/70" />

						<div className="max-h-64 overflow-auto p-2">
							{isLoading ? (
								<div className="flex items-center gap-2 px-2 py-3 text-sm text-slate-600 dark:text-slate-300">
									<Loader2 className="size-4 animate-spin" /> Szukanie…
								</div>
							) : results.length === 0 ? (
								<div className="px-3 py-4 text-sm text-slate-500">Brak wyników dla „{debounced}”.</div>
							) : (
								results.map((r, i) => (
									<button
										key={r + i}
										role="option"
										onClick={() => {
											onSelect && onSelect(r);
											setIsOpen(false);
											inputRef.current?.blur();
										}}
										className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
									>
										<span className="text-[15px]"><Highlight text={r} q={debounced} /></span>
									</button>
								))
							)}
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	);
}