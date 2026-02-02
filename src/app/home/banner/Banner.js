import Image from "next/image";
import {getStrapiMedia} from "@/app/lib/strapi";
import BannerButtons from "@/app/home/banner/BanerButtons";
import godlo from "../../../../public/images/godlo.webp"
import ImageSkeletonLoader from "@/app/components/animations/ImageSkeletonLoader";

export default function Banner({baner}) {
	const zdjecieBanner = baner?.["ZdjecieBaner"] ? getStrapiMedia(baner["ZdjecieBaner"].url) : ""
	const logoBaner = baner?.["LogoBaner"] ? getStrapiMedia(baner["LogoBaner"].url) : ""

	return (<>
			<div className="relative w-full h-max md:h-max flex flex-col pt-24 lg:pt-28 items-center gap-4 font-poppins">
				<div className="relative w-full h-max flex items-center">
					<div className="w-full h-max flex items-center gap-2 lg:gap-10 justify-between">
						<div className="relative w-15 h-15 md:w-20 md:h-20 lg:w-25 lg:h-25 shrink-0">
							<ImageSkeletonLoader src={logoBaner ? logoBaner : ""} isPriority={true}  alt="logo" className="object-contain select-none pointer-events-none drop-shadow-sm" rounded="rounded-[50%]"/>
						</div>
						<div className="flex-1 flex px-2 w-full h-full">
							<p className="w-full md:max-w-[70%] text-center sm:text-left text-black/90 font-poppins text-md sm:text-lg md:text-lg lg:text-xl/8 xl:text-3xl/10 font-light hyphens-auto">I Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu</p>
						</div>
						<Image src={godlo} priority alt="Godło" className="object-contain select-none pointer-events-none max-h-15 max-w-13 md:max-h-20 md:max-w-17 lg:max-h-25 lg:max-w-22  "/>
					</div>
				</div>
				<div className=" relative w-full h-[28vh] sm:h-[30vh] md:h-[58vh] 2xl:h-[65vh] drop-shadow-md/20 aspect-auto select-none">
					<ImageSkeletonLoader src={zdjecieBanner} isPriority={true} alt="widok na budynek liceum" className="object-cover rounded-2xl brightness-70 select-none pointer-events-none" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"/>
				</div>
				<div className="flex w-full h-full justify-center items-center rounded-b-2xl">
					{baner?.["Przyciski"] ? <BannerButtons przyciski={baner["Przyciski"]}/> : null}
				</div>

			</div>
		</>
	);
}
