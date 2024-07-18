/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
            },
            {
                hostname: "images.pexels.com",
            },
            {
                hostname: "175.178.190.62",
            },
        ],
    },
};

export default nextConfig;
