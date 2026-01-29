import { strapiFetch } from "@/app/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react"
import PhotosClient from "@/app/galeria/[slug]/[id]/PhotosClient";

async function getWydarzenieById(id) {
    const json = await strapiFetch({
        endpoint: "/api/galeria",
        query: {
            populate: {
                Zakladki: {
                    filters: {
                        Wydarzenia: {
                            id: { $eq: id }
                        }
                    },
                    populate: {
                        Wydarzenia: {
                            populate: "*",
                            filters: { id: { $eq: id } }
                        }
                    },
                }
            }
        }
    });

    const payload = json?.data ?? null;
    if (!payload) return null;

    const zakladki = Array.isArray(payload)
        ? payload.flatMap(p => p?.Zakladki ?? p?.attributes?.Zakladki ?? [])
        : payload?.Zakladki ?? payload?.attributes?.Zakladki ?? [];

    for (const zakladka of zakladki) {
        const wydarzenia = zakladka?.Wydarzenia ?? [];
        const wydarzenie = wydarzenia.find(w => w.id === parseInt(id));

        if (wydarzenie) {
            return {
                wydarzenie: wydarzenie,
                tytulZakladki: zakladka?.Tytul
            };
        }
    }

    return null;
}

export const revalidate = 300;

export default async function Page({ params }) {
    const resolvedParams = await params;

    const id = Array.isArray(resolvedParams?.id) ? resolvedParams.id[0] : resolvedParams?.id;
    if (!id) return notFound();

    const result = await getWydarzenieById(id);

    if (!result) {
        return notFound();
    }

    const { wydarzenie, tytulZakladki } = result;

    const dbTitle = tytulZakladki.replace('/', '-');

    const date = wydarzenie?.TytulWydarzenia.substring(0, 10) || ``
    const title = wydarzenie?.TytulWydarzenia.substring(11, wydarzenie.TytulWydarzenia.length) || `Wydarzenie ${wydarzenie.id}`
    return (
        <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col gap-6 md:gap-8">
	            <Link href={`/galeria/${dbTitle}`} className="w-max group">
		            <p className="text-slate-500 hover:text-slate-800 transition-colors duration-200 flex items-center gap-2">
			            <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:-translate-x-1" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"></path></svg>
			            Wróć do {tytulZakladki}
		            </p>
	            </Link>
                <div className="w-full flex flex-col items-center text-wrap gap-3 text-[#3077BA]">
                    <p className="w-full text-sm sm:text-base lg:text-lg font-medium uppercase text-center tracking-wide">
                        Galeria
                    </p>
                    <div className="flex flex-col items-center gap-1">
                        <p className="w-full text-lg sm:text-xl lg:text-2xl font-normal uppercase text-center">
                            {date}
                        </p>
                        <p className="w-full text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase text-center leading-tight">
                            {title}
                        </p>
                    </div>
                    <div className="pt-1 w-1/3 h-1 bg-[#3077BA] rounded-2xl"/>
                </div>
                {wydarzenie?.Zdjecia && wydarzenie.Zdjecia.length > 0 && (
                    <PhotosClient photos={wydarzenie.Zdjecia} />
                )}
            </div>
        </div>
    );
}