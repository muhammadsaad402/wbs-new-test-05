// next.config.cjs
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // reactStrictMode: true,
  images: {
    // domains: ["apps.sidattech.com"],
    domains: ["dev7.sidat.digital"], // Add the domain(s) for the images
  },
  basePath: "",
  trailingSlash: true,
};

module.exports = nextConfig;
