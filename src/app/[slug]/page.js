import { notFound } from "next/navigation";
import {strapiFetch} from "@/app/lib/strapi";
import Content from "@/components/pages/Content";
import LinkComponent from "@/components/pages/LinkComponent";
import MediaComponent from "@/components/pages/MediaComponent";
import Header from "@/components/pages/Header";

async function getPageData(slug) {
    if (!slug) return null;
    const slugValue = Array.isArray(slug) ? slug.join("/") : slug;

    const url = `/api/${slugValue}?populate[Sekcja][populate]=*`;

    try {
        const json = await strapiFetch(url);
        const result = Array.isArray(json.data) ? json.data[0] : json.data;
        return result ?? null;
    } catch (err) {
        if (err.message && err.message.includes("404")) return null;
        throw err;
    }
}

export default async function Page({ params }) {
    const { slug } = await params;
    const data = await getPageData(slug);

    if (!data) {
        return notFound();
    }
    const sections = Array.isArray(data["Sekcja"]) ? data["Sekcja"] : [];


    return (
        <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%]">
                <Header text={data["Naglowek"]} />
                <div className="w-full h-max flex flex-col gap-4 sm:gap-6 text-wrap">
                    {sections.map((section) => {
                        const links = Array.isArray(section["Linki"]) ? section["Linki"] : [];
                        const media = Array.isArray(section["Media"]) ? section["Media"] : [];
                        const content = Array.isArray(section["Paragraf"]) ? section["Paragraf"] : [];

                        return (
                            <div key={section.id} className="w-full h-max flex flex-col gap-5">
                                <Content text={content} />
                                <LinkComponent linkArray={links} />
                                <MediaComponent media={media} col={section?.["IloscKolumn"] ? section["IloscKolumn"] : 1}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
