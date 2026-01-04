'use client'

import {useState} from "react"
import {motion, AnimatePresence} from "motion/react"

export default function SocialIcon({children, href, label, onClick, tooltipText}) {
    const [hovered, setHovered] = useState(false)

    const content = (
        <motion.div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <AnimatePresence>
                {hovered && tooltipText && (
                    <motion.div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none"
                                initial={{opacity: 0, y: 8, scale: 0.9}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, y: 8, scale: 0.9}}
                                transition={{duration: 0.2}}
                    >
						<span className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs font-medium text-white shadow-xl whitespace-nowrap">
							{tooltipText}
						</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div className="flex items-center justify-center size-11 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white cursor-pointer transition-colors duration-300"
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                        transition={{type: "spring", stiffness: 400, damping: 17}}
            >
                {children}
            </motion.div>
        </motion.div>
    )

    if (onClick) {
        return (
            <button className="outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl" type="button" onClick={onClick} aria-label={label}>
                {content}
            </button>
        )
    }

    return (
        <a href={href} className="outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl" target="_blank" rel="noopener noreferrer" aria-label={label}>
            {content}
        </a>
    )
}