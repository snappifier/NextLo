const MainContent = ({text}) =>{
    return (<div className="w-full flex  text-wrap">
        {text.map((item) =>{
            return (<div key={item.id} className="rich-content ck-content font-poppins text-justify text-lin" dangerouslySetInnerHTML={{__html: item["Paragraf"]}}></div>)
        })}
    </div>)
}

export default MainContent;