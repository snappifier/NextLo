import {strapiFetch} from "@/app/lib/strapi";
import {NewsHome} from "@/app/home/newsHome/NewsHome";

async function getPosts() {
    const json = await strapiFetch("/api/posts?sort=Data:DESC&pagination[pageSize]=5&populate=*");
    return json?.data ?? {};
}

export default async function NewsServer() {
    const posts = await getPosts();
    return <NewsHome posts={posts}/>;
}
