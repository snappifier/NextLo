"use client"

import { motion } from "motion/react"

export default function ButtonInYear({ title }) {
    const date = title.substring(0, 10)
    const name = title.substring(11, title.length)
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-full min-h-[80px] w-full bg-[#3077BA]/90 hover:bg-[#3077BA] rounded-lg flex flex-col items-center justify-center text-white overflow-hidden p-4"
        >
            <p className="text-lg text-wrap text-center hyphens-auto font-base break-words w-full">
                {date}
            </p>
            <p className="text-xl text-wrap text-center hyphens-auto font-semibold break-words w-full">
                {name}
            </p>

        </motion.div>
    )
}