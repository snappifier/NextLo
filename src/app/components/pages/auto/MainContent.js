const MainContent = ({text}) =>{
    return (<div className="w-full flex  text-wrap p-8 bg-white rounded-xl shadow-lg">
        {text.map((item) =>{
            return (<div key={item.id} className="rich-content ck-content font-poppins text-justify text-lin" dangerouslySetInnerHTML={{__html: item["Paragraf"]}}></div>)
        })}
    </div>)
}

export default MainContent;