
import CarseatInfo from '@/components/strollerina/cards/carseat_info';
import Carousel from '@/components/strollerina/carousel/carousel';
import ProductSidePanel from '@/components/strollerina/content/product_info_side_panel';
import ReviewsContent from '@/components/strollerina/content/reviews_content';
import { subtitle, title } from "@/components/strollerina/primitives";
import { Video } from '@/components/strollerina/video';
import { genPageMetadata } from 'app/[lang]/seo';
import { getDictionary } from 'get-dictionary';
import { getBrandByName, getCarseatByGeneratedId, getCarseatImgs, getCarseatReviews } from 'lib/data';
import { Metadata } from 'next';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';

export default async function CarseatInfoPage({ params }: { params: { carseatname: string, brandname: string, lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  const carseat = await getCarseatByGeneratedId(params.carseatname);
  const imgs = await getCarseatImgs(params.carseatname);
  const brand = await getBrandByName(params.brandname);
  const slideImgs = imgs && imgs.length > 0 ? imgs : [carseat.img];

  const reviews = await getCarseatReviews(params.carseatname);

  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        <section className="flex flex-col  gap-4 py-8 md:py-3">
          <section className="flex flex-col  gap-4 py-8 md:py-3">
            <div className="inline-block max-w-lg ">
              <h1 className={title({ color: "strollerina_green" })}>{carseat.name}</h1>
              <br />
              <h2 className={subtitle({ class: "mt-4" })}>
                {carseat.brand}
              </h2>
            </div>
          </section>
          {/* layout="responsive" */}
          {/* placeholder="blur" */}
          {/* blurDataURL={image.blurDataURL} */}

          <Carousel slides={slideImgs} />

          <div className="block md:hidden mt-8">
            <CarseatInfo data={carseat} brand={brand} dictionary={dictionary.carseats} />
          </div>


          {/* Reviews Section */}
          {reviews && (
            <div className="py-8">
              <ReviewsContent reviews={reviews} dictionary={dictionary} isFullWidth={true} />
            </div>
          )}

        </section>
        {/* <section className="flex flex-col  gap-4 py-8 md:py-3 max-h-[1000px]"> */}
        <div className=" grid grid-rows-1">
          <Video link={carseat.video} />
        </div>
        {/* </section> */}

      </main>

      <ProductSidePanel
        dictionary={dictionary.strollers}
        info={<CarseatInfo data={carseat} brand={brand} dictionary={dictionary.carseats} />}
      />

    </>
  )
}

export async function generateMetadata({ params }: { params: { carseatname?: string; brandname?: string; lang?: string } }) {
  console.log("GenerateMetadata params:", params);

  const carseatnameRaw = params?.carseatname || 'Car Seat';
  const brandname = params?.brandname || 'Brand';

  // Remove the numeric part after the last dash (-)
  const carseatname = carseatnameRaw.includes('-')
    ? carseatnameRaw.split('-').slice(0, -1).join('-')
    : carseatnameRaw;

  return {
    title: `${brandname} ${carseatname} - Car Seat Info`,
    description: `Learn about the ${carseatname}, including ADAC crash test results, customer reviews, and safety features. Compare it with other ${brandname} car seats.`,
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      `${carseatname} review`,
      `${brandname} ${carseatname} manual`,
      `${carseatname} ADAC test results`,
      `${brandname} car seats`,
      'best infant car seats 2024',
      'safest car seats for newborns',
      'ADAC crash test car seat',
      `${carseatname} vs other car seats`,
      'baby car seat reviews',
      'top car seats by ADAC'
    ],
  };
}
