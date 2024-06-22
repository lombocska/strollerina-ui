'use client';

import { useLocalStorage } from 'lib/LocalStorageAPI';
import { FIVE_THOUSAND, ONE_HUNDRED_FIFTY, THIRTY, TWO_HUNDRED, ZERO } from 'lib/constants';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import ProductCard from '../cards/product_card';
import CounterChip from '../filter/helper/counter_chip';
import SortingSelect from '../sorting_select';
import { BrandContentProps, StrollerCard, StrollerFilters, StrollersContentProps } from 'types';
import StrollerFiltersCollection from '../filter/stroller_filters';


export default  function StrollersContent({ initialData, brands }: 
        {
            initialData: StrollersContentProps,
            brands: BrandContentProps
        }) {
    
    const { t } = useTranslation('strollers');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [strollers, setStrollers] = useState<StrollerCard[]>(initialData);
    const initialFilters : StrollerFilters = 
        {
            brandsName: [],
            maxHeight: TWO_HUNDRED,
            closedMaxHeight: TWO_HUNDRED,
            maxWidth: TWO_HUNDRED,
            maxLength: TWO_HUNDRED,
            closedMaxLength: ONE_HUNDRED_FIFTY,
            maxWeight: THIRTY,
            maxPrice: FIVE_THOUSAND,
            minSeatHeight: ZERO,
            minFrontWheelSize: ZERO,
            minBackWheelSize: ZERO,
            tags: []
    };

    //filters
    const [filters, setFilters] = useLocalStorage("stroller/filters", initialFilters);

    return (
       <>   
        {/* <main> */}
        <div className="ml-[calc(-50vw+50%+10px)] w-[calc(100vw-20px)] p-4 ">
        
        <main className="md:w-2/3 p-4  ">
            {/* <div className="grid grid-rows-1 grid-flow-col gap-4 justify-between w-full"> */}

            {/* <div className="grid grid-flow-col  content-center items-center mb-5 border-dotted border-4 rounded-full bg-zinc-100"> */}
        {strollers &&
            <>
                <div className="grid grid-flow-col  content-center items-center mb-5 rounded-full ">
                    <CounterChip title={"stroller-count"} number={strollers.length} />
                    <SortingSelect  strollers={strollers} setStrollers={setStrollers}/>
                </div>
                {/* <FilterStatusChips json={filters} /> */}

                <div className="gap-2 grid grid-cols-1 sm:grid-cols-3" key={"strollers"}>
                    {strollers.map(item => (
                            <ProductCard
                                key={'stroller-' + item.id}
                                name={item.name}
                                brand={item.brand}
                                brandValue={item.brandValue}
                                img={item.img}
                                price={item.priceFrom}
                                generatedId={item.generatedId}
                                infoLinkPrefix={'/strollers/'}
                            />
                    ))}
                </div>
                </>
        }
        </main>

        {/* stroller filter content  */}
            {/* <aside className="hidden md:block md:w-1/3 p-4  fixed right-0 top-16 h-full shadow-lg rounded-lg overflow-y-auto bg-transparent"> */}
            <aside className="hidden md:block md:w-1/3 p-4  fixed right-0 top-16 h-full max-h-[1000px] bg-transparent overflow-y-auto ">
                <StrollerFiltersCollection brands={brands} setStrollers={setStrollers} filters={filters} initialFilters={initialFilters} setFilters={setFilters} isCleared={false}/>
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
                            <StrollerFiltersCollection brands={brands} setStrollers={setStrollers} filters={filters} initialFilters={initialFilters} setFilters={setFilters} isCleared={false}/>
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
        </div>

            
        </>        
    );
}
