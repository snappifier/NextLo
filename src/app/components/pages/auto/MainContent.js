import sanitizeHtml from 'sanitize-html';

const MainContent = ({ text }) => {
    if (!text || !Array.isArray(text)) return null;

    const sanitizeConfig = {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'u', 'span']),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            '*': ['style', 'class'], // Pozwalamy na style i klasy z CKEditora
            'img': ['src', 'alt', 'width', 'height']
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 text-wrap p-8 bg-white rounded-xl shadow-lg break-words">
            {text.map((item) => {
                const cleanHtml = sanitizeHtml(item["Paragraf"] || "", sanitizeConfig);

                return (
                    <div
                        key={item.id}
                        className="rich-content ck-content font-poppins text-justify"
                        dangerouslySetInnerHTML={{ __html: cleanHtml }}
                    ></div>
                )
            })}
        </div>
    )
}

export default MainContent;