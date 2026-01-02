'use client'

import { getStrapiMedia } from "@/app/lib/strapi";
import Image from "next/image";
import Link from "next/link";



export const clampText = (txt, n = 215) =>
    typeof txt === "string" && txt.length > n ? txt.substring(0, n) + "…" : txt;

export const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/(<([^>]+)>)/gi, "");
};

export const formatPLDate = (d) => new Date(d).toLocaleDateString("pl-PL");

export function NewsCard({ news, featured = false }) {
    const imgSrc = news?.["ZdjecieGlowne"] ? getStrapiMedia(news["ZdjecieGlowne"].url) : "";
    const slug = news.slug;

    if (featured) {
        return (
            <Link href={`/aktualnosci/${slug}`} prefetch={true} className="block h-full">
                <div className="group relative w-full h-full rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 active:scale-[0.98] transition-transform duration-300">
                    {imgSrc && (
                        <>
                        <div className="absolute inset-0">
                            <Image src={imgSrc} alt={news?.Tytul ?? "Zdjęcie aktualności"} fill className="object-cover object-center" priority/>
                        </div>
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/80 to-slate-900/50"/>
                        </>
                    )}
                    <div className="absolute inset-0 bg-linear-to-tr from-sky-900 via-sky-900/60 to-sky-900/40 -z-10"/>
                    <div className="absolute inset-0 bg-linear-to-tr from-sky-900 via-sky-900/60 to-sky-900/40 -z-10"/>
                    <div className="absolute inset-0 bg-linear-to-tr from-sky-900 via-sky-900/60 to-sky-900/40 -z-10"/>
                    <div className="relative z-10 w-full h-full flex flex-col justify-between p-5 md:p-6 lg:p-8">
                        <div className="">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-red-500/30 select-none">
                                <span className="size-1.5 rounded-full bg-white animate-pulse"/>
                                Najnowsze
                            </span>
                        </div>
                        <div className="flex flex-col gap-3 mt-auto">
                            <div className="flex items-center gap-2 text-xs text-gray-300 select-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M18.438 4.954H16.5V3.546c0-.262-.23-.512-.5-.5a.51.51 0 0 0-.5.5v1.408h-7V3.546c0-.262-.23-.512-.5-.5a.51.51 0 0 0-.5.5v1.408H5.562a2.503 2.503 0 0 0-2.5 2.5v11c0 1.379 1.122 2.5 2.5 2.5h12.875c1.379 0 2.5-1.121 2.5-2.5v-11a2.5 2.5 0 0 0-2.499-2.5m-12.876 1H7.5v.592c0 .262.23.512.5.5c.271-.012.5-.22.5-.5v-.592h7v.592c0 .262.23.512.5.5c.271-.012.5-.22.5-.5v-.592h1.937c.827 0 1.5.673 1.5 1.5v1.584H4.062V7.454c0-.827.673-1.5 1.5-1.5m12.876 14H5.562c-.827 0-1.5-.673-1.5-1.5v-8.416h15.875v8.416a1.5 1.5 0 0 1-1.499 1.5"></path></svg>
                                <span>{formatPLDate(news["Data"])}</span>
                                <span>•</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8M6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8m2 10a3 3 0 0 0-3 3a1 1 0 1 1-2 0a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5a1 1 0 1 1-2 0a3 3 0 0 0-3-3z"></path></svg>
                                <span>{news["Autor"]}</span>
                            </div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-tight select-none">{clampText(stripHtml(news["Tytul"]), 120)}</h3>
                            <p className="text-sm md:text-base text-gray-300 line-clamp-2 select-none">{clampText(stripHtml(news["Opis"]), 150)}</p>
                            <div className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 pt-2 select-none px-4 py-2 -ml-4 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                                <span>Czytaj dalej</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <Link href={`/aktualnosci/${slug}`} prefetch={true} className="block h-full">
            <div className="group w-full h-full bg-white rounded-xl overflow-hidden cursor-pointer border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-300 active:scale-[0.98] transition-all duration-300 will-change-transform" style={{transform: 'translateZ(0)'}}>
                <div className="w-full h-full flex flex-col px-5 py-4 gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 select-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M18.438 4.954H16.5V3.546c0-.262-.23-.512-.5-.5a.51.51 0 0 0-.5.5v1.408h-7V3.546c0-.262-.23-.512-.5-.5a.51.51 0 0 0-.5.5v1.408H5.562a2.503 2.503 0 0 0-2.5 2.5v11c0 1.379 1.122 2.5 2.5 2.5h12.875c1.379 0 2.5-1.121 2.5-2.5v-11a2.5 2.5 0 0 0-2.499-2.5m-12.876 1H7.5v.592c0 .262.23.512.5.5c.271-.012.5-.22.5-.5v-.592h7v.592c0 .262.23.512.5.5c.271-.012.5-.22.5-.5v-.592h1.937c.827 0 1.5.673 1.5 1.5v1.584H4.062V7.454c0-.827.673-1.5 1.5-1.5m12.876 14H5.562c-.827 0-1.5-.673-1.5-1.5v-8.416h15.875v8.416a1.5 1.5 0 0 1-1.499 1.5"></path></svg>
                        <span>{formatPLDate(news["Data"])}</span>
                        <span>•</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8M6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8m2 10a3 3 0 0 0-3 3a1 1 0 1 1-2 0a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5a1 1 0 1 1-2 0a3 3 0 0 0-3-3z"></path></svg>
                        <span>{news["Autor"]}</span>
                    </div>
                    <h4 className="font-semibold text-base md:text-lg text-slate-900 leading-tight group-hover:text-slate-700 transition-colors duration-300 line-clamp-2 select-none">{clampText(stripHtml(news["Tytul"]), 80)}</h4>
                    <p className="text-sm text-slate-600 line-clamp-2 grow select-none">{clampText(stripHtml(news["Opis"]), 100)}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 mt-auto pt-2 group-hover:text-sky-700 transition-colors duration-300 select-none">
                        <span>Czytaj dalej</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"></path></svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function SeeMoreCard() {
    return(
        <Link href="/aktualnosci" className="block h-full" prefetch={true}>
            <div className="group w-full h-full min-h-45 bg-linear-to-br from-sky-50 to-slate-50 rounded-xl overflow-hidden cursor-pointer border border-slate-200 flex flex-col items-center justify-center gap-4 hover:border-sky-300 hover:shadow-xl hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 will-change-transform" style={{transform: 'translateZ(0)'}}>
                <div className="w-16 h-16 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width={13.08} height={20} viewBox="0 0 1088 1664"><g transform="translate(1088 0) scale(-1 1)"><path fill="currentColor" d="M1043 301L512 832l531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19L45 877q-19-19-19-45t19-45L787 45q19-19 45-19t45 19l166 166q19 19 19 45t-19 45"></path></g></svg>                </div>
                <div className="flex flex-col items-center gap-1 text-center px-4 select-none">
                    <span className="text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors duration-300">Zobacz wszystkie</span>
                </div>
            </div>
        </Link>
    )
}