import {getStrapiMedia} from "@/app/lib/strapi";
import ImageSkeletonLoader from "@/app/components/animations/ImageSkeletonLoader";

export default function About({data}) {
    return (
        <div className="font-poppins flex relative w-full justify-center ">
            <section className="px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row items-stretch gap-6 md:gap-10 bg-white rounded-2xl shadow-lg/20">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col w-max">
                        <p className="text-base md:text-lg lg:text-xl font-normal text-slate-900">KRÓTKO O SZKOLE</p>
                        <p className="text-base md:text-lg font-extralight text-slate-700">{data["Podpis"]}</p>
                    </div>

                    <div className="mt-6 md:mt-8 flex flex-col gap-6 md:gap-8">
                        <p className="font-[meow_script] text-4xl md:text-5xl lg:text-6xl leading-tight">
                            {data["Naglowek"]}
                        </p>
                        <p className="font-light text-balance text-base md:text-lg lg:text-xl text-slate-800">
                            {data["Opis"]}
                        </p>
                    </div>
                </div>

                {data?.["Zdjecie"] && (
                    <div className="relative w-full max-w-105 h-110 aspect-auto md:h-120 shrink-0 rounded-2xl overflow-hidden">
                        {/*<Image*/}
                        {/*    src={getStrapiMedia(data["Zdjecie"].url)}*/}
                        {/*    alt={data["Naglowek"] || "Zdjęcie"}*/}
                        {/*    fill*/}
                        {/*    loading="lazy"*/}
                        {/*    decoding="async"*/}
                        {/*    className="object-cover object-top"*/}
                        {/*    priority={false}*/}
                        {/*/>*/}
                        <ImageSkeletonLoader src={getStrapiMedia(data["Zdjecie"].url)} alt={data["Naglowek"] || "Zdjecie"} className="object-cover object-top select-none pointer-events-none" />
                    </div>
                )}
            </section>
        </div>
    );
}
