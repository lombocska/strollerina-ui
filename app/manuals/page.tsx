
// import Card from "@/components/layout/card";
// import WebVitals from "@/components/layout/web-vitals";
import SimpleCard from '@/components/strollerina/cards/simple_card';
import { getBrands } from 'lib/data';
import useTranslation from 'next-translate/useTranslation';
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const { t } = useTranslation('manuals');
  const brands = await getBrands()
  const brandManualLinkBase = "/manuals/"


  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="z-10 w-full px-5 xl:px-0 ">
        <h1
          className="text-6xl text-center from-black to-stone-500 bg-clip-text text-strollerina_green-100"
          // style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          {t('main-text')}
        </h1>
      </div>
      {/* <ProductCard/> */}
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {brands.map((brand:any) => (
          
          <Link href={brandManualLinkBase + brand.value.toLowerCase()} > 
            <SimpleCard
            
              key={brand.name}
              title={brand.name}
              description=""
              demo={ 
                <div className="flex items-center justify-center space-x-20">
                 
                    <Image 
                      className="object-cover rounded-xl"
                      // loader={imageLoader}
                      alt="stroller manual brand image" 
                      src={brand.img}
                      // src={`https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/${brand.img}/public`}
                      width={270} height={250} />
                </div>
              }
            />
          </Link>
        ))}
      </div>
      {/* {manuals.map(manual => (
        manual.name
      ))} */}
    </main>
   
  );
}

