
import { getAllStrollers, getBrands } from 'lib/data';
import StrollersContent from '@/components/strollerina/content/strollers_content';
import useTranslation from 'next-translate/useTranslation';



export default async function Strollers() {

  const { t } = useTranslation('strollers');

  const initialData = await getAllStrollers();
  const brands = await getBrands();

  return (
      <>
        <StrollersContent initialData={initialData} brands={brands}/>
      </>
  );
}
