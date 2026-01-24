"use client"

import {motion} from "motion/react"
import Link from "next/link"

export default function CategoryGrid({items, onNavigate}) {
	const gridVariants = {
		hidden: {opacity: 0},
		visible: {opacity: 1, transition: {staggerChildren: 0.04, delayChildren: 0.1}},
		exit: {opacity: 0, transition: {duration: 0.15}}
	}

	const cardVariants = {
		hidden: {opacity: 0, y: 20, scale: 0.9},
		visible: {opacity: 1, y: 0, scale: 1, transition: {type: "spring", stiffness: 350, damping: 25}}
	}

	return (
		<motion.div className="w-full px-5 py-6"
								initial="hidden"
		            animate="visible"
		            exit="exit"
		            variants={gridVariants}
		>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{items?.length ? (
					items.map((el, i) => {
							const href = el?.Link || '#'
						const isExternal = href.startsWith("http")
							return (
								<motion.div key={`${href}-${i}`} variants={cardVariants}>
									<Link href={href} className="block h-full" onClick={onNavigate} {...(isExternal ? {target: "_blank", rel: "noopener noreferrer"} : {})}>
										<motion.div className="h-full min-h-18 rounded-xl bg-slate-50 hover:bg-white hover:shadow-lg p-4 border border-slate-200 hover:border-slate-300 flex items-center justify-center transition-all duration-200"
										            whileHover={{scale: 1.02, y: -2}}
										            whileTap={{scale: 0.98}}
										>
											<span className="font-medium text-sm text-slate-700 text-center leading-tight">
												{el?.Tytul ?? ""}
											</span>
										</motion.div>
									</Link>
								</motion.div>
							)
					})
				) : (
					<div className="col-span-full text-slate-500 text-center py-10">
						Brak elementów w tej kategorii
					</div>
				)

				}
			</div>

		</motion.div>
	)


}