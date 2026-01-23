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

export const metadata = {
    title: 'Galeria',
};

export const revalidate = 300;

export default async function Page(){
    const data = await getGalerry();
    const pages = data["Zakladki"];
    return <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
        <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col gap-8">
            <div className="w-full flex flex-col items-center mb-4 sm:mb-2 text-wrap gap-2 text-[#3077BA]">
                <p className="w-full text-3xl sm:text-4xl lg:text-6xl/15 font-semibold uppercase text-center">
                    Galeria
                </p>
                <div className="w-1/3 h-1 bg-[#3077BA] rounded-2xl"></div>
            </div>
            <div className={`w-full gap-5 md:gap-8 ${
                pages.length < 3
                    ? "flex justify-center"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
            }`}>
                {pages.map((item) => {
                    const slug = item["Tytul"].replace('/', '-');
                    return (
                        <Link
                            key={item.id}
                            className={`h-full w-full ${pages.length < 2 ? 'max-w-md sm:max-w-lg' : ''}`}
                            href={`/galeria/${slug}`}
                        >
                            <ButtonAnimation title={item["Tytul"]}/>
                        </Link>
                    )
                })}
            </div>
        </div>
    </div>
}