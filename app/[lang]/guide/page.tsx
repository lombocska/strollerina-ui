
import { getDictionary } from 'get-dictionary';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import { genPageMetadata } from '../seo';
import GuideContent from '@/components/strollerina/content/guide_content';

export const metadata = genPageMetadata({
  title: 'Interactive Guide',
  description: 'Helping parents to chose strollers and car seats with interactive guide',
  robots: {
    index: true,
    follow: true,
  },
})

export default async function Guide({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  // const initialData = await getAllStrollers();
  // const brands = await getStrollerBrands();
  return (
    <>
      <GuideContent dictionary={dictionary} lang={lang}/>
    </>
  );
}
