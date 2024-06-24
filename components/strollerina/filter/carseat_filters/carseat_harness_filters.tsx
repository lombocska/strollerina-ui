'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { CarSeatFiltersProps } from "types";
import { Dispatch, SetStateAction } from "react";

export default  function CarSeatHarnessFilters({setFilters, isCleared}: CarSeatFiltersProps) {
    
    return (
        <>
            <Tags 
                tags={siteConfig.carseat_tags} 
                section={"harness"} 
                lsName={"carseat/selectedHarnessTags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
       

        </>        
    );
}
