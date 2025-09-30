"use client"
import { motion } from "motion/react";

export const Hamburger = ({ isOpen }) => (
    <motion.svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-inherit"
    >
        <motion.line
            initial={false}
            animate={
                isOpen
                    ? { x1: 4, y1: 4, x2: 20, y2: 20 }
                    : { x1: 3, y1: 6, x2: 21, y2: 6 }
            }
            transition={{ duration: 0.3 }}
        />

        <motion.line
            initial={false}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            transition={{ duration: 0.2 }}
        />

        <motion.line
            initial={false}
            animate={
                isOpen
                    ? { x1: 4, y1: 20, x2: 20, y2: 4 }
                    : { x1: 3, y1: 18, x2: 21, y2: 18 }
            }
            transition={{ duration: 0.3 }}
        />
    </motion.svg>
);
