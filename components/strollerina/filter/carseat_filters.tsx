'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/react';
import { getDictionary } from 'get-dictionary';
import { clearLocalStorage, useLocalStorage } from 'lib/LocalStorageAPI';
import { ONE_HUNDRED_FIFTY, ONE_THOUSAND_FIVE_HUNDRED, SIXSTY, THIRTY } from 'lib/constants';
import { getAllCarSeats, searchCarSeats } from 'lib/data';
import { deepCompare } from 'lib/util';
import { useEffect, useState } from 'react';
import { BrandContentProps, CarSeatFilters, CarseatCard } from 'types';
import CarSeatAdacFilters from './carseat_filters/carseat_adac_filters';
import CarSeatBaseFilters from './carseat_filters/carseat_base_filters';
import CarSeatCanopyFilters from './carseat_filters/carseat_canopy_filters';
import CarSeatCertificationFilters from './carseat_filters/carseat_certification_filters';
import CarSeatHarnessFilters from './carseat_filters/carseat_harness_filters';
import CarSeatKidDimensionFilters from './carseat_filters/carseat_kid_dimension_filters';
import CarSeatOtherFilters from './carseat_filters/carseat_other_filters';
import CarSeatSeatDimensionFilters from './carseat_filters/carseat_seat_dimension_filters';
import BrandSelection from './input_fields/brand_selection';
import SelectMaxPrice from "./input_fields/input_max_price";
import { useMediaQuery } from 'react-responsive';
import UnlockFilters from '@/components/monetization/UnlockFilters';


export default function CarSeatFiltersCollection({ brands, setCarseats, dictionary, onClose }: {
    brands: BrandContentProps;
    setCarseats: React.Dispatch<React.SetStateAction<CarseatCard[]>>;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"];
    onClose?: () => void;
}) {

    const isMobile = useMediaQuery({ maxWidth: 768 }); // Detects mobile devices

    const initialFilters: CarSeatFilters =
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
    const [isCleared, setIsCleared] = useState(false);
    const [filtersLocked, setFiltersLocked] = useLocalStorage("payment/filtersLocked", false);

    // Get query params from URL
    const getQueryParams = () => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const tags = searchParams.get('tags');
            return tags ? tags.split(',') : []; // returns a list of tags if exists
        }
        return [];
    };

    useEffect(() => {
        console.log("carseat filters changing")
        const isEqual = deepCompare(filters, initialFilters);
        if (isEqual) {
            console.log("initial filters equal with slected ones");
            setIsCleared(false);
        }
    }, [filters, initialFilters]);


    const search = async () => {
        // console.log("Search with  " + filters.brandsName)
        // Extract tags from URL query parameters if they exist
        const tagsFromUrl = getQueryParams();

        // If tags from URL are not empty, merge them with current filter tags
        const searchTags = tagsFromUrl.length > 0 ? tagsFromUrl : filters.tags;

        if (setFilters && tagsFromUrl.length > 0) {
            setFilters(initialFilters);
        }

        if (setCarseats) {
            searchCarSeats(filters.brandsName,
                filters.adacsName,
                filters.onlyWAdacTest,
                filters.maxWeigth,
                filters.maxKidWeight,
                filters.facingMode,
                filters.maxPrice,
                filters.maxKidHeight,
                searchTags
            )
                .then(res => setCarseats(res));
        }

    };

    const searchWithClose = async () => {
        search();
        if (onClose) {
            onClose();
        }

    };

    const clearFilters = async () => {
        if (setCarseats) {
            let all = await getAllCarSeats();
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
        clearLocalStorage('carseat/tags');
        // clearLocalStorage('carseat/selectedKidDimensionTags');
        // clearLocalStorage('carseat/selectedSeatDimensionTags');
        // clearLocalStorage('carseat/selectedBaseTags');
        // clearLocalStorage('carseat/selectedHarnessTags');
        // clearLocalStorage('carseat/selectedCertificationTags');
        // clearLocalStorage('carseat/selectedOtherTags');
        // Clear query parameters from URL (specifically `tags`)

        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('tags');
            window.history.pushState({}, '', url.toString());
        }

        if (setFilters) {
            setFilters(initialFilters);
        }

    }

    useEffect(() => {
        // console.log("carseats page loaded");
        search();
    }, []);

    return (
        <>
            <Card className="">
                {!isMobile && ( // Show these buttons in header only for desktop
                    <CardHeader className="flex gap-3 justify-between">
                        <Button radius="full" size="lg" variant="ghost" onPress={() => searchWithClose()}>
                            {dictionary['common']["search"]}
                        </Button>
                        <Button radius="full" size="lg" variant="ghost" onPress={() => clearFilters()}>
                            {dictionary['common']["clear"]}
                        </Button>
                    </CardHeader>
                )}
                <Divider />
                <CardBody>
                    <div className="grid grid-flow-row-dense grid-cols-1">
                        <BrandSelection brands={brands} setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} type={"carseats"} />

                        <SelectMaxPrice
                            setFilters={setFilters}
                            isCleared={isCleared}
                            lSPrefix={"carseat/"}
                            defaultMaxPrice={ONE_THOUSAND_FIVE_HUNDRED}
                            title={dictionary["filters"]['max-price']}
                            label={dictionary["filters"]['max-price']} />
                    </div>

                    <Accordion className='m-1 mb-10' variant="bordered" selectionMode="multiple">
                        <AccordionItem
                            key="filters-accordion-1"
                            aria-label={dictionary['filters']['section-adac-title']}
                            title={dictionary['filters']['section-adac-title']} >
                            <CarSeatAdacFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                        </AccordionItem>

                        <AccordionItem key="filters-accordion-2"
                            aria-label={dictionary['filters']['section-kid-dimension-title']}
                            title={dictionary['filters']['section-kid-dimension-title']} >
                            <CarSeatKidDimensionFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                        </AccordionItem>

                        <AccordionItem key="filters-accordion-3"
                            aria-label={dictionary['filters']['section-seat-title']}
                            title={dictionary['filters']['section-seat-title']} >
                            <CarSeatSeatDimensionFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                        </AccordionItem>

                        <AccordionItem key="filters-accordion-4"
                            aria-label={dictionary['filters']['section-base-title']}
                            title={dictionary['filters']['section-base-title']} >

                            <CarSeatBaseFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                        </AccordionItem>

                        <AccordionItem key="filters-accordion-5"
                            aria-label={dictionary['filters']['section-canopy-title']}
                            title={dictionary['filters']['section-canopy-title']} >

                            <CarSeatCanopyFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                        </AccordionItem>

                        <AccordionItem key="filters-accordion-6"
                            aria-label={dictionary['filters']['section-harness-title']}
                            title={dictionary['filters']['section-harness-title']} >

                            <CarSeatHarnessFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                        </AccordionItem>

                        <AccordionItem key="filters-accordion-7"
                            aria-label={dictionary['filters']['section-certification-title']}
                            title={dictionary['filters']['section-certification-title']} >

                            <CarSeatCertificationFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
                        </AccordionItem>

                        <AccordionItem key="filters-accordion-8"
                            aria-label={dictionary['filters']['section-other-features-title']}
                            title={dictionary['filters']['section-other-features-title']} >
                            <CarSeatOtherFilters setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
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
        </>
    );
}
