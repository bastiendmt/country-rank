/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  images: {
    domains: ['restcountries.com', 'upload.wikimedia.org', 'flagcdn.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  swcMinify: true,
});
