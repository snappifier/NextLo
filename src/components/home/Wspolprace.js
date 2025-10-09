"use client"

import Ticker from "framer-motion-ticker"
import Image from "next/image"
import Link from "next/link"

import umcs1 from "../../images/umcs-politologia.png"
import umcs2 from "../../images/umcs-socjologia.png"
import sgh from "../../images/sgh.png"

const partnerImages = [
	umcs1,
	umcs2,
	sgh,
]

export default function Wspolprace() {
	return (
				<div className="w-full bg-[#3077BA] drop-shadow-lg py-2 my-4">
					<Ticker duration={15}>
						{partnerImages.map((src, index) => (
							<Link
								key={index}
								href="https://2025.licea.perspektywy.pl/rankingi/ranking-lubelski"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 drop-shadow-md cursor-pointer mx-4">
									<Image
										src={src}
										alt={`wspolpraca ${index + 1}`}
										width={128}
										height={128}
										className="w-full h-full object-contain drop-shadow-md"
									/>
								</div>
							</Link>
						))}
					</Ticker>
				</div>

	)
}