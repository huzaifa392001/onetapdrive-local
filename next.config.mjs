import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'styles')],
        additionalData: `
            @use "@/public/variables.scss" as *;
            @use "@/public/css/fonts.scss" as *;
        `,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/static/images/**',
            },
            {
                protocol: 'http',
                hostname: '35.154.240.227',
                port: '5000',
                pathname: '/static/images/**',
            },
            {
                protocol: 'https',
                hostname: 'onetapdrive.com',
                pathname: '/static/images/**', // <- Added this line
            },
            {
                protocol: 'https',
                hostname: 'onetapdrive.com',
                pathname: '/staging/static/images/**',
            },
        ],
    }

};

export default nextConfig;
