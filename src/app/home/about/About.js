import {getStrapiMedia} from "@/app/lib/strapi";
import ImageSkeletonLoader from "@/app/components/animations/ImageSkeletonLoader";

export default function About({data, index}) {
    return (
        <div className="font-poppins flex relative w-full justify-center">
            <section className="w-full h-max px-6 py-6 md:px-10 md:py-8 flex flex-col lg:flex-row gap-6 md:gap-10 bg-white rounded-2xl shadow-lg/20">
                <div className="flex-1 min-w-0 w-full">
                    <div className="flex w-full gap-4 items-center">
                        <div className="flex flex-col justify-center">
                            <p className="text-5xl md:text-6xl lg:text-6xl font-semibold leading-none text-slate-500">{index}</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <p className="text-base md:text-lg lg:text-xl font-semibold text-slate-900 leading-tight">KRÓTKO O SZKOLE</p>
                            <p className="text-sm md:text-base lg:text-lg font-extralight text-slate-700">{data["Podpis"]}</p>
                        </div>
                    </div>

                    <div className="mt-6 md:mt-8 flex flex-col gap-6 md:gap-8 w-full">
                        <p className="font-[meow_script] text-6xl md:text-5xl lg:text-7xl leading-tight">
                            {data["Naglowek"]}
                        </p>
                        <p className="max-w-sm sm:max-w-md md:max-w-2xl font-light text-balance text-base md:text-lg lg:text-xl text-slate-800">
                            {data["Opis"]}
                        </p>
                    </div>
                </div>

                {data?.["Zdjecie"] && (
                    <div className="relative w-full max-w-105 h-110 aspect-auto md:h-120 shrink-0 rounded-2xl overflow-hidden">
                        <ImageSkeletonLoader src={getStrapiMedia(data["Zdjecie"].url)} alt={data["Naglowek"] || "Zdjecie"} className="object-cover object-top select-none pointer-events-none" />
                    </div>
                )}
            </section>
        </div>
    );
}
