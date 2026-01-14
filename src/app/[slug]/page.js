import { notFound } from "next/navigation";
import { strapiFetch } from "@/app/lib/strapi";
import { Suspense } from "react";
import Header from "@/app/components/pages/auto/Header";
import MainContent from "@/app/components/pages/auto/MainContent";
import Media from "@/app/components/pages/auto/Media";
import LinkSection from "@/app/components/pages/auto/Link";
import Tiles from "@/app/components/pages/tiles/Tiles";


export const revalidate = 60;

const attrs = (x) => (x?.attributes ?? x ?? {});

const slugify = (s = "") =>
	s.normalize("NFD").replace(/[\u0300-\u036f]/g, "" )
		.toLowerCase().trim()
		.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function getMenuItems() {
	const json = await strapiFetch({
		endpoint: "/api/menu",
		query: {
			populate: {
				Kategoria: { populate: "Podstrona" },
			},
		},
	});

	const root = attrs(json?.data);
	const cats = root?.["Kategoria"] || [];
	const out = [];
	for (const cat of cats) {
		for (const p of (cat?.["Podstrona"] || [])) {
			const a = attrs(p);
			out.push({
				title: a["Tytul"] || "",
				link: a["Link"] || "",
				type: a["Szablon"] || "",
				desc: a["Opis"] || "",
			});
		}
	}
	return out;
}

async function fetchSingleById(idBase, type) {
	let populateObj;
	if (idBase === "kadra") {
		populateObj = {
			Szablon: {
				populate: {
					Grupy: {
						populate: {
							ElementGrupy: {
								populate: {
									Kafelki: {
										populate: "przypinki"
									},
								},
							},
						},
					},
				},
			},
		}
	} else if (type === "Tiles") {
		populateObj = {
			Sekcja: {
				populate: {
					Szablon: {
						populate: "Kafeleki",
					},
				},
			},
		};
	} else {
		populateObj = {
            Szablon: {
                populate: {
                    Sekcja: {
                        populate: {
                            Linki: {
                                populate: "*"
                            },
                            Paragraf:{
                                populate: "*"
                            }
                        },
                    },
                },
            },
		};
	}

	const candidates = [
		{ endpoint: `/api/${idBase}`, query: { populate: populateObj } },
		{ endpoint: `/api/${idBase}-szablon`, query: { populate: populateObj } },
	];

	for (const candidate of candidates) {
		try {
			const json = await strapiFetch(candidate);
			const row = Array.isArray(json?.data) ? json.data[0] : json?.data;
			if (row) return attrs(row);
		} catch (e) {
			if (!String(e?.message || "").includes("404")) throw e;
		}
	}
	return null;
}

async function getPageData(slugParam) {
	const segments = Array.isArray(slugParam) ? slugParam : [slugParam];
	const path = "/" + segments.join("/");
	const last = segments[segments.length - 1];

	const items = await getMenuItems();
	const item = items.find(x => (x.link || "").replace(/\/+$/, "") === path);

	const bases = Array.from(new Set([ last, slugify(item?.title || "") ].filter(Boolean)));

	for (const base of bases) {
		const data = await fetchSingleById(base, item.type);
		if (data) return [data, item.type];
	}
	return null;
}

export async function generateMetadata({ params }) {
	const resolvedParams = await params;
	const result = await getPageData(resolvedParams.slug);


    if (!result) return {};

	const [data] = result;

	return {
		title: data["Szablon"]["Naglowek"],
	};
}

const AutomatycznyContent = ({data}) => {
    data = data["Szablon"]
	const sections = Array.isArray(data["Sekcja"]) ? data["Sekcja"] : [];
	return (
		<div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
			<div className="w-full flex items-center justify-center md:w-[90%] lg:w-[80%]">
				{sections.length ? (
					<div className="max-w-[80%] h-max flex flex-col gap-4 sm:gap-5 text-wrap">
						<Header text={data["Naglowek"]} />
						{sections.map((section) => {
							const links = Array.isArray(section["Linki"]) ? section["Linki"] : [];
							const media = Array.isArray(section["Media"]) ? section["Media"] : [];
							const content = section?.["Paragraf"] ? section["Paragraf"] : [];

							const hasContent = content && content.length > 0;
							const hasLinks = links.length > 0;
							const hasMedia = media.length > 0;

							return (
								<div key={section.id} className="w-full h-max flex flex-col">
									{hasContent && <MainContent text={content} hasLinks={hasLinks}/>}
									{hasLinks && <LinkSection linkArray={links} hasContent={hasContent}/>}
									{hasMedia && <Media media={media}
                                                        col={section?.["IloscKolumn"] ? section["IloscKolumn"] : 1}/>}
								</div>
							);
						})}
					</div>
				) : (
					<pre className="rounded-lg bg-gray-50 p-3 text-xs overflow-auto">
                   {JSON.stringify(data, null, 2)}
                </pre>
				)}
			</div>
		</div>
	);
}

const LoadingFallback = () => (
	<div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
		<div className="w-[92%] sm:w-[90%] lg:w-[80%] flex justify-center">
			<div className="animate-pulse space-y-4">
				<div className="h-8 bg-slate-200 rounded w-64"></div>
				<div className="h-4 bg-slate-100 rounded w-full"></div>
				<div className="h-4 bg-slate-100 rounded w-full"></div>
			</div>
		</div>
	</div>
);

export default async function Page({ params }) {
    if (!params) return notFound();
    const resolvedParams = await params;
	let { slug } = resolvedParams;
	try{
        const result = await getPageData(slug);
        if (!result) return notFound();
        const [data, typ] = result;

        return (
            <Suspense fallback={<LoadingFallback />}>
                {typ === "Automatyczny" && <AutomatycznyContent data={data} />}
	              {(typ === "Tiles" || typ === "Kafelki") && <Tiles dataKafelki={data} />}
            </Suspense>
        );
    } catch (e){
        return notFound();
    }
}