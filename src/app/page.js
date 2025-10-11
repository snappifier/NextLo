import {strapiFetch} from "@/app/lib/strapi";
import Wstep from "@/components/home/Wstep";
import Banner from "@/components/home/Banner";
import Profile from "@/components/home/Profile";
import Tarcze from "@/components/home/Tarcze"
import AktualnosciServer from "@/components/home/AktualnosciServer";

async function getHome() {
    const json = await strapiFetch("/api/strona-glowna-szablon?populate[Baner][populate]=*&populate[Kolejnosc][populate]=*");
    return json?.data ?? {};
}

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
                                {componentType === "home.krotko-o-szkole" && <Wstep data={data} />}
                                {componentType === "home.profile" && <Profile data={data} id={data.id ?? index} />}
                                {componentType === "home.aktualnosci" && <AktualnosciServer />}
                                {/* {componentType === "home.osiagniecia" && <Shields />} */}
                                {/*{componentType === "home.profile" && <Profill data={data} />}*/}
	                              {/*{componentType === "home.tarcze" && <Tarcze data={data} />}*/}
                            </div>
                        );
                    })}
	            <Tarcze />
            </div>

        </div>
    );
}

