import {getStrapiMedia, strapiFetch} from "@/app/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/pages/Header";
import Image from "next/image";

export const revalidate = 3600; // Cache na 1 godzinę

async function getPostById(documentId) {
    try {
        const json = await strapiFetch(`/api/posts/${documentId}?populate=*`);
        return json?.data ?? null;
    } catch (error) {
        console.error('Błąd pobierania posta:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { documentId } = await params;
    const post = await getPostById(documentId);

    if (!post) return { title: 'Post nie znaleziony' };

    return {
        title: post["Tytul"] || 'Aktualność',
        description: post["Opis"]?.slice(0, 160) || '',
    };
}

export default async function PostDetail({ params }) {
    const { documentId } = await params;
    const post = await getPostById(documentId);

    if (!post) {
        notFound();
    }

    const srcMain = post?.["ZdjecieGlowne"] ? getStrapiMedia(post["ZdjecieGlowne"].url) : null;
    const photos = post?.["Zdjecia"] ?? [];

    return (
        <div className="w-full pt-36 md:pt-30 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col md:flex-row gap-4 sm:gap-10">
                {/* Lewa kolumna - sticky */}
                <div className="h-max md:min-w-[50%] md:max-w-[60%] flex flex-col gap-4">
                    <Link href="/aktualnosci" className="w-max text-md">
                        <p className="text-slate-500 hover:text-slate-800 hover:cursor-pointer transition-colors">
                            Wróć do aktualności
                        </p>
                    </Link>
                    <Header text={post["Tytul"]} />
                    <div className="w-full text-wrap text-justify text-slate-700">
                        {post["Opis"]}
                    </div>
                </div>

                <div className="w-full h-max flex flex-col gap-5 mt-10">
                    {srcMain && (
                        <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-slate-100">
                            <Image
                                src={srcMain}
                                alt={post["Tytul"] || 'Główne zdjęcie'}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Galeria zdjęć */}
                    {photos.length > 0 && (
                        <div className="w-full h-max grid grid-cols-2 md:grid-cols-3 gap-2">
                            {photos.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative w-full aspect-square overflow-hidden rounded-lg bg-slate-100"
                                >
                                    <Image
                                        src={getStrapiMedia(item.url)}
                                        alt="Zdjęcie z artykułu"
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}