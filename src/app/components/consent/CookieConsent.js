'use client'

import { useState, useEffect, useRef } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import {AnimatePresence, motion} from "motion/react";

export default function CookieConsent() {
	const [consent, setConsent] = useState(null)
	const bannerRef = useRef(null)

	const ANIMATION_DELAY = 1

	const checkConsent = () => {
		const savedConsent = localStorage.getItem('cookie_consent')
		if (savedConsent !== null) {
			setConsent(savedConsent === 'true')
		}
	}

	useEffect(() => {
		checkConsent()
		window.addEventListener('storage', checkConsent)
		return () => {
			window.removeEventListener('storage', checkConsent)
		}
	}, [])

	useEffect(() => {
		const updateHeight = () => {
			if (consent === null && bannerRef.current) {
				const height = bannerRef.current.offsetHeight
				document.documentElement.style.setProperty('--cookie-banner-height', `${height}px`)
			} else {
				document.documentElement.style.setProperty('--cookie-banner-height', '0px')
			}
		}

		document.documentElement.style.setProperty('--cookie-banner-height', '0px')

		const timer = setTimeout(() => {
			updateHeight()
			window.addEventListener('resize', updateHeight)
		}, ANIMATION_DELAY * 1000)

		return () => {
			clearTimeout(timer)
			window.removeEventListener('resize', updateHeight)
			document.documentElement.style.removeProperty('--cookie-banner-height')
		}
	}, [consent])

	const handleAccept = () => {
		localStorage.setItem('cookie_consent', 'true')
		setConsent(true)
		window.dispatchEvent(new Event("storage"))
	}

	const handleDecline = () => {
		localStorage.setItem('cookie_consent', 'false')
		setConsent(false)
		window.dispatchEvent(new Event("storage"))
	}

	const bannerVariants = {
		hidden: {y: '100%', transition: {duration: 0.3, ease: "easeOut", delay: 0}},
		visible: {y: 0, transition: {duration: 0.3, ease: "easeOut", delay: ANIMATION_DELAY}}
	}

	return (
		<>
			{consent === true && (
				<>
					<GoogleAnalytics gaId="G-Y9HQMYQ6B6" />
				</>
			)}
			<AnimatePresence>
				{consent === null && (
					<motion.div className="fixed min-h-30 bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 md:flex md:items-center md:justify-between"
					            ref={bannerRef}
					            variants={bannerVariants}
					            initial="hidden"
					            animate="visible"
					            exit="hidden"
					>
						<div className="mb-4 md:mb-0 md:mr-8 text-base text-gray-600">
							<p className="font-semibold mb-1 text-lg">Dbamy o Twoją prywatność</p>
							<p>Używamy plików cookies, aby analizować ruch na stronie i poprawiać jej wydajność. Czy zgadzasz się na ich wykorzystanie?</p>
						</div>
						<div className="flex gap-3 shrink-0">
							<button className="px-4 py-2 text-base font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer" onClick={handleDecline}>
								Odrzuć
							</button>
							<button className="px-4 py-2 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors cursor-pointer" onClick={handleAccept}>
								Akceptuj
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}