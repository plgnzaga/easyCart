/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            port: '',
          },
          {
            protocol:'https',
            hostname:'api.escuelajs.co',
            port:''
          },
          {
            protocol:'https',
            hostname:'i.imgur.com',
            port:''
          }
        ],
      },
};

export default nextConfig;
