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
            <div className="w-full flex flex-col items-center text-wrap gap-5 text-[#3077BA]">
                <p className="w-full text-3xl sm:text-4xl lg:text-6xl font-semibold uppercase text-center">
                    Galeria
                </p>
                <div className="w-1/3 h-1 bg-[#3077BA] rounded-2xl"/>
            </div>
            <div className={`w-full gap-5 md:gap-8 grid auto-rows-fr ${
              pages.length === 1
                ? "grid-cols-1 max-w-md mx-auto"
                : pages.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                  : "w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
                {pages.toReversed().map((item) => {
                    const slug = item["Tytul"].replace('/', '-');
                    return (
                        <Link
                            key={item.id}
                            className={`h-full w-full rounded-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-900 focus-visible:scale-103 transition-transform duration-200 ease-out ${pages.length < 2 ? 'max-w-md sm:max-w-lg' : ''}`}
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