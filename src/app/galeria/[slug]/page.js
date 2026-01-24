import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { strapiFetch } from "@/app/lib/strapi";
import ButtonInYear from "@/app/galeria/[slug]/ButtonInYear";

async function getZakladkaByYear(year) {
    const json = await strapiFetch({
        endpoint: "/api/galeria",
        query: {
            populate: {
                Zakladki: {
                    populate: "*",
                    filters: { Tytul: { $eq: year } }
                }
            }
        }
    });

    const payload = json?.data ?? json?.data?.attributes ?? null;

    if (!payload) return null;

    const zakladki =
        Array.isArray(payload)
            ?
            payload.flatMap(p => p?.Zakladki || p?.attributes?.Zakladki || [])
            : payload?.Zakladki || payload?.attributes?.Zakladki || [];

    if (!Array.isArray(zakladki) || zakladki.length === 0) return null;

    return zakladki[0];
}

export const revalidate = 300;

export default async function Page({ params }) {
    const resolvedParams = await params;

    const rawSlug = resolvedParams.slug;

    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

    if (!slug) return notFound();

    const year = slug.replace('-', '/');
    const dbYear = slug;

    const zakladka = await getZakladkaByYear(year);

    if (!zakladka) {
        return notFound();
    }

    const wydarzenia = Array.isArray(zakladka.Wydarzenia) ? zakladka.Wydarzenia : [];

    return (
        <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%]">
                {wydarzenia.length === 0 ? (
                    <div>
                        <Link
                            href={`/galeria`}
                            className="text-blue-600 hover:underline inline-flex items-center gap-2"
                        >
                            ← Powrót
                        </Link>
                        <p className="mt-4">Brak wydarzeń dla tego rocznika.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5 md:gap-8">
                        <div className="absolute w-max flex justify-start">
                            <Link
                                href={`/galeria`}
                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors inline-flex items-center gap-2"
                            >
                                ← Powrót
                            </Link>
                        </div>

                        <div className="w-full flex flex-col items-center mb-4 sm:mb-2 text-wrap gap-4 text-[#3077BA]">
                            <p className="w-full text-md sm:text-lg lg:text-xl font-medium uppercase text-center">
                                Galeria
                            </p>
                            <p className="w-full text-3xl sm:text-4xl lg:text-5xl  font-semibold text-center uppercase">
                                {year}
                            </p>
                            <div className="pt-1 w-1/3 h-1 bg-[#3077BA] rounded-2xl"></div>
                        </div>

                        <div className={`w-full gap-5 md:gap-8 ${
                            wydarzenia.length < 2
                                ? "flex justify-center"
                                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
                        }`}>
                            {wydarzenia.map((ev) => {
                                const id = ev.id
                                return (
                                    <Link key={id}
                                          className={`h-full w-full rounded-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-900 focus-visible:scale-103 transition-transform duration-200 ease-out ${wydarzenia.length < 2 ? 'max-w-md sm:max-w-lg' : ''}`}
                                          href={`/galeria/${dbYear}/${id}`}>
                                        <ButtonInYear title={ev?.TytulWydarzenia || `Wydarzenie ${ev.id}`} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}