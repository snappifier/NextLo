"use client";

import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function MobileSearch({ className = "" }) {
	const [open, setOpen] = useState(false);

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


	useEffect(() => {
		if (open) inputRef.current?.focus?.({ preventScroll: true });
		else inputRef.current?.blur?.();
	}, [open]);


	useEffect(() => {
		if (!open) {
			setValue("");
			setResults([]);
			setTotal(0);
			setError("");
		}
	}, [open]);

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

	//  wyszukiwanie
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

	const showDropdown =
		open && (loading || error || (value && results.length > 0));

	return (
		<motion.div
			ref={rootRef}
			className={`absolute size-11 max-w-35 sm:max-w-max rounded-full flex items-center justify-end gap-0 right-0 ${
				open ? "bg-white" : ""
			} transition-colors duration-200 ${className}`}
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
				style={{ display: "block" }}
				initial={false}
				animate={{
					opacity: open ? 1 : 0,
					x: open ? 0 : -6,
					pointerEvents: open ? "auto" : "none",
				}}
				transition={{ opacity: { duration: 0.12 }, x: { duration: 0.15 } }}
			/>

			<button
				type="button"
				className={`mr-[8px] shrink-0 ${
					open ? "text-slate-700" : "text-white"
				} transition-colors duration-200`}
				aria-label={open ? "Szukaj" : "Otwórz wyszukiwanie"}
				onPointerDown={(e) => {

					e.preventDefault();
					e.stopPropagation();
					if (!open) {
						setOpen(true);
						inputRef.current?.focus?.({ preventScroll: true });
					}
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"></path></g></svg>
			</button>

			{showDropdown && (
				<div className="absolute left-0 top-12 right-0 rounded-lg border bg-white shadow-lg z-50">
					{loading && <div className="p-3 text-sm text-gray-500">Szukam…</div>}
					{!loading && error && (
						<div className="p-3 text-sm text-red-600">{error}</div>
					)}
					{!loading && !error && results.length > 0 && (
						<ul className="max-h-80 overflow-auto divide-y">
							{results.map((it) => (
								<li key={it.id} className="p-3 hover:bg-gray-50">
									<Link
										href={it.path || "/"}
										className="block"
										onClick={() => setOpen(false)}
									>
										<div className="font-medium text-black">{it.title}</div>
										{it.excerpt && (
											<div className="text-xs text-gray-600 line-clamp-2">
												{it.excerpt}
											</div>
										)}
									</Link>
								</li>
							))}
						</ul>
					)}
					{!loading && !error && total > results.length && results.length > 0 && (
						<div className="p-2 text-right text-xs text-gray-500">
							{results.length} z {total}.
						</div>
					)}
				</div>
			)}
		</motion.div>
	);
}
