"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getDictionary } from "get-dictionary"; // Import your dictionary fetching function

export default function ObligatoryPages({ pages, dictionary }) {
  const pathName = usePathname();
  const router = useRouter();
  const { theme } = useTheme(); // Access the current theme using next-themes hook

  const [currentPage, setCurrentPage] = useState<string | null>(null);

  // Create a function to navigate to the selected page's href
  const redirectedPathName = (title: string) => {
    const selectedPage = pages.find((page) => page.title === title);
    return selectedPage ? selectedPage.href : "/";
  };

  // Handle page change on selection
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = e.target.value;
    const newPath = redirectedPathName(selectedTitle);
    router.push(newPath); // Use Next.js router to navigate
  };

  // Update the current page based on the pathname
  useEffect(() => {
    if (pathName) {
      // Remove the locale part (e.g., en/ or hu/)
      const pathWithoutLocale = pathName.split("/").slice(2).join("/");

      // Extract the last part of the pathname (after the last slash)
      const lastSegment = pathWithoutLocale.split("/").pop() || "";

      const selectedPage = pages.find((page) => page.href.replace("/", "") === lastSegment);

      if (selectedPage) {
        setCurrentPage(lastSegment); // Set the current page based on the last part of the pathname
      }
    }
  }, [pathName, pages]);

  return (
    <div className="flex-shrink-0 w-full max-w-md">
      <Select
        radius="full"
        items={pages.map((page) => dictionary[page.title] || page.title)} // Use the dictionary for translating the titles
        placeholder={currentPage ? dictionary["obligatory"][currentPage] || currentPage : dictionary["obligatory"]["select"]} // Dynamically set the placeholder
        className="max-w-lg min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
        onChange={handlePageChange}
        variant="bordered"
        aria-label="obligatory-pages-switcher"
      >
        {pages.map((item) => (
          <SelectItem
            key={item.title}
            textValue={item.title}
            className={`${theme === "dark" ? "dark:text-white" : "text-black"}`}
          >
            {dictionary["obligatory"][item.href.replace("/", "")] || item.title} {/* Use the dictionary to display the translated title */}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
