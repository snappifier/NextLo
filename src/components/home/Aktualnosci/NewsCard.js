"use client"
import { motion } from "motion/react";
import { getStrapiMedia } from "@/app/lib/strapi";
import Image from "next/image";
import Link from "next/link";

const Arrow = () => (
    <svg
        viewBox="0 0 24 24"
        className="size-4"
    >
        <path d="M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 12H4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
);

export const clampText = (txt, n = 215) =>
    typeof txt === "string" && txt.length > n ? txt.substring(0, n) + "…" : txt;

export const formatPLDate = (d) => new Date(d).toLocaleDateString("pl-PL");

export function NewsCard({ news, onClick, featured = false }) {
    const imgSrc = news?.["ZdjecieGlowne"] ? getStrapiMedia(news["ZdjecieGlowne"].url) : "";
    const documentId = news.documentId;

    return (
        <Link href={`/aktualnosci/${documentId}`} >
            <motion.button
                type="button"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.985 }}
                className={`group relative w-full h-full text-left cursor-pointer rounded-xl overflow-hidden bg-white ring-1 ring-slate-200 shadow-[0_2px_10px_-3px_rgba(14,14,14,0.25)] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 motion-safe:hover:shadow-[0_14px_30px_-10px_rgba(14,14,14,0.35)] ${featured ? "row-span-2" : ""}`}
                aria-label={news["Tytul"]}
                onClick={onClick}
            >
          <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(1200px_300px_at_50%_-20%,rgba(56,189,248,0.18),transparent)] transition-opacity duration-200 group-hover:opacity-100"
          />

                {featured ? (
                    <div className="w-full h-full flex flex-col gap-3 px-5 py-4">
                        <div className="w-full flex md:justify-end">
                <span className="w-max inline-flex items-center rounded-md bg-red-500/15 px-3 py-1.5 text-xs font-medium text-red-500">
                  Najnowszy post
                </span>
                        </div>

                        <div className="w-full h-full relative flex justify-center overflow-hidden rounded-lg">
                            {imgSrc ? (
                                <Image
                                    src={imgSrc}
                                    alt={news?.Tytul ?? "Zdjęcie aktualności"}
                                    fill
                                    className="md:block hidden object-cover object-center"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                />
                            ) : null}
                        </div>

                        <div className="w-full h-full flex flex-col gap-2 px-1 pb-2">
                            <div className="flex flex-col gap-1">
                  <span className="text-xs font-light block text-slate-600">
                    {formatPLDate(news["Data"])} • {news["Autor"]}
                  </span>
                                <p className="font-semibold text-lg text-slate-900">{news["Tytul"]}</p>
                            </div>

                            <div className="text-sm w-full h-full font-light flex flex-col justify-between gap-2 text-slate-700">
                                <p className="line-clamp-3">{clampText(news["Opis"], 215)}</p>
                                <div className="inline-flex items-center gap-2 text-sm text-sky-700">
                                    Czytaj dalej
                                    <Arrow/>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full bg-white flex flex-col px-5 py-4 gap-2">
                        <div className="flex flex-col gap-1">
                <span className="text-xs font-light block text-slate-600">
                  {formatPLDate(news["Data"])} • {news["Autor"]}
                </span>
                            <p className="font-medium text-lg text-slate-900">{news["Tytul"]}</p>
                        </div>

                        <div className="text-sm w-full h-full font-light flex flex-col justify-between gap-2 text-slate-700">
                            <p className="line-clamp-3">{clampText(news["Opis"], 215)}</p>
                            <div className="inline-flex items-center gap-2 text-sm text-sky-700">
                                Czytaj dalej
                                <Arrow/>
                            </div>
                        </div>
                    </div>
                )}
            </motion.button>
        </Link>
    );
}

export default Arrow;
