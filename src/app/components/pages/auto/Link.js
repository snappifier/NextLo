"use client";

import Link from "next/link";
import {getStrapiMedia} from "@/app/lib/strapi";
import {motion} from "motion/react";

const LinkSection = ({linkArray, hasContent}) => {
    return (<div className={`min-w-sx md:min-w-md lg:min-w-lg w-full flex flex-col gap-4  text-wrap bg-white ${hasContent ? "px-8 py-5 pb-8 rounded-br-xl rounded-bl-xl" : "p-8 rounded-xl"} shadow-lg`}>
        {linkArray.map((link) => (
            <Link
                key={link.id}
                href={link["Plik"]?.url ? getStrapiMedia(link["Plik"].url) : "#"}
                target="_blank"
                className="block w-full"
            >
                <motion.div
                    className="w-full cursor-pointer flex items-center gap-3"
                    whileHover={{scale: 1.012}}
                    transition={{type: "spring", stiffness: 260, damping: 24}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor"
                         className="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line">
                        <path d="M12 17V3"/>
                        <path d="m6 11 6 6 6-6"/>
                        <path d="M19 21H5"/>
                    </svg>

                    <p className="flex-1 min-w-0 text-xl md:text-lg lg:text-xl mt-1 font-poppins font-light text-slate-700 whitespace-normal break-words hyphens-auto">
                        {link["NazwaLinku"]}
                    </p>
                </motion.div>
            </Link>
        ))}
    </div>);
}

export default LinkSection;