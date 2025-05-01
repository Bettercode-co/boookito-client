/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'big-storage-arvan.s3.ir-tbz-sh1.arvanstorage.ir',
                pathname: '/downloads/**',
            },
        ],
        
        
    },
    eslint: {
        ignoreDuringBuilds: true,
      },
}

module.exports = nextConfig