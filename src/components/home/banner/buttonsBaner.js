"use client";
import {motion} from "motion/react";
import Link from "next/link";

export default function ButtonsBanner(){
    return (<div className="relative grid grid-cols-2 grid-rows-2 md:flex w-[100%] gap-3 md:gap-5 h-max drop-shadow-lg/10">
        <motion.div
            whileHover={{scale: 1.05}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#3077BA]/85 h-20 w-full drop-shadow-lg/30 rounded-lg flex flex-col justify-center items-center text-white cursor-pointer text-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"/></svg>
            <p className="text-xl font-light select-none text-center" >Nauczyciela</p>
        </motion.div>
        <motion.div
            whileHover={{scale: 1.05}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#3077BA]/85 h-20 w-full drop-shadow-lg/30 rounded-lg flex flex-col justify-center items-center text-white cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M3 7V5h2V4a2 2 0 0 1 2-2h6v7l2.5-1.5L18 9V2h1c1.05 0 2 .95 2 2v16c0 1.05-.95 2-2 2H7c-1.05 0-2-.95-2-2v-1H3v-2h2v-4H3v-2h2V7zm4 4H5v2h2zm0-4V5H5v2zm0 12v-2H5v2z"/></svg>
            <p className="text-xl font-light select-none text-center">Vulcan</p>
        </motion.div>
        <motion.div
            whileHover={{scale: 1.05}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#3077BA]/85 h-20 w-full drop-shadow-lg/30 rounded-lg flex flex-col justify-center items-center text-white cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M21.5 5.134a1 1 0 0 1 .493.748L22 6v13a1 1 0 0 1-1.5.866A8 8 0 0 0 13 19.6V4.426a10 10 0 0 1 8.5.708M11 4.427l.001 15.174a8 8 0 0 0-7.234.117l-.327.18l-.103.044l-.049.016l-.11.026l-.061.01L3 20h-.042l-.11-.012l-.077-.014l-.108-.032l-.126-.056l-.095-.056l-.089-.067l-.06-.056l-.073-.082l-.064-.089l-.022-.036l-.032-.06l-.044-.103l-.016-.049l-.026-.11l-.01-.061l-.004-.049L2 6a1 1 0 0 1 .5-.866a10 10 0 0 1 8.5-.707"/></svg>
            <p className="text-xl font-light select-none">Matura 2026</p>
        </motion.div>
        <motion.div
            whileHover={{scale: 1.05}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#3077BA]/85 h-20 w-full drop-shadow-lg/30 rounded-lg flex flex-col justify-center items-center text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M21 17v-6.9L12 15L1 9l11-6l11 6v8zm-9 4l-7-3.8v-5l7 3.8l7-3.8v5z"/></svg>
            <p className="text-xl font-light select-none">Rekrutacja</p>
        </motion.div>
        <Link href={"/"} className="w-full hidden lg:block">
            <motion.div
                whileHover={{scale: 1.05}}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="hidden bg-[#3077BA]/85 h-20 w-full drop-shadow-lg/30 rounded-lg lg:flex flex-col justify-center items-center text-white cursor-pointer">
	            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"><path fill="currentColor" d="M22.575 9.147L14.769 1.34l-1.832 3.343A7 7 0 0 1 9.216 7.89L4.24 9.721l-1.193 9.816l7.955-7.956l1.414 1.415l-7.954 7.954l9.815-1.194l1.838-5.035a7 7 0 0 1 3.133-3.694z"></path></svg>
	            <p className="text-xl font-light select-none">Aktualności</p>
            </motion.div>
        </Link>
    </div>)
}