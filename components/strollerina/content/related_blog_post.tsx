'use client';


import ListLayout from '@/layouts/ListLayout'
import { allBlogs } from 'contentlayer/generated'
import { getDictionary } from 'get-dictionary';
import { Locale } from 'i18n-config';
// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
const POSTS_PER_PAGE = 100

export default function RelatedBlogPost({ tags, lang, dictionary }:
    {
        tags: string[];
        lang: Locale;        
        dictionary: Awaited<ReturnType<typeof getDictionary>>["blog-posts"],
    }) {

    // const posts = allCoreContent(sortPosts(allBlogs.filter((p) => !p.hidden)).filter((p) => p.language === lang))
    const filteredPosts = allBlogs.filter((post) =>
        !post.hidden &&
        post.language === lang &&
        post.tags?.some((tag) =>
            tags.some((t) => t.toLowerCase() === tag.toLowerCase()) // Convert both to lowercase before comparing
        )
    );


    const pageNumber = 1
    const initialDisplayPosts = filteredPosts.slice(
        POSTS_PER_PAGE * (pageNumber - 1),
        POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    }


    return (
        <div className="box-border flex h-full flex-col justify-between ">
            <div className="divide-y divide-accent-foreground dark:divide-accent xl:col-span-3 xl:row-span-2 xl:pb-0">
                <h2 className="text-2xl from-black to-stone-500 bg-clip-text text-strollerina_green-100 mt-10  mb-5">
                    {dictionary.title}
                </h2>
                <ListLayout
                    posts={filteredPosts}
                    initialDisplayPosts={initialDisplayPosts}
                    // pagination={pagination}
                    title="All Posts"
                    onlyBlogPostListShown={true}
                />
            </div>
        </div>
    );
}
