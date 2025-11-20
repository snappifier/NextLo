"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import Link from "next/link";
import logo from "../../../public/images/logo.webp"
import godlo from "../../../public/images/godlo.webp"
import Image from "next/image";

export default function DropdownMobile({ menu, setIsOpen }) {

    const categories = Array.isArray(menu?.Kategoria) ? menu.Kategoria : [];


    const categoryData = useMemo(() => {
        return categories.map((cat) => {
            const pages = Array.isArray(cat?.Podstrona) ? cat.Podstrona : [];
            return pages.map((p) => ({
                Link: p?.Link || "#",
                Tytul: p?.Tytul || "",
            }));
        });
    }, [categories]);

    const [activeIndex, setActiveIndex] = useState(null); // null = lista główna
    const showMain = activeIndex === null;

    const prefersReducedMotion = useReducedMotion();
    const tFast = prefersReducedMotion ? 0 : 0.2;
    const spring = prefersReducedMotion
        ? { duration: tFast, ease: "linear" }
        : { type: "spring", stiffness: 300, damping: 24, mass: 0.8 };

    const handleOpenCategory = (index) => setActiveIndex(index);
    const handleBack = () => setActiveIndex(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.05, ease: "easeOut" } }}
            className={`relative w-[94%] sm:w-[90%] lg:w-[80%]  h-max max-h-dvh bg-zinc-100 rounded-lg flex flex-col items-center justify-start gap-5 py-8 shadow-lg overflow-auto mb-5`}
        >


                <motion.div
	                initial={{ opacity: 0, y: 10, scale: 0.80 }}
	                animate={{ opacity: 1, y: 0, scale: 1 }}
	                transition={{ duration: 0.3, ease: "easeOut"}}
	                className="font-[poppins] font-light text-sm sm:text-base text-slate-700 text-center select-none flex items-center justify-center w-full">
                   {/*<p className={`w-[70%] md:w-[80%] `}>I Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu</p>*/}
	                <div className="flex items-center justify-between w-[90%] ">
		                <Image src={logo} alt="logo" className="select-none h-12 md:h-15 w-12 md:w-15 drop-shadow-md pointer-events-none"/>
		                <p
			                className="px-3 ">I
			                Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu </p>

		                <Image src={godlo} alt="Godło" className=" select-none h-12 md:h-15 w-auto object-contain pointer-events-none"/>
	                </div>

                </motion.div>
								<motion.span
									initial={{ opacity: 0, scale: 0.98 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
									className="w-[90%] h-px bg-slate-400 min-h-px"></motion.span>


			                {!showMain && (
				                <div className="flex items-center justify-end w-full pt-4 pr-4">
			                    <motion.button
			                        type="button"
			                        onClick={handleBack}
			                        className="absolute text-slate-600"
			                        whileTap={{ scale: 0.96 }}
			                        initial={{ opacity: 0, x: 10 }}
			                        animate={{ opacity: 1, x: 0 }}
			                        aria-label="Powrót"
			                    >
			                        <svg
			                            xmlns="http://www.w3.org/2000/svg"
			                            viewBox="0 0 24 24"
			                            className="h-10 w-10"
			                            fill="none"
			                            stroke="currentColor"
			                            strokeWidth="2"
			                            strokeLinecap="round"
			                            strokeLinejoin="round"
			                        >
			                            <path d="M15 18l-6-6 6-6" />
			                        </svg>
			                    </motion.button>
				                </div>
			                )}


            <AnimatePresence mode="wait">
                {showMain ? (

                    <motion.div
                        key="main-list"
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.06 } },
                            exit: { opacity: 0, transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                        }}

                        className="relative flex flex-col w-full px-5 sm:px-10 md:px-20 gap-9 py-3 h-max"
                    >
                        {categories.length ? (
                            categories.map((cat, index) => (
                                <motion.button
                                    type="button"
                                    onClick={() => handleOpenCategory(index)}
                                    key={cat?.id ?? index}
                                    variants={{
                                        hidden: { opacity: 0, y: 10, scale: 0.80 },
                                        show: { opacity: 1, y: 0, scale: 1 },
                                        exit: { opacity: 0, y: 10, scale: 0.80 },
                                    }}
                                    transition={{ duration: 0.1, ease: "easeOut", delay: 0.2 + index * 0.07 }}
                                    className="w-full flex justify-center items-center text-slate-800 text-lg font-medium cursor-pointer text-wrap select-none"
                                >

	                                <span className="text-left">{cat?.NazwaKategorii || "Kategoria"}</span>

                                </motion.button>
                            ))
                        ) : (
                            <div className="text-white/90">Brak kategorii.</div>
                        )}
                    </motion.div>
                ) : (
                    <CategoryGrid
                        key={`grid-${activeIndex}`}
                        items={categoryData?.[activeIndex] ?? []}
                        onNavigate={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
	        <motion.span
		        initial={{ opacity: 0, scale: 0.80 }}
		        animate={{ opacity: 1, scale: 1 }}
		        transition={{ duration: 0.2, ease: "easeOut", delay: 0.4 }}
		        className="w-[90%] h-px bg-slate-400 min-h-px"></motion.span>
	        <motion.div
		        initial={{ opacity: 0, scale: 0.80,  }}
		        animate={{ opacity: 1, scale: 1, y: 0 }}
		        transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
		        className="flex items-center justify-around w-full h-full min-h-12 text-black/60 pt-4">
		        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path></svg>
		        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.312t.1-.413q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037"></path></svg>
		        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 48 48"><path fill="currentColor" d="M13.24 21.58c2.88 5.66 7.52 10.28 13.18 13.18l4.4-4.4c.54-.54 1.34-.72 2.04-.48c2.24.74 4.66 1.14 7.14 1.14c1.1 0 2 .9 2 2V40c0 1.1-.9 2-2 2C21.22 42 6 26.78 6 8c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2c0 2.5.4 4.9 1.14 7.14c.22.7.06 1.48-.5 2.04z"></path></svg>
		        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 256 256"><path fill="currentColor" d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32"></path></svg>
		        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"></path></svg>
	        </motion.div>
        </motion.div>
    );
}

function CategoryGrid({ items, onNavigate }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[90%] grid grid-cols-2 sm:grid-cols-3 gap-1 py-3 items-stretch"
        >
            {items?.length ? (
                items.map((el, i) => {
                    const href = el?.Link || "#";
                    return (
                        <Link
                            href={href}
                            key={`${href}-${i}`}
                            onClick={onNavigate}
                            className="group block h-full">
                            <motion.div
                                className="h-full rounded-xl bg-white/95 hover:bg-white p-4 shadow-md ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.18, ease: "easeOut", delay: i * 0.02 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >

                                <div className="font-[poppins] text-base text-slate-800 text-center">
                                    {el?.Tytul ?? ""}
                                </div>
                            </motion.div>
                        </Link>
                    );
                })
            ) : (
                <div className="col-span-full text-white/90 text-center py-10">
                    Brak elementów w tej kategorii.
                </div>
            )}
        </motion.div>
    );
}
