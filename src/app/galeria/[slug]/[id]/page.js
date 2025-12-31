import { getStrapiMedia, strapiFetch } from "@/app/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import Photo from "@/app/galeria/[slug]/[id]/photo";

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

export default async function Page({ params }) {
    const resolvedParams = await params;

    const id = Array.isArray(resolvedParams?.id) ? resolvedParams.id[0] : resolvedParams?.id;
    if (!id) return notFound();

    const result = await getWydarzenieById(id);

    if (!result) {
        return notFound();
    }

    const { wydarzenie, tytulZakladki } = result;

    return (
        <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col gap-8">
                <div className="absolute w-max flex justify-start">
                    <Link
                        href={`/galeria/${tytulZakladki}`}
                        className="text-blue-600 hover:underline inline-flex items-center gap-2"
                    >
                        ← Powrót do {tytulZakladki}
                    </Link>
                </div>
                <div className="w-full flex flex-col items-center mb-4 sm:mb-2 text-wrap gap-2 text-[#3077BA]">
                    <p className="w-full text-3xl sm:text-4xl lg:text-xl font-medium uppercase text-center">
                        Galeria
                    </p>
                    <p className="w-full text-3xl sm:text-4xl lg:text-6xl font-semibold uppercase text-center uppercase">
                        {wydarzenie?.TytulWydarzenia || `Wydarzenie ${wydarzenie.id}`}
                    </p>
                    <div className="w-1/3 h-1 bg-[#3077BA] rounded-2xl"></div>
                </div>
                {wydarzenie?.Zdjecia && wydarzenie.Zdjecia.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                        {wydarzenie.Zdjecia.map((zdjecie) => (
                            <Photo key={zdjecie.id} url={getStrapiMedia(zdjecie.url)} alttext={wydarzenie.TytulWydarzenia} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}