import { getDictionary } from "get-dictionary";
import { Locale } from "next/dist/compiled/@vercel/og/satori";

export default async function Disclaimer({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {dictionary["disclaimer"]["title"]}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {dictionary["disclaimer"]["intro"]}
        </p>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["disclaimer"]["general-information-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["disclaimer"]["general-information"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["disclaimer"]["liability-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["disclaimer"]["liability"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["disclaimer"]["external-links-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["disclaimer"]["external-links"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["disclaimer"]["errors-omissions-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["disclaimer"]["errors-omissions"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["disclaimer"]["contact-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["disclaimer"]["contact"]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
