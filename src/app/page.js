import { strapiFetch } from "@/app/lib/strapi";
import Wstep from "@/components/home/Wstep";
import getRandomInt from "@/app/lib/getRandomInt";
import Banner from "@/components/home/Banner";
import Profile from "@/components/home/Profile";
import Profill from "@/components/home/Profile/Profil2"

async function getHome() {
    const json = await strapiFetch("/api/strona-glowna-szablon?populate[Kolejnosc][populate]=*");
    return json?.data ?? {};
}

export default async function Home() {
    const home = await getHome();
    console.log(home);

    return (
        <div className="relative w-full min-h-screen">
            <div className="w-full h-max flex flex-col gap-5 items-center z-10">
                <div className="w-full bg-transparent">
                    <Banner />
                </div>


                {home["Kolejnosc"]?.map((data, index) => {
                    const componentType = data["__component"];
                    const key = `${componentType}-${data.id ?? index}`;

                    return (
                        <div key={key} className="w-full bg-transparent">
                            {componentType === "home.krotko-o-szkole" && <Wstep data={data} />}
                            {componentType === "home.profile" && <Profile data={data} id={data.id ?? index} />}
                            {/* {componentType === "home.aktualnosci" && <AktualnosciNew />} */}
                            {/* {componentType === "home.osiagniecia" && <Shields />} */}
	                        {/*{componentType === "home.profile" && <Profill data={data} />}*/}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

