import { Locale } from "next/dist/compiled/@vercel/og/satori";
import Head from "next/head";
import { getDictionary } from "get-dictionary";

export default async function Terms({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{dictionary["terms"]["title"]}</title>
        <meta name="description" content={dictionary["terms"]["meta-description"]} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {dictionary["terms"]["title"]}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {dictionary["terms"]["intro"]}
        </p>

        <div className="grid grid-cols-1 gap-6">
          {dictionary["terms"]["sections"].map((section: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {section["heading"]}
              </h2>
              <p className="text-base text-gray-600">
                {section["content"]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
