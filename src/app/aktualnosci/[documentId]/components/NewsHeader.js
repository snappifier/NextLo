import React from "react";

const NewsHeader = ({text, isBackground}) =>{
    return (<div className={`w-full flex flex-col items-center mb-4 sm:mb-2 text-wrap gap-2 ${isBackground ? "text-white" : "text-[#3077BA]"}`}>
        <p className="w-full text-3xl sm:text-4xl lg:text-xl font-medium uppercase text-center">
            Aktualności
        </p>
        <p className="w-full text-3xl sm:text-4xl lg:text-6xl font-semibold text-center uppercase">
            {text}
        </p>
    </div>)
}

export default NewsHeader;