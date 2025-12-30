const NewsHeader = ({text}) =>{
    return (<div className="w-full md:w-3/4 flex flex-col items-center mb-4 sm:mb-2 text-wrap gap-5 text-white">
        <p className="w-full text-3xl sm:text-4xl lg:text-4xl/12 font-bold uppercase text-center">
            {text}
        </p>
        <div className="w-1/3 h-0.5 bg-[#3077BA] rounded-2xl"></div>
    </div>)
}

export default NewsHeader;