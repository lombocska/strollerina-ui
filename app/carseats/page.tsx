
import CarseatsContent from '@/components/strollerina/content/carseats_content';
import { getAllCarSeats, getCarSeatBrands } from 'lib/data';
import { Metadata } from 'next';
import useTranslation from 'next-translate/useTranslation';


export function generateMetadata(): Metadata {
  const { t } = useTranslation("carseats");

  return {
    title: t`page-title`,
    description: t`page-description`
  };
}

export default async function CarSeats() {

  const initialData = await getAllCarSeats();
  const brands = await getCarSeatBrands();

  return (
      <>
        <CarseatsContent initialData={initialData} brands={brands}/>
      </>
  );
}
