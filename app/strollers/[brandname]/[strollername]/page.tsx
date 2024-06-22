
import StrollerInfo from '@/components/strollerina/cards/stroller_info';
import Carousel from '@/components/strollerina/carousel/carousel';
import ProductSidePanel from '@/components/strollerina/content/product_info_side_panel';
import { subtitle, title } from "@/components/strollerina/primitives";
import { Video } from '@/components/strollerina/video';
import { getBrandByName, getStrollerByGeneratedId, getStrollerImgs } from 'lib/data';
import { Metadata } from 'next';
import useTranslation from 'next-translate/useTranslation';

export default async function StrollerInfoPage({ params }: { params: { strollername: string, brandname:string } }) {
  const { t, lang } = useTranslation('strollers');
  const stroller = await getStrollerByGeneratedId(params.strollername);
  const imgs = await getStrollerImgs(params.strollername);
  const brand = await getBrandByName(params.brandname);

  const slideImgs = imgs && imgs.length > 0 ? imgs : [stroller.img];

  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
          <section className="flex flex-col  gap-4 py-8 md:py-3">
            <section className="flex flex-col  gap-4 py-8 md:py-3">
              <div className="inline-block max-w-lg ">
                <h1 className={title({ color: "strollerina_green" })}>{stroller.name}</h1>
                <br />
                <h2 className={subtitle({ class: "mt-4" })}>
                  {stroller.brand}
                </h2>
              </div>
            </section>
          {/* layout="responsive" */}
          {/* placeholder="blur" */}
          {/* blurDataURL={image.blurDataURL} */}

          <Carousel slides={slideImgs} />

          </section>
          {/* <section className="flex flex-col  gap-4 py-8 md:py-3 max-h-[1000px]"> */}
          <div className=" grid grid-rows-1">
            <Video link={stroller.video} />
          </div>
          {/* </section> */}

      </main>
      
      <ProductSidePanel 
        info={<StrollerInfo data={stroller} brand={brand}/>}
      />
      
    </>
  )
}

export function generateMetadata(): Metadata {
  const { t } = useTranslation("strollers");

  return {
    title: t`info-page-title`,
    description: t`info-page-description`
  };
}