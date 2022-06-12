/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  images: {
    domains: ["restcountries.com", "upload.wikimedia.org", "flagcdn.com"],
  },
  swcMinify: true,
});
