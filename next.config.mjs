import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 768, 1080, 1280],
    imageSizes: [48, 96, 192, 384],
    minimumCacheTTL: 31536000,
    qualities: [75, 85],
  },
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
};

export default nextConfig;
