'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { CarSeatFiltersProps } from "types";
import { Dispatch, SetStateAction } from "react";
import { getDictionary } from "get-dictionary";

export default  function CarSeatHarnessFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
}){
    
    return (
        <>
            <Tags 
                tags={siteConfig.carseat_tags} 
                section={"harness"} 
                lsName={"carseat/selectedHarnessTags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} 
                dictionary={dictionary["tags"]}/>

        </>        
    );
}
