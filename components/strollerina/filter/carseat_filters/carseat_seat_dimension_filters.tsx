'use client';

import { siteConfig } from "config/site";
import { getDictionary } from "get-dictionary";
import { useLocalStorage } from 'lib/LocalStorageAPI';
import { FIVE, SIXSTY, THIRTY, ZERO } from "lib/constants";
import { Dispatch, SetStateAction, useEffect } from "react";
import { CarSeatFilters } from "types";
import FacingSelection from "../input_fields/facing_selection";
import NumberInput from "../input_fields/number_input";
import Tags from "../input_fields/tags";

export default  function CarSeatSeatDimensionFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
}){
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
                 dictionary={dictionary["tags"]}
                tags={siteConfig.carseat_tags} 
                section={"seat"} 
                lsName={"carseat/selectedSeatDimensionTags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
       


            <div className="mb-10">
                <FacingSelection facing={siteConfig.carseat_facing} setFilters={setFilters} isCleared={isCleared} dictionary={dictionary} />
            </div>

            <NumberInput 
                label={dictionary["filters"]['max-weight']}
                title={"max-weight"} 
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
