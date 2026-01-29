import { strapiFetch } from "@/app/lib/strapi"

const BASE_URL = "https://1lo.com.pl"

export default async function sitemap() {
	const staticPages = [
		{ url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
		{ url: `${BASE_URL}/aktualnosci`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
		{ url: `${BASE_URL}/galeria`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
		{ url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
	]

	const addedUrls = new Set(staticPages.map(p => p.url))

	let postPages = []
	try {
		const postsRes = await strapiFetch("/api/posts?pagination[pageSize]=100")
		const posts = postsRes?.data || []

		postPages = posts
			.filter(post => post.slug && !post.slug.startsWith("post"))
			.map((post) => ({
				url: `${BASE_URL}/aktualnosci/${post.slug}`,
				lastModified: new Date(post.updatedAt || post.Data),
				changeFrequency: "monthly",
				priority: 0.7,
			}))
	} catch {}

	let galleryPages = []
	try {
		const galleryRes = await strapiFetch("/api/galeria?populate=Zakladki")
		const zakladki = galleryRes?.data?.Zakladki || []

		galleryPages = zakladki.map((zakladka) => ({
			url: `${BASE_URL}/galeria/${zakladka.Tytul?.replace("/", "-")}`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		}))
	} catch {}

	let menuPages = []
	try {
		const menuRes = await strapiFetch("/api/menu?populate[Kategoria][populate]=Podstrona")
		const kategorie = menuRes?.data?.Kategoria || []

		for (const kat of kategorie) {
			for (const p of kat?.Podstrona || []) {
				if (p.Link && !p.Link.startsWith("http")) {
					const fullUrl = `${BASE_URL}${p.Link}`

					if (!addedUrls.has(fullUrl)) {
						addedUrls.add(fullUrl)
						menuPages.push({
							url: fullUrl,
							lastModified: new Date(),
							changeFrequency: "monthly",
							priority: 0.6,
						})
					}
				}
			}
		}
	} catch {}

	return [...staticPages, ...postPages, ...galleryPages, ...menuPages]
}