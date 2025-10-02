import { strapiFetch } from "@/app/lib/strapi";
import Wstep from "@/components/home/Wstep";
import getRandomInt from "@/app/lib/getRandomInt";
import Banner from "@/components/home/Banner";

async function getHome() {
    const json = await strapiFetch("/api/strona-glowna-szablon?populate[Kolejnosc][populate]=*");
    return json?.data ?? {};
}

export default async function Home() {
    const options = (data) => {
        const table = {
            "home.krotko-o-szkole" : <Wstep data={data} />,
            // "home.profile" : <Kierunki data={data} />,
            // "home.aktualnosci" : <AktualnosciNew />,
            // "home.osiagniecia" : <Shields />
        }
        return table[data["__component"]]
    }

    const home = await getHome();
    console.log(home);

    return (
        <div className="relative w-full min-h-screen">
            <div className="w-full h-max flex flex-col gap-10 items-center z-10">
                <div className="w-full bg-transparent">
                    <Banner />
                </div>
                {home["Kolejnosc"].map((data, index) => {
                    return (<div key={getRandomInt(100) + index} className="w-full bg-transparent">{options(data)}</div>)
                })}
            </div>
        </div>
    );
}
