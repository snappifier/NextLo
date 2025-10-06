import logo from "src/images/logo.webp"
import zdj1 from "src/images/zdj1.webp"
import godlo from "src/images/godlo.webp"
import Image from "next/image";
import ButtonsBanner from "@/components/home/banner/buttonsBaner";

export default function Banner() {
    return (<>
            <div className="relative w-full h-max md:h-max flex flex-col pt-[6rem] lg:pt-[7rem] items-center font-[poppins]">
                <div className="relative w-[94%] sm:w-[90%] lg:w-[80%] h-max flex items-center">
                    <div className="w-full h-max flex items-center gap-5 py-1">
                        <Image src={logo} alt="logo" className="select-none max-h-20 object-contain md:max-h-25 lg:max-h-30 min-w-11 drop-shadow-lg/20"/>
                        {/*<p className="text-md/7 sm:text-lg/7 md:text-xl/9 lg:text-2xl/10 xl:text-3xl/12 max-w-2/3 font-light select-none">I Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu </p>*/}
	                      <p className=" text-center text-black/80  font-[poppins] text-sm/7 sm:text-md/7 md:text-lg/9 lg:text-xl/10 xl:text-2xl/12 font-medium whitespace-normal break-words hyphens-auto">I Liceum Ogólnokształcące im. Jana Zamoyskiego w Zamościu </p>


                    <div className="max-h-30">
                        <Image src={godlo} priority alt="Godło" className="object-contain select-none max-h-20 md:max-h-25 lg:max-h-30 min-w-11" />
                    </div>
                    </div>
                </div>
                <div className="relative w-[94%] sm:w-[90%] lg:w-[80%] md:h-[58vh] drop-shadow-md/20 mt-4 aspect-auto">
                    <Image
                        src={zdj1}
                        alt="Widok na budynek liceum"
                        fill
                        className="object-cover rounded-2xl brightness-70"
                        priority
                    />
                </div>
                <div className="flex w-[94%] sm:w-[90%] lg:w-[80%] h-full justify-center items-center py-5 rounded-b-2xl">
                    <ButtonsBanner />
                </div>

            </div>
        </>
    );
}
