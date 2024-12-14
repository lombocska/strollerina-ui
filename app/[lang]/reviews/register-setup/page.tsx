
import React from 'react';
import RegisterSetupContent from '@/components/strollerina/content/register_setup_content';
import { genPageMetadata } from 'app/[lang]/seo';
import { getDictionary } from 'get-dictionary';
import { getCountries, getCurrencies } from 'lib/data';

export const metadata = genPageMetadata({
  title: 'Stroller and Car seat setup',
  description: 'Register and review your stroller - car sat setup',
  robots: {
    index: true,
    follow: true,
  },
});


export default async function RegisterSetup({ params: { lang } }) {
  
  const dictionary = await getDictionary(lang);
  const currencies = await getCurrencies();
  const countries = await getCountries();

  return (
    <RegisterSetupContent  dictionary={dictionary} currencies={currencies} countries={countries}/>
  );
}
