import {strapiFetch} from "@/app/lib/strapi";
import Banner from "@/components/home/banner/Banner";
import Profile from "@/components/home/Profile/Profile";
import { Suspense } from "react";
import AktualnosciServer from "@/components/home/Aktualnosci/AktualnosciServer";
import Wstep from "@/components/home/Wstep";
import Tarcze from "@/components/home/Wspolprace/Tarcze";

export const revalidate = 300;

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

// Loading komponent dla sekcji Aktualności
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

                    console.log(data)

                    return (
                        <div key={key} className="w-full h-max">
                            {componentType === "home.krotko-o-szkole" && <Wstep data={data} />}
                            {componentType === "home.profile" && <Profile data={data} id={data.id ?? index} />}
                            {componentType === "home.aktualnosci" && (
                                <Suspense fallback={<AktualnosciLoading />}>
                                    <AktualnosciServer />
                                </Suspense>
                            )}
                            {componentType === "home.osiagniecia" && <Tarcze/>}
                        </div>
                    );
                })}

            </div>
        </div>
    );
}
