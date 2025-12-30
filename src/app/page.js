import {strapiFetch} from "@/app/lib/strapi";
import { Suspense } from "react";
import dynamic from 'next/dynamic';
import Banner from "@/app/home/banner/Banner";
import ProfileSection from "@/app/home/profiles/ProfileSection";
import NewsServer from "@/app/home/newsHome/NewsServer";
import About from "@/app/home/about/About";
import Shields from "@/app/home/collaborations/Shields";

const Tarcze = dynamic(() => import('@/app/home/collaborations/Shields'), {
    loading: () => <div className="w-full h-64 bg-slate-100 animate-pulse rounded-2xl" />,
    ssr: true
});

export const revalidate = 90;


async function getHome() {
    const json = await strapiFetch({
        endpoint: "/api/strona-glowna-szablon",
        query: {
            populate: {
                Baner: { populate: "*" },
                Kolejnosc: { populate: "*" },
            },
        },
    });
    return json?.data ?? {};
}

const AktualnosciLoading = () => (
    <div className="w-full h-64 bg-gradient-to-b from-slate-100 to-slate-50 rounded-2xl animate-pulse" />
);

export default async function Home() {
    const home = await getHome();

    return (
        <div className="relative w-full min-h-screen flex justify-center items-center">
            <div className="w-[94%] sm:w-[90%] lg:w-[80%] h-max flex flex-col gap-5 items-center z-10">
                <div className="w-full bg-transparent">
                    <Banner baner={home["Baner"]}/>
                </div>

                {home["Kolejnosc"]?.map((data, index) => {
                    const componentType = data["__component"];
                    const key = `${componentType}-${data.id ?? index}`;

                    return (
                        <div key={key} className="w-full h-max">
                            {componentType === "home.krotko-o-szkole" && <About data={data} />}

                            {componentType === "home.profile" && <ProfileSection data={data} id={data.id ?? index} />}

                            {componentType === "home.aktualnosci" && (
                                <Suspense fallback={<AktualnosciLoading />}>
                                    <NewsServer />
                                </Suspense>
                            )}

                            {componentType === "home.osiagniecia" && (
                                <Suspense fallback={<div className="w-full h-64 bg-slate-100 animate-pulse rounded-2xl" />}>
                                    <Shields/>
                                </Suspense>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}