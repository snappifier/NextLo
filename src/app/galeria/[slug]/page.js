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
	                <div className="flex flex-col gap-4">
		                <Link href="/galeria" className="w-max group">
			                <p className="text-slate-500 hover:text-slate-800 transition-colors duration-200 flex items-center gap-2">
				                <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:-translate-x-1" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"></path></svg>
				                Wróć do galerii
			                </p>
		                </Link>
		                <p className="text-slate-600">Brak wydarzeń dla tego rocznika.</p>
	                </div>
                ) : (
	                <div className="flex flex-col gap-6 md:gap-8">
		                <Link href="/galeria" className="w-max group">
			                <p className="text-slate-500 hover:text-slate-800 transition-colors duration-200 flex items-center gap-2">
				                <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:-translate-x-1" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"></path></svg>
				                Wróć do galerii
			                </p>
		                </Link>

                        <div className="w-full flex flex-col items-center text-wrap gap-3 text-[#3077BA]">
                            <p className="w-full text-sm sm:text-base lg:text-lg font-medium uppercase text-center tracking-wide">
                                Galeria
                            </p>
                            <p className="w-full text-3xl sm:text-4xl lg:text-5xl  font-semibold text-center uppercase">
                                {year}
                            </p>
                            <div className="pt-1 w-1/3 h-1 bg-[#3077BA] rounded-2xl"/>
                        </div>

                        <div className={`w-full gap-5 md:gap-8 grid auto-rows-fr ${
                            wydarzenia.length === 1
                                ? "grid-cols-1 max-w-md mx-auto"
                                : wydarzenia.length === 2
                                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                                    : "w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        }`}>
                            {wydarzenia.toReversed().map((ev) => {
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