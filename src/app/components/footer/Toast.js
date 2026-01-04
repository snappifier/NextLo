'use client'

import {motion, AnimatePresence} from "motion/react"

export default function Toast({message, show}) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div className="fixed bottom-6 right-6 z-50 select-none"
                            initial={{opacity: 0, y: 20, scale: 0.9}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, y: 10, scale: 0.95}}
                            transition={{type: "spring", stiffness: 400, damping: 25}}
                >
                    <div className="flex items-center gap-2.5 rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-4 text-sm font-medium text-white shadow-xl">
                        <div className="flex items-center justify-center size-5 rounded-full bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"/></svg>
                        </div>
                        <span>{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}