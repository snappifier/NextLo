'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { strapiFetch } from "@/app/lib/strapi";
import Arrow, {clampText, formatPLDate} from "@/app/home/newsHome/NewsCard";

const MAX_POSTS = 9;

export default function NewsPage() {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const loadingRef = useRef(false);

    const fetchPosts = useCallback(async (pageNum) => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const res = await strapiFetch(
                `/api/posts?sort=Data:DESC&pagination[page]=${pageNum}&pagination[pageSize]=${MAX_POSTS}`
            );

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

    const renderCard = (news) => {
        const attributes = news.attributes || news;
        const title = attributes?.Tytul || 'Brak tytułu';
        const body = attributes?.Opis || '';
        const dateRaw = attributes?.Data;
        const author = attributes?.Autor || '';
        const documentId = news.documentId;
        const id = news.id;

        const stripHtml = (html) => {
            if (!html) return "";
            return html.replace(/(<([^>]+)>)/gi, "");
        };

        return (
            <Link
                href={`/aktualnosci/${documentId}`}
                key={id}
                className="bg-white border-slate-300 border rounded-xl overflow-hidden drop-shadow-md hover:drop-shadow-lg transition-shadow"
            >
                <div className="w-full h-full flex flex-col px-5 py-4 gap-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-light text-slate-600">
                            {dateRaw ? formatPLDate(dateRaw) : ''}{author ? ` • ${author}` : ''}
                        </span>
                        <p className="font-medium text-lg text-slate-900">{title}</p>
                    </div>
                    <div className="text-sm w-full h-full font-light flex flex-col justify-between gap-2 text-slate-700">
                        <p className="line-clamp-3">{clampText(stripHtml(body), 215)}</p>
                        <div
                            className="inline-flex items-center gap-2 text-sm text-sky-700 hover:text-sky-800 transition-colors"
                        >
                            Czytaj dalej
                            <Arrow />
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
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const pageNumbers = buildPageNumbers();

    return (
        <div className="w-full pt-36 md:pt-35 pb-16 md:pb-20 flex flex-col min-h-[80vh] items-center">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col">
                <div className="w-max flex flex-col text-wrap">
                    <p className="w-full text-3xl sm:text-4xl lg:text-5xl font-light">
                        Aktualności
                    </p>
                </div>

                <div className="w-full h-auto flex gap-5 flex-col items-stretch mt-6">
                    <div className="w-full grid gap-4 max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto lg:auto-rows-[16rem]">
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

// Helper functions
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
    let items = [];
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