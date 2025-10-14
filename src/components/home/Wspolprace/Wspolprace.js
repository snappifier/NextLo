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
		<div className="w-full bg-[#3077BA] drop-shadow-lg py-4 my-4 overflow-hidden">
			<Ticker duration={50} gap={24}>
				{data.concat(data).map((src, index) => (
					<Link
						key={`wspolprace-${index}`}
						href={RANKING_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex"
					>
						<div className="h-12 md:h-14 lg:h-16 flex-shrink-0 cursor-pointer px-6 hover:scale-105 transition-transform duration-300 flex items-center">
							<Image
								src={src}
								alt={`Partner ${index + 1}`}
								width={80}
								height={48}
								className="h-full w-auto object-contain drop-shadow-md hover:drop-shadow-xl transition-shadow duration-300"
								loading="lazy"
								quality={70}
							/>
						</div>
					</Link>
				))}
			</Ticker>
		</div>
	)
}