import { getDictionary } from "get-dictionary";
import { Locale } from "next/dist/compiled/@vercel/og/satori";

export default async function PrivacyPolicy({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {dictionary["privacy-policy"]["title"]}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {dictionary["privacy-policy"]["intro"]}
        </p>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["privacy-policy"]["data-collection-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["privacy-policy"]["data-collection"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["privacy-policy"]["cookies-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["privacy-policy"]["cookies"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["privacy-policy"]["third-party-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["privacy-policy"]["third-party"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["privacy-policy"]["data-security-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["privacy-policy"]["data-security"]}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {dictionary["privacy-policy"]["contact-title"]}
            </h2>
            <p className="text-base text-gray-600">
              {dictionary["privacy-policy"]["contact"]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
