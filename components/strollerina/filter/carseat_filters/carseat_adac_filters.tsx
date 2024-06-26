'use client';

import { CheckIcon } from "@/components/icons";
import { Chip } from "@nextui-org/chip";
import { siteConfig } from "config/site";
import { getDictionary } from "get-dictionary";
import  useLocalStorage  from 'lib/LocalStorageAPI';
import { useEffect } from "react";
import { CarSeatFilters } from "types";
import AdacSelection from "../input_fields/adac_selection";

export default function CarSeatAdacFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
}){
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
        <AdacSelection 
            adacs={siteConfig.carseat_adac} 
            setFilters={setFilters} 
            isCleared={isCleared} 
            dictionary={dictionary}
            />

        <Chip
            className='mb-5'
            variant={selectedOnlyWAdactTest ? 'solid' : 'bordered'}
            key={"onlyAdacFilter"}
            onClick={() => handleSelectedOnlyWAdactTest()}
            startContent={selectedOnlyWAdactTest ? <CheckIcon size={18}/>  : <></>}
        >
            {dictionary["filters"]['only-with-adac']}
        </Chip>
        
        </>
    );
}
