'use client'

import { motion, AnimatePresence } from "motion/react"
import GroupHeader from "./GroupHeader"
import Section from "./Section"

const ExpandableGroup = ({ groupName, sections, isOpen, onToggle }) => {
    const shouldShowHeader = sections[0]?.showGroup
    if (!shouldShowHeader) {
        return (
            <div className="flex flex-col gap-10 pb-10">
                {sections.map((section) => (
                    <Section
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        items={section.kafelki}
                        shouldShowHeader={false}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col pb-6 border-b border-slate-100 last:border-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-5 group text-left py-4 outline-none hover:cursor-pointer"
                type="button"
            >
                <div className="pointer-events-none">
                    <GroupHeader groupTitle={groupName} />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="#27272a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-chevron-down-icon lucide-chevron-down">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col gap-5 pb-4 pt-2">
                            {sections.map((section) => (
                                <Section
                                    key={section.id}
                                    id={section.id}
                                    title={section.title}
                                    items={section.kafelki}
                                    shouldShowHeader={shouldShowHeader}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ExpandableGroup