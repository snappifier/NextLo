"use client"
import {useMemo} from "react";
import {getStrapiMedia} from "@/app/lib/strapi";
import ImageSkeletonLoader from "@/app/components/animations/ImageSkeletonLoader";

export default function ShieldsNew({data}) {
    const shieldImages = useMemo(() =>
            Array.isArray(data["Tarcze"])
                ? data["Tarcze"]
                    .map((item) => item["Zdjecie"]?.url ? getStrapiMedia(item["Zdjecie"].url) : null)
                    .filter(Boolean)
                : [],
        [data["Tarcze"]]
    );

    const logoImages = useMemo(() =>
            Array.isArray(data["Wspolprace"])
                ? data["Wspolprace"]
                    .map((item) => item["Zdjecie"]?.url ? getStrapiMedia(item["Zdjecie"].url) : null)
                    .filter(Boolean)
                : [],
        [data["Wspolprace"]]
    );

    return (
        <div className="w-full h-auto bg-white rounded-2xl shadow-lg/20 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-center">
                <div className="flex-1 lg:min-w-0 flex flex-col text-center items-center gap-3 px-4 py-6 sm:px-6 sm:py-8">
                    <div className="relative w-full max-w-[200px] h-48 sm:h-56">
                        <ImageSkeletonLoader
                            src={shieldImages[0]}
                            alt={"Tarcza Persektywy"}
                            fill
                            rounded="rounded-lg"
                            className="object-contain rounded-lg"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="w-full max-w-md flex flex-col gap-1.5">
                        <p className="font-bold uppercase text-base sm:text-lg md:text-xl lg:text-2xl">NAJLEPSZE LICEUM W ZAMOŚCIU</p>
                        <p className="font-normal text-xs sm:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed tempor orci, nec aliquam sem.</p>
                    </div>
                </div>

                <div className="w-full flex-1 lg:min-w-0 flex flex-col text-center items-center gap-3 px-4 py-6 sm:px-6 sm:py-8 bg-gray-50">
                    <div className="w-full flex flex-col gap-3">
                        <p className="font-normal uppercase text-sm sm:text-base">WSPÓŁPRACUJEMY Z NAJLEPSZYMI</p>
                        <div className="grid grid-cols-3 gap-2 w-full max-w-lg mx-auto">
                            {logoImages.slice(0, 6).map((item, index) => (
                                <div key={`logo-${index}`} className="relative w-full aspect-square bg-white rounded-lg border border-gray-100 shadow-sm p-1.5">
                                    <ImageSkeletonLoader
                                        src={item}
                                        alt={`Logo współpracy ${index + 1}`}
                                        fill
                                        rounded="rounded-md"
                                        className="object-contain p-0.5"
                                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 15vw"
                                    />
                                </div>
                            ))}
                            {logoImages.slice(0, 6).map((item, index) => (
                                <div key={`logo-${index}`} className="relative w-full aspect-square bg-white rounded-lg border border-gray-100 shadow-sm p-1.5">
                                    <ImageSkeletonLoader
                                        src={item}
                                        alt={`Logo współpracy ${index + 1}`}
                                        fill
                                        rounded="rounded-md"
                                        className="object-contain p-0.5"
                                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 15vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}