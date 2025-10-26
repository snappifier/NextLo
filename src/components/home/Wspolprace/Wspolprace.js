"use client"

import Ticker from "framer-motion-ticker"
import Image from "next/image"
import Link from "next/link"

export default function Wspolprace({ data }) {
	const RANKING_URL = "https://2025.licea.perspektywy.pl/rankingi/ranking-lubelski"

	if (!data || data.length === 0) {
		return null
	}

	return (
		<div className="w-full bg-[#3077BA] drop-shadow-lg py-4 my-4 overflow-hidden ">
			<div className="w-full mask-l-from-94% mask-l-to-98%  mask-r-from-94% mask-r-to-98%">
			<Ticker duration={50} gap={24}>
				{data.concat(data).map((src, index) => (
					<div className="h-6 md:h-8 lg:h-10 flex-shrink-0 px-6 transition-transform duration-300 flex items-center select-none">
						<Image
							src={src}
							alt={`Partner ${index + 1}`}
							width={80}
							height={48}
							className="h-full w-auto object-contain drop-shadow-md hover:drop-shadow-xl transition-shadow duration-300"
							loading="lazy"
							quality={90}
						/>
					</div>
				))}
			</Ticker>
			</div>
		</div>
	)
}