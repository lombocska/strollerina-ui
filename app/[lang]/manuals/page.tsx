
import SimpleCard from '@/components/strollerina/cards/simple_card';
import { getDictionary } from 'get-dictionary';
import { getActiveBrands } from 'lib/data';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import Image from "next/image";
import Link from "next/link";
import { genPageMetadata } from '../seo';

export const metadata = genPageMetadata({
  title: 'Manuals',
  description: 'stroller and car seat manuals',
  robots: {
      index: true,
      follow: true,
  },
})

export default async function Manuals({
  params: { lang },
}: {
  params: { lang: Locale };
}) {

  const brands = await getActiveBrands()
  const brandManualLinkBase = "/manuals/"
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="z-10 w-full px-5 xl:px-0 ">
        <h1
          className="text-6xl text-center from-black to-stone-500 bg-clip-text text-strollerina_green-100"
        >
          {dictionary.manuals["main-text"]}
        </h1>
      </div>
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
                      loading='lazy'
                      className="object-cover rounded-xl"
                      alt="stroller manual brand image" 
                      src={brand.img}
                      width={270} height={250} />
                </div>
              }
            />
          </Link>
        ))}
      </div>
    </main>
   
  );
}

