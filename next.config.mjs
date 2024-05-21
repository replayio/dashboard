import withBundleAnalyzer from "@next/bundle-analyzer";

const devtoolsURL = process.env.DEVTOOLS_URL || "https://replay-devtools.vercel.app";

/** @type {import('next').NextConfig} */
let nextConfig = {
  productionBrowserSourceMaps: true,
  rewrites: async () => [
    {
      source: "/recording/:path*",
      destination: `${devtoolsURL}/recording/:path*`,
    },
  ],
};

if (process.env.ANALYZE === "true") {
  nextConfig = withBundleAnalyzer(nextConfig);
}

export default nextConfig;
