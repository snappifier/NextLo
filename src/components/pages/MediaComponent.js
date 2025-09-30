import {getStrapiMedia} from "@/app/lib/strapi";

const MediaComponent = ({media, col}) => {
    console.log(media);
    return <div className={`w-max h-max grid auto-rows-auto grid-cols-1 md:grid-cols-${col} gap-5 flex-wrap`}>
        {media.map((item) => (
            <img className="h-full" src={getStrapiMedia(item.url)} alt={"Zdjecie-"+item.id}/>
        ))}
    </div>
}

export default MediaComponent;