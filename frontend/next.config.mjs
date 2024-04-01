/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "8055",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
