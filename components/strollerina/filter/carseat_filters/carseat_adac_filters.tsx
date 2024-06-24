'use client';

import { CheckIcon } from "@/components/icons";
import { siteConfig } from "config/site";
import { useLocalStorage } from 'lib/LocalStorageAPI';
import { Chip } from "@nextui-org/chip";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import AdacSelection from "../input_fields/adac_selection";
import { CarSeatFilters, CarSeatFiltersProps } from "types";

export default function CarSeatAdacFilters({ setFilters, isCleared }: CarSeatFiltersProps) {
    const { t } = useTranslation('carseats');
    const [selectedOnlyWAdactTest, setSelectedOnlyWAdactTest] = useLocalStorage("carseat/selectedOnlyWAdactTest", false);

    useEffect(() => {
        console.log("carseat adac filters changing")
        console.log("only adac: " + selectedOnlyWAdactTest)
        if (setFilters) { // Ensure setFilters is defined
            setFilters((filters: CarSeatFilters) => ({
                ...filters,
                onlyWAdacTest: selectedOnlyWAdactTest
            }));
        }
    }, [selectedOnlyWAdactTest, setFilters]); // Add setFilters as dependency
    
    
    useEffect(() => {
        if (isCleared) {
            console.log("adac filters clearing")
            setSelectedOnlyWAdactTest(false);
        }
    }, [isCleared]); 

    const handleSelectedOnlyWAdactTest = () => {
        if (selectedOnlyWAdactTest) {
            setSelectedOnlyWAdactTest(false);
        } else {
            setSelectedOnlyWAdactTest(true);
        };
    }

    return (
        <>
        <AdacSelection adacs={siteConfig.carseat_adac} setFilters={setFilters} isCleared={isCleared} />

        <Chip
            className='mb-5'
            variant={selectedOnlyWAdactTest ? 'solid' : 'bordered'}
            key={"onlyAdacFilter"}
            onClick={() => handleSelectedOnlyWAdactTest()}
            startContent={selectedOnlyWAdactTest ? <CheckIcon size={18}/>  : <></>}
        >
            {t('filters.only-with-adac')}
        </Chip>
        
        </>
    );
}
