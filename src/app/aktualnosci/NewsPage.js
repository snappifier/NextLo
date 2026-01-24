'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {getStrapiMedia, strapiFetch} from "@/app/lib/strapi";
import {formatPLDate, stripHtml } from "@/app/home/newsHome/NewsCard";
import ImageSkeletonLoader from "@/app/components/animations/ImageSkeletonLoader";

const MAX_POSTS = 9;

export default function NewsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;

    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const loadingRef = useRef(false);
    const headerRef = useRef(null);

    const fetchPosts = useCallback(async (pageNum) => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const res = await strapiFetch({
                endpoint: "/api/posts",
                query: {
                    sort: ["Data:DESC"],
                    pagination: {
                        page: pageNum,
                        pageSize: MAX_POSTS,
                    },
                    populate: ["ZdjecieGlowne"]
                },
            });

            const responseData = await normalizeResponse(res);

            if (!responseData) {
                setPosts([]);
                setTotalPages(1);
                return;
            }

            const { items, paginationData } = extractPostsData(responseData);

            setPosts(items);

            if (paginationData.pageCount) {
                setTotalPages(paginationData.pageCount);
            } else {
                const totalItems = paginationData.total || items.length;
                const calculatedPages = Math.ceil(totalItems / MAX_POSTS);
                setTotalPages(calculatedPages || 1);
            }

        } catch (err) {
            console.error('Błąd pobierania postów:', err);
            setError(err.message || 'Błąd pobierania');
            setPosts([]);
        } finally {
            loadingRef.current = false;
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(page);
    }, [page, fetchPosts]);

  useEffect(() => {
    if (headerRef.current && !isLoading) {
      headerRef.current.focus({preventScroll: true});
    }
  }, [posts, isLoading]);

    const renderCard = (news) => {
        const attributes = news.attributes || news;
        const title = attributes?.Tytul || 'Brak tytułu';
        const body = attributes?.Opis || '';
        const dateRaw = attributes?.Data;
        const author = attributes?.Autor || '';

        const slug = attributes?.slug;
        const documentId = news.documentId;
        const id = news.id;
        const postLink = slug ? `/aktualnosci/${slug}` : `/aktualnosci/${documentId}`;
        const imageObj = attributes.ZdjecieGlowne?.data?.attributes || attributes.ZdjecieGlowne;
        const imgSrc = imageObj?.url ? getStrapiMedia(imageObj.url) : null;

        return (
            <Link key={id} href={`${postLink}?page=${page}`} className="block h-full" tabIndex={-1}>
                <div className="group w-full h-full bg-white rounded-xl overflow-hidden cursor-pointer border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-300 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-900 focus-visible:shadow-xl focus-visible:-translate-y-2 focus-visible:border-slate-300 active:scale-[0.98] transition-all duration-300 will-change-transform flex flex-col" style={{transform: 'translateZ(0)'}} tabIndex={0}>
                    {imgSrc ? (
                        <div className="relative w-full h-44 shrink-0 overflow-hidden bg-slate-100">
                            <ImageSkeletonLoader src={imgSrc} alt={title ?? "Zdjęcie aktualności"} fill className="object-cover object-center transition-transform duration-300" priority rounded="rounded-none"/>
                        </div>
                    ) : (
                        <div className="relative w-full h-44 shrink-0 bg-linear-to-br from-sky-100 to-slate-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24" className="text-slate-300"><path fill="currentColor" d="M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-4.86 8.86l-3 3.87L9 13.14L6 17h12z"/></svg>
                        </div>
                    )}
                    <div className="flex flex-col flex-1 px-4 py-4 gap-2">
                        <div className="flex items-center gap-1.5 text-xs select-none font-medium text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M18.438 4.954H16.5V3.546c0-.262-.23-.512-.5-.5a.51.51 0 0 0-.5.5v1.408h-7V3.546c0-.262-.23-.512-.5-.5a.51.51 0 0 0-.5.5v1.408H5.562a2.503 2.503 0 0 0-2.5 2.5v11c0 1.379 1.122 2.5 2.5 2.5h12.875c1.379 0 2.5-1.121 2.5-2.5v-11a2.5 2.5 0 0 0-2.499-2.5m-12.876 1H7.5v.592c0 .262.23.512.5.5c.271-.012.5-.22.5-.5v-.592h7v.592c0 .262.23.512.5.5c.271-.012.5-.22.5-.5v-.592h1.937c.827 0 1.5.673 1.5 1.5v1.584H4.062V7.454c0-.827.673-1.5 1.5-1.5m12.876 14H5.562c-.827 0-1.5-.673-1.5-1.5v-8.416h15.875v8.416a1.5 1.5 0 0 1-1.499 1.5"></path></svg>
                            <span>{dateRaw ? formatPLDate(dateRaw) : ''}</span>
                            {author && <>
                                <span>•</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8M6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8m2 10a3 3 0 0 0-3 3a1 1 0 1 1-2 0a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5a1 1 0 1 1-2 0a3 3 0 0 0-3-3z"></path></svg>
                                <span>{author}</span>
                            </>}
                        </div>
                        <h4 className="line-clamp-2 font-semibold text-base md:text-lg leading-tight text-slate-900 group-hover:text-sky-700 group-focus-visible:text-sky-700 transition-colors duration-300 select-none">
                            {stripHtml(title)}
                        </h4>
                        <p className="text-sm text-slate-600 line-clamp-3 select-none flex-1">
                            {stripHtml(body)}
                        </p>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold mt-auto pt-2 text-sky-600 group-hover:text-sky-700 group-focus-visible:text-sky-700 transition-colors duration-300 select-none">
                            <span>Czytaj dalej</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"></path></svg>
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    const buildPageNumbers = () => {
        if (totalPages <= 1) return [];

        const pages = [];
        const showPages = 4;

        let startPage = Math.max(1, page - Math.floor(showPages / 2));
        let endPage = Math.min(totalPages, startPage + showPages - 1);

        if (endPage - startPage + 1 < showPages) {
            startPage = Math.max(1, endPage - showPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
            const params = new URLSearchParams(searchParams);
            params.set('page', newPage);
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const pageNumbers = buildPageNumbers();

    return (
        <div className="w-full pt-36 md:pt-35 pb-16 md:pb-20 flex flex-col min-h-[80vh] items-center">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col">
                <div className="w-max flex flex-col text-wrap">
                    <p ref={headerRef} className="w-full text-3xl sm:text-4xl lg:text-5xl font-light outline-none" tabIndex={-1}>
                        Aktualności
                    </p>
                </div>

                <div className="w-full h-auto flex gap-5 flex-col items-stretch mt-6">
                    <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.length === 0 && !isLoading && (
                            <div className="col-span-full text-center text-slate-600 py-8">Brak postów.</div>
                        )}
                        {posts.map(renderCard)}
                    </div>

                    {error && <div className="text-red-600 mt-4">Błąd: {error}</div>}
                    {isLoading && <div className="mt-4 text-slate-700">Ładowanie...</div>}

                    {totalPages > 1 && (
                        <nav aria-label="Paginacja" className="flex font-poppins items-center gap-2 mt-6 flex-wrap justify-center">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1 || isLoading}
                                className="px-3 py-2 hover:cursor-pointer rounded font-light disabled:opacity-50 disabled:cursor-not-allowed border border-slate-300 hover:bg-slate-50 transition-colors"
                            >
                                &larr;
                            </button>

                            {pageNumbers.map((pnum) => (
                                <button
                                    key={pnum}
                                    onClick={() => handlePageChange(pnum)}
                                    disabled={pnum === page || isLoading}
                                    aria-current={pnum === page ? 'page' : undefined}
                                    className={`px-3 py-2 hover:cursor-pointer rounded border transition-colors ${
                                        pnum === page
                                            ? 'font-semibold bg-sky-100 text-sky-700 border-sky-300'
                                            : 'font-light border-slate-300 hover:bg-slate-50'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {pnum}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages || isLoading}
                                className="px-3 py-2 hover:cursor-pointer rounded font-light disabled:opacity-50 disabled:cursor-not-allowed border border-slate-300 hover:bg-slate-50 transition-colors"
                            >
                                &rarr;
                            </button>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}

async function normalizeResponse(res) {
    try {
        if (typeof res === 'object' && res !== null) {
            if (res.json && typeof res.json === 'function') {
                return await res.json();
            }
            return res;
        }
        return res;
    } catch (error) {
        console.error('Błąd normalizacji odpowiedzi:', error);
        return null;
    }
}

function extractPostsData(responseData) {
    let items;
    let paginationData = {};

    if (Array.isArray(responseData)) {
        items = responseData;
        paginationData = { pageCount: Math.ceil(responseData.length / MAX_POSTS) };
    } else if (responseData.data && Array.isArray(responseData.data)) {
        items = responseData.data;
        paginationData = responseData.meta?.pagination || {};
    } else if (responseData.data) {
        items = responseData.data;
        paginationData = responseData.pagination || responseData.meta?.pagination || {};
    } else {
        items = responseData;
    }

    return { items, paginationData };
}