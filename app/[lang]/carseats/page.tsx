
import CarseatsContent from '@/components/strollerina/content/carseats_content';
import { getDictionary } from 'get-dictionary';
import { getAllCarSeats, getCarSeatBrands } from 'lib/data';
import { Metadata } from 'next';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import { genPageMetadata } from '../seo';


export const metadata = genPageMetadata({
  title: 'Compare Car Seats: Reviews, Ratings, and ADAC Safety Tests',
  description: 'Browse and compare car seats from top brands. Find detailed ADAC test results, customer reviews, and expert recommendations for the safest car seats of 2024.',
  robots: {
      index: true,
      follow: true,
  },
  keywords: [
      'car seat comparison',
      'ADAC car seat test 2024',
      'best car seats for babies',
      'safest car seats 2024',
      'child seat reviews',
      'top-rated infant car seats',
      'baby car seat safety ratings',
      'affordable car seats',
      'car seat buying guide 2024'
  ],
})

export default async function CarSeats({
  params: { lang },
}: {
  params: { lang: Locale };
}) {

  const dictionary = await getDictionary(lang);
  const initialData = await getAllCarSeats();
  const brands = await getCarSeatBrands();

  return (
      <>
        <CarseatsContent initialData={initialData} brands={brands} dictionary={dictionary.carseats} lang={lang}/>
      </>
  );
}
