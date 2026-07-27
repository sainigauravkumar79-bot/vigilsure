/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'git clone https://github.com/sainigauravkumar79-bot/vigilsure.git
cd vigilsure;
    return [
      { source: '/api/:path*', destination: `${backendUrl}/api/:path*` }
    ];
  }
};
module.exports = nextConfig;
