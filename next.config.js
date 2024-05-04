const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['restcountries.com', 'upload.wikimedia.org', 'flagcdn.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
