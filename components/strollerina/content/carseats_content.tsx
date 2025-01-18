'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { getDictionary } from 'get-dictionary';
import { useLocalStorage } from 'lib/LocalStorageAPI';
import { useTheme } from 'next-themes';
import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import { useState } from 'react';
import { BrandContentProps, CarseatCard, CarseatsContentProps } from 'types';
import ProductCard from '../cards/product_card';
import CarSeatFiltersCollection from '../filter/carseat_filters';
import CounterChip from '../filter/helper/counter_chip';
import { CarSeatSortingSelect } from '../sorting_select';
import Link from 'next/link';
import { Badge } from '@nextui-org/react';
import { DiffIcon, HeartIcon } from 'lucide-react';

export default  function CarseatsContent({ initialData, brands, dictionary, lang}: 
    {
        initialData: CarseatsContentProps,
        brands: BrandContentProps,
        dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"],
        lang:Locale
    }) {

           
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [carseats, setCarseats] = useState<CarseatCard[]>(initialData);
    const { theme } = useTheme(); // Access the current theme using next-themes hook
    const [selectedCarseats, setSelectedCarseats] = useLocalStorage("carseats/compare", new Set());
    const encodedIds = Array.from(selectedCarseats).map(id => (id)).join(',');
   
    const handleSelectCard = (id: string) => {
        setSelectedCarseats((prevSelected: Set<string>) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
        console.log("Selected carseats for comparison ", selectedCarseats);
    };


    return (
       <>
            <main className="md:w-2/3 p-4  ">
            {carseats &&
            <>
                <div className="flex flex-wrap content-center items-center mb-5 rounded-full justify-between space-y-2">
                    <CounterChip title={"carseats"} number={carseats.length} dictionary={dictionary}/>
                    <CarSeatSortingSelect  carseats={carseats} setCarseats={setCarseats} dictionary={dictionary}/>
                    {selectedCarseats && (
                        <Link href={{ pathname:  "/" + lang + "/compare", query: { ids: encodedIds, type: 'carseat' } }}>
                            <Badge color="warning" content={selectedCarseats?.size} isInvisible={false} shape="circle">
                                <DiffIcon className="fill-current" size={25}/>
                            </Badge>
                        </Link>
                    )}
                </div>

                <div className="gap-2 grid grid-cols-1 sm:grid-cols-3" key={"carseats"}>
                    {carseats.map(item => (
                            <ProductCard
                                key={'carseat-' + item.id}
                                name={item.name}
                                brand={item.brand}
                                brandValue={item.brandValue}
                                img={item.img}
                                tags={item.bestAdac != null ? ['ADAC: ' + item.bestAdac] : []}
                                generatedId={item.generatedId}
                                infoLinkPrefix={'/carseats/'}
                                isSelected={selectedCarseats.has(item.generatedId)}
                                onSelect={handleSelectCard}
                            />
                    ))}
                </div>
                </>
            }
            </main>

            {/* carseat filters content  */}
            <aside className="hidden lg:block md:w-1/3 p-4  fixed right-0 top-16 h-full max-h-[1000px] bg-transparent overflow-y-auto ">
                <CarSeatFiltersCollection brands={brands} setCarseats={setCarseats}  dictionary={dictionary} 
                />
             </aside>
             
             <div className="lg:hidden fixed bottom-10 right-7 z-10">
                <Button onPress={onOpen} className={`${theme === 'dark' ? 'dark:bg-white dark:text-black' : 'bg-[#92987F] text-white'} shadow`}>{dictionary["common"].search}</Button>
            </div>

             <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="overflow-y-auto max-h-screen">
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">{dictionary["common"].info}</ModalHeader>
                        <ModalBody className="overflow-y-auto">
                            <CarSeatFiltersCollection brands={brands} setCarseats={setCarseats} dictionary={dictionary}  onClose={onClose} />
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
            {/* </div> */}
        </>        
    );
}
