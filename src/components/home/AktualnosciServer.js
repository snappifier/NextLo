import {strapiFetch} from "@/app/lib/strapi";
import {Aktualnosci} from "@/components/home/Aktualnosci";

async function getPosts() {
    const json = await strapiFetch("/api/posts?populate=*");
    return json?.data ?? {};
}

export default async function AktualnosciServer() {
    const posts = await getPosts();
    return <Aktualnosci posts={posts}/>;
}
