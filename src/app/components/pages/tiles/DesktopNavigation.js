'use client'

import {motion, AnimatePresence} from "motion/react";
import {useState, useRef, useEffect} from "react";
import DotIndicator from "@/app/components/pages/tiles/DotIndicator";
import {slug} from "./Utils"

export const DesktopNavAccordion = ({groupedData, activeId, onJump}) => {
	const [expandedGroups, setExpandedGroups] = useState({})
	const initializedRef = useRef(false)

	const groupHasActive = (group) => {
		return group.ElementGrupy?.some((e) => slug(e.Naglowek) === activeId)
	}

	useEffect(() => {
		if (initializedRef.current || !activeId || !groupedData.length) return
		initializedRef.current = true

		const initial = {}
		groupedData.forEach((group) => {
			initial[group.id] = groupHasActive(group)
		})
		setExpandedGroups(initial)
	}, [activeId, groupedData])

	useEffect(() => {
		if (!activeId || !groupedData.length) return

		const newExpanded = {}
		groupedData.forEach((g) => {
			newExpanded[g.id] = groupHasActive(g)
		})
		setExpandedGroups(newExpanded)
	}, [activeId, groupedData])

	const toggleGroup = (groupId) => {
		setExpandedGroups((prev) => {
			const isCurrentlyExpanded = prev[groupId]
			if (isCurrentlyExpanded) {
				return {...prev, [groupId]: false}
			}
			const newState = {}
			groupedData.forEach((g) => {
				newState[g.id] = g.id === groupId
			})
			return newState
		})
	}

	if (!groupedData.length) return null

	return (
		<aside className="hidden xl:block sticky top-28 self-start ml-20 w-60">
			<nav className="flex flex-col gap-1 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-none" aria-label="Lista sekcji">
				{groupedData.map((group) => {
					const isExpanded = expandedGroups[group.id]
					const hasActive = groupHasActive(group)

					return (
						<div key={group.id}>
							<motion.button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${hasActive ? "bg-[#3077BA]/5" : ""}`}
							               onClick={() => toggleGroup(group.id)}
							               whileHover={{backgroundColor: "rgba(48, 119, 186, 0.05)"}}
							               type="button"
							>
								<span className={`text-sm font-medium ${hasActive ? "text-[#3077BA]" : "text-slate-700"}`}>
									{group.NaglowekGrupy}
								</span>
								<div className="flex items-center gap-2">
									{hasActive && !isExpanded && (
										<span className="w-2 h-2 rounded-full bg-[#3077BA]" />
									)}
									<motion.svg className="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" animate={{rotate: isExpanded ? 180 : 0}} transition={{duration: 0.2}}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9l6 6l6-6"></path></motion.svg>
								</div>
							</motion.button>

							<AnimatePresence>
								{isExpanded && (
									<motion.div className="overflow-hidden"
									            initial={{height: 0, opacity: 0}}
									            animate={{height: "auto", opacity: 1}}
									            exit={{height: 0, opacity: 0}}
									            transition={{duration: 0.2}}
									>
										<div className="pl-2 py-1">
											{group.ElementGrupy?.map((e) => {
												const elementId = slug(e.Naglowek)
												const isActive = activeId === elementId

												return (
													<motion.button className="group relative flex items-center gap-3 w-full text-left px-4 py-1.5 rounded-lg outline-none"
													               key={e.id}
                                         onClick={() => onJump(elementId)}
                                         whileHover={{backgroundColor: "rgba(48, 119, 186, 0.05)"}}
													               whileTap={{scale: 0.98}}
													               aria-current={isActive ? "page" : "false"}
													               type="button"
													>
														<DotIndicator isActive={isActive} />
														<motion.span className={`text-sm transition-colors ${isActive ? "text-[#3077BA] font-medium" : "text-slate-500 group-hover:text-slate-800"}`}
														             animate={{x: isActive ? 4 : 0}}
														             transition={{type: "spring", stiffness: 500, damping: 30}}
														>
															{e.Naglowek}
														</motion.span>

													</motion.button>

												)
											})}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					)
				})}
			</nav>
		</aside>
	)

}

export const DesktopNavOthers = ({items, activeId, onJump}) => (
	<aside className="hidden xl:block sticky top-28 self-start ml-20 w-60">
		<nav className="flex flex-col gap-1 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-none" aria-label="Lista sekcji">
			{items.map(({title, id}) => {
				const isActive = activeId === id

				return (
					<motion.button className="group relative flex items-center gap-3 w-full text-left px-3 py-1.5 rounded-lg outline-none"
					               key={id}
					               onClick={() => onJump(id)}
					               whileHover={{backgroundColor: "rgba(48, 119, 186, 0.05)"}}
					               whileTap={{scale: 0.98}}
					               aria-current={isActive ? "page" : "false"}
					               type="button"
					>
						<DotIndicator isActive={isActive} />
						<motion.span className={`text-sm transition-colors ${isActive ? "text-[#3077BA] font-medium" : "text-slate-500 group-hover:text-slate-800"}`}
						             animate={{x: isActive ? 4 : 0}}
						             transition={{type: "spring", stiffness: 500, damping: 30}}
						>
							{title}
						</motion.span>
					</motion.button>
					)
			})}
		</nav>
	</aside>
)