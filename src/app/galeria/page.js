import {getStrapiMedia, strapiFetch} from "@/app/lib/strapi";
import Link from "next/link";
import GalleryAutoMasonry from "@/app/galeria/[slug]/galeria";

async function getGalerry() {
    const json = await strapiFetch("/api/galeria?populate[Zakladki][populate][Wydarzenia][populate]=*");
    return json?.data ?? {};
}

export default async function Page(){
    const data = await getGalerry();
    const events = data["Zakladki"][0]["Wydarzenia"];
    const srcGallery = events[0]["Zdjecia"].map((item) => getStrapiMedia(item.url))
    console.log(srcGallery);
    return <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
        <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex ">
            <div className="w-max h-max flex flex-col">
                {/*{data["Zakladki"].map((item) => {*/}
                {/*    const slug = item["Tytul"];*/}
                {/*    return <Link href={`/galeria/${slug}`}>*/}
                {/*        <p>{item["Tytul"]}</p>*/}
                {/*    </Link>*/}
                {/*})}*/}
                <GalleryAutoMasonry items={srcGallery} />
            </div>
        </div>
    </div>
}