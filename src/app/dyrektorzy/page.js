import {strapiFetch} from "@/app/lib/strapi";
import DyrekcjaClient from "@/app/dyrektorzy/DyrekcjaClient";

async function getDyrektorzy() {
    const json = await strapiFetch("/api/archiwum-dyrekcjas?populate=*&sort[0]=Poczatek:desc");
    return json?.data ?? {};
}

export default async function Page() {
    const data = await getDyrektorzy();
    if (data && data.length > 0) {
        return <DyrekcjaClient data={data} />;
    }
    return null
}