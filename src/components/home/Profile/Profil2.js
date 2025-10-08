"use client"

import {motion} from "motion/react"
import {useState, useEffect} from "react";
import Link from "next/link";

function useIsLg() {
	const [isLg, setIsLg] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const update = () => setIsLg(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return isLg;
}

export default function Profill({item}) {
	const [hovered, setHovered] = useState(false);
	const [arrow, setArrow] = useState(false);
	const isLg = useIsLg();

	const currentColor = item["Kolor"];
	return (
		<motion.div className="relative w-full h-70 max-w-xl min-w-85 bg-zinc-100  rounded-xl overflow-hidden select-none flex flex-col justify-between items-center shadow-md"
		            onPointerEnter={() => {setArrow(true); if (isLg) setHovered(true);}}
		            onPointerLeave={() => {setArrow(false);if (isLg) setHovered(false);}}
		            onFocus={() => isLg && setHovered(true)}
		            onBlur={() => isLg && setHovered(false)}
		>
			<Link href={"/rekrutacja"} className="w-full h-full flex flex-col justify-between items-center">
			<div className="w-full h-max flex p-5 items-start justify-between">
                      <span
	                      className="inline-flex items-center rounded-full bg-white px-5 py-2 text-[11px] sm:text-xs md:text-sm font-semibold text-zinc-500">
                        Profil
                      </span>
				<div className="flex w-25 h-25 items-center justify-center m-3">
					<div className={`w-full h-full`} style={{color: currentColor}}
					     dangerouslySetInnerHTML={{__html: item["IconPath"]}}/>
				</div>
			</div>

			<motion.div
				className={`absolute inset-0 w-full h-full rounded-xl text-wrap overflow-hidden flex flex-col justify-start px-6 pt-16 ${isLg && hovered ? "bg-[color:var(--c)]/20" : ""} `}
				style={{'--c': currentColor}}
				initial={{y: 85}}                                //tym zmieniasz pozycje początkową nagłówka(im więcej tym niżej)
				animate={hovered ? {y: 0, backdropFilter: `blur(24px)`} : {}}
				transition={{duration: 0.2, ease: "easeOut"}}

			>
				<h1>Profil</h1>
				<h1 className="text-xl text-slate-800 font-[poppins] font-medium">{item["NazwaProfilu"]}</h1>
				<motion.p className={`text-sm text-slate-900 leading-tight font-[poppins] pt-1 font-normal`}
				          initial={false}
				          animate={isLg && hovered ? {opacity: 1, pointerEvents: "auto"} : {opacity: 0, pointerEvents: "none"}}
				          transition={{duration: 0.3}}
				>{item["Opis"]}</motion.p>
			</motion.div>
			{/*<Link href={"/rekrutacja"} className="w-[80%] mb-5 z-100">*/}

			<motion.button className="w-[80%] mb-5 z-100 bg-white p-2 rounded-md cursor-pointer flex items-center justify-center gap-1 drop-shadow-md"

			               onFocus={() => isLg && setArrow(true)}
			               onBlur={() => isLg && setArrow(false)}
			               whileTap={{scale: 0.95}}
			               onTapStart={() => {setArrow(true)}}
			               onTapCancel={() => {setArrow(false)}}
			>
				<p>Dowiedz się więcej</p>
				<motion.svg
					animate={arrow ? {x: 5} : {}}
					xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"></path></g></motion.svg>

			</motion.button>

			</Link>
		</motion.div>

	)
}