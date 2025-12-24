/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "openweathermap.org",
          },
          {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            port: "",
            pathname: "./**",
          },
        ],
      },
};

export default nextConfig;
