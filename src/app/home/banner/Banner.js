import Image from "next/image";
import {getStrapiMedia} from "@/app/lib/strapi";
import BannerButtons from "@/app/home/banner/BanerButtons";
import logo from "../../../../public/images/logo.webp"
import godlo from "../../../../public/images/godlo.webp"

export default function Banner({baner}) {
	const zdjecieBanner = baner?.["ZdjecieBaner"] ? getStrapiMedia(baner["ZdjecieBaner"].url) : ""

	return (<>
			<div className="relative w-full h-max md:h-max flex flex-col pt-[6rem] lg:pt-[7rem] items-center font-[poppins]">
				<div className="relative w-full h-max flex items-center">
					<div className="w-full h-max flex items-center gap-2 lg:gap-10 py-1 justify-between">
						<Image src={logo} alt="logo"
						       className="object-contain select-none max-h-15 max-w-15 md:max-h-20 md:max-w-20 lg:max-h-25 lg:max-w-25 drop-shadow-md/20 "/>
						<div className="flex-1 flex px-2 w-full h-full">
							<p
								className="w-full md:max-w-[70%] text-center sm:text-left text-black/90 font-[poppins] text-sm sm:text-lg md:text-lg lg:text-xl/8 xl:text-3xl/10  font-light hyphens-auto">I
								Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu </p>
						</div>
						<Image src={godlo} priority alt="Godło"
						       className="object-contain select-none max-h-15 max-w-13 md:max-h-20 md:max-w-17 lg:max-h-25 lg:max-w-22  "/>
					</div>
				</div>
				<div className=" relative w-full h-[20vh] sm:h-[30vh] md:h-[58vh] 2xl:h-[65vh] drop-shadow-md/20 mt-4 aspect-auto select-none">
					<Image
						src={zdjecieBanner}
						alt="Widok na budynek liceum"
						fill
						className="object-cover rounded-2xl brightness-70"
						priority
						quality={85}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw "
					/>
				</div>
				<div className="flex w-full h-full justify-center items-center py-5 rounded-b-2xl">
					{baner?.["Przyciski"] ? <BannerButtons przyciski={baner["Przyciski"]}/> : null}
				</div>

			</div>
		</>
	);
}
