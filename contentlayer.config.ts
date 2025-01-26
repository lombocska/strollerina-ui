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

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: 'blog/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
        categories: { type: 'list', of: { type: 'string' }, default: [] }, // New field for categories
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
        products: { type: 'list', of: { type: 'string' } },
        productImages: { type: 'list', of: { type: 'string' } },
    },
    computedFields: {
        ...computedFields,
        structuredData: {
            type: 'json',
            resolve: (doc) => {
                const tagsArray = doc.tags?._array || []; 
                
                if (tagsArray.includes('review')) {
                    const products = doc.products?._array || []; 
                    const productImages = doc.productImages?._array || []; 
                    const baseData = {
                        '@context': 'https://schema.org',
                        '@type': 'Review',
                        headline: doc.title,
                        datePublished: doc.date,
                        dateModified: doc.lastmod || doc.date,
                        description: doc.summary,
                        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
                        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
                        author: Array.isArray(doc.authors)
                            ? doc.authors.map((author) => ({
                                '@type': 'Person',
                                name: author,
                            }))
                            : [],
                        keywords: tagsArray.length > 0 ? tagsArray.join(', ') : '', // Safely join the tags array
                        // articleSection: Array.isArray(doc.categories) ? doc.categories.join(', ') : '',
                        wordCount: readingTime(doc.body.raw).words,
                        "reviewBody": doc.summary,
                        "name": doc.title,
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "4.8",
                            "bestRating": "5",
                            "worstRating": "1"
                        },
                        "itemReviewed": [
                            Array.isArray(products)
                            ? products.map((product, index) => ({
                                "@type": "Product",
                                "name": product,
                                "image": productImages ? productImages[index] : siteMetadata.socialBanner,
                                // "description": doc.summary,
                                //   "sku": "123456789"
                            }))
                            : [],
                            
                        ]
                    };
                    return baseData;
                }

                const baseData = {
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: doc.title,
                    datePublished: doc.date,
                    dateModified: doc.lastmod || doc.date,
                    description: doc.summary,
                    image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
                    url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
                    author: Array.isArray(doc.authors)
                        ? doc.authors.map((author) => ({
                            '@type': 'Person',
                            name: author,
                        }))
                        : [],
                    keywords: tagsArray.length > 0 ? tagsArray.join(', ') : '', // Safely join the tags array
                    // articleSection: Array.isArray(doc.categories) ? doc.categories.join(', ') : '',
                    wordCount: readingTime(doc.body.raw).words,
                };

                // Additional logic for specific tags like "review" or "comparison"
                // if (tagsArray.includes('review')) {
                //     return {
                //         ...baseData,
                //         review: {
                //             '@type': 'Review',
                //             author: {
                //                 '@type': 'Person',
                //                 name: Array.isArray(doc.authors) ? doc.authors.join(', ') : '',
                //             },
                //             reviewRating: {
                //                 '@type': 'Rating',
                //                 ratingValue: '4.8', // Replace with dynamic value if available
                //                 bestRating: '5',
                //                 worstRating: '1',
                //             },
                //         },
                //     };
                // }

                // if (Array.isArray(doc.tags) && doc.tags.includes('comparison') && Array.isArray(doc.comparisonData)) {
                //     return {
                //         ...baseData,
                //         mainEntity: doc.comparisonData.map((item) => ({
                //             '@type': 'Product',
                //             name: item.name,
                //             aggregateRating: {
                //                 '@type': 'AggregateRating',
                //                 ratingValue: item.rating,
                //                 reviewCount: item.reviewCount || 1,
                //             },
                //             offers: {
                //                 '@type': 'Offer',
                //                 price: item.price,
                //                 priceCurrency: 'USD', // Adjust dynamically if needed
                //             },
                //         })),
                //     };
                // }

                return baseData;
            },
        },

    },
}))

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
