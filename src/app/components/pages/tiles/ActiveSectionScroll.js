'use client'

import {useEffect, useState} from "react"

const ActiveSectionScroll = (sectionIds) => {
	const [active, setActive] = useState(null)

	useEffect(() => {
		if (!sectionIds.length) return

		const getTopOffset = () =>{
			let offset = 0
			const header = document.querySelector('header.fixed')
			const chips = document.getElementById('top-chips')

			if (header) offset += header.getBoundingClientRect().height
			if (chips && getComputedStyle(chips).position === 'sticky') {
				offset += chips.getBoundingClientRect().height
			}
			const vh = window.innerHeight || 0;
			return Math.round(offset + (vh * 0.2));
		}

		let frame = 0

		const updateActive = () => {
			const sections = sectionIds
				.map(({id}) => document.getElementById(id))
				.filter(Boolean)

			const vh = window.innerHeight || 0
			const offset = getTopOffset()
			const scrollBottom = window.scrollY + vh
			const docHeight = document.documentElement.scrollHeight
			const isAtBottom = scrollBottom >= docHeight - 50

			if (isAtBottom && sections.length > 0) {
				const lastSection = sections[sections.length - 1]
				setActive((prev) => (prev === lastSection.id ? prev : lastSection.id))
				return
			}

			let currentId = null
			let bestTop = -Infinity

			for (const e of sections) {
				const r = e.getBoundingClientRect()
				if (r.bottom <= 0 || r.top >= vh) continue

				if (r.top <= offset + 1 && r.top > bestTop) {
					bestTop = r.top
					currentId = e.id
				}
			}

			if (!currentId) {
				for (const el of sections) {
					const r = el.getBoundingClientRect()
					if (r.bottom > 0 && r.top < vh) {
						currentId = el.id
						break
					}
				}
			}

			if (!currentId && sections[0]) {
				currentId = sections[0].id
			}

			setActive((prev) => (prev === currentId ? prev : currentId))
		}

		const onScroll = () => {
			if (frame) cancelAnimationFrame(frame)
			frame = requestAnimationFrame(updateActive)
		}

		const onClick = () => {
			setTimeout(() => requestAnimationFrame(updateActive), 100)
			setTimeout(() => requestAnimationFrame(updateActive), 300)
		}

		updateActive()
		window.addEventListener("scroll", onScroll, {passive: true})
		window.addEventListener("resize", onScroll)
		window.addEventListener("click", onClick)

		return () => {
			if (frame) cancelAnimationFrame(frame)
			window.removeEventListener("scroll", onScroll)
			window.removeEventListener("resize", onScroll)
			window.removeEventListener("click", onClick)
		}
	}, [sectionIds])

	return active
}
export default ActiveSectionScroll