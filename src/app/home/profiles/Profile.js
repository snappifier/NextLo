'use client'

import {motion} from "motion/react"
import {useState} from "react"
import Link from "next/link"

export default function Profile({item}) {
	const [hovered, setHovered] = useState(false)
	const currentColor = item["Kolor"]

	const iconVariants = {
		idle: {scale: 1},
		hovered: {scale: 1.1}
	}

	const arrowVariants = {
		idle: {x: 0},
		hovered: {x: 4}
	}

	return (
		<Link href="/rekrutacja" className="block w-full">
			<motion.div className="relative p-5 rounded-2xl cursor-pointer border border-white/50 select-none"
						style={{backgroundColor: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)"}}
						initial={false}
						animate={{y: hovered ? -4 : 0, boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.1)" : "0 4px 16px rgba(0,0,0,0.04)"}}
						transition={{duration: 0.3, ease: "easeOut"}}
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						whileTap={{scale: 0.97, boxShadow: "0 2px 8px rgba(0,0,0,0.15)"}}
			>
				<div className="flex items-start gap-4">
					<motion.div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
								style={{backgroundColor: `${currentColor}20`}}
								variants={iconVariants}
								animate={hovered ? "hovered" : "idle"}
								transition={{duration: 0.3, ease: "easeOut"}}
					>
						<div className="w-8 h-8" style={{color: currentColor}} dangerouslySetInnerHTML={{__html: item["IconPath"]}}/>
					</motion.div>
					<div className="flex-1 min-w-0">
						<span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide mb-1" style={{backgroundColor: `${currentColor}15`, color: currentColor}}>
							Profil
						</span>
						<h3 className="font-semibold text-slate-800 text-base leading-tight">
							{item["NazwaProfilu"]}
						</h3>
						<p className="text-xs text-slate-500 mt-1 line-clamp-2">
							{item["Opis"]}
						</p>
					</div>
				</div>

				<motion.div className="mt-4 pt-3 border-t flex items-center justify-between text-sm"
							style={{borderColor: `${currentColor}25`}}
							animate={{opacity: hovered ? 1 : 0.7}}
							transition={{duration: 0.2}}
				>
					<span className="font-medium" style={{color: currentColor}}>
						Zobacz szczegóły
					</span>
					<motion.span style={{color: currentColor}}
								 variants={arrowVariants}
								 animate={hovered ? "hovered" : "idle"}
								 transition={{duration: 0.2}}
					>
						<svg xmlns="http://www.w3.org/2000/svg"  width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"></path></svg>

					</motion.span>
				</motion.div>
			</motion.div>
		</Link>
	)
}