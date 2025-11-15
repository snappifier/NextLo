import qs from "qs";

export const STRAPI_URL = "https://strapi-production-cbefe.up.railway.app";

export async function strapiFetch(path, opts = {}) {
    const { token, headers = {}, fetchOptions = {}, ...restOpts } = opts;

    let endpoint;
    let queryObj;

    if (typeof path === "string") {
        endpoint = path;
        queryObj = restOpts.query;
    } else if (typeof path === "object" && path !== null) {
        endpoint = path.endpoint;
        queryObj = path.query;
    } else {
        throw new Error("strapiFetch: nieprawidłowy argument 'path'");
    }

    let qsString = "";
    if (queryObj && Object.keys(queryObj).length > 0) {
        qsString = qs.stringify(queryObj, {
            encodeValuesOnly: true,
            arrayFormat: "brackets"
        });
        qsString = `?${qsString}`;
    }

    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${STRAPI_URL}${cleanEndpoint}${qsString}`;

    const finalHeaders = {
        "Accept": "application/json",
        ...headers,
    };

    if (token) {
        finalHeaders["Authorization"] = `Bearer ${token}`;
    } else if (process.env.STRAPI_API_TOKEN) {
        finalHeaders["Authorization"] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    const res = await fetch(url, {
        // Domyślnie Next.js cache'uje, chyba że `cache: 'no-store'` przekazane w opts
        next: {
            revalidate: fetchOptions.revalidate ?? 1800, // 1h domyślnie
            tags: fetchOptions.tags ?? [endpoint.split('/')[2] || 'strapi'] // np. 'posts', 'menu'
        },
        ...fetchOptions,
        headers: finalHeaders,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Strapi fetch error ${res.status}: ${text}`);
    }

    return res.json();
}

export function getStrapiMedia(url) {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    if (/^\/\//.test(url)) return `https:${url}`;
    return STRAPI_URL.replace(/\/$/, "") + (url.startsWith("/") ? url : `/${url}`);
}