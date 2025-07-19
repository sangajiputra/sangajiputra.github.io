/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: '/', // ✅ ini WAJIB
  trailingSlash: true,
  images: {
    unoptimized: true, // ✅ wajib untuk GitHub Pages
  },
};

module.exports = nextConfig;
