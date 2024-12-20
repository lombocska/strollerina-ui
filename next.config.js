const { withContentlayer } = require('next-contentlayer')
const redirects = require('./data/redirects.js')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is https://www.googletagmanager.com https://pagead2.googlesyndication.com https://va.vercel-scripts.com/ *.google.com *.doubleclick.net *.googleadservices.com *.googlesyndication.com *.googletagmanager.com *.google-analytics.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  img-src * blob: data:;
  media-src 'self';
  connect-src *;
  font-src 'self' fonts.gstatic.com;
  frame-src giscus.app www.youtube.com *.doubleclick.net;
`
const securityHeaders = [
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\n/g, ''),
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
    },
]


const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
        dirs: ['app', 'components', 'layouts', 'scripts'],
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        dangerouslyAllowSVG: true,
        domains: [
            'www.gravatar.com',
            'avatars.githubusercontent.com',
            'pbs.twimg.com',
            'i.scdn.co',
            'api.lanyard.rest',
            'cdn.discordapp.com',
            'imagedelivery.net',
            'www.britax-roemer.com',
            'greentom.com',
            'easywalker.com',
            'images.gb-online.com',
            'www.joolz.com',
            'www.thule.com',
            'nunababy.eu',
            'www.babyzen.com',
            'ternx.com',
            'zoebaby.com',
            'assets.nextchapter-ecommerce.com',
            "www.besafe.com",
            "images.maxi-cosi.com",
            "www.cybex-online.com",
            "gravatar.com",
            "2.gravatar.com",
            "static.shareasale.com",
            "www.abc-design.de"
        ],
    },
    experimental: {
        appDir: true,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/ctfs/pico22/beginners-compilation',
                destination: '/blog/picoctf-2022/beginners-compilation',
                permanent: true,
            },
            
            {
                source: '/compare-strollers',
                destination: '/strollers',
                permanent: true
            },
            {
                source: '/compare-car-seats',
                destination: '/carseats',
                permanent: true
            },
            {
                source: '/reviews/blog/info/2024-adac-test-bests-worsts-huge-fails-peg-perego-twist',
                destination: '/blog/en/blog/adac/2024-adac-test-bests-worsts-huge-fails-peg-perego-twist',
                permanent: true
            },
            {
                source: '/blog/doona/doonax-17002/doonax-review',
                destination: '/blog/en/blog/doona/doonax-17002/doonax-review',
                permanent: true
            },
            {
                source: '/reviews/product/stroller/type-2/doona-x-stroller-carseat-combo-review-2024',
                destination: '/blog/en/blog/doona/doonax-17002/doonax-review',
                permanent: true
            }
            // Add all other redirects here...
        ]
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    },
}

module.exports = () => {
    const plugins = [withContentlayer, withBundleAnalyzer]
    return plugins.reduce((acc, next) => next(acc), nextConfig)
}