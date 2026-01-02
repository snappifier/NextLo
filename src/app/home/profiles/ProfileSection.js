'use client'

import Profile from "./Profile"

const ProfileSection = ({data}) => {
    return (
        <div className=" w-full h-max relative overflow-hidden rounded-2xl shadow-lg/20 z-10">
            <div className="absolute inset-0 bg-linear-to-br from-blue-100 via-sky-100 to-indigo-50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-sky-100/50 via-transparent to-transparent" />
            <div className="relative px-6 py-6 md:px-10 md:py-8">
                <div className="h-max w-full flex flex-col gap-6 text-wrap md:items-start">
                    <div className="flex flex-col w-max text-wrap">
                        <p className="text-base md:text-lg lg:text-xl font-normal text-slate-900">
                            NASZE PROFILE
                        </p>
                        <p className="text-base md:text-lg font-extralight text-slate-700">
                            Oto nasze profile przygotowane dla ciebie
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {data["Profile"].map((item, i) => (
                            <Profile key={item.id || i} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSection