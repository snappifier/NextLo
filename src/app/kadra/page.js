import {strapiFetch} from "@/app/lib/strapi";
import Kadra from "@/app/kadra/KadraClient";

async function getKadra() {
    const json = await strapiFetch("/api/kadras");
    return json?.data ?? {};
}

export default async function Page(){
    const kadra = await getKadra();
    return <Kadra kadra={kadra} />;
}