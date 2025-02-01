import StrollerInfo from '@/components/strollerina/cards/stroller_info';
import Carousel from '@/components/strollerina/carousel/carousel';
import OtherStrollersContent from '@/components/strollerina/content/other_strollers_content';
import ProductSidePanel from '@/components/strollerina/content/product_info_side_panel';
import RelatedBlogPost from '@/components/strollerina/content/related_blog_post';
import ReviewsContent from '@/components/strollerina/content/reviews_content';
import AmazonLink from '@/components/strollerina/links/amazon_affiliate_link';
import { subtitle, title } from "@/components/strollerina/primitives";
import Timeline from '@/components/strollerina/timeline/timeline';
import { Video } from '@/components/strollerina/video';
import { Divider } from '@nextui-org/divider';
import { getDictionary } from 'get-dictionary';
import { getStrollerByGeneratedId, getStrollerImgs, getStrollerReviews, getStrollersByBrand } from 'lib/data';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';

export default async function StrollerInfoPage({ params }: { params: { strollername: string, brandname: string, lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  const stroller = await getStrollerByGeneratedId(params.strollername);
  const imgs = await getStrollerImgs(params.strollername);
  const slideImgs = imgs && imgs.length > 0 ? imgs : [stroller.img];

  // Fetch stroller reviews using the ID from the stroller object
  const reviews = await getStrollerReviews(params.strollername);

  return (
    <>
      <div className="ml-[calc(-45vw+50%+10px)] w-[calc(100vw-20px)] p-4 ">
        <main className="md:w-2/3 p-4 ">
          <section className="flex flex-col gap-4 py-8 md:py-3">
            <section className="flex flex-col gap-4 py-8 md:py-3">
              <div className="inline-block max-w-lg ">
                <h1 className={title({ color: "strollerina_green" })}>{stroller.name}</h1>
                <br />
                <h2 className={subtitle({ class: "mt-4" })}>
                  {stroller.brand}
                </h2>
                <AmazonLink id={stroller.id} type='stroller' dictionary={dictionary.strollers} />
              </div>
            </section>

            <Carousel slides={slideImgs} />

            <div className="block md:hidden mt-8">
              <StrollerInfo data={stroller} dictionary={dictionary.strollers} />
            </div>


            <Divider />

            <h2 className="text-2xl  from-black to-stone-500 bg-clip-text text-strollerina_green-100 mt-10">
              {dictionary.strollers.common['series']}
            </h2>
            <Timeline productType="STROLLER" itemId={stroller.id} />

            <Divider />
            {/* Reviews Section */}
            {reviews && (
              <div className="py-8">
                <ReviewsContent
                  reviews={reviews}
                  dictionary={dictionary}
                  isSingleColumn={true}
                />
              </div>
            )}

          </section>

          {/* VIDEO */}
          <div className="grid grid-rows-1">
            <Video link={stroller.video} />
          </div>

          <Divider />

          <RelatedBlogPost tags={[stroller.name, stroller.brand]} lang={params.lang} dictionary={dictionary['blog-posts']} />

          <Divider />
          <OtherStrollersContent stroller={stroller} dictionary={dictionary.strollers} />

        </main>
      </div>

      <ProductSidePanel
        dictionary={dictionary.strollers}
        info={<StrollerInfo data={stroller} dictionary={dictionary.strollers} />}
      />
    </>
  );
}

export async function generateMetadata({ params }: { params: { strollername?: string; brandname?: string; lang?: string } }) {
  console.log("GenerateMetadata params:", params);

  const strollernameRaw = params?.strollername || 'Stroller';
  const brandname = params?.brandname || 'Brand';

  // Remove the numeric part after the last dash (-)
  const strollername = strollernameRaw.includes('-')
    ? strollernameRaw.split('-').slice(0, -1).join('-')
    : strollernameRaw;

  return {
    title: `${brandname} ${strollername} - Stroller Info`,
    description: `Explore detailed information, images, and manuals for the ${brandname} ${strollername}. Discover everything you need to know about this stroller.`,
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      `${brandname} ${strollername} review`,
      `${brandname} ${strollername} manual`,
      `${strollername} price and specs`,
      'best strollers 2024',
      'best strollers 2025',
      'lightweight strollers',
      'foldable strollers for travel',
      'jogging strollers',
      'baby strollers for newborns',
      'top-rated strollers',
      'affordable strollers',
      `${brandname} lightweight stroller`,
      'compact strollers',
      `${brandname} foldable stroller`,
      `${brandname} travel strollers`,
      'stroller buying guide 2024'
    ],
  };
}
