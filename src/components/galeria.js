"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const ROW_HEIGHT = 8; // px — odpowiada auto-rows-[8px]

function useRowSpan(ref, aspect) {
	useEffect(() => {
		if (!ref.current) return;
		const el = ref.current;

		const calc = () => {
			const w = el.getBoundingClientRect().width; // szerokość kafla
			const h = w / aspect;                        // wysokość z proporcji
			const rows = Math.ceil(h / ROW_HEIGHT);      // ile wierszy
			el.style.setProperty("--row-span", String(rows));
		};

		const ro = new ResizeObserver(calc);
		ro.observe(el);
		calc();
		return () => ro.disconnect();
	}, [ref, aspect]);
}

export default function GalleryAutoMasonry({ items }) {
	return (
		<div
			className="
        grid gap-4
        [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]
        auto-rows-[8px]
        [grid-auto-flow:dense]
      "
		>
			{items.map((it, i) => {
				const aspect = it.width / it.height;
				const isWide = aspect >= 1.4; // próg dla „szerokich” kafelków

				return (
					<Tile
						key={it.id}
						item={it}
						aspect={aspect}
						wide={isWide}
						index={i}
					/>
				);
			})}
		</div>
	);
}

function Tile({ item, aspect, wide, index }) {
	const ref = useRef(null);
	useRowSpan(ref, aspect);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "0px 0px -80px 0px" }}
			transition={{ duration: 0.28, delay: index * 0.02 }}
			className={[
				"relative overflow-hidden rounded-2xl shadow-sm",
				wide ? "col-span-2" : "",
				"[grid-row:span_var(--row-span)]",
			].join(" ")}
		>
			<Image
				src={item.src}
				alt={item.alt}
				fill
				className="object-cover"
				sizes="
          (min-width:1536px) 25vw,
          (min-width:1280px) 33vw,
          (min-width:1024px) 40vw,
          (min-width:640px) 50vw,
          100vw
        "
				placeholder="blur"
				blurDataURL="/blur.png"
				priority={index < 2}
			/>
		</motion.div>
	);
}
