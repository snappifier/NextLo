"use client";
import { useEffect, useState } from "react";

export function usePageIndex(selector = "h1,h2,h3,h4,h5,h6,[data-search],a[href]") {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const collect = () => {
			const els = Array.from(document.querySelectorAll(selector));
			const list = els
				.map((el, i) => {
					const text = (el.getAttribute("data-search") || el.textContent || "")
						.trim()
						.replace(/\s+/g, " ");
					if (!text) return null;
					if (!el.getAttribute("id")) el.id = `${el.tagName.toLowerCase()}-${i}`;
					return { id: el.id, text, el };
				})
				.filter(Boolean);
			setItems(list);
		};

		collect();
		const mo = new MutationObserver(collect);
		mo.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
		return () => mo.disconnect();
	}, [selector]);

	return items;
}

export function flashAndScrollTo(el) {
	const node = el;
	node.scrollIntoView({ behavior: "smooth", block: "center" });
	node.classList.add("ring-2", "ring-blue-500/60", "bg-blue-50", "dark:bg-blue-950/30");
	setTimeout(() => {
		node.classList.remove("ring-2", "ring-blue-500/60", "bg-blue-50", "dark:bg-blue-950/30");
	}, 1400);
}