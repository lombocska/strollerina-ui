import ReviewHeaderContent from "@/components/strollerina/headers/review-header";
import { getDictionary } from "get-dictionary";
import { Locale } from "i18n-config";

export default async function RegisterSetupLayout({ children, params, }: { children: React.ReactNode; params: { lang: Locale }; }) {
  const dictionary = await getDictionary(params.lang);

  // Define the button labels and their links
  const headerLabelKey = 'register-setup-title';

  // Define the dictionary keys and hrefs for the buttons
  const buttonLabelKeys = [
      { href: "/reviews/register-setup/stroller", labelKey: 'review-stroller' },
      { href: "/reviews/register-setup/carseat", labelKey: 'review-carseat' },
      { href: "/reviews/register-setup", labelKey: 'review-combo' },
  ];

  return (
      <div>
          <ReviewHeaderContent 
              dictionary={dictionary} 
              headerLabelKey={headerLabelKey}
              buttonLabelKeys={buttonLabelKeys}
          />
          {children}
      </div>
      
  );
}
