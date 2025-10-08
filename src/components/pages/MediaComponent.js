// components/MediaComponent.jsx
// Dodaj "use client" tylko jeśli chcesz logować w przeglądarce lub używać hooków stanu/efektów.
// "use client";
import Image from "next/image";
import {getStrapiMedia} from "@/app/lib/strapi";


export default function MediaComponent({media = [], col = 1}) {

	if (!Array.isArray(media) || media.length === 0) {
		return null;
	}

	return (
		<div className="w-full h-max grid grid-cols-1 gap-5 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
		     style={{"--cols": String(col)}}>
			{media.map((item) => {
				const rawUrl =
					item?.url ?? "";

				if (!rawUrl) return null;

				const src = getStrapiMedia(rawUrl);
				if (!src) return null;

				const id = item?.id ?? item?.attributes?.id ?? Math.random();
				return (
					<div key={id} className="relative w-auto h-60 overflow-hidden">
						<Image
							src={src}
							alt={`Zdjęcie-${id}`}
							fill
							className="h-full object-contain"
						/>
					</div>
				);
			})}
		</div>
	);
}
