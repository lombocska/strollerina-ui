import { getReviews } from 'lib/data'; // Import getReviews
import { getDictionary } from 'get-dictionary';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import { genPageMetadata } from '../seo';
import React from 'react';
import ReviewsContent from '@/components/strollerina/content/reviews_content';
import ReviewHeaderContent from '@/components/strollerina/headers/review-header';
import ReviewsContentWithFilter from '@/components/strollerina/content/reviews_content_with_filter';

export const metadata = genPageMetadata({
  title: 'Stroller and Car seat reviews',
  description: 'Strollers and car seat setups from moms',
  robots: {
    index: true,
    follow: true,
  },
});

export default async function Reviews({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // Fetch dictionary and reviews data asynchronously
  const dictionary = await getDictionary(lang);
  const reviewsData = await getReviews(); // Fetch the reviews data

  const headerLabelKey = 'main-text';
  const buttonLabelKeys = [
    { href: "/reviews/register-setup", labelKey: 'review-combo' },
  ];

  return (
    <>
      <ReviewHeaderContent 
          dictionary={dictionary} 
          headerLabelKey={headerLabelKey}
          buttonLabelKeys={buttonLabelKeys}
      />
      <ReviewsContentWithFilter
          dictionary={dictionary} 
          initialData={reviewsData}
      />
    </>
  );
}

