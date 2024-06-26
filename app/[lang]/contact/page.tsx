import { useEffect, useState } from "react";
import { Locale } from "next/dist/compiled/@vercel/og/satori";
import Head from "next/head";
import { getDictionary } from "get-dictionary";

export default async function Contact({  params: { lang },
}: {
  params: { lang: Locale };
}) {
const dictionary = await getDictionary(lang);

  return (
    // <main className="min-h-screen py-6 bg-gray-100">
    //   <Head>
    //     <title>Contact Us</title>
    //     <meta name="description" content="Contact us page of the website" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {dictionary["contact"]["title"]}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {dictionary["contact"]["intro"]}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dictionary["contact"]["twitter-title"]}
              </h2>
              <p className="text-base text-gray-600">
                <a
                  href={`https://twitter.com/${dictionary["contact"]["twitter"]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {`@${dictionary["contact"]["twitter"]}`}
                </a>
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dictionary["contact"]["email-title"]}
              </h2>
              <p className="text-base text-gray-600">
                <a
                  href={`mailto:${dictionary["contact"]["email"]}`}
                  className="text-blue-500 hover:underline"
                >
                  {dictionary["contact"]["email"]}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    // </main>
  );
}
