import {getStrapiMedia, strapiFetch} from "@/app/lib/strapi";
import {notFound} from "next/navigation";
import Link from "next/link";
import React from "react";
import Photo from "@/app/galeria/[slug]/[id]/photo";

async function getWydarzenieById(id) {
    const json = await strapiFetch({
        endpoint: "/api/galeria",
        query: {
            populate: {
                Zakladki: {
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

    // Obsługa zarówno tablicy jak i pojedynczego obiektu
    const zakladki = Array.isArray(payload)
        ? payload.flatMap(p => p?.Zakladki ?? p?.attributes?.Zakladki ?? [])
        : payload?.Zakladki ?? payload?.attributes?.Zakladki ?? [];

    // Szukamy zakładki zawierającej nasze wydarzenie
    let znalezioneWydarzenie = null;
    let tytulZakladki = null;

    for (const zakladka of zakladki) {
        const wydarzenia = zakladka?.Wydarzenia ?? [];
        const wydarzenie = wydarzenia.find(w => w.id === parseInt(id));

        if (wydarzenie) {
            znalezioneWydarzenie = wydarzenie;
            tytulZakladki = zakladka?.Tytul;
            break;
        }
    }

    if (!znalezioneWydarzenie) return null;

    return {
        wydarzenie: znalezioneWydarzenie,
        tytulZakladki
    };
}

export default async function Page({ params }) {
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    if (!id) return notFound();

    const result = await getWydarzenieById(id);

    if (!result) {
        return notFound();
    }

    const { wydarzenie, tytulZakladki } = result;

    return (
        <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col gap-5">
                <div className="w-max h-max flex font-light">
                    <Link
                        href={`/galeria/${tytulZakladki}`}
                        className="text-blue-600 hover:underline inline-flex items-center gap-2"
                    >
                        ← Powrót do {tytulZakladki}
                    </Link>
                </div>
                <div className="w-full h-max">
                    <h1 className="w-full text-3xl font-bold whitespace-normal break-words leading-tight">
                        {wydarzenie?.TytulWydarzenia || `Wydarzenie ${wydarzenie.id}`}
                    </h1>
                </div>

                {wydarzenie?.Zdjecia && wydarzenie.Zdjecia.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                        {wydarzenie.Zdjecia.map((zdjecie) => (
                            // <div key={zdjecie.id} className="relative aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
                            //     <img
                            //         src={getStrapiMedia(zdjecie.url)}
                            //         alt={wydarzenie.TytulWydarzenia}
                            //         className="w-full h-full object-cover "
                            //     />
                            // </div>
	                        <Photo key={zdjecie.id} url={getStrapiMedia(zdjecie.url)} alttext={wydarzenie.TytulWydarzenia} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}