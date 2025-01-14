import siteMetadata from '@/data/siteMetadata'
import { allBlogs } from 'contentlayer/generated'
import { i18n } from 'i18n-config';
import { getAllCarSeats, getAllStrollers } from 'lib/data';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = siteMetadata.siteUrl;

    const blogRoutes = allBlogs
        .filter((post) => !post.draft)
        .map((post) => ({
            url: `${siteUrl}/${post.language}/${post.path}`,
            lastModified: post.lastmod || post.date,
            alternates: {
                languages: {
                    hu: `${siteUrl}/hu/${post.path}`,
                    en: `${siteUrl}/en/${post.path}`,
                },
            },
        }));

    // const routes = ['', 'blog', 'strollers', 'carseats', 'about', 'contact', "gdpr", "tags", "manuals"].map((route) => ({
    //     url: `${siteUrl}/${route}`,
    //     lastModified: new Date().toISOString().split('T')[0],
    //     alternates: {
    //         languages: {
    //             hu: `${siteUrl}/hu/${route}`, 
    //             en: `${siteUrl}/en/${route}`, 
    //         },
    //     },
    // }));

    const routes = ['', 'blog', 'strollers', 'carseats', 'about-us', 'contact', 'gdpr', 'tags', 'manuals', 'reviews', 'terms-and-conditions'].flatMap((route) =>
        i18n.locales.map((locale) => ({
            url: `${siteUrl}/${locale}/${route}`,
            lastModified: new Date().toISOString().split('T')[0],
            alternates: {
                languages: Object.fromEntries(
                    i18n.locales.map((l) => [l, `${siteUrl}/${l}/${route}`])
                ),
            },
        }))
    );

    // const strollers = await getAllStrollers();

    // const strollerInfoRoutes = strollers.map((stroller) => ({
    //     url: `${siteUrl}/strollers/${stroller.brandValue.toLowerCase()}/${encodeURIComponent(stroller.generatedId)}`,
    //     lastModified: new Date().toISOString().split('T')[0],
    //     alternates: {
    //         languages: {
    //             hu: `${siteUrl}/hu/strollers/${stroller.brandValue.toLowerCase()}/${encodeURIComponent(stroller.generatedId)}`,
    //             en: `${siteUrl}/en/strollers/${stroller.brandValue.toLowerCase()}/${encodeURIComponent(stroller.generatedId)}`,
    //         },
    //     },
    // }));
    const strollers = await getAllStrollers();

    const strollerInfoRoutes = strollers.flatMap((stroller) =>
        i18n.locales.map((locale) => ({
            url: `${siteUrl}/${locale}/strollers/${stroller.brandValue.toLowerCase()}/${encodeURIComponent(stroller.generatedId)}`,
            lastModified: new Date().toISOString().split('T')[0],
            alternates: {
                languages: Object.fromEntries(
                    i18n.locales.map((l) => [
                        l,
                        `${siteUrl}/${l}/strollers/${stroller.brandValue.toLowerCase()}/${encodeURIComponent(stroller.generatedId)}`,
                    ])
                ),
            },
        }))
    );


    // const carseats = await getAllCarSeats();
    // const carseatInfoRoutes = carseats.map((carseat) => ({
    //     url: `${siteUrl}/carseats/${carseat.brandValue.toLowerCase()}/${encodeURIComponent(carseat.generatedId)}`,
    //     lastModified: new Date().toISOString().split('T')[0],
    //     alternates: {
    //         languages: {
    //             hu: `${siteUrl}/hu/carseats/${carseat.brandValue.toLowerCase()}/${encodeURIComponent(carseat.generatedId)}`,
    //             en: `${siteUrl}/en/carseats/${carseat.brandValue.toLowerCase()}/${encodeURIComponent(carseat.generatedId)}`,
    //         },
    //     },
    // }));
    const carseats = await getAllCarSeats();

    const carseatInfoRoutes = carseats.flatMap((carseat) =>
        i18n.locales.map((locale) => ({
            url: `${siteUrl}/${locale}/carseats/${carseat.brandValue.toLowerCase()}/${encodeURIComponent(carseat.generatedId)}`,
            lastModified: new Date().toISOString().split('T')[0],
            alternates: {
                languages: Object.fromEntries(
                    i18n.locales.map((l) => [
                        l,
                        `${siteUrl}/${l}/carseats/${carseat.brandValue.toLowerCase()}/${encodeURIComponent(carseat.generatedId)}`,
                    ])
                ),
            },
        }))
    );


    return [...routes, ...blogRoutes, ...strollerInfoRoutes, ...carseatInfoRoutes];
}
