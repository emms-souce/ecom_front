/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    loader: 'default',
    // Remove custom loader to use Next.js default image optimization
    // which works better with Netlify
  },
  output: 'standalone',
  // Allow Netlify Next.js plugin to handle the build process
  env: {
    NETLIFY_NEXT_PLUGIN_SKIP: 'false'
  }
};

module.exports = nextConfig;