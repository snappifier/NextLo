import Profile from "@/app/home/profiles/Profile";


const ProfileSection = ({data}) => {
    return (
        <div className="font-poppins z-10 w-full h-max flex px-6 py-6 md:px-10 md:py-8 bg-white rounded-2xl shadow-lg/20">
            <div className="h-max w-full flex flex-col gap-6 text-wrap md:items-start ">
                <div className="flex flex-col w-max text-wrap">
                    <p className="text-base md:text-lg lg:text-xl font-normal text-slate-900">NASZE PROFILE</p>
                    <p className="text-base md:text-lg font-extralight text-slate-700">Oto nasze profile przygotowane dla ciebie</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 sm:gap-6 w-full place-items-center lg:place-items-start">
                    {data["Profile"].map((item, i) => {
                        return (
		                        <Profile key={item.id || i} item={item}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
