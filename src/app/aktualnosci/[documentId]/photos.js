"use client"
import {motion, AnimatePresence} from "motion/react"
import {useState} from "react";
import Image from "next/image";

export default function Photos({media, post}) {
	const [opened, setOpened] = useState(false)

	return (
		<>
			<motion.div
				whileHover={{scale: 1.05}}
				className="relative w-full aspect-square overflow-hidden rounded-lg bg-slate-100 cursor-pointer"
				onClick={() => setOpened(true)}
			>
				<Image
					src={media}
					alt={post}
					fill
					className="object-cover"
					priority
				/>
			</motion.div>

			<AnimatePresence>
				{opened && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
						onClick={() => setOpened(false)}
					>
						<motion.div
							initial={{scale: 0.9, opacity: 0}}
							animate={{scale: 1, opacity: 1}}
							exit={{scale: 0.9, opacity: 0}}
							className="relative w-full h-full max-w-2xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl max-h-[70vh]"

						>
							<Image
								src={media}
								alt={post}
								fill
								className="object-contain"
								priority
							/>
							{/*<button*/}
							{/*	onClick={() => setOpened(false)}*/}
							{/*	className="absolute md:hidden top-2 right-2 text-white hover:text-gray-300 text-4xl font-light z-500 cursor-pointer"*/}
							{/*	aria-label="Zamknij"*/}
							{/*>*/}
							{/*	×*/}
							{/*</button>*/}
						</motion.div>

						{/* Close button */}

					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}