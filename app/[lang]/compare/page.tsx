import InfoComparison from '@/components/strollerina/cards/info_comparison';
import { getDictionary } from 'get-dictionary';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import { genPageMetadata } from '../seo';

export const metadata = genPageMetadata({
  title: 'Compare',
  description: 'Dynamic stroller comparison',
  robots: {
      index: true,
      follow: true,
  },
})

export default async function Compare({
  params: { lang },
}: {
  params: { lang: Locale };
}) {

  const dictionary = await getDictionary(lang);
  return (
      <>
        <InfoComparison dictionary={dictionary} lang={lang}/>
      </>
  );
}
