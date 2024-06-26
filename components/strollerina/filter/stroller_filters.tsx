'use client';

import { clearLocalStorage } from 'lib/LocalStorageAPI';
import { FIVE_THOUSAND } from 'lib/constants';
import { getAllStrollers, searchStrollers } from 'lib/data';
import { deepCompare } from 'lib/util';
import { BrandContentProps, StrollerCard, StrollerFiltersProps } from 'types';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from "@nextui-org/button";
import { useEffect, useState } from 'react';
import BrandSelection from './input_fields/brand_selection';
import SelectMaxPrice from "./input_fields/input_max_price";
import StrollerDimensionFilters from "./stroller_filters/stroller_dimension_filters";
import StrollerFoldFilters from './stroller_filters/stroller_fold_filters';
import StrollerHarnessFilters from './stroller_filters/stroller_harness_filters';
import StrollerOtherFilters from './stroller_filters/stroller_other_filters';
import StrollerSeatFilters from './stroller_filters/stroller_seat_filters';
import StrollerTerrainFilters from './stroller_filters/stroller_terrain_filters';
import StrollerWarrantyFilters from './stroller_filters/stroller_warranty_filters';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/react';
import { getDictionary } from 'get-dictionary';
import StrollerBumperFilters from './stroller_filters/stroller_bumper_filters';

export default function StrollerFiltersCollection({ brands, setStrollers, filters, initialFilters, setFilters, dictionary, onClose } : {
    isCleared: boolean | false;
    brands: BrandContentProps;
    setStrollers: React.Dispatch<React.SetStateAction<StrollerCard[]>>;
    filters: any; 
    initialFilters: any; 
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"];
    onClose?: () => void;
}) {
    
    const [isCleared, setIsCleared] = useState(false);

    useEffect(() => {
        console.log("stroller filters changing");
        const isEqual = deepCompare(filters, initialFilters);
        if (isEqual) {
            console.log("initial filters equal with selected ones");
            setIsCleared(false);
        }
    }, [filters]); 

    const search = async () => {
        if (setStrollers) {
            console.log("Search with  " + filters.selectedBrands);
            const res = await searchStrollers(filters.brandsName,
                filters.maxHeight, filters.closedMaxHeight, filters.maxWidth, filters.maxLength,
                filters.closedMaxLength, filters.maxWeight, filters.maxPrice, filters.minSeatHeight,
                filters.siblingMode, filters.reversibleSeatMode, filters.fullRecliningSeatMode,
                filters.minFrontWheelSize, filters.minBackWheelSize, filters.tags
            );
            setStrollers(res);
            if (onClose) {
                onClose();
            }
        }
    };

    const clearFilters = async () => {
        if (setStrollers) {
            let allStrollers = await getAllStrollers();
            setStrollers(allStrollers);
        }
        setIsCleared(true);

        clearLocalStorage('stroller/selectedBrandsName');
        clearLocalStorage('stroller/selectedMaxHeight');
        clearLocalStorage('stroller/selectedClosedMaxHeight');
        clearLocalStorage('stroller/selectedMaxWidth');
        clearLocalStorage('stroller/selectedMaxLength');
        clearLocalStorage('stroller/selectedClosedMaxLength');
        clearLocalStorage('stroller/selectedMaxWeight');
        clearLocalStorage('stroller/selectedMaxPrice');
        clearLocalStorage('stroller/selectedMinSeatHeight');
        clearLocalStorage('stroller/selectedMinFrontWheelSize');
        clearLocalStorage('stroller/selectedMinBackWheelSize');
        clearLocalStorage('stroller/selectedSiblingMode');
        clearLocalStorage('stroller/selectedReversibleSeatMode');
        clearLocalStorage('stroller/selectedFullRecliningSeatMode');
        clearLocalStorage('stroller/selectedSeatTags');
        clearLocalStorage('stroller/selectedDimensionTags');
        clearLocalStorage('stroller/selectedFoldTags');
        clearLocalStorage('stroller/selectedBumperTags');
        clearLocalStorage('stroller/selectedHarnessTags');
        clearLocalStorage('stroller/selectedOtherTags');
        clearLocalStorage('stroller/selectedTerrainTags');
        clearLocalStorage('stroller/selectedWarrantyTags');
        if (setFilters) {
            setFilters(initialFilters);
        }
    };
    
    return (
        <Card className="">
            <CardHeader className="flex gap-3 justify-between">
                <Button radius="full" size="lg" variant="ghost" onPress={() => search()}>
                    {dictionary['common']["search"]}
                </Button>
                <Button radius="full" size="lg" variant="ghost" onPress={() => clearFilters()}>
                    {dictionary['common']["clear"]}
                </Button>  
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className="grid grid-flow-row-dense grid-cols-2">
                    <BrandSelection brands={brands} setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    <SelectMaxPrice 
                        setFilters={setFilters} 
                        isCleared={isCleared} 
                        lSPrefix={"stroller/"} 
                        defaultMaxPrice={FIVE_THOUSAND} 
                        title={dictionary["filters"]['max-price']}
                        label={dictionary["filters"]['max-price']}
                    />
                </div>

                <Accordion className='m-1 mb-10' variant="bordered" selectionMode="multiple">
                    <AccordionItem 
                        key="filters-accordion-1" 
                        aria-label={dictionary['filters']['section-dimension-title']} 
                        title={dictionary['filters']['section-dimension-title']} 
                    >
                        <StrollerDimensionFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-2" 
                        aria-label={dictionary['filters']['section-seat-title']} 
                        title={dictionary['filters']['section-seat-title']} 
                    >              
                        <StrollerSeatFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-3" 
                        aria-label={dictionary['filters']['section-fold-title']} 
                        title={dictionary['filters']['section-fold-title']} 
                    >                   
                        <StrollerFoldFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-4" 
                        aria-label={dictionary['filters']['section-terrain-title']} 
                        title={dictionary['filters']['section-terrain-title']} 
                    >                
                        <StrollerTerrainFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-5" 
                        aria-label={dictionary['filters']['section-harness-title']} 
                        title={dictionary['filters']['section-harness-title']} 
                    >
                        <StrollerHarnessFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-6" 
                        aria-label={dictionary['filters']['section-warranty-title']} 
                        title={dictionary['filters']['section-warranty-title']}
                    >
                        <StrollerWarrantyFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-7" 
                        aria-label={dictionary['filters']['section-bumper-title']} 
                        title={dictionary['filters']['section-bumper-title']}
                    >
                        <StrollerBumperFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-8"
                        aria-label={dictionary['filters']['section-other-features-title']} 
                        title={dictionary['filters']['section-other-features-title']}
                    >
                        <StrollerOtherFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary}/>
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    );
}
