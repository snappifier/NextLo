/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'strapi-production-cbefe.up.railway.app',
                port: '',
                pathname: '/**',
            },
        ],
        minimumCacheTTL: 60,
        formats: ['image/webp', 'image/avif'],
        qualities: [50, 60, 70, 80, 90, 100],
    },
		experimental: {
			globalNotFound: true,
		},
};

export default nextConfig;
