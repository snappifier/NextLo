'use client';

import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import {getStrapiMedia} from "@/app/lib/strapi";
import ImageSkeletonLoader from "@/app/components/animations/ImageSkeletonLoader";

export default function PhotosClient({ photos }) {
    return (
        <Gallery>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {photos.map((photo, index) => {
                    const src = getStrapiMedia(photo.url)
                    const thumbnail = getStrapiMedia(photo.formats.thumbnail.url)
                    return (<Item
                        key={photo.id || index}
                        original={src}
                        thumbnail={thumbnail}
                        width={photo.width}
                        height={photo.height}
                        alt={photo.alt || "Zdjecie w galerii"}
                    >
                        {({ ref, open }) => (
                            <div
                                ref={ref}
                                onClick={open}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {open(e)}
                                }}
                                className="relative w-full aspect-square overflow-hidden rounded-lg bg-slate-100 cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-900"
                                tabIndex={0}
                            >
                                <ImageSkeletonLoader
                                    src={src}
                                    rounded={"rounded-lg"}
                                    alt={photo.alt || 'Zdjecie w galerii'}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                    isPriority={index < 4}
                                />
                            </div>
                        )}
                    </Item>)
                })}
            </div>
        </Gallery>
    );
}