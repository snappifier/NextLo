"use client"

import { motion } from "motion/react"

export default function ButtonAnimation({ title }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-full min-h-[80px] w-full bg-[#3077BA]/90 hover:bg-[#3077BA] rounded-lg flex items-center justify-center gap-2 text-white overflow-hidden p-4"
        >
            <p className="text-xl text-wrap text-center hyphens-auto font-semibold break-words w-full">
                {title}
            </p>
        </motion.div>
    )
}