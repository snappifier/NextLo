'use client'

import {motion} from "motion/react"

const EXCLUDED_SECTIONS = ["Dyrekcja", "Biblioteka", "Pedagog szkolny", "Pedagog specjalny", "Psycholog szkolny"]

const Card =({profil, sectionTitle}) => {
	if (!profil) return null
	const showSectionAsDesc = sectionTitle && !EXCLUDED_SECTIONS.includes(sectionTitle)
	const description = profil["Opis"] || (showSectionAsDesc ? sectionTitle : null)

	return (
		<motion.div className="bg-white w-full rounded-lg overflow-hidden shadow-sm righ-1 ring-black/5"
		            whileHover={{y: -4}}
		            transition={{type: "spring", stiffness: 260, damping: 24}}
		>
			<div className="p-3 sm:p-4">
				<h4 className="text-slate-900 text-base sm:text-[15px] font-medium leading-tight">
					{profil["Tytul"] && `${profil["Tytul"]} `}
					{profil["ImieNazwisko"]}
				</h4>
				{description && (
					<p className="text-slate-600 text-xs mt-1 line-clamp-2">{description}</p>
				)}
				{profil["przypinki"]?.[0] && (
					<span className="mt-2 inline-flex items-center rounded-md px-2 py-1 text-[11px] sm:text-xs font-medium"
					      style={{color: profil["przypinki"][0]["KolorTekstu"] || "#334155", backgroundColor: profil["przypinki"][0]["Kolor"] || "#f1f5f9"}}
					>
						{profil["przypinki"][0]["Funkcja"]}
					</span>
				)}
			</div>
		</motion.div>
	)
}

export default Card;