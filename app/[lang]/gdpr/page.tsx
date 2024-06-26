import { getDictionary } from "get-dictionary";
import { Locale } from "next/dist/compiled/@vercel/og/satori";

export default async function GDPR({  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  

  return ( 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {dictionary["gdpr"]["title"]}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {dictionary["gdpr"]["intro"]}
      </p>

      <div className="space-y-6">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {dictionary["gdpr"]["data-collection"]}
          </h2>
          <p className="text-base text-gray-600">
            {dictionary["gdpr"]["data-collection-details"]}
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {dictionary["gdpr"]["use-of-data"]}
          </h2>
          <p className="text-base text-gray-600">
            {dictionary["gdpr"]["use-of-data-details"]}
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {dictionary["gdpr"]["data-sharing"]}
          </h2>
          <p className="text-base text-gray-600">
            {dictionary["gdpr"]["data-sharing-details"]}
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {dictionary["gdpr"]["data-security"]}
          </h2>
          <p className="text-base text-gray-600">
            {dictionary["gdpr"]["data-security-details"]}
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {dictionary["gdpr"]["your-rights"]}
          </h2>
          <p className="text-base text-gray-600">
            {dictionary["gdpr"]["your-rights-details"]}
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {dictionary["gdpr"]["approval"]}
          </h2>
          <p className="text-base text-gray-600">
            {dictionary["gdpr"]["approval"]}
          </p>
        </section>
      </div>
    </div>
  </div>
  );
}
