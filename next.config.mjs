/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'strapi-production-cbefe.up.railway.app',
                port: '',
                pathname: '/**',
            },
        ],
    },
		experimental: {
			globalNotFound: true,
		},
};

export default nextConfig;
