import {strapiFetch} from "@/app/lib/strapi";
import Link from "next/link";
import ButtonAnimation from "@/app/galeria/ButtonAnimation";

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
    const pages = data["Zakladki"];
    return <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
        <div className="w-[92%] sm:w-[90%] lg:w-[80%] ">
            <div className="w-full  h-max flex flex-col-reverse items-center justify-start gap-2">
                {pages.map((item) => {
                    const slug = item["Tytul"];
                    return <Link key={item.id} className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5" href={`/galeria/${slug}`}>
	                    {/*<div className="w-max h-max bg-blue-600 rounded-md flex items-center justify-center gap-2 text-white">*/}
                      {/*  <p className="px-6 py-2">{item["Tytul"]}</p>*/}
	                    {/*</div>*/}
	                    <ButtonAnimation title={item["Tytul"]}/>
                    </Link>
                })}
                {/*<GalleryAutoMasonry items={srcGallery} />*/}
            </div>
        </div>
    </div>
}