const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
