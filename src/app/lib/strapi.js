// src/lib/strapi.js

export const STRAPI_URL = "https://strapi-production-cbefe.up.railway.app";

export async function strapiFetch(path, opts = {}) {
    const url = `${STRAPI_URL}${path}`;
    const res = await fetch(url, opts);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Strapi fetch error ${res.status}: ${text}`);
    }
    return res.json();
}

export function getStrapiMedia(media) {
    if (!media) return null;
    const url = media?.data?.attributes?.url ?? media?.attributes?.url ?? media?.url;
    if (!url) return null;
    return url.startsWith('http') ? url : STRAPI_URL + url;
}
