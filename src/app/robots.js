export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/api/",
		},
		sitemap: "https://1lo.com.pl/sitemap.xml",
	}
}