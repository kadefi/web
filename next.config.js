/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 300,
    domains: ["gateway.pinata.cloud", "cdn2.kadefi.money", "ipfs.io", "firebasestorage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
