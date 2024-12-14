import BentoBox from '@/components/bento/BentoBox'
import Link from 'next/link'

export default function Home({ posts, dictionary }) {
    return (
        // <div className="divide-y divide-accent-foreground dark:divide-accent">

        <div >
            <header className="relative mb-6 h-60 sm:h-80 xl:h-96 rounded-3xl overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat home-header rounded-3xl"
                    // style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}
                    aria-hidden="true"
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white ">
                    <h1 className="text-2xl font-bold sm:text-4xl xl:text-5xl">
                         {dictionary["welcome"]}
                    </h1>
                    <p className="mt-2 text-sm sm:text-lg xl:text-xl">
                        {dictionary["sub-welcome"]}
                    </p>
                    <Link
                        href="/strollers"
                        className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark sm:mt-6 sm:px-6 sm:py-3 sm:text-lg"
                    >
                        {dictionary["header-btn"]}
                    </Link>
                </div>
                <div className="absolute inset-0 bg-black/30 " aria-hidden="true"></div>

                {/* Overlapping Cards */}
                {/* <div className="absolute bottom-[-60px] left-1/2 z-20 flex w-[90%] max-w-screen-lg -translate-x-1/2 gap-4 sm:bottom-[-80px] xl:bottom-[-150px]">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 rounded-2xl bg-white p-4 shadow-lg transition-transform hover:scale-105 sm:p-6"
                        >
                            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                                Card Title {i + 1}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                This is the description for card {i + 1}. You can replace it with your content.
                            </p>
                            <Link
                                href="#"
                                className="mt-4 inline-block text-primary hover:underline"
                            >
                                Learn more
                            </Link>
                        </div>
                    ))}
                </div> */}
            </header>

            <BentoBox posts={posts} />
        </div>
    )
}
