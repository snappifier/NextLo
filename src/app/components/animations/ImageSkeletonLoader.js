'use client'

import {useState} from "react"
import Image from "next/image"
import {motion, AnimatePresence} from "motion/react"

export default function ImageSkeletonLoader({src, alt, className, sizes, rounded}) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="relative w-full h-full">
            <AnimatePresence>
                {isLoading && (
                    <motion.div className={`absolute inset-0 z-10 ${rounded ? rounded : "rounded-2xl"} overflow-hidden bg-slate-300 select-none pointer-events-none`}
                                initial={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.3, ease: "easeOut"}}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-slate-300 via-slate-200 to-slate-300 animate-shimmer" />
                    </motion.div>
                )}
            </AnimatePresence>

            <Image className={className}
                   src={src}
                   alt={alt}
                   fill
                   priority
                   quality={85}
                   sizes={sizes}
                   onLoad={() => setIsLoading(false)}
            />
        </div>
    )
}