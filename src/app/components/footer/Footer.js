'use client'

import {useState, useCallback, useEffect} from "react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../../../public/images/logo.webp"
import godlo from "../../../../public/images/godlo.webp"
import Toast from "./Toast"
import SocialIcon from "./SocialIcon"

export default function Footer({footer}) {
	const [toast, setToast] = useState({show: false, message: ""})
	const [isMobile, setIsMobile] = useState(false)

	const PHONE_NUMBER = footer["Telefon"]
	const EMAIL = footer["Email"]
	const ADDRESS = footer["Adres"]
	const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`
	const TEL_HREF = `tel:${PHONE_NUMBER?.replace(/\s+/g, "")}`
	const MAILTO_HREF = `mailto:${EMAIL}`

	useEffect(() => {
		const checkMobile = () => {
			const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
			const isCoarsePointer = window.matchMedia?.("(pointer: coarse)").matches
			setIsMobile(hasTouchScreen && isCoarsePointer)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const showToast = useCallback((message) => {
		setToast({show: true, message})
		setTimeout(() => setToast({show: false, message: ""}), 2500)
	}, [])

	const handleCopy = useCallback(async (text, message) => {
		if (isMobile) return
		try {
			await navigator.clipboard.writeText(text)
			showToast(message)
		} catch (err) {
			console.error("Nie udało się skopiować:", err)
		}
	}, [showToast, isMobile])

	const socialLinks = [
		{
			name: "Facebook @1lozamosc",
			href: footer["Facebook"],
			icon: (<svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 16 16"><path fill="currentColor" d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131c.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>)
		},
		{
			name: "TikTok @1lozamosc",
			href: footer["Tiktok"],
			icon: (<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><path fill="currentColor" d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"/></svg>)
		}
	]

	return (
		<>
			{!isMobile && <Toast message={toast.message} show={toast.show}/>}
			<footer className="relative w-full bg-linear-to-b from-[#3077BA] to-[#245d94] overflow-hidden">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-5 sm:pb-7">
					<div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
						<Image src={logo} alt="Logo szkoły" className="size-14 sm:size-16 select-none pointer-events-none"/>
						<p className="text-center text-white/90 text-sm sm:text-base lg:text-lg max-w-md font-light leading-relaxed">
							I Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu
						</p>
						<Image src={godlo} alt="Godło Polski" className="h-14 sm:h-16 w-auto select-none pointer-events-none"/>
					</div>
					<nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 select-none" aria-label="Stopka">
						{footer["Przyciski"]?.map((item) => (
							<Link href={item["Link"]} key={item.id} className="text-white/70 hover:text-white text-sm font-light transition-colors">
								{item["Nazwa"]}
							</Link>
						))}
					</nav>

					<div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
						{socialLinks.map((item) => (
							<SocialIcon key={item.name} href={item.href} label={item.name} tooltipText={!isMobile ? item.name : null}>
								{item.icon}
							</SocialIcon>
						))}

						{isMobile ? (
							<SocialIcon href={TEL_HREF} label={`Zadzwoń: ${PHONE_NUMBER}`} tooltipText={null}>
								<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 56 56"><path fill="currentColor" d="M18.156 37.762c6.774 6.773 15.024 12 21.75 12c3.024 0 5.672-1.055 7.805-3.399c1.242-1.383 2.016-3 2.016-4.593c0-1.172-.446-2.297-1.57-3.094l-7.173-5.11c-1.101-.75-2.015-1.125-2.859-1.125c-1.078 0-2.016.61-3.094 1.664l-1.664 1.641a1.26 1.26 0 0 1-.89.375c-.375 0-.704-.14-.961-.258c-1.43-.773-3.914-2.906-6.235-5.203c-2.297-2.297-4.43-4.781-5.18-6.234a2 2 0 0 1-.257-.938c0-.304.093-.61.351-.867l1.64-1.71c1.056-1.079 1.665-2.017 1.665-3.095c0-.843-.375-1.757-1.148-2.859l-5.04-7.102c-.82-1.125-1.968-1.617-3.234-1.617c-1.547 0-3.164.703-4.523 2.04c-2.274 2.18-3.282 4.874-3.282 7.85c0 6.727 5.133 14.884 11.883 21.634"/></svg>
							</SocialIcon>
						) : (
							<SocialIcon onClick={() => handleCopy(PHONE_NUMBER, "Numer skopiowany!")} label={`Skopiuj numer: ${PHONE_NUMBER}`} tooltipText={PHONE_NUMBER}>
								<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 56 56"><path fill="currentColor" d="M18.156 37.762c6.774 6.773 15.024 12 21.75 12c3.024 0 5.672-1.055 7.805-3.399c1.242-1.383 2.016-3 2.016-4.593c0-1.172-.446-2.297-1.57-3.094l-7.173-5.11c-1.101-.75-2.015-1.125-2.859-1.125c-1.078 0-2.016.61-3.094 1.664l-1.664 1.641a1.26 1.26 0 0 1-.89.375c-.375 0-.704-.14-.961-.258c-1.43-.773-3.914-2.906-6.235-5.203c-2.297-2.297-4.43-4.781-5.18-6.234a2 2 0 0 1-.257-.938c0-.304.093-.61.351-.867l1.64-1.71c1.056-1.079 1.665-2.017 1.665-3.095c0-.843-.375-1.757-1.148-2.859l-5.04-7.102c-.82-1.125-1.968-1.617-3.234-1.617c-1.547 0-3.164.703-4.523 2.04c-2.274 2.18-3.282 4.874-3.282 7.85c0 6.727 5.133 14.884 11.883 21.634"/></svg>
							</SocialIcon>
						)}

						{isMobile ? (
							<SocialIcon href={MAILTO_HREF} label={`Napisz email: ${EMAIL}`} tooltipText={null}>
								<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"/></svg>
							</SocialIcon>
						) : (
							<SocialIcon onClick={() => handleCopy(EMAIL, "Email skopiowany!")} label={`Skopiuj email: ${EMAIL}`} tooltipText={EMAIL}>
								<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"/></svg>
							</SocialIcon>
						)}

						<SocialIcon href={MAPS_URL} label={`Lokalizacja: ${ADDRESS}`} tooltipText={!isMobile ? ADDRESS : null}>
							<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"/></svg>
						</SocialIcon>
					</div>

					<div className="w-full max-w-md mx-auto h-px bg-white/20 mb-6"/>
					<div className="text-center text-white/60 text-xs sm:text-sm">
						<p className="leading-relaxed">&copy; {new Date().getFullYear()} I Liceum im. Jana Zamoyskiego w Zamościu</p>
						<p className="mt-2">Design & Development:{" "}
							<Link href="https://mszyszlo.vercel.app" className="hover:text-white transition-colors duration-300" target="_blank">
								Michał Szyszło
							</Link>
							{" & "}
							<Link href="https://krystianmatwiej.pl" className="hover:text-white transition-colors duration-300" target="_blank">
								Krystian Matwiej
							</Link>
						</p>
					</div>
				</div>
			</footer>
		</>
	)
}