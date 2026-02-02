"use client"

import {NewsCard, SeeMoreCard} from "@/app/home/newsHome/NewsCard";

export const NewsHome = ({posts, index, pinnedPosts}) => {
    const pinnedIds = pinnedPosts.map(p => p.id);

    const availablePosts = posts.filter(post => !pinnedIds.includes(post.id));
    const featured = availablePosts[0];

    const neededForRight = Math.max(0, 2 - pinnedPosts.length);
    const rightColumn = availablePosts.slice(1, 1 + neededForRight);

    const bottomRowStart = 1 + neededForRight;
    const bottomRow = availablePosts.slice(bottomRowStart, bottomRowStart + 2);

    return (
        <>
            <div className="relative flex justify-center w-full h-max">
                <div className="relative z-20 flex w-full h-max px-6 py-6 md:px-10 md:py-8 bg-white rounded-2xl ring-1 ring-slate-200 drop-shadow-xl/20">
                    <div className="flex flex-col gap-5 items-start w-full h-max">
                        <div className="flex w-full gap-4 items-center">
                            <div className="flex flex-col justify-center">
                                <p className="text-5xl md:text-6xl lg:text-6xl font-semibold leading-none text-slate-500">{index}</p>
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="text-base md:text-lg lg:text-xl font-semibold text-slate-900 leading-tight">AKTUALNOŚCI</p>
                                <p className="text-sm md:text-base lg:text-lg font-extralight text-slate-700">Bądź na bieżąco</p>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 lg:mb-4">
                                {featured && (
                                    <div className="lg:row-span-2 min-h-100 lg:min-h-125">
                                        <NewsCard news={featured} featured={true}/>
                                    </div>
                                )}
                                {pinnedPosts.map((news) => (
                                    <div key={news.id} className="min-h-50">
                                        <NewsCard news={news} pinned={true} />
                                    </div>
                                ))}
                                {rightColumn.map((news) => (
                                    <div key={news.id} className="min-h-50">
                                        <NewsCard news={news} />
                                    </div>
                                    ))}
                                <div className="min-h-45 lg:hidden">
                                    <SeeMoreCard/>
                                </div>
                            </div>
                            <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                                {bottomRow.map((news) => (
                                    <div key={news.id} className="min-h-45">
                                        <NewsCard news={news}/>
                                    </div>
                                ))}
                                <div className="min-h-45">
                                    <SeeMoreCard/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
