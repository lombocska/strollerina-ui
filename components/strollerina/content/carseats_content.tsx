'use client';

import { useLocalStorage } from '@/lib/LocalStorageAPI';
import { ONE_HUNDRED_FIFTY, ONE_THOUSAND_FIVE_HUNDRED, SIXSTY, THIRTY } from '@/lib/constants';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import CarSeatFiltersCollection from '../filter/carseat_filters';
import CounterChip from '../filter/helper/counter_chip';
import { CarSeatSortingSelect } from '../sorting_select';
import ProductCard from '../cards/product_card';
import { BrandContentProps, CarseatCard, CarseatsContentProps, CarSeatFilters } from '@/types';
import { Button } from '@nextui-org/button';


export default  function CarseatsContent({ initialData, brands }: 
        {
            initialData: CarseatsContentProps,
            brands: BrandContentProps
        }) {
    
    const { t } = useTranslation('carseats');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [carseats, setCarseats] = useState<CarseatCard[]>(initialData);

    const initialFilters : CarSeatFilters = 
        { 
            brandsName: [],
            adacsName: [],
            facingMode: [],
            maxWeigth: THIRTY,
            maxKidWeight: SIXSTY,
            maxKidHeight: ONE_HUNDRED_FIFTY,
            onlyWAdacTest: false,
            maxPrice: ONE_THOUSAND_FIVE_HUNDRED,
            tags: []
    };

    //filters
    const [filters, setFilters] = useLocalStorage("carseat/filters", initialFilters);

    return (
       <>
            
            <main className="md:w-2/3 p-4  ">
            {carseats &&
            <>
                <div className="grid grid-flow-col  content-center items-center mb-5 rounded-full ">
                    <CounterChip title={"carseat-count"} number={carseats.length} />
                    <CarSeatSortingSelect  carseats={carseats} setCarseats={setCarseats}/>
                </div>

                <div className="gap-2 grid grid-cols-1 sm:grid-cols-3" key={"carseats"}>
                    {carseats.map(item => (
                            <ProductCard
                                key={'carseat-' + item.id}
                                name={item.name}
                                brand={item.brand}
                                brandValue={item.brandValue}
                                img={item.img}
                                price={null}
                                generatedId={item.generatedId}
                                infoLinkPrefix={'/carseats/'}
                            />
                    ))}
                </div>
                </>
            }
            </main>

            {/* carseat filters content  */}
            <aside className="hidden md:block md:w-1/3 p-4  fixed right-0 top-16 h-full shadow-lg rounded-lg overflow-y-auto ">
                <CarSeatFiltersCollection brands={brands} setCarseats={setCarseats} filters={filters} initialFilters={initialFilters} setFilters={setFilters}/>
             </aside>
             
             <div className="md:hidden fixed bottom-4 right-4 z-10">
                <Button onPress={onOpen}>{t('common:info')}</Button>
            </div>

             <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="overflow-y-auto max-h-screen">
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">{t('info')}</ModalHeader>
                        <ModalBody className="overflow-y-auto">
                            <CarSeatFiltersCollection brands={brands} setCarseats={setCarseats} filters={filters} initialFilters={initialFilters} setFilters={setFilters}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                {t('close')}
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>        
    );
}
