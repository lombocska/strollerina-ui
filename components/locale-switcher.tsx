"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n, Locale } from "i18n-config";
import { useEffect, useState } from "react";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale | null>(null);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(redirectedPathName(e.target.value as Locale));
  };

  useEffect(() => {
    if (pathName) {
      const segments = pathName.split("/");
      const locale = segments[1] as Locale;
      if (i18n.locales.includes(locale)) {
        setCurrentLocale(locale);
      }
    }
  }, [pathName]);

  return (
    <select
      value={currentLocale || ""}
      onChange={handleLocaleChange}
      className=" text-sm border rounded-md py-1 px-2 bg-secondary text-muted-foreground hover:text-foreground min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
    >
      {i18n.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}
