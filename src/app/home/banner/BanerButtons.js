"use client";
import {motion} from "motion/react";
import Link from "next/link";

export default function BannerButtons({przyciski}){
    return (<div className="relative grid grid-cols-2 grid-rows-2 md:flex w-[100%] gap-3 md:gap-5 h-max drop-shadow-lg/10">
        {przyciski.map((item, index) => {
            return <Link key={item.id} href={item["Link"]} className={`w-full ${index !== 4 ? "flex" : "hidden"} lg:block`}>
                <motion.div
                    key={item.id}
                    whileHover={{scale: 1.05}}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-[#3077BA]/85 h-20 w-full drop-shadow-lg/30 rounded-lg flex flex-col justify-center items-center text-white cursor-pointer">
                    <div className="h-8" dangerouslySetInnerHTML={{ __html: item["IconPath"] }} />
                    <p className="text-xl/5 text-center font-light select-none">{item["Nazwa"]}</p>
                </motion.div>
            </Link>
        })}
    </div>)
}