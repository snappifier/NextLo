import {getStrapiMedia, strapiFetch} from "@/app/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";
import Arrow, { formatPLDate } from "@/components/home/Aktualnosci/NewsCard";
import Banner from "@/components/home/Banner";
import Wstep from "@/components/home/Wstep";
import Profile from "@/components/home/Profile";
import AktualnosciServer from "@/components/home/AktualnosciServer";
import Tarcze from "@/components/home/Tarcze";
import Header from "@/components/pages/Header";
import Content from "@/components/pages/Content";
import LinkComponent from "@/components/pages/LinkComponent";
import MediaComponent from "@/components/pages/MediaComponent";
import Image from "next/image";


async function getPostById(documentId) {
    try {
        const json = await strapiFetch(`/api/posts/${documentId}?populate=*`);
        return json?.data ?? null;
    } catch (error) {
        console.error('Błąd pobierania posta:', error);
        console.log(slug)
        return null;
    }
}


export default async function PostDetail({ params }) {
    const { documentId } = await params;
    const post = await getPostById(documentId);
    const src = post?.["ZdjecieProfile"] ? getStrapiMedia(post["ZdjecieProfile"].url) : null;
    console.log(post)

    if (!post) {
        notFound();
    }

    return <div className="w-full pt-36 md:pt-30 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
        <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex justify-center">
            <div className="max-w-[80%] h-max flex flex-col gap-4 sm:gap-4 text-wrap">
                <div className="w-max h-max text-md">
                    <Link href={`/aktualnosci`}>
                        <p className="text-slate-500 hover:text-slate-800 hover:cursor-pointer">Wróć do aktualności</p>
                    </Link>
                </div>
                <Header text={post["Tytul"]} />
                <div className="w-full h-max flex flex-col gap-10">
                    <div key={post.id} className="relative w-auto min-h-60 h-100 overflow-hidden">
                        <Image
                            src={src}
                            alt={`Zdjęcie-${post.id}`}
                            fill
                            className="h-full object-contain"
                        />
                    </div>
                    <div className="w-full flex text-wrap">
                        {post["Opis"]}
                    </div>
                </div>
            </div>
        </div>
    </div>
}