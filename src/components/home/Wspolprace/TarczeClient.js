"use client"

import { motion } from "motion/react"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"

import Wspolprace from "@/components/home/Wspolprace/Wspolprace";
import {getStrapiMedia} from "@/app/lib/strapi";

export default function TarczeClient({data}) {
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

    const [currentIndex, setCurrentIndex] = useState(0)
    const [displayedImages, setDisplayedImages] = useState(shieldImages)

    // Efekt dla karuzeli
    useEffect(() => {
        if (displayedImages.length === 0) return

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % displayedImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [displayedImages.length])

    // Efekt dla responsywności - ODDZIELONY
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth

            if (width < 640) {
                setDisplayedImages(shieldImages.slice(-3))
            } else if (width < 768) {
                setDisplayedImages(shieldImages.slice(-4))
            } else if (width < 1024) {
                setDisplayedImages(shieldImages.slice(-5))
            } else {
                setDisplayedImages(shieldImages)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [shieldImages])

    if (shieldImages.length === 0) return null

    return (
        <div className="font-[poppins] mb-8 z-10 w-full flex pt-6 pb-6 bg-white rounded-2xl shadow-lg/20 overflow-hidden">
            <div className="w-full flex flex-col gap-4 items-center md:items-start">
                <div className="px-6 md:px-10 w-full flex flex-col">
                    <p className="text-base md:text-lg lg:text-xl font-normal text-slate-900">
                        OSIĄGNIĘCIA I WSPÓŁPRACE
                    </p>
                    <p className="text-sm md:text-base font-light text-slate-600">
                        Oto najważniejsze osiągnięcia oraz partnerzy naszego liceum.
                    </p>
                </div>

                <div className="flex justify-center gap-3 md:gap-4 lg:gap-6 items-center w-full px-4">
                    {displayedImages.map((src, index) => (
                        <Link
                            key={index}
                            href="https://2025.licea.perspektywy.pl/rankingi/ranking-lubelski"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 select-none"
                        >
                            <motion.div
                                initial={{ scale: 1, opacity: 0.6 }}
                                animate={{
                                    scale: index === currentIndex ? 1.2 : 1,
                                    opacity: index === currentIndex ? 1 : 0.65
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                                whileHover={{ scale: 1.15 }}
                                className="relative cursor-pointer"
                            >
                                <Image
                                    src={src}
                                    alt="Tarcza osiągnięcia"
                                    width={100}
                                    height={100}
                                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-md hover:drop-shadow-lg transition-shadow"
                                    priority={index === 0}
                                    quality={90}
                                />
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {logoImages.length > 0 && <Wspolprace data={logoImages} />}
            </div>
        </div>
    )
}