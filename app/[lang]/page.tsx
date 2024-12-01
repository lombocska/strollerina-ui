import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import Main from './main'

import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";

export default async function IndexPage({
    params: { lang },
  }: {
    params: { lang: Locale };
  }) {
    const dictionary = await getDictionary(lang);

    const sortedPosts = sortPosts(allBlogs)
    const posts = allCoreContent(sortedPosts)
    return (
    <>
        <Main posts={posts} dictionary={dictionary.home}/>
    </>
    )
    
}
