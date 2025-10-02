// components/MediaComponent.jsx
// Dodaj "use client" tylko jeśli chcesz logować w przeglądarce lub używać hooków stanu/efektów.
// "use client";
import Image from "next/image";
import { getStrapiMedia } from "@/app/lib/strapi";


export default function MediaComponent({ media = [], col = 1 }) {

    if (!Array.isArray(media) || media.length === 0) {
        return null;
    }

    return (
        <div className={`w-[100%] h-max grid auto-rows-auto grid-cols-1 md:grid-cols-${col} gap-5 flex-wrap`}>
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
