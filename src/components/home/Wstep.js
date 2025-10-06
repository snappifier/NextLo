"use client"
import { motion } from "motion/react";
import {useInViewOnce} from "@/app/lib/useInViewOnce";
import {getStrapiMedia} from "@/app/lib/strapi";
import Image from "next/image";
import janZamoyski from "src/images/janZamoyski.jpg"

export default function Wstep({data}) {
    const { ref, inView } = useInViewOnce();
    const container = {
        hidden: { opacity: 0, y: 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], when: "beforeChildren", staggerChildren: 0.04 },
        },
    };
    const item = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <div className="font-[poppins] flex relative w-full justify-center">
            <motion.section
                ref={ref}
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="
          w-[94%] sm:w-[90%] lg:w-[80%]
          bg-white rounded-2xl ring-1 ring-slate-200 drop-shadow-xl/20
          px-6 py-6 md:px-10 md:py-8
          flex flex-col md:flex-row items-stretch gap-8 md:gap-10
        "
                style={{ willChange: "transform, opacity" }}
            >
                <div className="flex-1 min-w-0">
                    <motion.div variants={item} className="flex flex-col w-max">
                        <p className="text-base md:text-lg lg:text-xl font-normal text-slate-900">KRÓTKO O SZKOLE</p>
                        <p className="text-base md:text-lg font-extralight text-slate-700">{data["Podpis"]}</p>
                    </motion.div>

                    <div className="mt-6 md:mt-8 flex flex-col gap-6 md:gap-8">
                        <motion.p variants={item} className="font-[meow_script] text-4xl md:text-5xl lg:text-6xl leading-tight">
                            {data["Naglowek"]}
                        </motion.p>
                        <motion.p variants={item} className="font-light text-balance text-base md:text-lg lg:text-xl text-slate-800">
                            {data["Opis"]}
                        </motion.p>
                    </div>
                </div>

                {data?.["Zdjecie"] && <motion.div
                    variants={item}
                    className="h-full w-max flex items-center justify-center rounded-2xl"
                >
                    <Image
                        src={janZamoyski}
                        alt="Jan Zamoyski "
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[420px] md:max-h-[480px] object-contain rounded-2xl"
                        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 40vw"
                    />
                </motion.div>}
            </motion.section>
        </div>
    );
}
