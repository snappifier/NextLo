import {getStrapiMedia, strapiFetch} from "@/app/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";
import NewsHeader from "@/app/aktualnosci/[documentId]/components/NewsHeader";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";
import Photo from "@/app/galeria/[slug]/[id]/photo";

export const revalidate = 120;

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

export default async function PostDetail({ params, searchParams }) {
    const { documentId } = await params;
    const resolvedSearchParams = await searchParams;

    const post = await getPostById(documentId);
    const page = resolvedSearchParams?.page || 1;
    const backLink = `/aktualnosci?page=${page}`;

    if (!post) {
        notFound();
    }

    const srcMain = post?.["ZdjecieGlowne"] ? getStrapiMedia(post["ZdjecieGlowne"].url) : null;
    const photos = post?.["Zdjecia"] ?? [];

    return (
        <div className="w-full pt-20 sm:pt-30 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
            {srcMain && (
                <div className="w-full h-[60vh] sm:h-[50vh] md:h-[65vh] lg:h-[70vh] max-h-[550px] absolute top-0 z-0 overflow-hidden">
                    <Image
                        src={srcMain}
                        alt={post["ZdjecieGlowne"].alternativeText || "Zdjęcie główne"}
                        fill
                        className="object-cover object-center brightness-[0.55]"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
                </div>
            )}

            <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col gap-4 sm:gap-10 py-10 z-10">
                <div className="h-max w-full flex flex-col gap-6 sm:gap-10 items-center">
                    <NewsHeader text={post["Tytul"]} isBackground={srcMain ? 1 : 0} />

                    <div className="w-full flex flex-col xl:flex-row gap-5 xl:justify-center items-center">
                        <div className={`${photos.length > 0 ? "w-full" : "xl:w-[70%] md:w-full"} break-words text-justify text-slate-700 flex flex-col text-wrap p-6 sm:p-8 bg-white rounded-xl shadow-lg gap-5`}>
                            <Link href={backLink} className="w-max">
                                <p className="text-slate-500 hover:text-slate-800 transition-colors duration-200 flex items-center gap-2 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="transition-transform group-hover:-translate-x-1">
                                        <path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/>
                                    </svg>
                                    Wróć do aktualności
                                </p>
                            </Link>

                            <div className="rich-content ck-content font-poppins text-justify leading-relaxed"
                                 dangerouslySetInnerHTML={{
                                     __html: sanitizeHtml(post["Opis"], {
                                         allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'p', 'a']),
                                         allowedAttributes: {
                                             ...sanitizeHtml.defaults.allowedAttributes,
                                             '*': ['style', 'class']
                                         }
                                     })
                                 }}
                            />

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-4 border-t border-slate-200 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="M18.438 4.954H16.5V3.546c0-.262-.23-.512-.5-.5a.51.51 0 0 0-.5.5v1.408h-7V3.546c0-.262-.23-.512-.5-.5a.51.51 0 0 0-.5.5v1.408H5.562a2.503 2.503 0 0 0-2.5 2.5v11c0 1.379 1.122 2.5 2.5 2.5h12.875c1.379 0 2.5-1.121 2.5-2.5v-11a2.5 2.5 0 0 0-2.499-2.5m-12.876 1H7.5v.592c0 .262.23.512.5.5c.271-.012.5-.22.5-.5v-.592h7v.592c0 .262.23.512.5.5c.271-.012.5-.22.5-.5v-.592h1.937c.827 0 1.5.673 1.5 1.5v1.584H4.062V7.454c0-.827.673-1.5 1.5-1.5m12.876 14H5.562c-.827 0-1.5-.673-1.5-1.5v-8.416h15.875v8.416a1.5 1.5 0 0 1-1.499 1.5"></path></svg>
                                    <span>{new Date(post["Data"]).toLocaleDateString('pl-PL', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <span className="hidden sm:inline text-slate-400">•</span>
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8M6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8m2 10a3 3 0 0 0-3 3a1 1 0 1 1-2 0a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5a1 1 0 1 1-2 0a3 3 0 0 0-3-3z"></path></svg>
                                    <span>{post["Autor"]}</span>
                                </div>
                            </div>
                        </div>
                        {photos.length > 0 && (
                            <div className="w-full lg:w-[50%] h-max bg-white rounded-xl shadow-lg flex flex-col p-5">
                                <p className="text-xl font-medium text-gray-800 mb-4">Galeria</p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 w-full select-none">
                                    {photos.map((item, index) => {
                                        const imgUrl = getStrapiMedia(item.url);
                                        if (!imgUrl) return null;

                                        return (
                                            <div key={item.id || index} className="w-full aspect-square">
                                                <Photo
                                                    uid={item.id || index}
                                                    url={imgUrl}
                                                    alttext={item.alternativeText || `Zdjęcie ${index + 1}`}
                                                    classStyles="relative w-full h-full cursor-pointer"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}