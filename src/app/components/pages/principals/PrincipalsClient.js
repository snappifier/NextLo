"use client"
import {motion} from "motion/react";
import {getStrapiMedia} from "@/app/lib/strapi";

const Principals = ({data}) => {

    const FALLBACK_IMG =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjYTdhN2E3IiBkPSJNMTIgMTJxLTEuNjUgMC0yLjgyNS0xLjE3NVQ4IDh0MS4xNzUtMi44MjVUMTIgNHQyLjgyNSAxLjE3NVQxNiA4dC0xLjE3NSAyLjgyNVQxMiAxMm0tOCA4di0yLjhxMC0uODUuNDM4LTEuNTYyVDUuNiAxNC41NXExLjU1LS43NzUgMy4xNS0xLjE2MlQxMiAxM3QzLjI1LjM4OHQzLjE1IDEuMTYycS43MjUuMzc1IDEuMTYzIDEuMDg4VDIwIDE3LjJWMjB6Ii8+PC9zdmc+";

    const principalsData = data["Szablon"];
    if (!principalsData) return null;
    const principals = principalsData["Dyrektorzy"];
    const title = principalsData["Naglowek"];

    return (<>
        <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] grid grid-cols-1 gap-6 md:gap-8">
                <main>
                    <div className="w-full flex flex-col mb-4 sm:mb-6">
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight w-max">
                            {title}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {principals.map((principal) => (
                            <motion.div
                                key={principal.id}
                                className="bg-white w-full rounded-lg overflow-hidden shadow-sm ring-1 ring-black/5"
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                            >
                                <div className="w-full aspect-square">
                                    <img
                                        src={principal?.["Zdjecie"] ? getStrapiMedia(principal["Zdjecie"].url) : FALLBACK_IMG}
                                        alt={`Zdjecie-${principal["ImieNazwisko"]}`}
                                        className="w-full h-full object-cover object-top"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col p-3 sm:p-4">
                                    <h4 className="text-slate-900 text-base sm:text-[15px] font-poppins font-medium leading-tight pb-0.5">{principal["ImieNazwisko"]}</h4>
                                    {principal["Daty"].map((data) => (
                                        <p key={data.id} className="text-slate-600 text-sm mt-1 font-poppins">
                                            {data["Rok_poczatek"] + " - " + (data?.["Rok_koniec"] ? data["Rok_koniec"] : "Aktualnie")}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>
        </div>

    </>)
}

export default Principals;