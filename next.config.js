/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  output: 'standalone',
  env: {
    NETLIFY_NEXT_PLUGIN_SKIP: 'true'
  }
};

module.exports = nextConfig;