/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    // Allow Unsplash remote images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow locally-uploaded images served from /uploads/
    localPatterns: [
      {
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
