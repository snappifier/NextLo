// app/components/NavbarClient.jsx
"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import DropdownMobile from "./DropdownMobile.jsx";

export default function NavbarClient({ menu }) {
    const [searchOn, setSearchOn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setSearchOn(true);

    return (
        <>
            {/* {searchOn && <Search onClose={() => setSearchOn(false)} />} */}
            <header
                className={`fixed top-0 pt-4 sm:pt-5 lg:pt-8 w-full flex flex-col items-center justify-start z-[100] gap-1 ${
                    isOpen ? "h-screen backdrop-blur-md bg-black/70 transition-colors duration-400" : ""
                }`}
            >
                <div className="text-white w-[94%] sm:w-[90%] lg:w-[80%] h-15 bg-[#3077BA] lg:bg-[#3077BA]/80 rounded-lg flex items-center justify-between px-5 sm:px-10 shadow-lg">
                    <Link href="/" className="z-[60]">
                        {/* tu wstaw logo */}
                    </Link>

                    <div className="hidden lg:flex items-center">
                        <Dropdown menu={menu} />
                    </div>

                    <div className="flex items-center">
                        <button
                            type="button"
                            className="group hover:bg-sky-800 h-10 w-10 flex justify-center items-center rounded-md cursor-pointer"
                            onClick={handleClick}
                            aria-label="Szukaj"
                        >
                            <motion.svg
                                className="transform transition-transform duration-150 group-hover:scale-110"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <g fill="none" stroke="#fdfdfd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="m21 21l-4.34-4.34" />
                                    <circle cx="11" cy="11" r="8" />
                                </g>
                            </motion.svg>
                        </button>

                        <button
                            type="button"
                            className="group hover:bg-sky-800 h-10 w-10 flex justify-center items-center rounded-md cursor-pointer text-white lg:hidden"
                            onClick={() => setIsOpen((v) => !v)}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            aria-label="Otwórz menu"
                        >
                            <span className="block w-5 h-0.5 bg-white rounded" />
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {isOpen && (
                        <DropdownMobile
                            menu={menu}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
