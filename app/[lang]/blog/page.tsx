import ListLayout from '@/layouts/ListLayout'
import { genPageMetadata } from 'app/[lang]/seo'
import { allBlogs } from 'contentlayer/generated'
import { Locale } from 'i18n-config'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 100

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {

    const posts = allCoreContent(sortPosts(allBlogs.filter((p) => !p.hidden)).filter((p) => p.language === lang))
    const pageNumber = 1
    const initialDisplayPosts = posts.slice(
        POSTS_PER_PAGE * (pageNumber - 1),
        POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }

    return (
        // <SectionContainer> 
        <div className="box-border flex h-full flex-col justify-between ">
            <div className="divide-y divide-accent-foreground dark:divide-accent xl:col-span-3 xl:row-span-2 xl:pb-0">
                <ListLayout
                    posts={posts}
                    initialDisplayPosts={initialDisplayPosts}
                    pagination={pagination}
                    title="All Posts"
                />
            </div>
        </div>
        // </SectionContainer>
    )
}
