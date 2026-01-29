"use client";
import {motion} from "motion/react";
import Link from "next/link";

export default function BannerButtons({przyciski}){
    return (<div className="relative grid grid-cols-2 grid-rows-2 md:flex w-full gap-3 md:gap-3 h-max drop-shadow-lg/10">
        {przyciski.map((item, index) => {
            const href = item["Link"] || "#"
            const isExternal = href.startsWith("http")
            return <Link key={item.id} href={href} className={`w-full ${index !== 4 ? "flex" : "hidden"} lg:block`} tabIndex={-1} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <motion.div
                    key={item.id}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-[#3077BA]/85 h-20 w-full drop-shadow-lg/30 rounded-lg flex flex-col md:gap-1 justify-center items-center text-white cursor-pointer focus-visible:outline-3 focus-visible:outline-sky-900 focus-visible:scale-105 transition-transform ease-out" tabIndex={0}>
                    <div className="h-8" dangerouslySetInnerHTML={{ __html: item["IconPath"] }} />
                    <p className="text-md/5 md:text-lg/5 text-center font-light select-none">{item["Nazwa"]}</p>
                </motion.div>
            </Link>
        })}
    </div>)
}