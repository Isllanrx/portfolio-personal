/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
