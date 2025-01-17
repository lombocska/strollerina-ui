'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Badge } from '@nextui-org/react';
import { getDictionary } from 'get-dictionary';
import { useLocalStorage } from 'lib/LocalStorageAPI';
import { useCurrency } from 'lib/context/currency_context';
import { DiffIcon, GitCompareIcon, HeartIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import Link from 'next/link';
import { useState } from 'react';
import { BrandContentProps, StrollerCard, StrollersContentProps } from 'types';
import ProductCard from '../cards/product_card';
import CounterChip from '../filter/helper/counter_chip';
import StrollerFiltersCollection from '../filter/stroller_filters';
import SortingSelect from '../sorting_select';


export default  function StrollersContent({ initialData, brands, dictionary, lang}: 
        {
            initialData: StrollersContentProps,
            brands: BrandContentProps,
            dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"],
            lang:Locale
        }) {
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [strollers, setStrollers] = useState<StrollerCard[]>(initialData);
    const [selectedStrollers, setSelectedStrollers] = useLocalStorage("strollers/compare", new Set());
    const encodedIds = Array.from(selectedStrollers).map(id => (id)).join(',');
    // const selectedStrollersQueryParam = Array.from(selectedStrollers).join(',');
    // const queryParam = encodeURIComponent(selectedStrollersQueryParam);

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

    return (
        <>
    
        
        <main className="md:w-2/3 p-4  ">

        {strollers &&
            <>
                <div className="flex flex-wrap content-center items-center mb-5 rounded-full justify-between space-y-2">
            
                    <CounterChip title={"strollers"} number={strollers.length} dictionary={dictionary}/>
                    <SortingSelect strollers={strollers} setStrollers={setStrollers} dictionary={dictionary} />

                    {selectedStrollers && (
                        <Link href={{ pathname:  "/" + lang + "/compare", query: { ids: encodedIds } }}>
                            <Badge color="warning" content={selectedStrollers?.size} isInvisible={false} shape="circle">
                                <DiffIcon className="fill-current" size={25}/>
                            </Badge>
                        </Link>
                    )}
                </div>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">

                    {strollers.map(item => (
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
             
             <div className="lg:hidden fixed bottom-4 right-4 z-10">
                <Button onPress={onOpen} className={`${theme === 'dark' ? 'dark:bg-[#92987F] dark:text-black' : 'bg-[#92987F] text-white'} shadow`}>{dictionary["common"].search}</Button>
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
