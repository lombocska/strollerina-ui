'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from 'lib/LocalStorageAPI';
import { FIVE_THOUSAND, ONE_HUNDRED_FIFTY, THIRTY, TWO_HUNDRED, ZERO } from 'lib/constants';
import { getAllStrollers, searchStrollers } from 'lib/data';
import { deepCompare } from 'lib/util';
import { BrandContentProps, StrollerCard, StrollerFilters } from 'types';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button, Input } from "@nextui-org/react";
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { useMediaQuery } from 'react-responsive';
import { getDictionary } from 'get-dictionary';
import BrandSelection from './input_fields/brand_selection';
import SelectMaxPrice from "./input_fields/input_max_price";
import StrollerDimensionFilters from "./stroller_filters/stroller_dimension_filters";
import StrollerFoldFilters from './stroller_filters/stroller_fold_filters';
import StrollerHarnessFilters from './stroller_filters/stroller_harness_filters';
import StrollerOtherFilters from './stroller_filters/stroller_other_filters';
import StrollerSeatFilters from './stroller_filters/stroller_seat_filters';
import StrollerTerrainFilters from './stroller_filters/stroller_terrain_filters';
import StrollerWarrantyFilters from './stroller_filters/stroller_warranty_filters';
import StrollerBumperFilters from './stroller_filters/stroller_bumper_filters';
import { clearLocalStorage } from 'lib/LocalStorageAPI';
import BuyMeACoffeeSupport from '@/components/monetization/BuyMeaCoffee';
import UnlockFilters from '@/components/monetization/UnlockFilters';

export default function StrollerFiltersCollection({ brands, setStrollers, dictionary, onClose }: {
    brands: BrandContentProps;
    setStrollers: React.Dispatch<React.SetStateAction<StrollerCard[]>>;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"];
    onClose?: () => void;
}) {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const initialFilters: StrollerFilters = {
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

    const [filters, setFilters] = useLocalStorage("stroller/filters", initialFilters);
    const [isCleared, setIsCleared] = useState(false);
    const [filtersLocked, setFiltersLocked] = useLocalStorage("payment/filtersLocked", true);

    useEffect(() => {
        const isEqual = deepCompare(filters, initialFilters);
        if (isEqual) setIsCleared(false);
    }, [filters]);

    const search = async () => {
        if (setStrollers) {
            const res = await searchStrollers(
                filters.brandsName,
                filters.maxHeight,
                filters.closedMaxHeight,
                filters.maxWidth,
                filters.maxLength,
                filters.closedMaxLength,
                filters.maxWeight,
                filters.maxPrice,
                filters.minSeatHeight,
                filters.siblingMode,
                filters.reversibleSeatMode,
                filters.fullRecliningSeatMode,
                filters.minFrontWheelSize,
                filters.minBackWheelSize,
                filters.tags
            );
            setStrollers(res);
        }
    };

    const searchWithClose = async () => {
        await search();
        if (onClose) onClose();
    };

    useEffect(() => {
        search();
    }, []);

    const clearFilters = async () => {
        if (setStrollers) {
            let allStrollers = await getAllStrollers();
            setStrollers(allStrollers);
        }
        setIsCleared(true);
        clearLocalStorage('stroller/filters');
        setFilters(initialFilters);
    };


    return (
        <Card>
            {!isMobile && (
                <CardHeader className="flex gap-3 justify-between">
                    <Button size="lg" variant="ghost" onPress={searchWithClose}>
                        {dictionary['common']["search"]}
                    </Button>
                    <Button size="lg" variant="ghost" onPress={clearFilters}>
                        {dictionary['common']["clear"]}
                    </Button>
                </CardHeader>
            )}
            <CardBody>
                <div className="grid grid-flow-row-dense grid-cols-1">
                    <BrandSelection brands={brands} setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} type={"strollers"} />
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
                    <AccordionItem key="filters-accordion-1" title={dictionary['filters']['section-dimension-title']} isDisabled={filtersLocked}>
                        {filtersLocked && <div className="absolute inset-0 bg-gray-300 opacity-50 pointer-events-none"></div>}
                        <StrollerDimensionFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-2" title={dictionary['filters']['section-seat-title']} isDisabled={filtersLocked}>
                        <StrollerSeatFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-3" title={dictionary['filters']['section-fold-title']} isDisabled={filtersLocked}>
                        <StrollerFoldFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-4" title={dictionary['filters']['section-terrain-title']} isDisabled={filtersLocked}>
                        <StrollerTerrainFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-5" title={dictionary['filters']['section-harness-title']} isDisabled={filtersLocked}>
                        <StrollerHarnessFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-6" title={dictionary['filters']['section-warranty-title']} isDisabled={filtersLocked}>
                        <StrollerWarrantyFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                    </AccordionItem>

                    <AccordionItem key="filters-accordion-8" title={dictionary['filters']['section-other-features-title']} isDisabled={filtersLocked}>
                        <StrollerOtherFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                    </AccordionItem>
                </Accordion>

                {/* {filtersLocked && <UnlockFilters dictionary={dictionary} setFiltersLocked={setFiltersLocked} />} */}

            </CardBody>
            {isMobile && (
                <CardFooter>
                    <Button size="lg" variant="bordered" onPress={clearFilters}>
                        {dictionary['common']["clear"]}
                    </Button>
                    <Button size="lg" variant="bordered" color={'primary'} onPress={searchWithClose}>
                        {dictionary['common']["search"]}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
