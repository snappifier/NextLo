'use client'

import Card from "./Card"
import {slug} from "./Utils"

const Section = ({title, items, shouldShowHeader}) => {
	const validItems = items?.filter(Boolean) || []
	if (validItems.length === 0) return null

	return (
		<section id={slug(title)} className="flex flex-col gap-2 scroll-mt-32 md:scrill-mt-36">
			<h2 className={`${shouldShowHeader ? "text-md sm:text-xl font-base" : "text-xl sm:text-2xl font-medium"}`}>{title}</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
				{validItems.map((i) => (
					<Card key={i.id} profil={i} sectionTitle={title}/>
				))}
			</div>
		</section>
	)
}

export default Section