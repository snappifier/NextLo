"use client"

import {motion} from "motion/react"
import {useState} from "react";
import parse from 'html-react-parser';

export default function Profill({key, item, d, tint}) {
	const [hovered, setHovered] = useState(false);
	const currentColor = item["Kolor"];
	return (
		<motion.div className="relative w-full h-full bg-zinc-100 ring-slate-300 ring-1 rounded-xl overflow-hidden select-none"
		            onPointerEnter={() => setHovered(true)}
		            onPointerLeave={() => setHovered(false)}
		            onFocus={() => setHovered(true)}
		            onBlur={() => setHovered(false)}
		>
			<div className="w-full h-max flex p-5 items-start justify-between">
                      <span className="inline-flex items-center rounded-full bg-white px-5 py-2 text-[11px] sm:text-xs md:text-sm font-semibold text-zinc-500">
                        Profil
                      </span>
				<div className="flex w-25 h-25 items-center justify-center m-3" >
					<div className={`w-full h-full`} style={{color: currentColor}} dangerouslySetInnerHTML={{ __html: item["IconPath"] }} />
				</div>
			</div>

		<motion.div className={`absolute inset-0 w-full h-full rounded-xl text-wrap overflow-hidden flex flex-col justify-start px-6 pt-16 ${hovered? "bg-sky-600/20 " : ""}`}
		            initial={{y: 85}}                                //tym zmieniasz pozycje początkową nagłówka(im więcej tym niżej)
		            animate={hovered ? {y: 0, backdropFilter: `blur(12px)`} : {}}
		            transition={{ duration: 0.2, ease: "easeOut" }}

		>
			<h1>Profil</h1>
			<h1 className="text-xl text-slate-800 font-[poppins] font-medium">{item["NazwaProfilu"]}</h1>
			<motion.p className={`text-sm text-slate-900 leading-tight font-[poppins] pt-1 font-normal`}
			initial={false}
			          animate={hovered ? {opacity: 1, pointerEvents: "auto"} : {opacity: 0, pointerEvents: "none"}}
			          transition={{ duration: 0.3}}
			>{item["Opis"]}</motion.p>
		</motion.div>
		</motion.div>
	)
}