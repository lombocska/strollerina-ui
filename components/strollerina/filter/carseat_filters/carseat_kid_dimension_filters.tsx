'use client';

import { siteConfig } from "config/site";
import  {useLocalStorage}  from 'lib/LocalStorageAPI';
import { FIVE, ONE_HUNDRED_FIFTY, SIXSTY, TEN, ZERO } from "lib/constants";
import { Dispatch, SetStateAction, useEffect } from "react";
import NumberInput from "../input_fields/number_input";
import Tags from "../input_fields/tags";
import { CarSeatFilters, CarSeatFiltersProps } from "types";
import { getDictionary } from "get-dictionary";

export default  function CarSeatKidDimensionFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
}){
    
    const [selectedMaxKidWeight, setSelectedMaxKidWeight] = useLocalStorage("carseat/selectedMaxKidWeight", SIXSTY);
    const [selectedMaxKidHeight, setSelectedMaxKidHeight] = useLocalStorage("carseat/selectedMaxKidHeight", ONE_HUNDRED_FIFTY);

    useEffect(() => {
        console.log("carseat kid dimension filters changing")
        if (setFilters) { // Ensure setFilters is defined
            setFilters((filters : CarSeatFilters) => {
                return {
                    ...filters,
                    maxKidWeight: selectedMaxKidWeight,
                    maxKidHeight: selectedMaxKidHeight,
                };
            });
        }
        }, [selectedMaxKidWeight, selectedMaxKidHeight]); 
    
    useEffect(() => {
        if (isCleared) {
            console.log("car seat kid dimensions filter clearing")
            setSelectedMaxKidWeight(SIXSTY);
            setSelectedMaxKidHeight(ONE_HUNDRED_FIFTY);
        }
    }, [isCleared]); 


    return (
        <>
            <Tags 
                dictionary={dictionary["tags"]}
                tags={siteConfig.carseat_tags} 
                section={"kid"} 
                lsName={"carseat/tags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
       

            <NumberInput 
                label={dictionary["filters"]['max-weight-kid']}
                title={"max-weight-kid"} 
                inputValue={selectedMaxKidWeight} 
                setInputValue={setSelectedMaxKidWeight} 
                demo={<></>} 
                min={ZERO}
                max={SIXSTY}
                step={FIVE} />

            <NumberInput 
                label={dictionary["filters"]['max-height-kid']}
                title={"max-height-kid"} 
                inputValue={selectedMaxKidHeight} 
                setInputValue={setSelectedMaxKidHeight} 
                demo={<></>} 
                min={ZERO}
                max={ONE_HUNDRED_FIFTY}
                step={TEN} />
        </>        
    );
}
