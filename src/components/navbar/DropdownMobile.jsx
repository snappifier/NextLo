// app/components/DropdownMobile.jsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function DropdownMobile({ menu, setIsOpen }) {
    // Strapi v4: `menu` to `json.data.attributes`
    const categories = Array.isArray(menu?.Kategoria) ? menu.Kategoria : [];

    // index kategorii -> [{ Link, Tytul }]
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
            className="relative w-[94%] sm:w-[90%] lg:w-[80%] min-h-[70vh] h-max bg-[#3077BA] rounded-lg flex flex-col items-center justify-start gap-5 pt-8 shadow-lg pb-16"
        >
            {/* Pasek tytułu + Back */}
            <div className="flex items-center justify-between w-[80%]">
                <div className="font-[poppins] font-light text-2xl text-white select-none">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={showMain ? "Menu" : (categories[activeIndex]?.NazwaKategorii || "Menu")}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0, transition: spring }}
                            exit={{ opacity: 0, y: -6, transition: { duration: tFast } }}
                            className="inline-block"
                        >
                            {showMain ? "Menu" : categories[activeIndex]?.NazwaKategorii || "Menu"}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {!showMain && (
                    <motion.button
                        type="button"
                        onClick={handleBack}
                        className="text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-3 py-1"
                        whileTap={{ scale: 0.96 }}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        aria-label="Powrót"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </motion.button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {showMain ? (
                    // Lista kategorii z Strapi (NazwaKategorii)
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
                        className="w-full flex flex-col items-center gap-4 pb-6 pt-10"
                    >
                        {categories.length ? (
                            categories.map((cat, index) => (
                                <motion.button
                                    type="button"
                                    onClick={() => handleOpenCategory(index)}
                                    key={cat?.id ?? index}
                                    variants={{
                                        hidden: { opacity: 0, y: 16, scale: 0.98 },
                                        show: { opacity: 1, y: 0, scale: 1 },
                                        exit: { opacity: 0, y: 16, scale: 0.98 },
                                    }}
                                    transition={{ duration: 0.18, ease: "easeOut", delay: index * 0.03 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-between w-[80%] min-h-14 bg-white rounded-md font-[poppins] text-lg text-slate-700 px-5 gap-5 shadow-md"
                                >
                                    <span className="text-left">{cat?.NazwaKategorii || "Kategoria"}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        className="opacity-60"
                                    >
                                        <path fill="currentColor" d="m10 17l5-5l-5-5v10Z" />
                                    </svg>
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
            className="w-[90%] grid grid-cols-2 sm:grid-cols-3 gap-3 pb-8 items-stretch"
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
                                className="h-full rounded-xl bg-white/95 hover:bg-white p-4 shadow-md ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-white flex items-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.18, ease: "easeOut", delay: i * 0.02 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* KAFELKI BEZ OPISU — tylko tytuł */}
                                <div className="font-[poppins] text-base text-slate-800">
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
