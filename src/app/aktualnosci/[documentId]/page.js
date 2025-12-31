import {getStrapiMedia, strapiFetch} from "@/app/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";
import NewsHeader from "@/app/aktualnosci/[documentId]/components/NewsHeader";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";
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
		<div className="w-full pt-36 md:pt-30 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
            {srcMain && <div className="w-full h-3/4 md:h-[40vh] absolute top-0 bg-blue-300 z-0">
                <Image
                    src={srcMain}
                    alt={srcMain || "Zdjęcie główne"}
                    fill
                    className="object-cover brightness-40"
                    sizes="100vw"
                    priority
                />
            </div>}
			<div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col md:flex-row gap-4 sm:gap-10 py-10 z-10">
				<div className="h-max w-full flex flex-col gap-10 items-center">
					<NewsHeader text={post["Tytul"]} isBackground={srcMain ? 1 : 0} />
                    <div className="min-h-50 md:w-2/3 break-words text-justify text-slate-700 flex flex-col text-wrap p-8 bg-white rounded-xl shadow-lg gap-5">
                        <Link href={backLink} className="w-max text-md">
                            <p className="text-slate-500 hover:text-slate-800 hover:cursor-pointer transition-colors">
                                Wróć do aktualności
                            </p>
                        </Link>
                        <div className="rich-content ck-content font-poppins text-justify text-lin" dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(post["Opis"], {
                                allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'h1', 'h2', 'p', "a" ]),
                                allowedAttributes: {
                                    ...sanitizeHtml.defaults.allowedAttributes,
                                    '*': ['style', 'class']
                                }
                            })
                        }}></div>
                        <div className="flex flex-col w-max font-extralight text-sm">
                            <p>Autor: {post["Autor"]}</p>
                            <p>Data: {post["Data"]}</p>
                        </div>
                    </div>
				</div>

				{/*<div className="w-full h-max flex flex-col gap-5 md:mt-32">*/}
				{/*	{srcMain && (*/}
				{/*		<Photos media={srcMain} post={post["Tytul"] || "Główne zdjęcie"} />*/}
				{/*	)}*/}

				{/*	{photos.length > 0 && (*/}
				{/*		<div className="w-full h-max grid grid-cols-2 md:grid-cols-3 gap-2">*/}
				{/*			{photos.map((item) => (*/}
				{/*				<Photos*/}
				{/*					key={item.id}*/}
				{/*					media={getStrapiMedia(item.url)}*/}
				{/*					post={post["Tytul"] || "Zdjęcie z artykułu"}*/}
				{/*				/>*/}
				{/*			))}*/}
				{/*		</div>*/}
				{/*	)}*/}
				{/*</div>*/}
			</div>
		</div>
	);
}