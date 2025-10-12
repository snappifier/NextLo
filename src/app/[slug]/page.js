import { notFound } from "next/navigation";
import { strapiFetch } from "@/app/lib/strapi";
import Content from "@/components/pages/Content";
import LinkComponent from "@/components/pages/LinkComponent";
import MediaComponent from "@/components/pages/MediaComponent";
import Header from "@/components/pages/Header";
import Kafelki from "@/components/pages/Kafelki";

export const dynamic = "force-dynamic";

const attrs = (x) => (x?.attributes ?? x ?? {});

const slugify = (s = "") =>
	s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		.toLowerCase().trim()
		.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function getMenuItems() {
	const json = await strapiFetch("/api/menu?populate[Kategoria][populate]=Podstrona");
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
	// jeśli nazwa wskazuje na kafelki — użyj innego populate

	const populateField = type === "Kafelki" ? "Kadra][populate][Szablon][populate][Kafeleki" : "Sekcja";

	const candidates = [
		`/api/${idBase}?populate[${populateField}][populate]=*`,
		`/api/${idBase}-szablon?populate[${populateField}][populate]=*`,
	];

	for (const url of candidates) {
		try {
			const json = await strapiFetch(url);
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
	const item = items.find(x => (x.link || "").replace(/\/+$/,"") === path);

	const bases = Array.from(new Set([ last, slugify(item?.title || "") ].filter(Boolean)));

	for (const base of bases) {
		const data = await fetchSingleById(base, item.type);
		if (data) return [data, item.type];
	}
	return null;
}

const Automatyczny = ({data}) => {
	const sections = Array.isArray(data["Sekcja"]) ? data["Sekcja"] : [];
	return (
		<div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
			<div className="w-[92%] sm:w-[90%] lg:w-[80%] flex justify-center">
				{sections.length ? (
					<div className="max-w-[80%] h-max flex flex-col gap-4 sm:gap-6 text-wrap">
						<Header text={data["Naglowek"]} />
						{sections.map((section) => {
							const links = Array.isArray(section["Linki"]) ? section["Linki"] : [];
							const media = Array.isArray(section["Media"]) ? section["Media"] : [];
							const content = Array.isArray(section["Paragraf"]) ? section["Paragraf"] : [];
							return (
								<div key={section.id} className="w-full h-max flex flex-col gap-5">
									<Content text={content} />
									<LinkComponent linkArray={links} />
									<MediaComponent media={media} col={section?.["IloscKolumn"] ? section["IloscKolumn"] : 1} />
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

export default async function Page({ params }) {
	const resolvedParams = await params;
	let { slug } = resolvedParams;
	const result = await getPageData(slug);
	if (!result) return notFound();
	const [data, typ] = result;


	if(typ === "Automatyczny"){
		return <Automatyczny data={data} />
	}
	if (typ === "Kafelki"){
		return <Kafelki dataKafelki={data} />
	}
}
