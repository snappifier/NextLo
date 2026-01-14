'use client'

import {motion} from "motion/react"
import {useEffect, useState, useRef} from "react"

const MobileNavigation = ({items, activeId, onJump}) => {
	const scrollRef = useRef(null)
	const itemRefs = useRef({})
	const [showLeftFade, setShowLeftFade] = useState(false)
	const [showRightFade, setShowRightFade] = useState(true)

	useEffect(() => {
		if (!activeId || !scrollRef.current || !itemRefs.current[activeId]) return

		const container = scrollRef.current
		const item = itemRefs.current[activeId]
		const containerRect = container.getBoundingClientRect()
		const itemRect = item.getBoundingClientRect()

		const itemCenter = itemRect.left + itemRect.width / 2
		const containerCenter = containerRect.left + containerRect.width / 2
		const scrollOffset = itemCenter - containerCenter

		container.scrollBy({left: scrollOffset, behavior: "smooth"})
	}, [activeId])

	useEffect(() => {
		const updateFade = () => {
			if (!scrollRef.current) return
			const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current
			setShowLeftFade(scrollLeft > 10)
			setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10)
		}

		updateFade()
		const el = scrollRef.current
		el?.addEventListener("scroll", updateFade)
		window.addEventListener("resize", updateFade)
		return () => {
			el?.removeEventListener("scroll", updateFade)
			window.removeEventListener("resize", updateFade)
		}
	}, [items])

	if (!items.length) return null

	return (
		<div id="top-chips" className="xl:hidden sticky top-20 md:top-20 lg:top-25 z-30 -mt-2 mb-4 sm:mb-6">
			<div className="relative">
				<div className={`absolute left-o top-0 bottom-0 w-8 bg-linear-to-r from-[#f0f0f0] to-transparent z-10 pointer-events-none transition-opacity duration-200 ${showLeftFade ? "opacity-100" : "opacity-0"}`} />

				<div ref={scrollRef} className="flex gap-2 overflow-x-auto px-1 py-1.5 scrollbar-none scroll-smooth">
					{items.map(({title, id}) => {
						const isActive = activeId === id
						return (
							<motion.button className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-poppins transition-all bg-white ${isActive ? "border-[#3077BA] text-[#3077BA] shadow-sm" : "border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-800"}`}
							               key={id}
							               ref={(e) => (itemRefs.current[id] = e)}
							               onClick={() => onJump(id)}
							               whileHover={{scale: 1.03}}
							               whileTap={{scale: 0.97}}
							               aria-current={isActive ? "page" : "false"}
							               type="button"
							>
								{title}
							</motion.button>
						)
					})}
				</div>
				<div className={`absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-[#f0f0f0] to-transparent z-10 pointer-events-none transition-opacity duration-200 ${showRightFade ? "opacity-100" : "opacity-0"}`} />

			</div>
		</div>
	)
}
export default MobileNavigation