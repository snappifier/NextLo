/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["strapi-production-cbefe.up.railway.app"],
    },
		experimental: {
			globalNotFound: true,
		},
};

export default nextConfig;
