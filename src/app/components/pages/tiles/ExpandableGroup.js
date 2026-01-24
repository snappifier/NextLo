'use client'

import { motion, AnimatePresence } from "motion/react"
import Section from "./Section"

const ExpandableGroup = ({ groupName, sections, isOpen, onToggle }) => {
    const shouldShowHeader = sections[0]?.showGroup
    if (!shouldShowHeader) {
        return (
            <div className="flex flex-col gap-10 pb-10">
                {sections.map((section) => (
                    <Section key={section.id} id={section.id} title={section.title} items={section.kafelki} shouldShowHeader={false}/>
                ))}
            </div>
        )
    }

    return (
      <div className="mb-4 ">
        <motion.div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                    initial={false}
                    animate={{boxShadow: isOpen ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "0 1px 3px rgba(0, 0, 0, 0.05)"}}
                    transition={{duration: 0.2}}
        >
          <button className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left outline-none hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 transition-colors duration-200"
                  onClick={onToggle}
                  type="button"
                  aria-expanded={isOpen}
          >
            <div className="flex items-center gap-3">
              <div className={`w-1 h-8 rounded-full transition-colors duration-200 ${isOpen ? "bg-[#3077BA]" : "bg-slate-300"}`} />
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
                {groupName}
              </h2>
            </div>
            <motion.div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${isOpen ? "bg-[#3077BA]/10 text-[#3077BA]" : "bg-slate-100 text-slate-500"}`}
                        animate={{rotate: isOpen ? 180 : 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 12 12"><path fill="currentColor" d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l2.7 2.7l2.7-2.7c.3-.3.8-.3 1.1 0s.3.8 0 1.1l-3.2 3.2q-.3.3-.6.3"></path></svg>            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div className="overflow-hidden"
                          initial={{height: 0, opacity: 0}}
                          animate={{height: "auto", opacity: 1}}
                          exit={{height: 0, opacity: 0}}
                          transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}}
              >
                <div className="px-5 pb-5 pt-2 sm:px-6 sm:pb-6 border-t border-slate-100">
                  <div className="flex flex-col gap-6 pt-4">
                    {sections.map((section) => (
                      <Section key={section.id} id={section.id} title={section.title} items={section.kafelki} shouldShowHeader={shouldShowHeader}/>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    )
}

export default ExpandableGroup