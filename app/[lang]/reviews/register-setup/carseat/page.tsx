
import React from 'react';
import { genPageMetadata } from 'app/[lang]/seo';
import { getDictionary } from 'get-dictionary';
import RegisterSetupCarSeatContent from '@/components/strollerina/content/register_setup_carseat_contet';
import { getCountries, getCurrencies } from 'lib/data';

export const metadata = genPageMetadata({
  title: 'Car seat setup',
  description: 'Register and review your car seat',
  robots: {
    index: true,
    follow: true,
  },
});


export default async function RegisterSetup({ params: { lang } }) {
  
  const dictionary = await getDictionary(lang);
  const currencies = await getCurrencies();
  const countries = await getCountries()

  return (
    <RegisterSetupCarSeatContent  dictionary={dictionary} currencies={currencies} countries={countries}/>
  );
}
