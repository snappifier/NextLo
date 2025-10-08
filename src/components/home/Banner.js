import logo from "src/images/logo.webp"
import budynek from "src/images/budynek.jpg"
import godlo from "src/images/godlo.webp"
import Image from "next/image";
import ButtonsBanner from "@/components/home/banner/buttonsBaner";

export default function Banner() {
    return (<>
		    <div className="relative w-full h-max md:h-max flex flex-col pt-[6rem] lg:pt-[7rem] items-center font-[poppins]">
			    <div className="relative w-[94%] sm:w-[90%] lg:w-[80%] h-max flex items-center">
				    <div className="w-full h-max flex items-center gap-2 lg:gap-10 py-1 justify-between">
					    <Image src={logo} alt="logo" className="object-contain select-none max-h-15 max-w-15 md:max-h-20 md:max-w-20 lg:max-h-25 lg:max-w-25 drop-shadow-md/20"/>
					    <p className=" text-center text-black/80  font-[poppins] text-sm sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-medium break-words hyphens-auto">I Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu </p>
					    <Image src={godlo} priority alt="Godło" className="object-contain select-none max-h-15 max-w-15 md:max-h-20 md:max-w-20 lg:max-h-25 lg:max-w-25 " />
				    </div>
			    </div>
                <div className="hidden md:block relative w-full md:h-[58vh] drop-shadow-md/20 mt-4 aspect-auto">
                    <Image
                        src={budynek}
                        alt="Widok na budynek liceum"
                        fill
                        className="object-cover rounded-2xl brightness-70"
                        priority
                    />
                </div>
                <div className="flex w-full h-full justify-center items-center py-5 rounded-b-2xl">
                    <ButtonsBanner />
                </div>

            </div>
        </>
    );
}
