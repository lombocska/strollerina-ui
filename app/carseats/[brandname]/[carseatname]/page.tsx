
import CarseatInfo from '@/components/strollerina/cards/carseat_info';
import Carousel from '@/components/strollerina/carousel/carousel';
import ProductSidePanel from '@/components/strollerina/content/product_info_side_panel';
import { subtitle, title } from "@/components/strollerina/primitives";
import { Video } from '@/components/strollerina/video';
import { getBrandByName, getCarseatByGeneratedId, getCarseatImgs } from 'lib/data';
import { Metadata } from 'next';
import useTranslation from 'next-translate/useTranslation';

export default async function CarseatInfoPage({ params }: { params: { carseatname: string, brandname:string } }) {
  const { t, lang } = useTranslation('carseats');
  const carseat = await getCarseatByGeneratedId(params.carseatname);
  const imgs = await getCarseatImgs(params.carseatname);
  const brand = await getBrandByName(params.brandname);
  const slideImgs = imgs && imgs.length > 0 ? imgs : [carseat.img];

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

          </section>
          {/* <section className="flex flex-col  gap-4 py-8 md:py-3 max-h-[1000px]"> */}
          <div className=" grid grid-rows-1">
            <Video link={carseat.video} />
          </div>
          {/* </section> */}

      </main>
      
      <ProductSidePanel 
        info={<CarseatInfo data={carseat} brand={brand}/>}
      />
      
    </>
  )
}

export function generateMetadata(): Metadata {
  const { t } = useTranslation("carseats");

  return {
    title: t`info-page-title`,
    description: t`info-page-description`
  };
}