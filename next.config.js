/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.pinata.cloud", "cdn.kadefi.money"],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/",
        permanent: true,
      },
      {
        source: "/nft",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
