/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://img.clerk.com/**")],
  },
};

export default nextConfig;
