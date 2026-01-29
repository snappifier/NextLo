import sanitizeHtml from 'sanitize-html';

const MainContent = ({ text, hasLinks }) => {
    if (!text || !Array.isArray(text)) return null;

    const sanitizeConfig = {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'u', 'span', 'figure', 'figcaption', 'iframe']),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            'img': ['src', 'alt', 'width', 'height', 'srcset', 'sizes'],
            'iframe': ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder']
        },
        allowedClasses: {
            '*': ['*']
        }
    };

    return (
        <div className={`w-full flex flex-col gap-4 text-wrap bg-white ${hasLinks ? "px-8 pt-8 rounded-tr-xl rounded-tl-xl" : "p-6 sm:p-8 rounded-xl"} shadow-lg wrap-break-words`}>
            {text.map((item) => {
                const cleanHtml = sanitizeHtml(item["Paragraf"] || "", sanitizeConfig);

                return (
                    <div
                        key={item.id}
                        className="rich-content ck-content font-poppins"
                        dangerouslySetInnerHTML={{ __html: cleanHtml }}
                    ></div>
                )
            })}
        </div>
    )
}

export default MainContent;