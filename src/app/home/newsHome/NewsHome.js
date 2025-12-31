"use client"

import {NewsCard, SeeMoreCard} from "@/app/home/newsHome/NewsCard";

export const NewsHome = ({posts}) => {

    const displayPosts = posts.slice(0, 5)
    const featured = displayPosts[0]
    const rightColumn = displayPosts.slice(1, 3)
    const bottomRow = displayPosts.slice(3, 5)


    return (
        <>
            <div className="relative flex justify-center w-full h-max">
                <div className="relative z-20 flex w-full h-max px-6 py-6 md:px-10 md:py-8 bg-white rounded-2xl ring-1 ring-slate-200 drop-shadow-xl/20">
                    <div className="flex flex-col gap-5 items-start w-full h-max">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col w-max select-none">
                                <p className="text-base md:text-lg lg:text-xl font-normal text-slate-900">AKTUALNOŚCI</p>
                                <p className="text-base md:text-lg font-extralight text-slate-700">Bądź na bieżąco</p>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 lg:mb-4">
                                {featured && (
                                    <div className="lg:row-span-2 min-h-100 lg:min-h-125">
                                        <NewsCard news={featured} featured={true}/>
                                    </div>
                                )}
                                {rightColumn.map((news) => (
                                    <div key={news.id} className="min-h-50">
                                        <NewsCard news={news}/>
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
