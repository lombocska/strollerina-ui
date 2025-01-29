import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import path from 'path'
import {
    extractTocHeadings,
    remarkCodeTitles,
    remarkExtractFrontmatter,
    remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import siteMetadata from './data/siteMetadata'
import { getCarseatAmazonAffiliateLink, getCarseatByGeneratedId, getStrollerAmazonAffiliateLink, getStrollerByGeneratedId, getStrollerById } from './lib/data'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

const computedFields: ComputedFields = {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFilePath,
    },
    toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Count the occurrences of all tags across blog posts and write to JSON file
 */
function createTagCount(allBlogs) {
    const tagCount: Record<string, number> = {}
    allBlogs.forEach((file) => {
        if (file.tags && (!isProduction || file.draft !== true)) {
            file.tags.forEach((tag) => {
                const formattedTag = GithubSlugger.slug(tag)
                if (formattedTag in tagCount) {
                    tagCount[formattedTag] += 1
                } else {
                    tagCount[formattedTag] = 1
                }
            })
        }
    })
    writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

/**
 * Generate RSS feed for blog posts
 */
function createRssFeed(allBlogs) {
    const rssFeed = {
        version: '2.0',
        channel: {
            title: siteMetadata.title,
            link: siteMetadata.siteUrl,
            description: siteMetadata.description,
            items: allBlogs.map((blog) => ({
                title: blog.title,
                link: `${siteMetadata.siteUrl}/${blog._raw.flattenedPath}`,
                pubDate: blog.date,
                description: blog.summary,
            })),
        },
    }
    writeFileSync('./public/rss.xml', JSON.stringify(rssFeed))
    console.log('RSS feed generated...')
}

function createSearchIndex(allBlogs) {
    if (
        siteMetadata?.search?.provider === 'kbar' &&
        siteMetadata.search.kbarConfig.searchDocumentsPath
    ) {
        writeFileSync(
            `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
            JSON.stringify(allCoreContent(sortPosts(allBlogs)))
        )
        console.log('Local search index generated...')
    }
}

// export const Blog = defineDocumentType(() => ({
//     name: 'Blog',
//     filePathPattern: 'blog/**/*.mdx',
//     contentType: 'mdx',
//     fields: {
//         title: { type: 'string', required: true },
//         date: { type: 'date', required: true },
//         tags: { type: 'list', of: { type: 'string' }, default: [] },
//         categories: { type: 'list', of: { type: 'string' }, default: [] }, // New field for categories
//         lastmod: { type: 'date' },
//         draft: { type: 'boolean' },
//         hidden: { type: 'boolean' },
//         summary: { type: 'string' },
//         images: { type: 'list', of: { type: 'string' } },
//         thumbnail: { type: 'string' },
//         authors: { type: 'list', of: { type: 'string' } },
//         layout: { type: 'string' },
//         bibliography: { type: 'string' },
//         canonicalUrl: { type: 'string' },
//         language: { type: 'string', required: true },
//         ratingValue: { type: 'string' },
//         bestRating: { type: 'string' },
//         worstRating: { type: 'string' },
//         productIds: { type: 'list', of: { type: 'string' } },
//         productType: { type: 'string' },
//         ratings: { type: 'list', of: { type: 'string' }, default: [] },
//         offerable: { type: 'boolean', default: false },
//         // productImages: { type: 'list', of: { type: 'string' } },
//         // productAffiliates: { type: 'list', of: { type: 'string' } },
//         // productPrices: { type: 'list', of: { type: 'string' } },
//     },
//     computedFields: {
//         ...computedFields,
//         structuredData: {
//             type: 'json',
//             resolve: async (doc) => {
//                 const tagsArray = doc.tags?._array || [];
//                 const ratings = doc.ratings?._array || [];

//                 if (tagsArray.includes('review') && doc.offerable) {
//                     // Fetch product details from the backend
//                     const products = doc.productIds?._array || [];
//                     const productsInfo = await Promise.all(
//                         products.map(async (productId) => {
//                             let response = null;
//                             try {
//                                 if (doc.productType === 'stroller') {
//                                     response = await getStrollerById(productId);
//                                 } else {
//                                     response = await getCarseatByGeneratedId(productId);
//                                 }
//                             } catch (error) {
//                                 console.error(`Failed to fetch product data for ID: ${productId}`, error);
//                                 return null;
//                             }
//                             return response;
//                         })
//                     );

//                     // const affiliates = await Promise.all(
//                     //     products.map(async (productId) => {
//                     //         let response = null;
//                     //         try {
//                     //             if (doc.productType === 'stroller') {
//                     //                 response = await getStrollerAmazonAffiliateLink(productId); //generatedid
//                     //             } else {
//                     //                 response = await getCarseatAmazonAffiliateLink(productId);
//                     //             }
//                     //         } catch (error) {
//                     //             console.error(`Failed to fetch product data for ID: ${productId}`, error);
//                     //             return null;
//                     //         }
//                     //         return response;
//                     //     })
//                     // );
//                     // const productImages = doc.productImages?._array || [];
//                     // const productAffiliates = doc.productAffiliates?._array || [];
//                     // const productPrices = doc.productPrices?._array || [];

//                     const baseData = {
//                         '@context': 'https://schema.org',
//                         '@type': 'Review',
//                         headline: doc.title,
//                         datePublished: doc.date,
//                         dateModified: doc.lastmod || doc.date,
//                         description: doc.summary,
//                         image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
//                         url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
//                         author: Array.isArray(doc.authors)
//                             ? doc.authors.map((author) => ({
//                                 '@type': 'Person',
//                                 name: author,
//                             }))
//                             : [],
//                         keywords: tagsArray.length > 0 ? tagsArray.join(', ') : '', // Safely join the tags array
//                         // articleSection: Array.isArray(doc.categories) ? doc.categories.join(', ') : '',
//                         wordCount: readingTime(doc.body.raw).words,
//                         "reviewBody": doc.summary,
//                         "name": doc.title,
//                         "reviewRating": {
//                             "@type": "Rating",
//                             "ratingValue": "4.8",
//                             "bestRating": "5",
//                             "worstRating": "1"
//                         },

//                         "itemReviewed": Array.isArray(productsInfo)
//                             ? productsInfo
//                                 .filter((product) => product !== null && product !== undefined) // Filter out null or undefined products
//                                 .map((product, index) => ({
//                                     '@type': 'Product',
//                                     name: product.name,
//                                     image: product.img ? product.img : siteMetadata.socialBanner,
//                                     review: {
//                                         '@type': 'Review',
//                                         // reviewBody: product.reviewBody || 'No review provided.',
//                                         reviewRating: {
//                                             '@type': 'Rating',
//                                             ratingValue: product.ratingValue || ratings[index],
//                                             // bestRating: '5',
//                                             // worstRating: '1',
//                                         },
//                                         author: Array.isArray(doc.authors)
//                                             ? doc.authors.map((author) => ({
//                                                 '@type': 'Person',
//                                                 name: author,
//                                             }))
//                                             : [],
//                                     },
//                                 }))
//                             : [],
//                         // "itemReviewed":
//                         //     Array.isArray(productDetails)
//                         //         ? productDetails
//                         //             .filter((product) => product !== null && product !== undefined) // Filter out null or undefined products
//                         //             .map((product) => ({
//                         //                 "@type": "Product",
//                         //                 "name": product.name, // Use product directly (no index needed after filtering)
//                         //                 "image": product.img ? product.img : siteMetadata.socialBanner,
//                         //                 // "offers": {
//                         //                 //     "@type": "Offer",
//                         //                 //     "price": product.price ? product.price : 0,
//                         //                 //     "priceCurrency": "USD",
//                         //                 //     "availability": "https://schema.org/InStock",
//                         //                 //     "url": product.link ? product.link : 'www.strollerina.com/en/strollers',
//                         //                 // },
//                         //                 // "description": doc.summary,
//                         //                 // "sku": "123456789",
//                         //             }))
//                         //         : [],

//                     };
//                     return baseData;
//                 }

//                 const baseData = {
//                     '@context': 'https://schema.org',
//                     '@type': 'BlogPosting',
//                     headline: doc.title,
//                     datePublished: doc.date,
//                     dateModified: doc.lastmod || doc.date,
//                     description: doc.summary,
//                     image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
//                     url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
//                     author: Array.isArray(doc.authors)
//                         ? doc.authors.map((author) => ({
//                             '@type': 'Person',
//                             name: author,
//                         }))
//                         : [],
//                     keywords: tagsArray.length > 0 ? tagsArray.join(', ') : '', // Safely join the tags array
//                     // articleSection: Array.isArray(doc.categories) ? doc.categories.join(', ') : '',
//                     wordCount: readingTime(doc.body.raw).words,
//                 };

//                 // Additional logic for specific tags like "review" or "comparison"
//                 // if (tagsArray.includes('review')) {
//                 //     return {
//                 //         ...baseData,
//                 //         review: {
//                 //             '@type': 'Review',
//                 //             author: {
//                 //                 '@type': 'Person',
//                 //                 name: Array.isArray(doc.authors) ? doc.authors.join(', ') : '',
//                 //             },
//                 //             reviewRating: {
//                 //                 '@type': 'Rating',
//                 //                 ratingValue: '4.8', // Replace with dynamic value if available
//                 //                 bestRating: '5',
//                 //                 worstRating: '1',
//                 //             },
//                 //         },
//                 //     };
//                 // }

//                 // if (Array.isArray(doc.tags) && doc.tags.includes('comparison') && Array.isArray(doc.comparisonData)) {
//                 //     return {
//                 //         ...baseData,
//                 //         mainEntity: doc.comparisonData.map((item) => ({
//                 //             '@type': 'Product',
//                 //             name: item.name,
//                 //             aggregateRating: {
//                 //                 '@type': 'AggregateRating',
//                 //                 ratingValue: item.rating,
//                 //                 reviewCount: item.reviewCount || 1,
//                 //             },
//                 //             offers: {
//                 //                 '@type': 'Offer',
//                 //                 price: item.price,
//                 //                 priceCurrency: 'USD', // Adjust dynamically if needed
//                 //             },
//                 //         })),
//                 //     };
//                 // }

//                 return baseData;
//             },
//         },

//     },
// }))

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: 'blog/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
        categories: { type: 'list', of: { type: 'string' }, default: [] },
        lastmod: { type: 'date' },
        draft: { type: 'boolean' },
        hidden: { type: 'boolean' },
        summary: { type: 'string' },
        images: { type: 'list', of: { type: 'string' } },
        thumbnail: { type: 'string' },
        authors: { type: 'list', of: { type: 'string' } },
        layout: { type: 'string' },
        bibliography: { type: 'string' },
        canonicalUrl: { type: 'string' },
        language: { type: 'string', required: true },
        ratingValue: { type: 'string' },
        bestRating: { type: 'string' },
        worstRating: { type: 'string' },
        productIds: { type: 'list', of: { type: 'string' } },
        productType: { type: 'string' },
        ratings: { type: 'list', of: { type: 'string' }, default: [] },
        offerable: { type: 'boolean', default: false },
    },
    computedFields: {
        ...computedFields,
        structuredData: {
            type: 'json',
            resolve: async (doc) => {
                const tagsArray = doc.tags?._array || [];
                const ratings = doc.ratings?._array || [];
                const authorList = doc.authors._array || [];
                const authors = authorList.map((author) => ({
                    '@type': 'Person',
                    name: author,
                }));

                const domain = siteMetadata.siteUrl; // Replace with your actual domain
                const imagePath = doc.images?.[0] || siteMetadata.socialBanner;
                const fullImageUrl = imagePath ? `${domain}${imagePath.startsWith('/') ? '' : '/'}${imagePath}` : null;

                // Helper function to fetch product details
                const fetchProductDetails = async (productId) => {
                    try {
                        if (doc.productType === 'stroller') {
                            return await getStrollerById(productId);
                        }
                        return await getCarseatByGeneratedId(productId);
                    } catch (error) {
                        console.error(`Failed to fetch product data for ID: ${productId}`, error);
                        return null;
                    }
                };

                // Fetch product data if necessary
                const productsInfo = await Promise.all(
                    (doc.productIds?._array || []).map(fetchProductDetails)
                );

                // Construct Review schema if conditions are met
                if (tagsArray.includes('review') && doc.offerable) {
                    const itemReviewed = productsInfo
                        .filter((product) => product) // Remove null or undefined products
                        .map((product, index) => ({
                            '@type': 'Product',
                            name: product.name,
                            image: product.img || siteMetadata.socialBanner,
                            review: {
                                '@type': 'Review',
                                reviewRating: {
                                    '@type': 'Rating',
                                    ratingValue: product.ratingValue || ratings[index],
                                },
                                author: authors,
                            },
                        }));

                    return {
                        '@context': 'https://schema.org',
                        '@type': 'Review',
                        headline: doc.title,
                        datePublished: doc.date,
                        dateModified: doc.lastmod || doc.date,
                        description: doc.summary,
                        image: fullImageUrl,
                        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
                        author: authors,
                        keywords: tagsArray.join(', '),
                        wordCount: readingTime(doc.body.raw).words,
                        reviewBody: doc.summary,
                        name: doc.title,
                        reviewRating: {
                            '@type': 'Rating',
                            ratingValue: '4.8',
                            bestRating: '5',
                            worstRating: '1',
                        },
                        itemReviewed,
                    };
                }

                // Default BlogPosting schema
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: doc.title,
                    datePublished: doc.date,
                    dateModified: doc.lastmod || doc.date,
                    description: doc.summary,
                    image: fullImageUrl,
                    url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
                    author: authors,
                    keywords: tagsArray.join(', '),
                    wordCount: readingTime(doc.body.raw).words,
                };
            },
        },
    },
}));

export const Authors = defineDocumentType(() => ({
    name: 'Authors',
    filePathPattern: 'authors/**/*.mdx',
    contentType: 'mdx',
    fields: {
        name: { type: 'string', required: true },
        avatar: { type: 'string' },
        occupation: { type: 'string' },
        company: { type: 'string' },
        email: { type: 'string' },
        twitter: { type: 'string' },
        linkedin: { type: 'string' },
        github: { type: 'string' },
        layout: { type: 'string' },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: 'data',
    documentTypes: [Blog, Authors],
    mdx: {
        cwd: process.cwd(),
        remarkPlugins: [
            remarkExtractFrontmatter,
            remarkGfm,
            remarkCodeTitles,
            remarkMath,
            remarkImgToJsx,
        ],
        rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeKatex,
            [rehypeCitation, { path: path.join(root, 'data') }],
            [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
            rehypePresetMinify,
        ],
    },
    onSuccess: async (importData) => {
        const { allBlogs } = await importData()
        createTagCount(allBlogs)
        createSearchIndex(allBlogs)
        createRssFeed(allBlogs) // Generate RSS feed
    },
})
