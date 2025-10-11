const Header = ({text}) =>{
    return (<div className="w-max flex flex-col mb-4 sm:mb-6 text-wrap">
        <p className="w-full text-3xl sm:text-4xl lg:text-5xl font-light">
            {text}
        </p>
    </div>)
}

export default Header;