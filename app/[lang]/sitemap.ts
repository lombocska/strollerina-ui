import siteMetadata from '@/data/siteMetadata'
import { allBlogs } from 'contentlayer/generated'
import { getAllCarSeats, getAllStrollers } from 'lib/data';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = siteMetadata.siteUrl;
    
    const blogRoutes = allBlogs
        .filter((post) => !post.draft)
        .map((post) => ({
            url: `${siteUrl}/${post.path}`,
            lastModified: post.lastmod || post.date,
            alternates: {
                languages: {
                    hu: `${siteUrl}/hu/${post.path}`, // Példában: `es` nyelvű alternatív link
                    en: `${siteUrl}/en/${post.path}`, // Példában: `de` nyelvű alternatív link
                },
            },
        }));

    const routes = ['', 'blog', 'strollers', 'carseats', 'about', 'contact', "gdpr", "tags", "manuals"].map((route) => ({
        url: `${siteUrl}/${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        alternates: {
            languages: {
                hu: `${siteUrl}/hu/${route}`, // Példában: `es` nyelvű alternatív link
                en: `${siteUrl}/en/${route}`, // Példában: `de` nyelvű alternatív link
            },
        },
    }));

    const strollers = await getAllStrollers();
    const strollerInfoRoutes = strollers.map((stroller) => ({
        url: `${siteUrl}/strollers/${stroller.brandValue.toLowerCase()}/${encodeURIComponent(stroller.generatedId)}`,
        lastModified: new Date().toISOString().split('T')[0],
        alternates: {
            languages: {
                hu: `${siteUrl}/hu/strollers/${stroller.brandValue.toLowerCase()}/${encodeURIComponent(stroller.generatedId)}`,
                en: `${siteUrl}/en/strollers/${stroller.brandValue.toLowerCase()}/${encodeURIComponent(stroller.generatedId)}`,
            },
        },
    }));

    const carseats = await getAllCarSeats();
    const carseatInfoRoutes = carseats.map((carseat) => ({
        url: `${siteUrl}/carseats/${carseat.brandValue.toLowerCase()}/${encodeURIComponent(carseat.generatedId)}`,
        lastModified: new Date().toISOString().split('T')[0],
        alternates: {
            languages: {
                hu: `${siteUrl}/hu/carseats/${carseat.brandValue.toLowerCase()}/${encodeURIComponent(carseat.generatedId)}`,
                en: `${siteUrl}/en/carseats/${carseat.brandValue.toLowerCase()}/${encodeURIComponent(carseat.generatedId)}`,
            },
        },
    }));

    return [...routes, ...blogRoutes, ...strollerInfoRoutes, ...carseatInfoRoutes];
}
