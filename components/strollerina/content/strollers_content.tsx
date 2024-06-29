'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { getDictionary } from 'get-dictionary';
import { FIVE_THOUSAND, ONE_HUNDRED_FIFTY, THIRTY, TWO_HUNDRED, ZERO } from 'lib/constants';
import { useState } from 'react';
import { BrandContentProps, StrollerCard, StrollerFilters, StrollersContentProps } from 'types';
import ProductCard from '../cards/product_card';
import CounterChip from '../filter/helper/counter_chip';
import StrollerFiltersCollection from '../filter/stroller_filters';
import SortingSelect from '../sorting_select';
import { useTheme } from 'next-themes';


export default  function StrollersContent({ initialData, brands, dictionary}: 
        {
            initialData: StrollersContentProps,
            brands: BrandContentProps,
            dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]
        }) {
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [strollers, setStrollers] = useState<StrollerCard[]>(initialData);
    const { theme } = useTheme(); // Access the current theme using next-themes hook

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
        {/* </div>  */}

            
        </>        
    );
}
