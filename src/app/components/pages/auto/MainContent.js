import sanitizeHtml from 'sanitize-html';

const MainContent = ({ text, hasLinks }) => {
    if (!text || !Array.isArray(text)) return null;

    const sanitizeConfig = {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'u', 's', 'del', 'sub', 'sup',
            'span', 'figure', 'figcaption',
            'iframe', 'div',
            'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th'
        ]),

        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            'img': ['src', 'alt', 'width', 'height', 'srcset', 'sizes', 'title', 'style'],
            'a': ['href', 'name', 'target', 'rel'],
            'iframe': ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'title'],
            '*': ['data-*', 'class', 'style']
        },

        allowedStyles: {
            '*': {
                'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/, /^rgba\(/, /^[a-z]+$/i],
                'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/, /^rgba\(/, /^[a-z]+$/i],
                'font-size': [/^\d+(?:px|em|rem|%|pt)$/],
                'font-family': [/.+/],
                'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
                'width': [/^\d+(?:px|em|rem|%)$/],
                'height': [/^\d+(?:px|em|rem|%)$/]
            }
        },

        allowedClasses: {
            '*': ['*']
        },

        transformTags: {
            'a': sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
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