'use client';

import { siteConfig } from "@/config/site";
import { useLocalStorage } from '@/lib/LocalStorageAPI';
import { FIVE, ONE_HUNDRED_FIFTY, SIXSTY, TEN, THIRTY, ZERO } from "@/lib/constants";
import { Dispatch, SetStateAction, useEffect } from "react";
import NumberInput from "../input_fields/number_input";
import Tags from "../input_fields/tags";
import FacingSelection from "../input_fields/facing_selection";
import { CarSeatFilters, CarSeatFiltersProps } from "@/types";

export default  function CarSeatSeatDimensionFilters({setFilters, isCleared}: CarSeatFiltersProps) {
    
    const [selectedMaxWeight, setSelectedMaxWeight] = useLocalStorage("carseat/selectedMaxWeight", THIRTY);

    useEffect(() => {
        console.log("carseat seat dimension filters changing")
        if (setFilters) { // Ensure setFilters is defined
            setFilters((filters  : CarSeatFilters) => {
                return {
                    ...filters,
                    maxWeight: selectedMaxWeight,
                };
            });
        }
        }, [selectedMaxWeight]); 
    
    useEffect(() => {
        if (isCleared) {
            console.log("car seat seat dimensions filter clearing")
            setSelectedMaxWeight(THIRTY);
        }
    }, [isCleared]); 


    return (
        <>
            <Tags 
                tags={siteConfig.carseat_tags} 
                section={"seat"} 
                lsName={"carseat/selectedSeatDimensionTags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
       


            <div className="mb-10">
                <FacingSelection facing={siteConfig.carseat_facing} setFilters={setFilters} isCleared={isCleared} />
            </div>

            <NumberInput 
                transNM={"carseats"}
                title={"max-weight-kid"} 
                inputValue={selectedMaxWeight} 
                setInputValue={setSelectedMaxWeight} 
                demo={<></>} 
                endContent={<></>} 
                min={ZERO}
                max={SIXSTY}
                step={FIVE} />

        </>        
    );
}
