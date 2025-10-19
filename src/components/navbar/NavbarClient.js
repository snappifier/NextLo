"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "src/images/logolo.webp"
import {AnimatePresence, motion} from "motion/react";
import {useEffect, useState} from "react";
import Dropdown from "./Dropdown";
import DropdownMobile from "./DropdownMobile.jsx";
import {Hamburger} from "@/ui/Hamburger";
import InlineSearch from "@/components/navbar/InlineSearch";
import MobileMenuSearch from "@/components/navbar/MobileMenuSearch";

export default function NavbarClient({menu}) {
	const [searchOn, setSearchOn] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}

		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, [isOpen]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const mql = window.matchMedia("(min-width: 1024px)");

		const handleMql = (e) => {
			if (e.matches) setIsOpen(false);
		};

		if (mql.addEventListener) mql.addEventListener("change", handleMql);
		else mql.addListener(handleMql);


		if (mql.matches) setIsOpen(false);

		return () => {
			if (mql.removeEventListener) mql.removeEventListener("change", handleMql);
			else mql.removeListener(handleMql);
		};
	}, []);


	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	if (!isOpen) return;
	//
	// 	let ticking = false;
	// 	const onScroll = () => {
	// 		if (ticking) return;
	// 		ticking = true;
	// 		requestAnimationFrame(() => {
	// 			setIsOpen(false);
	// 			ticking = false;
	// 		});
	// 	};
	//
	// 	window.addEventListener("scroll", onScroll, {passive: true});
	// 	return () => window.removeEventListener("scroll", onScroll);
	// }, [isOpen]);

	//  Zamykanie przy resize
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (!isOpen) return;

		const onResize = () => setIsOpen(false);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [isOpen]);

	return (
		<>
			{/* {searchOn && <Search onClose={() => setSearchOn(false)} />} */}
			<header
				className={`fixed top-0 pt-4 sm:pt-5 lg:pt-8 w-full flex flex-col items-center justify-start z-[100] gap-1 font-[poppins] ${
					isOpen ? "h-screen backdrop-blur-md bg-black/70 transition-colors duration-400" : ""
				}`}
			>
				<div
					className="text-white w-[94%] sm:w-[90%] lg:w-[80%] h-15 bg-[#3077BA] lg:bg-[#3077BA]/90 rounded-lg flex items-center justify-between px-3 sm:px-5 shadow-lg">
					<Link href="/" className="z-[60]">
						<motion.div className="flex items-center justify-between w-13 h-13" whileHover={{scale: 1.1}}
						            whileTap={{scale: 1}}>
							<Image src={logo} alt="Logo szkoły" className="w-auto h-[85%]"/>
						</motion.div>
					</Link>

					<div className="hidden lg:flex">
						<Dropdown menu={menu}/>
					</div>
					<div className="flex items-center size-11">
						<div className="relative w-full h-full hidden items-center justify-center inset-0 lg:flex">
							<InlineSearch/>

						</div>
						<div className="relative inset-0 flex items-center justify-center lg:hidden"><MobileMenuSearch /></div>
						<button
							type="button"
							className="group hover:bg-sky-800 h-10 w-10 flex justify-center items-center rounded-md cursor-pointer text-white lg:hidden "
							onClick={() => setIsOpen((v) => !v)}
							aria-expanded={isOpen}
							aria-controls="mobile-menu"
							aria-label="Otwórz menu"
						>

							<Hamburger isOpen={isOpen}/>
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
