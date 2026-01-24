'use client'

import {motion, AnimatePresence} from "motion/react";
import {useState, useRef, useEffect} from "react";
import DotIndicator from "@/app/components/pages/tiles/DotIndicator";
import {slug} from "./Utils"

export const DesktopNavAccordion = ({groupedData, activeId, onJump}) => {
	const [expandedGroups, setExpandedGroups] = useState({})
	const initializedRef = useRef(false)

	const groupHasActive = (group) => {
		return group.ElementGrupy?.some((e) => slug(`${group.NaglowekGrupy} ${e.Naglowek}`) === activeId)
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
			if (groupHasActive(g)) {
				newExpanded[g.id] = true
			} else {
				newExpanded[g.id] = groupHasActive(g)
			}
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
		<aside className="hidden xl:block sticky top-28 self-start ml-12 w-60">
			<nav className="flex flex-col gap-1 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-none" aria-label="Lista sekcji">
				{groupedData.map((group) => {
					const isExpanded = expandedGroups[group.id]
					const hasActive = groupHasActive(group)

					return (
						<div key={group.id}>
							<motion.button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-900 ${hasActive ? "bg-[#3077BA]/10" : "hover:bg-slate-50 focus-visible:bg-slate-50"}`}
										   onClick={() => toggleGroup(group.id)}
										   type="button"
							>
                         <span className={`text-sm font-medium text-left ${hasActive ? "text-[#3077BA]" : "text-slate-700"}`}>
                            {group.NaglowekGrupy}
                         </span>
								<div className="flex items-center gap-2">
									{hasActive && !isExpanded && (
										<span className="w-2 h-2 rounded-full bg-[#3077BA]" />
									)}
									<motion.svg className={`w-4 h-4 ${hasActive ? "text-[#3077BA]" : "text-slate-400"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" animate={{rotate: isExpanded ? 180 : 0}} transition={{duration: 0.2}}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9l6 6l6-6"></path></motion.svg>
								</div>
							</motion.button>

							<AnimatePresence initial={false}>
								{isExpanded && (
									<motion.div className="overflow-hidden"
												initial={{height: 0, opacity: 0}}
												animate={{height: "auto", opacity: 1}}
												exit={{height: 0, opacity: 0}}
												transition={{duration: 0.2}}
									>
										<div className="pl-2 py-1 flex flex-col gap-0.5">
											{group.ElementGrupy?.map((e) => {
												const elementId = slug(`${group.NaglowekGrupy} ${e.Naglowek}`)
												const isActive = activeId === elementId

												return (
													<button className={`group relative flex items-center gap-3 w-full text-left px-4 py-1.5 rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-900 ${isActive ? "bg-[#3077BA]/5" : "hover:bg-slate-50 focus-visible:bg-slate-50"}`}
															key={e.id}
															onClick={() => onJump(elementId)}
															type="button"
													>
														<DotIndicator isActive={isActive} />
														<span className={`text-sm transition-colors ${isActive ? "text-[#3077BA] font-bold" : "text-slate-500 group-hover:text-slate-800 group-focus-visible:text-slate-800"}`}
														>
                                              {e.Naglowek}
                                           </span>

													</button>

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
	<aside className="hidden xl:block sticky top-28 self-start ml-10 w-60">
		<nav className="flex flex-col gap-1 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-none" aria-label="Lista sekcji">
			{items.map(({title, id}) => {
				const isActive = activeId === id

				return (
					<button className={`group relative flex items-center gap-3 w-full text-left px-3 py-1.5 rounded-lg outline-none transition-all duration-200 ${isActive ? "bg-[#3077BA]/5" : "hover:bg-slate-50"}`}
							key={id}
							onClick={() => onJump(id)}
							type="button"
					>
						<DotIndicator isActive={isActive} />
						<span className={`text-sm transition-colors ${isActive ? "text-[#3077BA] font-bold" : "text-slate-500 group-hover:text-slate-800"}`}
						>
                      {title}
                   </span>
					</button>
				)
			})}
		</nav>
	</aside>
)