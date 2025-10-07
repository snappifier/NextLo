"use client"

import {motion} from "motion/react"
import {useState} from "react";

export default function Profill() {

	const [hovered, setHovered] = useState(false);

	return (
		<motion.div className="relative w-90 h-55 bg-zinc-100 rounded-xl overflow-hidden"
		            onPointerEnter={() => setHovered(true)}
		            onPointerLeave={() => setHovered(false)}
		            onFocus={() => setHovered(true)}
		            onBlur={() => setHovered(false)}
		>
			<div className="w-full h-max flex p-5 items-start justify-between">
                      <span className="inline-flex items-center rounded-full bg-white px-5 py-2 text-[11px] sm:text-xs md:text-sm font-semibold text-zinc-500">
                        Profil
                      </span>
				<div className="flex w-25 h-25 items-center justify-center border-2 border-black m-3">Logo</div>
			</div>

		<motion.div className={`absolute inset-0 w-full h-full  rounded-xl overflow-hidden flex flex-col items-center justify-start pt-18 ${hovered? "bg-sky-600/20 " : ""}`}
		            initial={{y: 80}}                                //tym zmieniasz pozycje początkową nagłówka(im więcej tym niżej)
		            animate={hovered ? {y: 0, backdropFilter: `blur(12px)`} : {}}
		            transition={{ duration: 0.2, ease: "easeOut" }}

		>
			<h1 className="text-3xl text-slate-800 font-[poppins] font-medium">Matematyczno-fizyczny</h1>
			<motion.p className={`text-sm text-slate-900 leading-tight font-[poppins] px-6 pt-6 `}
			initial={false}
			          animate={hovered ? {opacity: 1, pointerEvents: "auto"} : {opacity: 0, pointerEvents: "none"}}
			          transition={{ duration: 0.3}}
			>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a sapien mattis, ultricies risus ac, vehicula eros. Ut ultricies porta lorem eu faucibus. </motion.p>
		</motion.div>
		</motion.div>
	)
}