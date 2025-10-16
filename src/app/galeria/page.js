import {getStrapiMedia, strapiFetch} from "@/app/lib/strapi";
import Link from "next/link";

async function getGalerry() {
    const json = await strapiFetch({
        endpoint: "/api/galeria",
        query: {
            populate: "*"
        }
    });
    return json?.data ?? {};
}

export default async function Page(){
    const data = await getGalerry();
    console.log(data)
    const pages = data["Zakladki"];
    return <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
        <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex ">
            <div className="w-max h-max flex flex-col">
                {pages.map((item) => {
                    const slug = item["Tytul"];
                    return <Link key={item.id} href={`/galeria/${slug}`}>
                        <p>{item["Tytul"]}</p>
                    </Link>
                })}
                {/*<GalleryAutoMasonry items={srcGallery} />*/}
            </div>
        </div>
    </div>
}