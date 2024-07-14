import { getDictionary } from "get-dictionary";
import { Locale } from "next/dist/compiled/@vercel/og/satori";

export default async function About({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const whatIOfferItems = dictionary["about-us"]["what-i-offer"].split("\n\n");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {dictionary["about-us"]["title"]}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {dictionary["about-us"]["intro"]}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["about-us"]["who-we-are-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["about-us"]["who-we-are"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["about-us"]["our-story-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["about-us"]["our-story"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["about-us"]["our-mission-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["about-us"]["our-mission"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["about-us"]["my-work-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["about-us"]["my-work"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["about-us"]["what-i-offer-title"]}
            </h2>
            <ul className="list-disc list-inside text-base text-gray-600">
              {whatIOfferItems.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["about-us"]["thank-you-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["about-us"]["thank-you"]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
