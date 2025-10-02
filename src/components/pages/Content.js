const Content = ({text}) =>{
    return (<div className="w-[90%] flex text-wrap">
        {text.map((item) =>{
            return (<div key={item.id} className="font-[poppins] text-justify text-lin" dangerouslySetInnerHTML={{__html: item["Paragraf"]}}></div>)
        })}
    </div>)
}

export default Content;