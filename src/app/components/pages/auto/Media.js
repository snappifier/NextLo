import {getStrapiMedia} from "@/app/lib/strapi";
import Photo from "@/app/galeria/[slug]/[id]/photo";


export default function Media({media = []}) {

	if (!Array.isArray(media) || media.length === 0) {
		return null;
	}

	return (<div className="w-full lg:w-full h-max bg-white rounded-xl shadow-lg flex flex-col p-5 mt-5">
		<p className="text-xl font-medium text-gray-800 mb-4">Galeria</p>
		<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 w-full select-none">
			{media.map((item, index) => {
				const imgUrl = getStrapiMedia(item.url);
				if (!imgUrl) return null;

				return (
					<div key={item.id || index} className="w-full aspect-square">
						<Photo
							uid={item.id || index}
							url={imgUrl}
							alttext={item.alternativeText || `Zdjęcie ${index + 1}`}
							classStyles="relative w-full h-full cursor-pointer"
						/>
					</div>
				);
			})}
		</div>
	</div>);
}
