'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { CarSeatFiltersProps } from "types";
import { Dispatch, SetStateAction } from "react";

export default  function CarSeatCanopyFilters({setFilters, isCleared}: CarSeatFiltersProps) {
    
    return (
        <>
            <Tags 
                tags={siteConfig.carseat_tags} 
                section={"canopy"} 
                lsName={"carseat/selectedCanopyTags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
       

        </>        
    );
}
