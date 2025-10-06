"use client";
import React, { useMemo } from "react";
import SearchBar from "./Search";
import { usePageIndex, flashAndScrollTo } from "./usePageIndex";

export default function PageSearch({
	                                   selector = "h1,h2,h3,h4,h5,h6,[data-search],a[href]",
	                                   placeholder = "Szukaj na stronie…",
                                   }) {
	const index = usePageIndex(selector);
	const labels = useMemo(() => index.map((i) => i.text), [index]);

	return (
		<SearchBar
			items={labels}
			placeholder={placeholder}
			onSelect={(value) => {
				const hit = index.find((i) => i.text === value);
				if (hit) {
					flashAndScrollTo(hit.el);
					const url = new URL(window.location.href);
					url.hash = `#${hit.id}`;
					history.replaceState(null, "", url);
				}
			}}
		/>
	);
}