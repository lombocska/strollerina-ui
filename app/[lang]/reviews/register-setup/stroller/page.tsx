
import React from 'react';
import { genPageMetadata } from 'app/[lang]/seo';
import { getDictionary } from 'get-dictionary';
import RegisterSetupStrollerContent from '@/components/strollerina/content/register_setup_stroller_content';
import { getCountries, getCurrencies } from 'lib/data';

export const metadata = genPageMetadata({
  title: 'Stroller setup',
  description: 'Register and review your stroller',
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
    <RegisterSetupStrollerContent  dictionary={dictionary} currencies={currencies} countries={countries}/>
  );
}
