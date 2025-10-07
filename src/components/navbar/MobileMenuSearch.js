"use client";

import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function MobileSearch({ className = "" }) {
	const [open, setOpen] = useState(false);

	// --- search state
	const [value, setValue] = useState("");
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const rootRef = useRef(null);
	const inputRef = useRef(null);

	const prefersReducedMotion = useReducedMotion();
	const spring = prefersReducedMotion
		? { duration: 0.15, ease: "linear" }
		: { type: "spring", stiffness: 300, damping: 26, mass: 0.8 };

	// fokus przy otwarciu, blur przy zamknięciu
	useEffect(() => {
		if (open) inputRef.current?.focus?.({ preventScroll: true });
		else inputRef.current?.blur?.();
	}, [open]);

	// po zamknięciu: wyczyść input (i wyniki „przy okazji”)
	useEffect(() => {
		if (!open) {
			setValue("");
			setResults([]);
			setTotal(0);
			setError("");
		}
	}, [open]);

	// zamykanie po tapnięciu poza i przy scrollu (tylko to)
	useEffect(() => {
		const onOutside = (e) => {
			if (!rootRef.current?.contains(e.target)) setOpen(false);
		};
		const onScroll = () => setOpen(false);

		document.addEventListener("mousedown", onOutside);
		document.addEventListener("touchstart", onOutside, { passive: true });
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			document.removeEventListener("mousedown", onOutside);
			document.removeEventListener("touchstart", onOutside);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	// debounced wyszukiwanie
	const run = useDebouncedCallback(async (q) => {
		if (!q) {
			setResults([]);
			setTotal(0);
			setError("");
			return;
		}
		setLoading(true);
		try {
			const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
				cache: "no-store",
			});
			const j = await r.json();
			setResults(j.items || []);
			setTotal(j.total || 0);
			setError(r.ok ? "" : "Błąd wyszukiwania");
		} catch {
			setResults([]);
			setTotal(0);
			setError("Błąd połączenia");
		} finally {
			setLoading(false);
		}
	}, 300);

	useEffect(() => { run(value); }, [value, run]);

	return (
		<motion.div
			ref={rootRef}
			className={`absolute size-11 rounded-full flex items-center justify-end gap-0 right-0 ${open ? "bg-white" : ""} transition-colors duration-200 ${className}`}
			initial={false}
			animate={open ? { width: "250px" } : {}}
			role="search"
			aria-expanded={open}
		>
			<motion.input
				ref={inputRef}
				type="search"
				placeholder="Szukaj…"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="w-full rounded-md px-3 py-2 outline-none text-slate-700"
				aria-label="Szukaj"
				animate={open ? { display: "block" } : { display: "none" }}
			/>

			{/* ikona lupy — TAP = otwórz + od razu klawiatura */}
			<button
				type="button"
				className={`mr-[8px] shrink-0 ${open ? "text-slate-700" : "text-white"} transition-colors duration-200`}
				aria-label={open ? "Szukaj" : "Otwórz wyszukiwanie"}
				onPointerDown={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (!open) {
						setOpen(true);
						// poczekaj jedną klatkę, aż input stanie się widoczny, wtedy fokus (mobilne Safari)
						requestAnimationFrame(() => {
							inputRef.current?.focus?.({ preventScroll: true });
						});
					}
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
					/>
				</svg>
			</button>

			{/* dropdown wyników — pokazuj tylko gdy pasek otwarty */}
			{open && (
				<div className="absolute left-0 top-12 right-0 rounded-lg border bg-white shadow-lg z-50">
					{loading && <div className="p-3 text-sm text-gray-500">Szukam…</div>}
					{!loading && error && <div className="p-3 text-sm text-red-600">{error}</div>}
					{!loading && !error && value && results.length === 0 && (
						<div className="p-3 text-sm text-gray-500">Brak wyników.</div>
					)}
					{!loading && !error && results.length > 0 && (
						<ul className="max-h-80 overflow-auto divide-y">
							{results.map((it) => (
								<li key={it.id} className="p-3 hover:bg-gray-50">
									<Link
										href={it.path || "/"}
										className="block"
										onClick={() => {
											// nawigacja: zamknij pasek -> input sam się wyczyści przez efekt
											setOpen(false);
										}}
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
