// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ["restcountries.com", "upload.wikimedia.org", "flagcdn.com"],
  },
  swcMinify: false,
};

module.exports = nextConfig;
