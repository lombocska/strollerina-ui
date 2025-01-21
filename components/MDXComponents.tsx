import TOCInline from '@/components/TOCInline'
import type { MDXComponents } from 'mdx/types'
import Pre from 'pliny/ui/Pre'

import Box from './Box'
import Challenge from './Challenge'
import CodeBlock from './CodeBlock'
import CountryFlag from './CountryFlag'
import Image from './Image'
import CustomLink from './Link'
import StaticTweet from './StaticTweet'
import YouTube from './YouTube'
import BlogCarousel from './BlogCarousel'
import Card from './Card'
import Carousel from './strollerina/carousel/carousel'
import Link from './Link'
import AmazonAccessoriesLinks from './strollerina/links/amazon_accessories_affiliate_links'
import GoogleAd from 'app/[lang]/GoogleAd'

export const components: MDXComponents = {
    Image,
    TOCInline,
    a: CustomLink,
    pre: Pre,
    CodeBlock,
    CountryFlag,
    Challenge,
    StaticTweet,
    Box,
    YouTube,
    BlogCarousel,
    Carousel,
    Card,
    Link,
    AmazonAccessoriesLinks,
    GoogleAd
}

