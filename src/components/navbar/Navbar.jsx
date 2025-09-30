"use client"

import Link from "next/link";
import Image from "next/image";
import {AnimatePresence, motion} from "motion/react";
import DropdownNew from "./Dropdown.jsx";
import {useEffect, useState} from "react";
// import {fetchAndOrganizeStrapiImages, images} from "../../features/strapiImages.jsx";
// import {useLocation} from "react-router-dom";
// import {Search} from "../Search.jsx";
// import {HamburgerMenu} from "../animations/HamburgerMenu.jsx";
import DropdownMobile from "./DropdownMobile.jsx";

export default function Navbar({menu}) {
    const [searchOn, setSearchOn] = useState(false);

    // const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    // useEffect(() => {
    //     fetchAndOrganizeStrapiImages();
    //
    // }, [location.pathname]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape" && searchOn !== true) {
                setSearchOn(false);
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);


    const handleClick = () => {
        setSearchOn(true);
    };

    const closeModal = () => {
        setSearchOn(false);
    };

    const handleMenu = () => {
        setIsOpen(false)
    }

    //idk czy to dziala
    useEffect(() => {
        const mql = window.matchMedia('(min-width:1024px)');
        mql.onchange = (e) => e.matches && setIsOpen(false);
        if (mql.matches) setIsOpen(false);

        return () => { mql.onchange = null; };
    }, []);



    useEffect(() => {
        window.addEventListener("scroll", handleMenu);

        return () => {
            window.removeEventListener("scroll", handleMenu);
        };
    }, [])
    return(<>
        {/*<AnimatePresence mode="wait">*/}
        {/*    {searchOn !== false && (*/}
        {/*        <Search*/}
        {/*            key={searchOn.id}*/}
        {/*            onClose={closeModal}*/}
        {/*        />*/}
        {/*    )}*/}
        {/*</AnimatePresence>*/}
        <header className={`fixed top-0 pt-4 sm:pt-5 lg:pt-8 w-full flex flex-col items-center justify-start z-100 gap-1 ${isOpen ? "h-screen backdrop-blur-md bg-black/70 transition-colors duration-400" : ""}`}>
            <div className="text-white w-[94%] sm:w-[90%] lg:w-[80%] h-15 bg-[#3077BA] lg:bg-[#3077BA]/80 backdrop-blur-xs backdrop-saturate-300 rounded-lg flex items-center justify-between px-5 sm:px-10 shadow-lg">
                <Link href={'/'} className="z-[60]">
                    {/*<motion.img src={images["logo_thumbnail"]} width={64} height={64}  alt="logo" className="h-11 w-11 min-w-11 " whileHover={{scale: 1.1}} whileTap={{scale: 1}}/>*/}
                </Link>
                <div className="hidden lg:flex items-center ">
                    <DropdownNew menu={menu}/>
                </div>
                <div className="flex items-center  ">
                    <div
                        className="group hover:bg-sky-800 h-10 w-10 flex justify-center items-center rounded-md cursor-pointer"
                        onClick={handleClick}
                    >
                        <motion.svg className="transform transition-transform duration-150 group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#fdfdfd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m21 21l-4.34-4.34"/><circle cx="11" cy="11" r="8"/></g></motion.svg>
                    </div>
                    <div className="group hover:bg-sky-800 h-10 w-10 flex justify-center items-center rounded-md cursor-pointer text-white lg:hidden" onClick={() => setIsOpen(!isOpen)} >
                        {/*<HamburgerMenu isOpen={isOpen} />*/}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <DropdownMobile menu={menu} isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
            </AnimatePresence>
        </header>
    </>)
}