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
};

export default nextConfig;
