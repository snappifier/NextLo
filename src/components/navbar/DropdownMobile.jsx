"use client"

import {AnimatePresence, motion, useReducedMotion} from "motion/react";
import {useMemo, useState} from "react";
import Link from "next/link";

export default function DropdownMobile({menu, setIsOpen}) {
    const szkola = menu.oSzkoleLinks;
    const uczen = menu.dokumentyLinks;
    const aktualnosci = menu.uczniowieLinks;
    const dokumenty = menu.aktualnosciLinks;

    const [activeIndex, setActiveIndex] = useState(null); // null = lista główna
    const prefersReducedMotion = useReducedMotion();

    const handleOpenCategory = (index) => setActiveIndex(index);
    const handleBack = () => setActiveIndex(null);

    const categoryData = useMemo(() => ({
        0: szkola ?? [],
        1: uczen ?? [],
        2: aktualnosci ?? [],
        3: dokumenty ?? [],
    }), []);

    const showMain = activeIndex === null;


    const tFast = prefersReducedMotion ? 0 : 0.2;
    const spring = prefersReducedMotion
        ? {duration: tFast, ease: "linear"}
        : {type: "spring", stiffness: 300, damping: 24, mass: 0.8};

    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.1, ease: "easeOut"}}
                exit={{opacity: 0, transition: {duration: 0.2, delay: 0.05, ease: "easeOut"}}}
                className="relative w-[94%] sm:w-[90%] lg:w-[80%] min-h-[70vh] h-max bg-[#3077BA] backdrop-blur-xs backdrop-saturate-300 rounded-lg flex flex-col items-center justify-start gap-5 pt-8 shadow-lg pb-15"
            >
                <div className="flex items-center justify-between w-[80%]">

                    <div className="font-[poppins] font-light text-2xl text-white select-none ">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={showMain ? "Menu" : glownaLista[activeIndex]?.title}
                                initial={{opacity: 0, y: 6}}
                                animate={{opacity: 1, y: 0, transition: spring}}
                                exit={{opacity: 0, y: -6, transition: {duration: tFast}}}
                                className="inline-block"
                            >
                                {showMain ? "Menu" : glownaLista[activeIndex]?.title}
                            </motion.span>
                        </AnimatePresence>
                    </div>


                    {!showMain && (
                        <motion.button
                            type="button"
                            onClick={handleBack}
                            className="text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-3 py-1"
                            whileTap={{scale: 0.96}}
                            initial={{opacity: 0, x: 10}}
                            animate={{opacity: 1, x: 0}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 className="h-5 w-5" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </motion.button>
                    )}
                </div>


                <AnimatePresence mode="wait">
                    {showMain && (
                        <motion.div
                            key="main-list"
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            variants={{
                                hidden: {opacity: 0},
                                show: {opacity: 1, transition: {staggerChildren: 0.06}},
                                exit: {opacity: 0, transition: {staggerChildren: 0.04, staggerDirection: -1}}
                            }}
                            className="w-full flex flex-col items-center gap-4 pb-6 pt-10"
                        >
                            {glownaLista.map((item, index) => (
                                <motion.button
                                    type="button"
                                    onClick={() => handleOpenCategory(index)}
                                    key={index}
                                    variants={{
                                        hidden: {opacity: 0, y: 16, scale: 0.98},
                                        show: {opacity: 1, y: 0, scale: 1},
                                        exit: {opacity: 0, y: 16, scale: 0.98}
                                    }}
                                    transition={{duration: 0.18, ease: "easeOut", delay: index * 0.03}}
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    className="flex items-center w-[80%] min-h-14 bg-white rounded-md font-[poppins] text-lg text-slate-700 px-5 gap-5 shadow-md"
                                >
                                    <div className="shrink-0">{item.icon}</div>
                                    <div className="text-left">{item.title}</div>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}


                    {!showMain && (
                        <CategoryGrid
                            key={`grid-${activeIndex}`}
                            items={categoryData[activeIndex] ?? []}
                            onNavigate={() => setIsOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

const CategoryGrid = ({items, onNavigate}) => {
    const MotionLink = motion.create(Link);

    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 8}}
            transition={{duration: 0.2, ease: "easeOut"}}
            className="w-[90%] grid grid-cols-2 sm:grid-cols-3 gap-3 pb-8"
        >
            {items?.length ? (
                items.map((el, i) => (
                    <MotionLink
                        key={el["Link"] + i}
                        // href={el["Link"]}
                        onClick={onNavigate}
                        className="group rounded-xl bg-white/95 hover:bg-white p-4 shadow-md ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-[#ffffff]"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.18, ease: "easeOut", delay: i * 0.02}}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                    >
                        <div className="font-[poppins] text-base text-slate-800 capitalize">
                            {el["Tytul"]}
                        </div>
                        {el.icon ? (
                            <div className="mt-2 opacity-70 group-hover:opacity-90">{el.icon}</div>
                        ) : null}
                    </MotionLink>
                ))
            ) : (
                <div className="col-span-full text-white/90 text-center py-10">
                    Brak elementów w tej kategorii.
                </div>
            )}
        </motion.div>
    );
};

/* --- DANE (twoje, bez zmian!) --- */
const glownaLista = [
    {
        title: "Szkoła",
        className: "",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M14 21v-3a2 2 0 0 0-4 0v3m8-16v16M4 6l7.106-3.79a2 2 0 0 1 1.788 0L20 6"/>
                <path
                    d="m6 11l-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11M6 5v16"/>
                <circle cx="12" cy="9" r="2"/>
            </g>
        </svg>),
    },
    {
        title: "Uczeń",
        className: "",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="m12 21l-7-3.8v-6L1 9l11-6l11 6v8h-2v-6.9l-2 1.1v6zm0-8.3L18.85 9L12 5.3L5.15 9zm0 6.025l5-2.7V12.25L12 15l-5-2.75v3.775zm0-3.775"/>
        </svg>),
    },
    {
        title: "Aktualności",
        className: "",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm0-2h14V9h-4V5H5zm2-2h10v-2H7zm0-8h5V7H7zm0 4h10v-2H7zM5 5v4zv14z"/>
        </svg>),
    },
    {
        title: "Templates",
        className: "",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M5 4v6.025V10v10zv5zm0 18q-.825 0-1.412-.587T3 20V4q0-.825.588-1.412T5 2h8l6 6v2.5q-.475-.2-.975-.312T17 10.025V9h-5V4H5v16h6.025q.4.6.9 1.113t1.1.887zm11.5-3q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19m5.1 4l-2.7-2.7q-.525.35-1.137.525T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .65-.175 1.263T20.3 18.9l2.7 2.7z"/>
        </svg>),
    },
];