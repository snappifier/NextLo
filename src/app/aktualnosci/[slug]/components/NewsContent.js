import sanitizeHtml from "sanitize-html";

const NewsContent = ({text}) =>{
    return (<div className="w-full flex  text-wrap p-8 bg-white rounded-xl shadow-lg">
        <div className="rich-content ck-content font-poppins" dangerouslySetInnerHTML={{
            __html: sanitizeHtml(text, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'h1', 'h2', 'p', "a" ]),
                allowedAttributes: {
                    ...sanitizeHtml.defaults.allowedAttributes,
                    '*': ['style', 'class']
                }
            })
        }}></div>
    </div>)
}

export default NewsContent;