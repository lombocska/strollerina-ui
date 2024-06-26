
import SimpleCard from "@/components/strollerina/cards/simple_card";
import { getDictionary } from "get-dictionary";
import { getManuals } from 'lib/data';
import { Locale } from "next/dist/compiled/@vercel/og/satori";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params: {slug, lang} }: { params: { slug: string, lang: Locale } }) {
  
  const manuals = await getManuals(decodeURI(slug))
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="z-10 w-full px-5 xl:px-0 ">
        <h1
          className="text-6xl text-center from-black to-stone-500 bg-clip-text text-strollerina_green-100"
          // style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          {dictionary.manuals["main-text"]}
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
                      loading="lazy"
                      alt="stroller manual brand image" 
                      src={manual.img}
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

