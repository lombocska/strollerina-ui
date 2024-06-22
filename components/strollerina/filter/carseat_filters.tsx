'use client';

import { clearLocalStorage } from '@/lib/LocalStorageAPI';
import { ONE_THOUSAND_FIVE_HUNDRED } from '@/lib/constants';
import { getAllCarSeats, searchCarSeats } from '@/lib/data';
import { deepCompare } from '@/lib/util';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from "@nextui-org/button";
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import CarSeatAdacFilters from './carseat_filters/carseat_adac_filters';
import CarSeatKidDimensionFilters from './carseat_filters/carseat_kid_dimension_filters';
import BrandSelection from './input_fields/brand_selection';
import SelectMaxPrice from "./input_fields/input_max_price";
import CarSeatSeatDimensionFilters from './carseat_filters/carseat_seat_dimension_filters';
import CarSeatBaseFilters from './carseat_filters/carseat_base_filters';
import CarSeatCanopyFilters from './carseat_filters/carseat_canopy_filters';
import CarSeatHarnessFilters from './carseat_filters/carseat_harness_filters';
import CarSeatCertificationFilters from './carseat_filters/carseat_certification_filters';
import CarSeatOtherFilters from './carseat_filters/carseat_other_filters';
import { CarSeatFiltersProps } from '@/types';


export default function CarSeatFiltersCollection({brands, setCarseats, filters, initialFilters, setFilters}: CarSeatFiltersProps) {
    
    const { t } = useTranslation('carseats');


    const [isCleared, setIsCleared] = useState(false);

    useEffect(() => {
        console.log("carseat filters changing")
        const isEqual = deepCompare(filters, initialFilters);
        if (isEqual) {
            console.log("initial filters equal with slected ones" );
            setIsCleared(false);
        }
    }, [filters, initialFilters]); 


    const search = async () => {
        console.log("Search with  " + filters.selectedBrands)

        if (setCarseats) {
            searchCarSeats(filters.brandsName, 
                            filters.adacsName,
                            filters.onlyWAdacTest, 
                            filters.maxWeigth, 
                            filters.maxKidWeight, 
                            filters.facingMode, 
                            filters.maxPrice,
                            filters.maxKidHeight,
                            filters.tags
                )
                .then(res => setCarseats(res));
        }
       
    };

    const clearFilters = async () => {
        if (setCarseats) {
            let all= await getAllCarSeats();
            setCarseats(all);
        }
        setIsCleared(true);

        clearLocalStorage('carseat/selectedBrandsName');
        clearLocalStorage('carseat/selectedAdacsName');
        clearLocalStorage('carseat/selectedFacingMode');
        clearLocalStorage('carseat/selectedMaxWeight');
        clearLocalStorage('carseat/selectedMaxKidWeight');
        clearLocalStorage('carseat/selectedMaxKidHeight');
        clearLocalStorage('carseat/selectedMaxPrice');
        clearLocalStorage('carseat/selectedOnlyWAdactTest');
        clearLocalStorage('carseat/selectedTags');
        clearLocalStorage('carseat/selectedKidDimensionTags');
        clearLocalStorage('carseat/selectedSeatDimensionTags');
        clearLocalStorage('carseat/selectedBaseTags');
        clearLocalStorage('carseat/selectedHarnessTags');
        clearLocalStorage('carseat/selectedCertificationTags');
        clearLocalStorage('carseat/selectedOtherTags');
    
        if (setFilters) {
            setFilters(initialFilters);
        }

    }
    
    return (
        <>
            <div className="flex justify-between m-3 mb-6">
                <Button radius="full" size="lg" variant="ghost" onPress={() => search()}>
                    {t('search')}
                </Button>
                <Button  radius="full" size="lg" variant="ghost" onPress={() => clearFilters()}>
                    {t('clear')}
                </Button>  
            </div>
        
            <div className="grid grid-flow-row-dense grid-cols-2">
                <BrandSelection brands={brands} setFilters={setFilters} isCleared={isCleared}/>
   
                <SelectMaxPrice setFilters={setFilters} isCleared={isCleared} lSPrefix={"carseat/"} defaultMaxPrice={ONE_THOUSAND_FIVE_HUNDRED}/>
            </div>

            <Accordion className='m-1 mb-10' variant="bordered" selectionMode="multiple">
                <AccordionItem key="filters-accordion-1" aria-label={t('filters.section-adac-title')} title={t('filters.section-adac-title')} >
                    <CarSeatAdacFilters setFilters={setFilters}  isCleared={isCleared} />
                </AccordionItem>

                <AccordionItem key="filters-accordion-2" aria-label={t('filters.section-kid-dimension-title')} title={t('filters.section-kid-dimension-title')} >  
                    <CarSeatKidDimensionFilters  setFilters={setFilters} isCleared={isCleared} />    
                </AccordionItem>

                <AccordionItem key="filters-accordion-3" aria-label={t('filters.section-seat-title')} title={t('filters.section-seat-title')} >                
                    <CarSeatSeatDimensionFilters  setFilters={setFilters} isCleared={isCleared} />    
                </AccordionItem>

                <AccordionItem key="filters-accordion-4" aria-label={t('filters.section-base-title')} title={t('filters.section-base-title')} >  
                    <CarSeatBaseFilters  setFilters={setFilters} isCleared={isCleared} />    
                </AccordionItem>

                <AccordionItem key="filters-accordion-5" aria-label={t('filters.section-canopy-title')} title={t('filters.section-canopy-title')} >                
                    <CarSeatCanopyFilters  setFilters={setFilters} isCleared={isCleared} />    
                </AccordionItem>

                <AccordionItem key="filters-accordion-6" aria-label={t('filters.section-harness-title')} title={t('filters.section-harness-title')} >                
                    <CarSeatHarnessFilters  setFilters={setFilters} isCleared={isCleared} /> 
                </AccordionItem>

                <AccordionItem key="filters-accordion-7" aria-label={t('filters.section-certification-title')} title={t('filters.section-certification-title')} >                
                    <CarSeatCertificationFilters  setFilters={setFilters} isCleared={isCleared} /> 
                </AccordionItem>

                <AccordionItem key="filters-accordion-8" aria-label={t('filters.section-other-features-title')} title={t('filters.section-other-features-title')} >                
                    <CarSeatOtherFilters  setFilters={setFilters} isCleared={isCleared} /> 
                </AccordionItem>
            </Accordion>
        </>        
    );
}
