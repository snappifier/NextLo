// lib/strapi.js
import qs from "qs";

export const STRAPI_URL = "https://strapi-production-cbefe.up.railway.app";

/**
 * strapiFetch - uniwersalny fetch do Strapi
 *
 * @param {string|object} path - jeśli string -> traktowany jako ścieżka np. "/api/articles"
 *                               jeśli object -> traktowany jako { endpoint: "/api/articles", query: {...} }
 * @param {object} opts - opcje fetch + dodatkowe pola:
 *                        - token: string (opcjonalnie) -> doda Authorization: Bearer <token>
 *                        - headers: dodatkowe nagłówki
 *                        - fetchOptions: pozostałe opcje przekazywane do fetch (method, body, itd.)
 *
 * Przykłady:
 *  await strapiFetch("/api/articles"); // bez query
 *  await strapiFetch({ endpoint: "/api/articles", query: { populate: "*", filters: {...} }});
 */
export async function strapiFetch(path, opts = {}) {
    // rozpakowanie opcji
    const { token, headers = {}, fetchOptions = {} } = opts;

    let endpoint;
    let queryObj;

    if (typeof path === "string") {
        endpoint = path;
        queryObj = opts.query;
    } else if (typeof path === "object" && path !== null) {
        endpoint = path.endpoint;
        queryObj = path.query;
    } else {
        throw new Error("strapiFetch: nieprawidłowy argument 'path'");
    }

    // zbuduj query string jeśli istnieje obiekt query
    let qsString = "";
    if (queryObj && Object.keys(queryObj).length > 0) {
        qsString = qs.stringify(queryObj, {
            encodeValuesOnly: true, // ważne dla bracket-syntax Strapi
            arrayFormat: "brackets"  // wygodne dla tablic
        });
        qsString = `?${qsString}`;
    }

    // upewnij się, że endpoint ma poprzedzające '/'
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    const url = `${STRAPI_URL}${cleanEndpoint}${qsString}`;

    const finalHeaders = {
        "Accept": "application/json",
        ...headers,
    };

    if (token) {
        finalHeaders["Authorization"] = `Bearer ${token}`;
    } else if (process.env.STRAPI_API_TOKEN) {
        // jeśli nie podano tokenu w opcji, sprawdź env var (przydatne na serwerze)
        finalHeaders["Authorization"] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    const res = await fetch(url, {
        ...fetchOptions,
        headers: finalHeaders,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Strapi fetch error ${res.status}: ${text}`);
    }

    // zwracamy JSON (Strapi v4 formatuje body w .data/.meta)
    return res.json();
}

/**
 * getStrapiMedia - normalize media url
 * Jeśli url jest absolutny -> zwraca go bez zmian
 * Jeśli url jest ścieżką (np. "/uploads/..") -> dokleja STRAPI_URL
 */
export function getStrapiMedia(url) {
    if (!url) return null;
    // jeśli to już pełny url (http/https) -> zwróć
    if (/^https?:\/\//i.test(url)) return url;
    // jeśli url zaczyna się od '//' -> dodaj protokół (użyj https)
    if (/^\/\//.test(url)) return `https:${url}`;
    // w przeciwnym razie doklej bazowy STRAPI_URL
    return STRAPI_URL.replace(/\/$/, "") + (url.startsWith("/") ? url : `/${url}`);
}
