
import StrollerInfo from '@/components/strollerina/cards/stroller_info';
import Carousel from '@/components/strollerina/carousel/carousel';
import ProductSidePanel from '@/components/strollerina/content/product_info_side_panel';
import AmazonLink from '@/components/strollerina/links/amazon_affiliate_link';
import { subtitle, title } from "@/components/strollerina/primitives";
import { Video } from '@/components/strollerina/video';
import { genPageMetadata } from 'app/[lang]/seo';
import { getDictionary } from 'get-dictionary';
import { getStrollerByGeneratedId, getStrollerImgs } from 'lib/data';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';

  
export default async function StrollerInfoPage({ params }: { params: { strollername: string, brandname:string, lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  const stroller = await getStrollerByGeneratedId(params.strollername);
  const imgs = await getStrollerImgs(params.strollername);
  // const brand = await getBrandByName(params.brandname);
  const slideImgs = imgs && imgs.length > 0 ? imgs : [stroller.img];

  return (
    <>
      <div className="ml-[calc(-45vw+50%+10px)] w-[calc(100vw-20px)] p-4 ">
        <main className="md:w-2/3 p-4  ">
          <section className="flex flex-col  gap-4 py-8 md:py-3">
            <section className="flex flex-col  gap-4 py-8 md:py-3">
              <div className="inline-block max-w-lg ">
                <h1 className={title({ color: "strollerina_green" })}>{stroller.name}</h1>
                <br />
                <h2 className={subtitle({ class: "mt-4" })}>
                  {stroller.brand}
                </h2>
                <AmazonLink id={stroller.id} type='stroller' dictionary={dictionary.strollers}/>
              </div>
            </section>
          
          <Carousel slides={slideImgs} />

          </section>
          <div className=" grid grid-rows-1">
            <Video link={stroller.video} />
          </div>
        </main>
      </div>

      <ProductSidePanel 
        dictionary={dictionary.strollers}
        info={<StrollerInfo data={stroller} dictionary={dictionary.strollers}/>}
      />
      
    </>
  )
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
  };
}




