"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"


import perspektywy2019 from "../../images/perspektywy2019.png"
import perspektywy2020 from "../../images/perspektywy2020.png"
import perspektywy2021 from "../../images/perspektywy2021.png"
import perspektywy2022 from "../../images/perspektywy2022.png"
import perspektywy2023 from "../../images/perspektywy2023.png"
import perspektywy2024 from "../../images/perspektywy2024.png"
import perspektywy2025 from "../../images/perspektywy2025.png"


const shieldImages = [
	perspektywy2019,
	perspektywy2020,
	perspektywy2021,
	perspektywy2022,
	perspektywy2023,
	perspektywy2024,
	perspektywy2025
]

export default function Tarcze() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [displayedImages, setDisplayedImages] = useState(shieldImages)


	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prev => (prev + 1) % displayedImages.length)
		}, 2000)

		return () => clearInterval(interval)
	}, [displayedImages.length])


	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth

			if (width < 580) {

				setDisplayedImages(shieldImages.slice(-3))
			} else if (width < 880) {

				setDisplayedImages(shieldImages.slice(-5))
			} else {

				setDisplayedImages(shieldImages)
			}
		}


		handleResize()


		window.addEventListener('resize', handleResize)

		// Cleanup
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div className="font-[poppins] mb-8 z-10 w-full flex pt-8 pb-8 bg-white rounded-2xl shadow-lg/20 overflow-hidden">
			<div className="w-full flex flex-col gap-6 items-center md:items-start">
				<div className="px-10 w-full flex flex-col">
					<p className="text-base md:text-lg lg:text-xl font-normal text-slate-900">
						OSIĄGNIĘCIA I WSPÓŁPRACE
					</p>
					<p className="w-full md:text-lg font-extralight text-slate-700">
						Oto najważniejsze osiągnięcia oraz partnerzy naszego liceum.
					</p>
				</div>

				<div className="flex justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center w-full px-4">
					{displayedImages.map((src, index) => (
						<Link
							key={index}
							href="https://2025.licea.perspektywy.pl/rankingi/ranking-lubelski"
							target="_blank"
							rel="noopener noreferrer"
						>
							<motion.div
								initial={{ scale: 1, opacity: 0.6 }}
								animate={{
									scale: index === currentIndex ? 1.25 : 1,
									opacity: index === currentIndex ? 1 : 0.7
								}}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 20
								}}
								whileHover={{ scale: 1.25 }}
								className="w-20 h-20 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-25 xl:h-25 2xl:w-30 2xl:h-30 object-contain drop-shadow-lg cursor-pointer"
							>
								<Image
									src={src}
									alt={`Tarcza ${2025 - (displayedImages.length - 1 - index)}`}
									width={144}
									height={144}
									className="w-full h-full object-contain drop-shadow-md"
									placeholder="empty"
								/>
							</motion.div>
						</Link>
					))}
				</div>
				{/*<Wspolprace />*/}
			</div>
		</div>
	)
}