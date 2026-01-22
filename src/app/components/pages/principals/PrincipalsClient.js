"use client"
import {motion} from "motion/react";
import {getStrapiMedia} from "@/app/lib/strapi";
import ImageSkeletonLoader from "@/app/components/animations/ImageSkeletonLoader";

const Principals = ({data}) => {

	const FALLBACK_IMG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjYTdhN2E3IiBkPSJNMTIgMTJxLTEuNjUgMC0yLjgyNS0xLjE3NVQ4IDh0MS4xNzUtMi44MjVUMTIgNHQyLjgyNSAxLjE3NVQxNiA4dC0xLjE3NSAyLjgyNVQxMiAxMm0tOCA4di0yLjhxMC0uODUuNDM4LTEuNTYyVDUuNiAxNC41NXExLjU1LS43NzUgMy4xNS0xLjE2MlQxMiAxM3QzLjI1LjM4OHQzLjE1IDEuMTYycS43MjUuMzc1IDEuMTYzIDEuMDg4VDIwIDE3LjJWMjB6Ii8+PC9zdmc+";

	const principalsData = data["Szablon"];
	if (!principalsData) return null;
	const principals = principalsData["Dyrektorzy"];
	const title = principalsData["Naglowek"];

	return (
		<div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center">
			<div className="w-[92%] sm:w-[90%] lg:w-[80%] grid grid-cols-1 gap-6 md:gap-8">
				<main>
					<div className="w-full flex flex-col items-center mb-4 sm:mb-2 text-wrap gap-7 text-[#3077BA]">
						<p className="w-full text-3xl sm:text-4xl lg:text-6xl/15 font-semibold uppercase text-center">
							{title}
						</p>
						<div className="w-1/3 h-1 bg-[#3077BA] rounded-2xl"></div>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-5">
						{principals.map((principal) => (
							<motion.div className="relative aspect-3/4 rounded-xl overflow-hidden shadow-md bg-slate-200"
							            key={principal.id}
							            whileHover={{y: -8}}
							            transition={{type: "spring", stiffness: 260, damping: 24}}
							>
								<div className="absolute inset-0 ">
									<ImageSkeletonLoader
										src={principal?.["Zdjecie"] ? getStrapiMedia(principal["Zdjecie"].url) : FALLBACK_IMG}
										alt={`Zdjecie-${principal["ImieNazwisko"]}`}
										className="w-full h-full object-cover object-top select-none pointer-events-none"
										rounded="rounded-none"
									/>
									<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"/>
								</div>
								<div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex flex-col gap-1">
									<h4 className="text-white text-sm sm:text-base font-semibold leading-tight drop-shadow-md">
										{principal["ImieNazwisko"]}
									</h4>
									<div className="flex flex-col gap-0.5">
										{principal["Daty"].map((date) => (
												<p key={date.id} className="text-white/80 text-xs sm:text-sm font-light">
													{date["Rok_poczatek"]} - {date?.["Rok_koniec"] ? date["Rok_koniec"] : (
													<span className="text-sky-300 font-medium">Aktualnie</span>
												)}
												</p>
											)
										)}
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</main>
			</div>
		</div>
	)
}

export default Principals;