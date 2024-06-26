'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { getDictionary } from 'get-dictionary';
import { FIVE_THOUSAND, ONE_HUNDRED_FIFTY, THIRTY, TWO_HUNDRED, ZERO } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { BrandContentProps, StrollerCard, StrollerFilters, StrollersContentProps } from 'types';
import ProductCard from '../cards/product_card';
import CounterChip from '../filter/helper/counter_chip';
import StrollerFiltersCollection from '../filter/stroller_filters';
import SortingSelect from '../sorting_select';

const DynamicUseLocalStorage = dynamic(() => import('lib/LocalStorageAPI'), {
  ssr: false,
});


export default  function StrollersContent({ initialData, brands, dictionary}: 
        {
            initialData: StrollersContentProps,
            brands: BrandContentProps,
            dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]
        }) {
    
    // const useLocalStorage = dynamic(() => import('lib/LocalStorageAPI'), {
    //     ssr: false,
    // })
            
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
    const [filters, setFilters] = useState(initialFilters);

    return (
        <>
    
        
        {/* <div className="ml-[calc(-50vw+50%+10px)] w-[calc(100vw-20px)] p-4 "> */}
        <main className="md:w-2/3 p-4  ">

        {strollers &&
            <>
                <div className="flex flex-wrap content-center items-center mb-5 rounded-full justify-between space-y-2">
                    <CounterChip title={"strollers"} number={strollers.length} dictionary={dictionary}/>
                    <SortingSelect strollers={strollers} setStrollers={setStrollers} dictionary={dictionary} />
                </div>

                {/* <div className="gap-2 grid grid-cols-1 sm:grid-cols-3" key={"strollers"}> */}
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">

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

            <aside className="hidden md:block md:w-1/3 p-4 fixed right-0 top-16 h-full max-h-[1000px] overflow-y-auto ">
                <StrollerFiltersCollection 
                brands={brands} 
                setStrollers={setStrollers} 
                filters={filters} 
                initialFilters={initialFilters} 
                setFilters={setFilters} 
                dictionary={dictionary}
                />
             </aside>
             
             <div className="md:hidden fixed bottom-4 right-4 z-10">
                <Button onPress={onOpen}>{dictionary["common"].info}</Button>
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
                            filters={filters} 
                            initialFilters={initialFilters} 
                            setFilters={setFilters} 
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
        {/* </div>  */}

            
        </>        
    );
}
