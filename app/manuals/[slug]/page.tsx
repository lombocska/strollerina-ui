
// import Card from "@/components/layout/card";
// import WebVitals from "@/components/layout/web-vitals";
import SimpleCard from "@/components/strollerina/cards/simple_card";
import { getManuals } from 'lib/data';
import useTranslation from 'next-translate/useTranslation';
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const { t, lang } = useTranslation('common');
  const manuals = await getManuals(decodeURI(params.slug))

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="z-10 w-full px-5 xl:px-0 ">
        <h1
          className="text-6xl text-center from-black to-stone-500 bg-clip-text text-strollerina_green-100"
          // style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          {t('brand-manual-title')}
        </h1>
      </div>

      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {manuals.map((manual:any) => (
          
          
          <Link href={manual.manualLink} target="_blank" rel="noopener"> 
            <SimpleCard
            
              key={manual.name}
              title={manual.name}
              description=""
              demo={ 
                <div className="flex items-center justify-center space-x-20">
                    <Image 
                      // loader={imageLoader}
                      alt="stroller manual brand image" 
                      src={manual.img}
                      // src={`https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/${brand.img}/public`}
                      width={200} height={200} />
                </div>
              }
            />
          </Link>
        ))}
      </div>
  </main>
  )
}

