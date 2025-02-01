'use client'

import { useLanyard } from 'react-use-lanyard'

import Image from '../Image'
import ExternalLink from './ExternalLink'
import Link from 'next/link'

const BentoBox = ({ posts }) => {

    return (
        <div className="ml-[calc(-50vw+50%+10px)] w-[calc(100vw-20px)] p-4">

            <section
                className="bento grid-mobile-layout sm:grid-sm-layout xl:grid-xl-layout mx-auto grid max-w-[375px] grid-cols-2 gap-4 *:rounded-3xl *:border *:border-muted *:bg-secondary *:bg-cover *:bg-center *:bg-no-repeat sm:max-w-screen-sm xl:max-w-screen-xl xl:grid-cols-4"
                aria-label="Personal information and activity grid"
            >
                <Link href={"/reviews"} aria-label={'reviews'} passHref className='grid-item-a'>

                    <div className=" relative aspect-square hover:bg-none">
                        <div className="overlay grid-item-a-overlay absolute inset-0 z-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />
                        {/* <ExternalLink
                            href={`/reviews`}
                            aria-label="Search for reviews"
                            title="Search in reviews"
                        /> */}

                    </div>
                </Link>
                {/* <div
                    className="first grid-item-a aspect-square rounded-3xl border bg-cover bg-center bg-no-repeat sm:aspect-[2.1/1] xl:aspect-auto "
                    role="img"
                    aria-label="Introduction"
                // rel="preload"
                // target="_blank"
                // href={"https://shareasale.com/r.cfm?b=2001933&u=4300111&m=124094&urllink=&afftrack="}
                >
                    <div className="overlay grid-item-a-silhouette size-full rounded-3xl bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-200" />
                    <p className="sr-only">

                    </p>
                </div> */}

                <Link href={"/strollers"} aria-label={'reviews'} passHref className='grid-item-b'>
                    <div className="relative aspect-square hover:bg-none">
                        <div className="overlay grid-item-b-overlay absolute inset-0 z-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />

                        {/* <ExternalLink
                            href={`/strollers`}
                            aria-label="Search for strollers"
                            title="Compare your strollers"
                        /> */}
                    </div>
                </Link>
                {/* <div className="grid-item-b aspect-square" role="img" aria-label="CTF Information">
                    <div className="overlay grid-item-b-overlay size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />
                    <p className="sr-only">
                        I currently play cybersecurity capture-the-flags with Project Sekai. Hosted
                        on this blog are in-depth, beginner-friendly writeups for CTF challenges!
                    </p>
                    <ExternalLink
                        href={posts[0].path}
                        newTab={false}
                        aria-label={`Read the latest post: ${posts[0].title}`}
                        title="Read the latest post"
                    />
                </div> */}

                <div className="grid-item-c aspect-[1/2.1] xl:aspect-auto" aria-hidden="true" />

                <Link href={"/carseats"} aria-label={'reviews'} passHref className='grid-item-d'>
                    <div className="relative aspect-square hover:bg-none">
                        <div className="overlay grid-item-d-overlay absolute inset-0 z-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />

                        {/* <ExternalLink
                        href={`/carseats`}
                        aria-label="Search for car seats"
                        title="Compare your car seats"
                    /> */}
                    </div>
                </Link>

                <Link href={posts[0].path} aria-label={'blogpost'} passHref className='grid-item-e'>
                    <div className="relative flex aspect-[6/5] items-start overflow-hidden p-4 hover:bg-none sm:aspect-[2.1/1] sm:items-center xl:aspect-auto">
                        <div className="overlay grid-item-e-overlay absolute inset-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />
                        <Image
                            src={posts[0].images[0]}
                            alt={`Featured image for the latest post: ${posts[0].title}`}
                            width={477}
                            height={251}
                            className="w-full rounded-2xl border border-border sm:ml-2 sm:w-[80%]"
                        />
                        {/* <ExternalLink
                        href={posts[0].path}
                        newTab={false}
                        aria-label={`Read the latest post: ${posts[0].title}`}
                        title="Read the latest post"
                    /> */}
                    </div>
                </Link>


                <Link href={'/manuals'} aria-label={'manuals'} passHref className='grid-item-f'>
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden hover:bg-none sm:aspect-[2.1/1] xl:aspect-auto">
                        <div className="overlay grid-item-f-overlay absolute inset-0  size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />
                        {/* <ExternalLink
                            href={`/manuals`}
                            aria-label="Search for manuals"
                            title="Compare your manuals"
                        /> */}
                    </div>
                </Link>

                <Link href={'/reviews'} aria-label={'reviews'} passHref className='grid-item-y'>
                    <div className="relative aspect-square hover:bg-none">
                        <div className="overlay grid-item-y-overlay absolute inset-0 z-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />
                        {/* <ExternalLink
                        href={`/reviews`}
                        aria-label="Search for reviews"
                        title="Search in reviews"
                    /> */}

                    </div>
                </Link>

                <Link href={'/reviews'} aria-label={'reviews-g'} passHref className='grid-item-g'>
                    <div className="relative aspect-square hover:bg-none">
                        <div className="overlay grid-item-g-overlay absolute inset-0 z-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />
                        {/* <ExternalLink
                            href={`/reviews`}
                            aria-label="Search for reviews"
                            title="Search in reviews"
                        /> */}
                    </div>
                </Link>

                <div className="grid-item-h aspect-[1/2.1] xl:aspect-auto" aria-hidden="true" />

                {/* 
                <div className="grid-item-i relative flex aspect-square items-center justify-center hover:bg-none">
                    <div className="overlay grid-item-i-overlay absolute inset-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />
                    <FaGithub
                        className="absolute z-[1] size-1/2 text-primary sm:size-24"
                        aria-hidden="true"
                    />
                    <ExternalLink
                        href="https://github.com/jktrn"
                        aria-label="Visit enscribe's GitHub profile"
                        title="GitHub Profile"
                    />
                </div>  */}
                <div className="grid-item-i relative aspect-square hover:bg-none">
                    <div className="overlay grid-item-i-overlay absolute inset-0 z-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />

                    <ExternalLink
                        href={`/strollers`}
                        aria-label="Search for strollers"
                        title="Compare your strollers"
                    />
                </div>

                <div className="grid-item-j aspect-square">
                    <p className="sr-only">
                        {/* Technologies used (in order of comfort): NextJS, Tailwind CSS, React, Hexo,
                        TypeScript, Unity, C#, Python, Svelte, Astro, JavaScript, Vercel */}
                    </p>
                </div>

                <div className="grid-item-k relative flex aspect-square items-center justify-center hover:bg-none">
                    <div className="overlay grid-item-k-overlay absolute inset-0 size-full rounded-3xl bg-cover bg-center bg-no-repeat transition-opacity duration-200 xl:opacity-0" />
                    {/* <FaTwitter
                        className="absolute z-[1] size-1/2 text-primary sm:size-24"
                        aria-hidden="true"
                    /> */}
                    <ExternalLink
                        href="/about-us"
                        aria-label="about"
                        title="Who I am"
                    />
                </div>
            </section>
        </div>
    )
}

export default BentoBox
