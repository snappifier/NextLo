// app/galeria/[slug]/page.jsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { strapiFetch } from "@/app/lib/strapi";
import ButtonAnimation from "@/app/galeria/ButtonAnimation";

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

export default async function Page({ params }) {
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    if (!slug) return notFound();

    const year = slug;

    // pobieramy TU i TERAZ tylko gdy wejdziemy na /galeria/2025
    const zakladka = await getZakladkaByYear(year);

    console.log(zakladka);

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
			                className="text-blue-600 hover:underline inline-flex items-center gap-2 pb-7"
		                >
			                ← Powrót
		                </Link>
                    <p>Brak wydarzeń dla tego rocznika.</p>
									</div>
                ) : (
                    <div className="flex flex-col gap-8">
                        <Link
                            href={`/galeria`}
                            className="text-blue-600 hover:underline inline-flex items-center gap-2"
                        >
                            ← Powrót
                        </Link>
	                    <div className="flex flex-col items-center">
		                    <div className="w-full  h-max flex flex-col-reverse items-center justify-start gap-2">
                                {wydarzenia.map((ev) => {
                                    const id = ev.id
                                    return (
																			<Link key={id} className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5" href={`/galeria/${year}/${id}`}>
																				{/*{ev?.TytulWydarzenia || `Wydarzenie ${ev.id}`}*/}
																				<ButtonAnimation title={ev?.TytulWydarzenia || `Wydarzenie ${ev.id}`}/>
																			</Link>


                                    );
                                })}

	                      </div>
	                    </div>
                    </div>









                )}
            </div>
        </div>
    );
}
