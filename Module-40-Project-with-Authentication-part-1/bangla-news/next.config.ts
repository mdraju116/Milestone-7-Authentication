import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk",

      },
      {
        protocol: "https",
        hostname: "ibb.co.com",
      },
      {
        // https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png
        protocol: "https",
        hostname: "uxwing.com",
      },

      {
        // //lh3.googleusercontent.com
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },


    ]
  }

};

export default nextConfig;
