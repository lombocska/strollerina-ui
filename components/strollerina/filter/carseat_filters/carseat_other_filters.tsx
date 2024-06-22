'use client';

import { siteConfig } from "@/config/site";
import Tags from "../input_fields/tags";
import { CarSeatFiltersProps } from "@/types";
import { Dispatch, SetStateAction } from "react";

export default  function CarSeatOtherFilters({setFilters, isCleared}: CarSeatFiltersProps) {
    
    return (
        <>
            <Tags 
                tags={siteConfig.carseat_tags} 
                section={"other-features"} 
                lsName={"carseat/selectedOtherTags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
       
        </>        
    );
}
