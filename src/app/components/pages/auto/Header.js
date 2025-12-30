const Header = ({text}) =>{
    return (<div className="w-full flex flex-col items-center mb-4 sm:mb-2 text-wrap gap-5 text-[#3077BA]">
        <p className="w-full text-3xl sm:text-4xl lg:text-6xl/15 font-semibold uppercase text-center">
            {text}
        </p>
        <div className="w-1/3 h-1 bg-[#3077BA] rounded-2xl"></div>
    </div>)
}

export default Header;