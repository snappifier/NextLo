"use client"
import {NewsCard} from "@/components/home/Aktualnosci/NewsCard";
import {useMemo} from "react";
import Link from "next/link";


export const Aktualnosci = ({posts}) => {
    const cellClass = useMemo(() => {
        return (i) => {
            if (i === 0) return "sm:col-span-2 lg:col-span-1 lg:row-span-2";
            return "";
        };
    }, []);
    return (
        <>
            <div className="relative flex justify-center w-full h-max">
                <div
                    className="
                    relative z-20 font-[poppins] flex w-full h-max px-6 py-6 md:px-10 md:py-8
                    bg-white rounded-2xl
                    ring-1 ring-slate-200
                    drop-shadow-xl/20
                ">
                    <div className="flex flex-col gap-4 items-start w-full h-max">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col w-max">
                                <p className="text-base md:text-lg lg:text-xl font-normal text-slate-900">AKTUALNOŚCI</p>
                                <p className="text-base md:text-lg font-extralight text-slate-700">Bądź na bieżąco</p>
                            </div>
                        </div>

                        <div className="w-full h-auto flex gap-5 flex-col items-stretch">
                            <div className="
                                  w-full grid gap-4 max-w-7xl
                                  grid-cols-1
                                  sm:grid-cols-2
                                  lg:grid-cols-3
                                  auto-rows-auto
                                  lg:auto-rows-[16rem]">
                                {posts.map((news, index) => {

                                    return (
                                        <div key={news.id} className={`${cellClass(index)} bg-white border-1 border-slate-300 rounded-xl overflow-hidden`}>
                                            <NewsCard news={news} featured={index === 0}/>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex font-[poppins] w-full h-max boder-2">
                                <Link href={"/"}>
                                    <p className="font-normal text-slate-700 hover:text-slate-900 hover:cursor-pointer">Zobacz więcej</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
