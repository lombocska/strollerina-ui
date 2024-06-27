'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { getDictionary } from 'get-dictionary';
import { ONE_HUNDRED_FIFTY, ONE_THOUSAND_FIVE_HUNDRED, SIXSTY, THIRTY } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { BrandContentProps, CarSeatFilters, CarseatCard, CarseatsContentProps } from 'types';
import ProductCard from '../cards/product_card';
import CarSeatFiltersCollection from '../filter/carseat_filters';
import CounterChip from '../filter/helper/counter_chip';
import { CarSeatSortingSelect } from '../sorting_select';



export default  function CarseatsContent({ initialData, brands, dictionary}: 
    {
        initialData: CarseatsContentProps,
        brands: BrandContentProps,
        dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
    }) {

           
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [carseats, setCarseats] = useState<CarseatCard[]>(initialData);
    // const initialFilters : CarSeatFilters = 
    //     { 
    //         brandsName: [],
    //         adacsName: [],
    //         facingMode: [],
    //         maxWeigth: THIRTY,
    //         maxKidWeight: SIXSTY,
    //         maxKidHeight: ONE_HUNDRED_FIFTY,
    //         onlyWAdacTest: false,
    //         maxPrice: ONE_THOUSAND_FIVE_HUNDRED,
    //         tags: []
    // };

    // //filters
    // const [filters, setFilters] = useState(initialFilters);


    return (
       <>
            {/* <div className="ml-[calc(-50vw+50%+10px)] w-[calc(100vw-20px)] p-4 "> */}
            <main className="md:w-2/3 p-4  ">
            {/* <main className="md:w-2/3 p-4  "> */}
            {carseats &&
            <>
                <div className="flex flex-wrap content-center items-center mb-5 rounded-full justify-between space-y-2">
                    <CounterChip title={"carseats"} number={carseats.length} dictionary={dictionary}/>
                    <CarSeatSortingSelect  carseats={carseats} setCarseats={setCarseats} dictionary={dictionary}/>
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
            <aside className="hidden md:block md:w-1/3 p-4  fixed right-0 top-16 h-full max-h-[1000px] bg-transparent overflow-y-auto ">
                <CarSeatFiltersCollection brands={brands} setCarseats={setCarseats}  dictionary={dictionary} 
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
