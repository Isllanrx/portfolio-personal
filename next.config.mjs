/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
