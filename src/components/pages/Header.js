const Header = ({text}) =>{
    return (<div className="w-full flex flex-col mb-4 sm:mb-6 text-wrap">
        <p className="w-full text-3xl sm:text-4xl lg:text-5xl/15 font-light">
            {text}
        </p>
    </div>)
}

export default Header;