// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optymalizacja obrazów
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'strapi-production-cbefe.up.railway.app',
                port: '',
                pathname: '/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Kompresja
    compress: true,

    // Optymalizacja bundli
    swcMinify: true,

    // Modularize imports - zmniejsza bundle
    modularizeImports: {
        'lucide-react': {
            transform: 'lucide-react/dist/esm/icons/{{member}}',
        },
    },

    // Experimental features dla lepszej wydajności
    experimental: {
        optimizePackageImports: ['motion', 'lucide-react'],
    },

    // Webpack optimization
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        default: false,
                        vendors: false,
                        // Vendor chunk dla dużych bibliotek
                        vendor: {
                            name: 'vendor',
                            chunks: 'all',
                            test: /node_modules/,
                            priority: 20,
                        },
                        // Motion w osobnym chunku
                        motion: {
                            name: 'motion',
                            test: /[\\/]node_modules[\\/](framer-motion|motion)[\\/]/,
                            chunks: 'all',
                            priority: 30,
                        },
                        // Commons
                        common: {
                            minChunks: 2,
                            priority: 10,
                            reuseExistingChunk: true,
                            enforce: true,
                        },
                    },
                },
            };
        }
        return config;
    },
};

export default nextConfig;