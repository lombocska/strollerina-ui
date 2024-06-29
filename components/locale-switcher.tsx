"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { Locale, i18n } from "i18n-config";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const router = useRouter();
  const { theme } = useTheme(); // Access the current theme using next-themes hook

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
        <div className="flex-shrink-0 w-full max-w-md ">
            <Select
                radius="full"
                items={i18n.locales}
                placeholder={currentLocale || ""}
                className="max-w-lg min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
                onChange={handleLocaleChange}
                variant={"bordered"}
                aria-label="locale-switcher"
            >
                {i18n.locales.map(locale => (
                    <SelectItem key={locale} textValue={locale} className={`${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
                        {locale}
                    </SelectItem>
                ))}
            </Select>
        </div>
  );
}
