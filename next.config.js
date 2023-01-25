/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["content-prod-live.cert.starbucks.com"],
  },
};

module.exports = nextConfig;
