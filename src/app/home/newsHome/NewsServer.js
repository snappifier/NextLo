import {strapiFetch} from "@/app/lib/strapi";
import {NewsHome} from "@/app/home/newsHome/NewsHome";

async function getPosts() {
    const json = await strapiFetch("/api/posts?sort=Data:DESC&pagination[pageSize]=5&populate=*");
    return json?.data ?? {};
}
async function getPinned() {
    const json = await strapiFetch("/api/wyroznione?populate=*");
    return json?.data ?? {};
}


export default async function NewsServer({index}) {
    const [posts, pinned] = await Promise.all([
        getPosts(),
        getPinned()
    ]);
    const pinnedPosts = [pinned?.["Post1"], pinned?.["Post2"]].filter(Boolean);

    return <NewsHome index={index} posts={posts} pinnedPosts={pinnedPosts}/>;
}
