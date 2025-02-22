'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Badge, Input } from '@nextui-org/react';
import { getDictionary } from 'get-dictionary';
import { useLocalStorage } from 'lib/LocalStorageAPI';
import { useCurrency } from 'lib/context/currency_context';
import { ChevronsRightLeft, DiffIcon, GitCompareIcon, HeartIcon, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import Link from 'next/link';
import { useState } from 'react';
import { BrandContentProps, StrollerCard, StrollersContentProps, StrollerSearchByNameDto } from 'types';
import ProductCard from '../cards/product_card';
import CounterChip from '../filter/helper/counter_chip';
import StrollerFiltersCollection from '../filter/stroller_filters';
import SortingSelect from '../sorting_select';
import { searchStrollerByName } from 'lib/data';
import GoogleAdSidePanel from '@/components/monetization/GoogleAdSidePanel';
import BuyMeACoffeeSupport from '@/components/monetization/BuyMeaCoffee';


export default function StrollersContent({ initialData, brands, dictionary, lang }:
    {
        initialData: StrollersContentProps,
        brands: BrandContentProps,
        dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"],
        lang: Locale
    }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [strollers, setStrollers] = useState<StrollerCard[]>(initialData);
    const [selectedStrollers, setSelectedStrollers] = useLocalStorage("strollers/compare", new Set());
    const encodedIds = Array.from(selectedStrollers).map(id => (id)).join(',');
    // const selectedStrollersQueryParam = Array.from(selectedStrollers).join(',');
    // const queryParam = encodeURIComponent(selectedStrollersQueryParam);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<StrollerSearchByNameDto[]>([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const { theme } = useTheme(); // Access the current theme using next-themes hook
    const { state } = useCurrency();
    const { currency, multiplicator } = state;


    const handleSelectCard = (id: string) => {
        setSelectedStrollers((prevSelected: Set<string>) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
        console.log("Selected stroller for comparison ", selectedStrollers);
    };

    //search based in quick name input field
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.length >= 2) {
            try {
                // Call the helper function to fetch strollers
                const data = await searchStrollerByName(query);
                setSearchResults(data); // Set the results from the API
                setDropdownOpen(true); // Open the dropdown
            } catch (error) {
                console.error("Error fetching strollers:", error);
            }
        } else {
            // Clear results and close the dropdown if query is too short
            setSearchResults([]);
            setDropdownOpen(false);
        }
    };


    return (
        <>
            <GoogleAdSidePanel />

            <main className="md:w-2/3 p-4  ">

                {strollers &&
                    <>
                        <div className="flex flex-wrap content-center items-center mb-5 rounded-full justify-between space-y-2">

                            <CounterChip title={"strollers"} number={strollers.length} dictionary={dictionary} />
                            <SortingSelect strollers={strollers} setStrollers={setStrollers} dictionary={dictionary} />

                            {selectedStrollers && (
                                <Link className='hidden lg:block' href={{ pathname: "/" + lang + "/compare", query: { ids: encodedIds } }}>
                                    <Badge color="warning" content={selectedStrollers?.size} isInvisible={false} shape="circle">
                                        <ChevronsRightLeft size={30} />
                                    </Badge>
                                </Link>
                            )}
                        </div>

                        <div className="w-full mb-5 relative">
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search for a stroller name..."
                                // className="w-full p-2 border border-gray-300 rounded-lg"
                                className="w-full p-2 border border-transparent rounded-lg focus:border-blue-500 focus:outline-none"
                                style={{
                                    color: "inherit",
                                    caretColor: "transparent",
                                    borderColor: 'transparent'
                                }}
                            />

                            {isDropdownOpen && searchResults && (
                                <ul className="absolute z-10 w-full bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-md mt-2">
                                    {searchResults.map((stroller) => (
                                        <li key={stroller.generatedId} className="p-2 hover:bg-gray-100">
                                            <a
                                                href={`/${lang}/strollers/${stroller.internalLink}`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {stroller.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">

                            {strollers.map((item, index) => (
                                <>
                                    <ProductCard
                                        key={'stroller-' + item.id}
                                        name={item.name}
                                        brand={item.brand}
                                        brandValue={item.brandValue}
                                        img={item.img}
                                        tags={item.priceFrom != null ? [Math.round(item.priceFrom * multiplicator) + "+ " + currency] : []}
                                        generatedId={item.generatedId}
                                        infoLinkPrefix={'/strollers/'}
                                        isSelected={selectedStrollers.has(item.generatedId)}
                                        onSelect={handleSelectCard}
                                    />
                                    {/* {(index + 1) % 6 === 0 && (
                                        <div className="w-full col-span-full my-1">
                                            <AmongProductsGoogleAd />
                                        </div>
                                    )} */}
                                </>

                            ))}
                        </div>
                    </>
                }
            </main>

            <aside className="hidden lg:block md:w-1/3 p-4 fixed right-0 top-16 h-full max-h-[1000px] overflow-y-auto ">
                <StrollerFiltersCollection
                    brands={brands}
                    setStrollers={setStrollers}
                    dictionary={dictionary}
                />
            </aside>

            {/* MOBILE FLOATING SIDE BUTTONS */}
            <div className="lg:hidden fixed right-0 top-1/2 z-99 flex flex-col gap-4 transform -translate-y-1/2">
                {/* Search Button */}
                <Button
                    isIconOnly
                    radius="none"
                    size="lg"
                    aria-label="search"
                    onPress={onOpen}
                    className={`${theme === 'dark' ? 'dark:bg-[#92987F] dark:text-black' : 'bg-[#92987F] text-white'}
            shadow rounded-l-full hover:scale-110 transition-transform`}
                >
                    <Search />
                </Button>

                {/* Compare Button with Badge */}
                {selectedStrollers && (
                    <div className="lg:hidden fixed right-0 top-[calc(50%+4rem)] z-99" id="compare">
                        <Badge
                            color="warning"
                            content={selectedStrollers?.size} // Number of selected strollers
                            isInvisible={selectedStrollers?.size === 0} // Hide badge if no strollers
                            shape="circle"
                        >
                            <Button
                                isIconOnly
                                radius="none"
                                size="lg"
                                aria-label="compare"
                                onPress={() => {
                                    // Redirect to the compare page with the selected strollers
                                    const query = { pathname: `/${lang}/compare`, query: { ids: encodedIds } };
                                    window.location.href = `${query.pathname}?${new URLSearchParams(query.query).toString()}`;
                                }}
                                className={`${theme === 'dark' ? 'dark:bg-[#92987F] dark:text-black' : 'bg-[#92987F] text-white'}
                    shadow rounded-l-full`}
                            >
                                <ChevronsRightLeft />
                            </Button>
                        </Badge>
                    </div>
                )}

                {/* Buy Me a Coffee Button */}
                <BuyMeACoffeeSupport
                    clsName={`${theme === 'dark' ? 'dark:bg-[#92987F] dark:text-black' : 'bg-[#92987F] text-white'}
            shadow rounded-l-full`}
                />
            </div>


            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="overflow-y-auto max-h-screen">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{dictionary["common"].info}</ModalHeader>
                            <ModalBody className="overflow-y-auto">
                                <StrollerFiltersCollection
                                    brands={brands}
                                    setStrollers={setStrollers}
                                    dictionary={dictionary}
                                    onClose={onClose}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    {dictionary["common"].close}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </>
    );
}
