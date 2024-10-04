/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'img.clerk.com',
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true, // Add this line to ignore ESLint errors during builds
    }
};

export default nextConfig;
