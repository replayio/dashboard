const devtoolsURL = process.env.DEVTOOLS_URL || "https://replay-devtools-new.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  rewrites: async () => [
    {
      source: "/recording/:path*",
      destination: `${devtoolsURL}/recording/:path*`
    }
  ]
};

export default nextConfig;
