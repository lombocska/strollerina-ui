
import CarseatsContent from '@/components/strollerina/content/carseats_content';
import { getDictionary } from 'get-dictionary';
import { getAllCarSeats, getCarSeatBrands } from 'lib/data';
import { Metadata } from 'next';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';


// export function generateMetadata(): Metadata {

//   return {
//     title: t`page-title`,
//     description: t`page-description`
//   };
// }

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
        <CarseatsContent initialData={initialData} brands={brands} dictionary={dictionary.carseats}/>
      </>
  );
}
