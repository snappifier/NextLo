"use client";

import {AnimatePresence, motion} from "motion/react";
import {useCallback, useMemo, useState} from "react";
import Image from "next/image";
import logo from "../../../../../public/images/logo.webp"
import godlo from "../../../../../public/images/godlo.webp"
import Toast from "../../footer/Toast.js"
import CategoryGrid from "./CategoryGrid.js";
import ContactIcon from "./ContactIcon.js";

export default function DropdownMobile({menu, setIsOpen, icons}) {
	const [activeIndex, setActiveIndex] = useState(null);
	const [toast, setToast] = useState({show: false, message: ""})

	const PHONE_NUMBER = icons["Telefon"];
	const EMAIL = icons["Email"];
	const ADDRESS = icons["Adres"];
	const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
	const TEL_HREF = `tel:${PHONE_NUMBER?.replace(/\s+/g, "")}`
	const MAILTO_HREF = `mailto:${EMAIL}`

	const categories = Array.isArray(menu?.Kategoria) ? menu.Kategoria : []

	const categoryData = useMemo(() => {
		return categories.map((cat) => {
			const pages = Array.isArray(cat?.Podstrona) ? cat.Podstrona : []
			return pages.map((p) => ({
				Link: p?.Link || "#",
				Tytul: p?.Tytul || "",
			}))
		})
	}, [categories])

	const showMain = activeIndex === null

	const showToast = useCallback((message) => {
		setToast({show: true, message})
		setTimeout(() => setToast({show: false, message: ""}), 2500)
	}, [])

	const handleCopy = useCallback(async (text, message) => {
		try {
			if (navigator.clipboard && navigator.clipboard.writeText) {
				await navigator.clipboard.writeText(text)
			} else {
				const textArea = document.createElement("textarea")
				textArea.value = text
				textArea.style.position = "fixed"
				textArea.style.left = "-9999px"
				document.body.appendChild(textArea)
				textArea.select()
				document.execCommand("copy")
				document.body.removeChild(textArea)
			}
			showToast(message)
		} catch (err) {
			console.error("Nie udało się skopiować:", err)
		}
	}, [showToast])

	const containerVariants = {
		hidden: {opacity: 0, y: -20, scale: 0.95},
		visible: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}},
		exit: {opacity: 0, y: -10, scale: 0.98, transition: {duration: 0.2, ease: "easeOut"}}
	}

	const contentVariants = {
		hidden: {opacity: 0},
		visible: {opacity: 1, transition: {staggerChildren: 0.06, delayChildren: 0.15}},
		exit: {opacity: 0, transition: {staggerChildren: 0.03, staggerDirection: -1}}
	}

	const itemVariants = {
		hidden: {opacity: 0, y: 10},
		visible: {opacity: 1, y: 0, transition: {type: "spring", stiffness: 400, damping: 25}},
		exit: {opacity: 0, y: 10, transition: {duration: 0.15}}
	}

	return (
		<>
			<Toast message={toast.message} show={toast.show}/>
			<motion.div
				className="relative w-[94%] sm:w-[90%] lg:w-[80%] h-max max-h-[calc(100dvh-6rem)] bg-white rounded-2xl flex flex-col items-center shadow-2xl overflow-hidden mb-5"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<div className="w-full px-5 py-4 bg-linear-to-b from-slate-50 to-white border-b border-slate-100">
					<div className="flex items-center justify-between gap-3">
						<Image src={logo} alt="Logo" className="h-10 w-10 drop-shadow-sm pointer-events-none select-none"/>
						<p className="flex-1 text-center text-sm text-slate-600 font-light leading-tight">
							I Liceum Ogólnokształcące<br/>
							<span className="text-slate-500">im. Jana Zamoyskiego w Zamościu</span>
						</p>
						<Image src={godlo} alt="Godło" className="h-10 w-auto pointer-events-none select-none"/>
					</div>
				</div>

				<button className={`absolute top-20 left-4 z-10 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all duration-200 ${showMain ? "opacity-0 pointer-events-none" : "opacity-100"}`}
								onClick={() => setActiveIndex(null)}
								type="button"
								aria-label="Powrót"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"/></svg>
				</button>
				<div className="w-full flex-1 overflow-y-auto overscroll-contain">
					<AnimatePresence mode="wait">
						{showMain ? (
							<motion.div key="main-list" className="flex flex-col w-full px-5 py-6 gap-2"
													variants={contentVariants}
													initial="hidden"
													animate="visible"
													exit="exit"
							>
								{categories.length ? (
									categories.map((cat, i) => (
										<motion.button key={cat?.id ?? i} className="w-full flex items-center justify-between px-4 py-4 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 transition-colors"
										               onClick={() => setActiveIndex(i)}
										               variants={itemVariants}
										               whileTap={{scale: 0.98}}
										               type="button"
										>
											<span className="text-slate-800 text-base font-medium">
												{cat?.NazwaKategorii || "Kategoria"}
											</span>
											<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M10.061 19.061L17.121 12l-7.06-7.061l-2.122 2.122L12.879 12l-4.94 4.939z"/></svg>
										</motion.button>
									))
								) : (
									<div className="text-slate-500 text-center py-8">Brak kategorii</div>
								)}
							</motion.div>
						) : (
							<CategoryGrid key={`grid-${activeIndex}`} items={categoryData?.[activeIndex] ?? []} onNavigate={() => setIsOpen(false)}/>
						)}
					</AnimatePresence>
				</div>

				<div className="w-full px-5 py-4 bg-linear-to-t from-slate-50 to-white border-t border-slate-100">
					<div className="flex items-center justify-center gap-3">
						<ContactIcon href={icons["Facebook"]} label="Facebook @1lozamosc" tooltipText="Facebook @1lozamosc"><svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 16 16"><path fill="currentColor" d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131c.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg></ContactIcon>
						<ContactIcon href={icons["Tiktok"]} label="TikTok @1lozamosc" tooltipText="TikTok @1lozamosc"><svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"><path fill="currentColor" d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"/></svg></ContactIcon>
						<ContactIcon href={TEL_HREF} onClick={() => handleCopy(PHONE_NUMBER, "Numer skopiowany!")} label={`Zadzwoń: ${PHONE_NUMBER}`} tooltipText={PHONE_NUMBER}><svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 56 56"><path fill="currentColor" d="M18.156 37.762c6.774 6.773 15.024 12 21.75 12c3.024 0 5.672-1.055 7.805-3.399c1.242-1.383 2.016-3 2.016-4.593c0-1.172-.446-2.297-1.57-3.094l-7.173-5.11c-1.101-.75-2.015-1.125-2.859-1.125c-1.078 0-2.016.61-3.094 1.664l-1.664 1.641a1.26 1.26 0 0 1-.89.375c-.375 0-.704-.14-.961-.258c-1.43-.773-3.914-2.906-6.235-5.203c-2.297-2.297-4.43-4.781-5.18-6.234a2 2 0 0 1-.257-.938c0-.304.093-.61.351-.867l1.64-1.71c1.056-1.079 1.665-2.017 1.665-3.095c0-.843-.375-1.757-1.148-2.859l-5.04-7.102c-.82-1.125-1.968-1.617-3.234-1.617c-1.547 0-3.164.703-4.523 2.04c-2.274 2.18-3.282 4.874-3.282 7.85c0 6.727 5.133 14.884 11.883 21.634"/></svg></ContactIcon>
						<ContactIcon href={MAILTO_HREF} onClick={() => handleCopy(EMAIL, "Email skopiowany!")} label={`Email: ${EMAIL}`} tooltipText={EMAIL}><svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"><path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"/></svg></ContactIcon>
						<ContactIcon href={MAPS_URL} label={`Lokalizacja: ${ADDRESS}`} tooltipText={ADDRESS}><svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"/></svg></ContactIcon>
					</div>
				</div>
			</motion.div>
		</>
	);
}