
import { getAllStrollers, getStrollerBrands } from 'lib/data';
import StrollersContent from '@/components/strollerina/content/strollers_content';
import { getDictionary } from 'get-dictionary';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import { genPageMetadata } from '../seo';

export const metadata = genPageMetadata({
  title: 'Strollers',
  description: 'Dynamic stroller comparison',
  robots: {
      index: true,
      follow: true,
  },
})

export default async function Strollers({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const initialData = await getAllStrollers();
  const brands = await getStrollerBrands();
  return (
      <>
        <StrollersContent initialData={initialData} brands={brands} dictionary={dictionary.strollers} lang={lang}/>
      </>
  );
}
