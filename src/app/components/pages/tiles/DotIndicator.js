'use client'

import {motion, AnimatePresence} from "motion/react"

const DotIndicator = ({isActive}) => (

	<div className="relative flex items-center justify-center w-4 h-4 shrink-0">
		<motion.div className="absolute rounded-full"
		            animate={{backgroundColor: isActive ? "#3077BA" : "#cbd5e1", width: isActive ? 10 : 8, height: isActive ? 10 : 8}}
								transition={{type: "spring", stiffness: 500, damping: 30}}
		/>
			<AnimatePresence>
				{isActive && (
					<motion.div className="absolute w-4 h-4 rounded-full border-2 border-[#3077BA]"
											initial={{scale: 0, opacity: 0}}
					            animate={{scale: 1, opacity: 1}}
					            exit={{scale: 0, opacity: 0}}
					            transition={{type: "spring", stiffness: 500, damping: 30}}
					/>
				)}
			</AnimatePresence>
	</div>
)

export default DotIndicator