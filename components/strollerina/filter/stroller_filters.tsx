'use client';

import { clearLocalStorage } from 'lib/LocalStorageAPI';
import { FIVE_THOUSAND } from 'lib/constants';
import { getAllStrollers, searchStrollers } from 'lib/data';
import { deepCompare } from 'lib/util';
import { StrollerFiltersProps } from 'types';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from "@nextui-org/button";
import useTranslation from 'next-translate/useTranslation';
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


export default function StrollerFiltersCollection({brands, setStrollers, filters, initialFilters, setFilters} : StrollerFiltersProps) {
    
    const { t } = useTranslation('strollers');
    const [isCleared, setIsCleared] = useState(false);

    useEffect(() => {
        console.log("stroller filters changing")
        const isEqual = deepCompare(filters, initialFilters);
        if (isEqual) {
            console.log("initial filters equal with slected ones" );
            setIsCleared(false);
        }
    }, [filters]); 

    const search = async () => {
        if (setStrollers) {
            console.log("Search with  " + filters.selectedBrands)
            searchStrollers(filters.brandsName,
                filters.maxHeight, filters.closedMaxHeight, filters.maxWidth, filters.maxLength,
                filters.closedMaxLength, filters.maxWeight, filters.maxPrice, filters.minSeatHeight,
                filters.siblingMode, filters.reversibleSeatMode, filters.fullRecliningSeatMode,
                filters.minFrontWheelSize, filters.minBackWheelSize, filters.tags
            )
                .then(res => setStrollers(res));
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

    }
    
    return (
       
        <Card className="">
            <CardHeader className="flex gap-3 justify-between">
                {/* <div className="flex justify-between m-3 mb-6"> */}
                
                    <Button radius="full" size="lg" variant="ghost" onPress={() => search()}>
                        {t('search')}
                    </Button>
                    <Button  radius="full" size="lg" variant="ghost" onPress={() => clearFilters()}>
                        {t('clear')}
                    </Button>  
                {/* </div> */}
            </CardHeader>
            <Divider/>
            <CardBody>
            <div className="grid grid-flow-row-dense grid-cols-2">
                <BrandSelection brands={brands} setFilters={setFilters} isCleared={isCleared}/>
                
                <SelectMaxPrice setFilters={setFilters} isCleared={isCleared} lSPrefix={"stroller/"} defaultMaxPrice={FIVE_THOUSAND}/>
            </div>

            <Accordion className='m-1 mb-10' variant="bordered" selectionMode="multiple">
                <AccordionItem key="filters-accordion-1" aria-label={t('filters.section-dimension-title')} title={t('filters.section-dimension-title')} >
                    <StrollerDimensionFilters setFilters={setFilters} isCleared={isCleared}/>
                </AccordionItem>

                <AccordionItem key="filters-accordion-2" aria-label={t('filters.section-seat-title')} title={t('filters.section-seat-title')} >                
                    <StrollerSeatFilters setFilters={setFilters} isCleared={isCleared}/>
                </AccordionItem>

                <AccordionItem key="filters-accordion-3" aria-label={t('filters.section-fold-title')} title={t('filters.section-fold-title')} >                
                    <StrollerFoldFilters setFilters={setFilters} isCleared={isCleared}/>
                </AccordionItem>

                <AccordionItem key="filters-accordion-4" aria-label={t('filters.section-terrain-title')} title={t('filters.section-terrain-title')} >                
                    <StrollerTerrainFilters setFilters={setFilters} isCleared={isCleared}/>
                </AccordionItem>

                <AccordionItem key="filters-accordion-5" aria-label={t('filters.section-harness-title')} title={t('filters.section-harness-title')} >                
                    <StrollerHarnessFilters setFilters={setFilters} isCleared={isCleared}/>
                </AccordionItem>

                <AccordionItem key="filters-accordion-6" aria-label={t('filters.section-warranty-title')} title={t('filters.section-warranty-title')} >                
                    <StrollerWarrantyFilters setFilters={setFilters} isCleared={isCleared}/>
                </AccordionItem>

                <AccordionItem key="filters-accordion-7" aria-label={t('filters.section-other-features-title')} title={t('filters.section-other-features-title')} >                
                    <StrollerOtherFilters setFilters={setFilters} isCleared={isCleared}/>
                </AccordionItem>
            </Accordion>
            </CardBody>
        </Card>
              
    );
}
