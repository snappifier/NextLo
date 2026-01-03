import {strapiFetch} from "@/app/lib/strapi";
import {NewsHome} from "@/app/home/newsHome/NewsHome";

async function getPosts() {
    const json = await strapiFetch("/api/posts?sort=Data:DESC&pagination[pageSize]=5&populate=*");
    return json?.data ?? {};
}

export default async function NewsServer({index}) {
    const posts = await getPosts();
    return <NewsHome index={index} posts={posts}/>;
}
