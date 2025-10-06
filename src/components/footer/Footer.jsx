"use client";

import {useState} from "react";
import {motion} from "motion/react";
import Link from "next/link";
import godlo from "src/images/godlo.webp";
import logo from "src/images/logo.webp";
import Image from "next/image";

const PHONE_NUMBER = "+48 84 639 28 01";
const EMAIL = "zam.1lo@2com.pl";
const ADDRESS = "I LO w Zamościu, ul. Akademicka 1, 22-400 Zamość";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const navigation = {
	main: [
		{name: "Strona główna", href: "/"},
		{name: "Kontakt", href: "/kontakt"},
		{name: "Aktualności", href: "/aktualnosci"},
		{name: "E-Dziennik", href: "/"},
		{name: "Współprace", href: "/wspolprace"},
		{name: "Rekrutacja", href: "/rekrutacja"},
	],
	social: [
		{
			name: "Facebook",
			href: 'https://www.facebook.com/1lozamosc/?locale=pl_PL',
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path
						fillRule="evenodd"
						d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			name: "TikTok",
			href: 'https://www.tiktok.com/@1lozamosc',
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path
						fillRule="evenodd"
						d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			name: "Telefon",
			icon: (props) => (
				<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
					<path
						d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317"/>
				</svg>
			),
		},
		{
			name: "E-mail",
			href: `mailto:${EMAIL}?subject=${encodeURIComponent("Zapytanie ze strony")}`,
			icon: (props) => (
				<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
					<path
						d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"/>
				</svg>
			),
		},
		{
			name: "Lokalizacja",
			href: MAPS_URL,
			icon: (props) => (
				<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
					<path
						d="M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7m0 2a5 5 0 0 0-5 5c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 0 0-5-5"/>
				</svg>
			),
		},
	],
};

const Footer = () => {
	const [copied, setCopied] = useState(false);
	const [emailCopied, setEmailCopied] = useState(false);

	const isMobile =
		typeof window !== "undefined" &&
		window.matchMedia &&
		window.matchMedia("(pointer: coarse)").matches;

	const TEL_HREF = `tel:${PHONE_NUMBER.replace(/\s+/g, "")}`;

	const handlePhoneClick = async (e) => {
		try {

			if (!isMobile) {
				e.preventDefault();
			}
			await navigator.clipboard.writeText(PHONE_NUMBER);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);

		} catch (err) {
			console.error("Nie udało się skopiować numeru:", err);
		}
	};

	const handleEmailClick = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
			setEmailCopied(true);
			setTimeout(() => setEmailCopied(false), 1500);
		} catch (e) {
			console.error("Nie udało się skopiować e-maila:", e);
		}
	};

	return (
		<footer className="bg-[#3077BA]  w-full h-max font-[poppins] overflow-x-clip">
			<div className="mx-auto max-w-[98%] overflow-visible  py-6 sm:py-6 lg:px-8 flex flex-col">

				<div className="w-full h-max flex items-center justify-center py-2">
					<div className="max-w-[80%] w-full h-max flex items-center justify-center gap-5 py-2">
						<Image src={logo} alt="logo" className="select-none h-15 w-15   drop-shadow-lg/20"/>
						<p
							className=" text-center text-gray-200 font-[poppins] text-xs sm:text-xs lg:text-md max-w-2/3 font-light whitespace-normal break-words hyphens-auto">I
							Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu </p>

						<Image src={godlo} alt="Godło" className=" select-none h-15 w-auto object-contain"/>
					</div>
				</div>


				<nav
					aria-label="Footer"
					className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-1 pt-6 text-sm/6 px-6"
				>
					{navigation.main.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							target="_blank"
							className="text-gray-200 hover:text-white select-none"
						>
							{item.name}
						</Link>
					))}
				</nav>

				<div className="mt-16 flex justify-center gap-x-10">
					{navigation.social.map((item) => {
						if (item.name === "Telefon") {
							return (
								<div key="Telefon" className="relative group">
									<div
										className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                                        <span
	                                        className="rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-[#3077BA] shadow whitespace-nowrap">
                                          {PHONE_NUMBER}
                                        </span>
									</div>

									{copied && (
										<motion.div
											initial={{opacity: 0, y: 6}}
											animate={{opacity: 1, y: 0}}
											exit={{opacity: 0, y: -6}}
											className="pointer-events-none absolute -top-18 left-1/2 -translate-x-1/2"
										>
                                          <span
	                                          className="rounded-md bg-green-500/90 px-2 py-1 text-xs font-semibold text-white shadow">
                                            Skopiowano!
                                          </span>
										</motion.div>
									)}

									<motion.a
										href={TEL_HREF}
										onClick={handlePhoneClick}
										whileTap={{scale: 0.9}}
										className="text-gray-300 hover:text-white focus:outline-none"
										aria-label={`Zadzwoń lub skopiuj: ${PHONE_NUMBER}`}
										title={`Skopiuj numer: ${PHONE_NUMBER}`}
									>
										<item.icon aria-hidden="true" className="size-6"/>
									</motion.a>
								</div>
							);
						}
						if (item.name === "E-mail") {
							return (
								<div key="E-mail" className="relative group">
									{/* tooltip z adresem */}
									<div
										className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                                        <span
	                                        className="rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-[#3077BA] shadow whitespace-nowrap">
                                          {EMAIL}
                                        </span>
									</div>

									{/* „Skopiowano!” dla e-maila */}
									{emailCopied && (
										<motion.div
											initial={{opacity: 0, y: 6}}
											animate={{opacity: 1, y: 0}}
											exit={{opacity: 0, y: -6}}
											className="pointer-events-none absolute -top-18 left-1/2 -translate-x-1/2"
										>
                                          <span
	                                          className="rounded-md bg-green-500/90 px-2 py-1 text-xs font-semibold text-white shadow">
                                            Skopiowano!
                                          </span>
										</motion.div>
									)}


									<a
										href={`mailto:${EMAIL}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-300 hover:text-white"
										aria-label={`Napisz e-mail: ${EMAIL}`}
										title={`Napisz maila: ${EMAIL}`}
										onClick={handleEmailClick}
									>
										<item.icon aria-hidden="true" className="size-6"/>
									</a>
								</div>
							);
						}
						if (item.name === "Lokalizacja") {
							return (
								<div key="Lokalizacja" className="relative group">
									{/* tooltip z adresem */}
									<div
										className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                                        <span
	                                        className="rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-[#3077BA] shadow whitespace-nowrap">
                                          {ADDRESS}
                                        </span>
									</div>

									<a
										href={MAPS_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-300 hover:text-white"
										aria-label={`Pokaż lokalizację: ${ADDRESS}`}
										title={`Pokaż lokalizację: ${ADDRESS}`}
									>
										<item.icon aria-hidden="true" className="size-6"/>
									</a>
								</div>
							);
						}


						return (
							<a
								key={item.name}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-white"
							>
								<span className="sr-only">{item.name}</span>
								<item.icon aria-hidden="true" className="size-6"/>
							</a>
						);
					})}
				</div>

				<div className="mt-5 w-full border-t border-gray-300 flex justify-center px-6">
					<p className="mt-5 text-center text-sm/6 text-white">
						&copy; {new Date().getFullYear()} I Liceum im. Jana Zamoyskiego w Zamościu
						<br className=""/> Design & Development: Michał Szyszło & Krystian Matwiej
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
