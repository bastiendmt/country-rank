/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['restcountries.com', 'upload.wikimedia.org', 'flagcdn.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
