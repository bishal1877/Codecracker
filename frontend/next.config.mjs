/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL("https://img.clerk.com/**"),
      new URL("https://res.cloudinary.com/**"),
    ],
  },
   allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "192.168.43.54",
  ], 
};
export default nextConfig;  