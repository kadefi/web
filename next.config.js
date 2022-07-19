/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
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
