/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
});

module.exports = withPWA({
  images: {
    domains: ['restcountries.com', 'upload.wikimedia.org', 'flagcdn.com'],
  },
  swcMinify: true,
});
