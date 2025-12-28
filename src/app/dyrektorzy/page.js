import {strapiFetch} from "@/app/lib/strapi";
import PrincipalsClient from "@/app/dyrektorzy/PrincipalsClient";

async function getDyrektorzy() {
    const json = await strapiFetch("/api/archiwum-dyrekcjas?populate=*&sort[0]=Poczatek:desc");
    return json?.data ?? {};
}

export const metadata = {
    title: 'Dyrektorzy',
};

export default async function Page() {
    const data = await getDyrektorzy();
    if (data && data.length > 0) {
        return <PrincipalsClient data={data} />;
    }
    return null
}