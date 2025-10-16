"use client"

import {motion} from "motion/react"
export default function ButtonAnimation({title}) {

	return (
		<motion.div whileHover={{scale: 1.05}} className=" h-max bg-[#3077BA] rounded-md flex items-center justify-center gap-2 text-white overflow-hidden">
			<p className="px-10 py-5 text-xl">{title}</p>
		</motion.div>
	)
}